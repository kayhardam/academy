import assert from 'node:assert/strict';
import { test } from 'node:test';
import { agesInOrder, checkSeries, knownItems } from '../lib/series.mjs';
import { changed, fixture, useCoachboard } from './helpers.mjs';

const cb = useCoachboard();

const SERIES = 'series/passing.md';
const SLUGS = new Set(['pass-and-go', 'pass-in-pairs', 'crossing']);

/** checkSeries() on one file. */
function check(code, path = 'passing.md') {
    return checkSeries([{ path, code }], SLUGS, cb.current);
}

test('a valid series', () => {
    assert.deepEqual(check(fixture(SERIES)), {
        series: [
            {
                lang: 'nl',
                slug: 'passing',
                title: 'Passen',
                summary:
                    'Een serie voor de tests van de export: eerst passen in tweetallen, dan passen en doorlopen.',
                ages: ['u10', 'u12'],
                items: ['pass-in-pairs', 'pass-and-go'],
                position: 1,
            },
        ],
        errors: [],
    });
});

test('an item that does not exist in Dutch is an error', () => {
    const code = changed(
        SERIES,
        '  - pass-and-go\n',
        '  - pass-and-go\n  - no-such-item\n',
    );
    assert.deepEqual(check(code), {
        series: [],
        errors: [
            '"series/nl/passing": items.2: "no-such-item" is not a Dutch item',
        ],
    });
});

test('an item twice is an error', () => {
    const code = changed(
        SERIES,
        '  - pass-and-go\n',
        '  - pass-and-go\n  - pass-in-pairs\n',
    );
    assert.deepEqual(check(code).errors, [
        '"series/nl/passing": items.2: "pass-in-pairs" is in the series twice',
    ]);
});

test('a summary under 50 characters is an error', () => {
    const code = changed(
        SERIES,
        /summary: ".*"/.exec(fixture(SERIES))[0],
        'summary: "Te kort."',
    );
    const { errors } = check(code);
    assert.equal(errors.length, 1);
    assert.match(errors[0], /^"series\/nl\/passing": summary: /);
});

test('every field is required', () => {
    const { errors } = check('---\nages: [u10]\n---\n');
    assert.deepEqual(
        errors.map((e) => e.split(': ')[1]),
        ['title', 'summary', 'items', 'position'],
    );
});

test('a series without items is an error', () => {
    const code = changed(
        SERIES,
        'items:\n  - pass-in-pairs\n  - pass-and-go\n',
        'items: []\n',
    );
    assert.match(check(code).errors[0], /^"series\/nl\/passing": items: /);
});

test('a misspelt field is an error, not ignored', () => {
    const code = changed(SERIES, 'items:', 'item:');
    const { errors } = check(code);
    assert.equal(errors.length, 2);
    assert.match(errors[0], /^"series\/nl\/passing": items: /);
    assert.match(
        errors[1],
        /^"series\/nl\/passing": Unrecognized key: "item"$/,
    );
});

test("an age group outside the Coachboard's AGES is an error", () => {
    const code = changed(SERIES, 'ages: [u10, u12]', 'ages: [u10, u11]');
    assert.match(check(code).errors[0], /^"series\/nl\/passing": ages\.1: /);
});

test('age groups with a gap or out of order are an error', () => {
    for (const ages of ['[u10, u14]', '[u12, u10]']) {
        const code = changed(SERIES, 'ages: [u10, u12]', `ages: ${ages}`);
        assert.deepEqual(check(code).errors, [
            '"series/nl/passing": list the age groups in order, without a gap',
        ]);
    }
});

test('a file name that is not lowercase-kebab-case is an error', () => {
    assert.deepEqual(check(fixture(SERIES), 'Passen.md').errors, [
        '"series/nl/Passen": the file name must be lowercase-kebab-case, with no subfolders',
    ]);
    assert.equal(check(fixture(SERIES), 'extra/passing.md').errors.length, 1);
});

test('text below the front matter is an error: the site would not show it', () => {
    const { errors } = check(`${fixture(SERIES)}\nUitleg die niemand ziet.\n`);
    assert.deepEqual(errors, [
        '"series/nl/passing": write nothing below the front matter; the site shows only its fields',
    ]);
});

test('"6 meter" with a plain space is an error, as in the Coachboard\'s items (checkMeters())', () => {
    const code = changed(SERIES, 'eerst passen', 'eerst passen op 6 meter');
    assert.deepEqual(check(code).errors, [
        '"series/nl/passing": write "6 meter" with a no-break space (U+00A0)',
    ]);
});

test('invalid YAML is one line', () => {
    const { errors } = check('---\ntitle: "open\n---\n');
    assert.equal(errors.length, 1);
    assert.ok(!errors[0].includes('\n'));
});

test('position is a whole number from 1', () => {
    for (const position of ['1.5', '"1"', 'een', '0', '-1']) {
        const code = changed(SERIES, 'position: 1', `position: ${position}`);
        const { errors } = check(code);
        assert.equal(errors.length, 1, position);
        assert.match(errors[0], /^"series\/nl\/passing": position: /);
    }
});

test('two series with the same position are an error, and there are no series', () => {
    const code = fixture(SERIES);
    const { series, errors } = checkSeries(
        [
            { path: 'a.md', code },
            {
                path: 'b.md',
                code: changed(SERIES, 'position: 1', 'position: 2'),
            },
            { path: 'c.md', code },
        ],
        SLUGS,
        cb.current,
    );
    assert.deepEqual(series, []);
    assert.deepEqual(errors, [
        '"series/nl/c": position: 1 is also the position of "series/nl/a"',
    ]);
});

test('a same position is found also when that other series has another error', () => {
    const { errors } = checkSeries(
        [
            {
                path: 'a.md',
                code: changed(SERIES, 'ages: [u10, u12]', 'ages: [u10, u14]'),
            },
            { path: 'b.md', code: fixture(SERIES) },
        ],
        SLUGS,
        cb.current,
    );
    assert.deepEqual(errors, [
        '"series/nl/a": list the age groups in order, without a gap',
        '"series/nl/b": position: 1 is also the position of "series/nl/a"',
    ]);
});

test('the series come in the order of their position, not of their file names; gaps are allowed', () => {
    const { series, errors } = checkSeries(
        [
            {
                path: 'a.md',
                code: changed(SERIES, 'position: 1', 'position: 10'),
            },
            {
                path: 'b.md',
                code: fixture(SERIES),
            },
            {
                path: 'c.md',
                code: changed(SERIES, 'position: 1', 'position: 2'),
            },
        ],
        SLUGS,
        cb.current,
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(
        series.map(({ slug, position }) => [slug, position]),
        [
            ['b', 1],
            ['c', 2],
            ['a', 10],
        ],
    );
});

test('one invalid series means no series at all', () => {
    const { series, errors } = checkSeries(
        [
            { path: 'a.md', code: fixture(SERIES) },
            { path: 'b.md', code: '---\ntitle: "B"\n---\n' },
        ],
        SLUGS,
        cb.current,
    );
    assert.deepEqual(series, []);
    assert.ok(errors.length > 0);
});

test('agesInOrder() and knownItems() on their own', () => {
    const ages = ['u8', 'u10', 'u12'];
    assert.deepEqual(agesInOrder('x', ['u8', 'u10'], ages), []);
    assert.equal(agesInOrder('x', ['u8', 'u12'], ages).length, 1);
    assert.deepEqual(knownItems('x', ['crossing'], SLUGS), []);
});
