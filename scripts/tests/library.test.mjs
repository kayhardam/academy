import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkItems, details, exportItem } from '../lib/library.mjs';
import { changed, fixture, useCoachboard } from './helpers.mjs';

const cb = useCoachboard();

const TACTIC = 'library/nl/pass-and-go.md';
const DRILL = 'library/nl/pass-in-pairs.md';
const ENGLISH = 'library/en/pass-and-go.md';

/** The three fixture items, with some files replaced by { path: code }. */
function items(replace = {}) {
    const paths = {
        'nl/pass-and-go.md': TACTIC,
        'nl/pass-in-pairs.md': DRILL,
        'en/pass-and-go.md': ENGLISH,
    };
    return Object.entries(paths).map(([path, file]) => ({
        path,
        code: replace[path] ?? fixture(file),
    }));
}

/** The errors of checkItems() for the fixture items with some files replaced. */
function errorsWith(replace) {
    return checkItems(items(replace), cb.current).errors;
}

test('valid items in every language pass', () => {
    const { entries, errors } = checkItems(items(), cb.current);
    assert.deepEqual(errors, []);
    assert.deepEqual(
        entries.map(({ id }) => id),
        ['nl/pass-and-go', 'nl/pass-in-pairs', 'en/pass-and-go'],
    );
    assert.equal(entries[1].body.trim(), 'Wat extra uitleg onder de stappen.');
});

test('the schema of the Coachboard: a short summary', () => {
    assert.deepEqual(
        errorsWith({
            'nl/pass-and-go.md': changed(
                TACTIC,
                /summary: ".*"/.exec(fixture(TACTIC))[0],
                'summary: "Te kort."',
            ),
        }).map((e) => e.split(': ').slice(0, 2).join(': ')),
        ['"nl/pass-and-go": summary'],
    );
});

test('the schema of the Coachboard: an unknown age group, category and level', () => {
    const code = changed(TACTIC, 'ages: [u10, u12]', 'ages: [u11]')
        .replace('category: attack', 'category: speed')
        .replace('level: basic', 'level: easy');
    const errors = errorsWith({ 'nl/pass-and-go.md': code });
    assert.deepEqual(
        errors.map((e) => e.split(': ')[1]),
        ['category', 'ages.0', 'level'],
    );
});

test('the schema of the Coachboard: a drill without its setup', () => {
    const code = changed(DRILL, '  space: "Een half veld."\n', '');
    assert.deepEqual(
        errorsWith({ 'nl/pass-in-pairs.md': code }).map((e) =>
            e.split(': ').slice(0, 2).join(': '),
        ),
        ['"nl/pass-in-pairs": organization.space'],
    );
});

test('the schema of the Coachboard: a step without its sentence, and a board with a title', () => {
    const code = changed(
        TACTIC,
        '    - text: "LO loopt door naar de cirkel."\n      players:',
        '    - players:',
    ).replace('  v: 2\n', '  v: 2\n  title: "Eigen titel"\n');
    const errors = errorsWith({ 'nl/pass-and-go.md': code });
    assert.equal(errors.length, 2);
    assert.match(
        errors[0],
        /^"nl\/pass-and-go": board: Every step needs its sentence/,
    );
    assert.match(
        errors[1],
        /^"nl\/pass-and-go": board: Leave the board's title out/,
    );
});

test('the schema of the Coachboard: a board that is not a board', () => {
    const code = changed(TACTIC, 'court: half', 'court: round');
    assert.match(
        errorsWith({ 'nl/pass-and-go.md': code })[0],
        /^"nl\/pass-and-go": board: Not a valid board/,
    );
});

test('checkLibrary() of the Coachboard: age groups with a gap', () => {
    const code = changed(TACTIC, 'ages: [u10, u12]', 'ages: [u10, u14]');
    assert.deepEqual(errorsWith({ 'nl/pass-and-go.md': code }), [
        '"nl/pass-and-go": list the age groups in order, without a gap',
    ]);
});

test('checkLibrary() of the Coachboard: a translation that draws something else', () => {
    const code = changed(ENGLISH, 'balls: [[110, 112]]', 'balls: [[112, 112]]');
    assert.deepEqual(errorsWith({ 'en/pass-and-go.md': code }), [
        '"en/pass-and-go": draws something else than "nl/pass-and-go"; a translation changes only labels and sentences',
    ]);
});

test('checkLibrary() of the Coachboard: a related item that does not exist', () => {
    const code = changed(
        TACTIC,
        'board:\n',
        'related:\n  - nl/no-such-item\nboard:\n',
    );
    assert.deepEqual(errorsWith({ 'nl/pass-and-go.md': code }), [
        '"nl/pass-and-go": related "nl/no-such-item" doesn\'t exist',
    ]);
});

test('checkLibrary() of the Coachboard: a pass of a player without the ball', () => {
    const code = changed(DRILL, 'balls: [[90, 142]]', 'balls: [[110, 142]]');
    assert.deepEqual(errorsWith({ 'nl/pass-in-pairs.md': code }), [
        '"nl/pass-in-pairs": step 1: the pass of player 1 has no ball',
    ]);
});

test('checkLibrary() of the Coachboard: a file outside a language folder', () => {
    const files = items();
    files[1].path = 'pass-in-pairs.md';
    assert.deepEqual(checkItems(files, cb.current).errors, [
        '"pass-in-pairs": put it in a language folder (en, nl)',
    ]);
});

test('checkMeters() of the Coachboard: "6 meter" with a plain space, in the front matter and in the body', () => {
    const code = changed(
        DRILL,
        'space: "Een half veld."',
        'space: "Een vak van 6 meter."',
    ).replace('Wat extra uitleg', 'Op 9 meter, wat extra uitleg');
    assert.deepEqual(errorsWith({ 'nl/pass-in-pairs.md': code }), [
        '"nl/pass-in-pairs": write "6 meter" with a no-break space (U+00A0)',
        '"nl/pass-in-pairs": write "9 meter" with a no-break space (U+00A0)',
    ]);
});

test('invalid YAML is one line with the id', () => {
    const errors = errorsWith({
        'nl/pass-and-go.md': changed(
            TACTIC,
            'title: "Passen en doorlopen"',
            'title: "Passen',
        ),
    });
    assert.equal(errors.length, 1);
    assert.match(errors[0], /^"nl\/pass-and-go": \S/);
    assert.ok(!errors[0].includes('\n'));
});

test('an English item is checked too', () => {
    const code = changed(ENGLISH, 'level: basic', 'level: easy');
    assert.equal(
        errorsWith({ 'en/pass-and-go.md': code })[0].split(': ')[0],
        '"en/pass-and-go"',
    );
});

test('a file with errors gives no entries', () => {
    const code = changed(TACTIC, 'ages: [u10, u12]', 'ages: [u10, u14]');
    assert.deepEqual(
        checkItems(items({ 'nl/pass-and-go.md': code }), cb.current).entries,
        [],
    );
});

test('exportItem(): the fields of a tactic, its page and a link that opens its board with its title', async () => {
    const { entries } = checkItems(items(), cb.current);
    const item = await exportItem(entries[0], cb.current);
    const { board, link, ...rest } = item;
    assert.deepEqual(rest, {
        lang: 'nl',
        slug: 'pass-and-go',
        type: 'tactic',
        title: 'Passen en doorlopen',
        category: 'attack',
        ages: ['u10', 'u12'],
        level: 'basic',
        summary: entries[0].data.summary,
        details: { coachingPoints: ['Speel de bal en loop meteen door.'] },
        path: 'tactics/pass-and-go/',
    });
    assert.equal(board.frames.length, 2);
    assert.ok(cb.current.sameBoard(board, entries[0].data.board));
    const opened = await cb.current.decode(link);
    assert.ok(
        cb.current.sameBoard(opened, {
            ...entries[0].data.board,
            title: 'Passen en doorlopen',
        }),
    );
    assert.equal(opened.title, 'Passen en doorlopen');
    assert.deepEqual(
        opened.frames.map((frame) => frame.text),
        ['LO speelt de bal naar MO.', 'LO loopt door naar de cirkel.'],
    );
});

test('exportItem(): a drill has its goal, setup and every list in the order of the Coachboard', async () => {
    const { entries } = checkItems(items(), cb.current);
    const item = await exportItem(entries[1], cb.current);
    assert.equal(item.path, 'drills/pass-in-pairs/');
    assert.deepEqual(item.details, {
        goal: 'Zuiver passen en vangen.',
        organization: {
            players: 'Tweetallen.',
            equipment: 'Een bal per tweetal.',
            space: 'Een half veld.',
        },
        rules: ['Na tien passes wissel je van plek.'],
        coachingPoints: ['Vang de bal met twee handen.'],
        mistakes: ['De bal gaat te hoog.'],
        easier: [],
        harder: ['Pas met je andere hand.'],
    });
    assert.deepEqual(Object.keys(item.details).slice(2), [
        ...cb.current.DRILL_LISTS,
    ]);
});

test('details(): a tactic has only its coaching points', () => {
    assert.deepEqual(
        details({ type: 'tactic', coachingPoints: ['a'], goal: 'x' }, [
            'rules',
        ]),
        { coachingPoints: ['a'] },
    );
});
