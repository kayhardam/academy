import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import {
    cp,
    mkdir,
    mkdtemp,
    readdir,
    readFile,
    rm,
    writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { exportLibrary, markdownFiles } from '../lib/export.mjs';
import { changed, FIXTURES, useCoachboard } from './helpers.mjs';

const cb = useCoachboard();
const run = promisify(execFile);
const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const SCRIPT = join(ROOT, 'scripts/export-library.mjs');
const LIBRARY = join(FIXTURES, 'library');
const SERIES = join(FIXTURES, 'series');

const temps = [];
after(() =>
    Promise.all(temps.map((dir) => rm(dir, { recursive: true, force: true }))),
);

/** A copy of the fixtures in a temporary folder, with files written over it: { 'series/x.md': code }. */
async function copy(files = {}) {
    const dir = await mkdtemp(join(tmpdir(), 'export-library-'));
    temps.push(dir);
    await cp(FIXTURES, dir, { recursive: true });
    for (const [path, code] of Object.entries(files)) {
        await mkdir(join(dir, path, '..'), { recursive: true });
        await writeFile(join(dir, path), code);
    }
    return {
        dir,
        library: join(dir, 'library'),
        series: join(dir, 'series'),
        out: join(dir, 'out/library.json'),
    };
}

test('exports the Dutch items, sorted by slug, and the series', async () => {
    const { errors, library } = await exportLibrary(
        { libraryDir: LIBRARY, seriesDir: SERIES },
        cb.current,
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(
        library.items.map(({ lang, slug, type }) => [lang, slug, type]),
        [
            ['nl', 'pass-and-go', 'tactic'],
            ['nl', 'pass-in-pairs', 'drill'],
        ],
    );
    assert.deepEqual(
        library.series.map(({ slug, items }) => [slug, items]),
        [['passing', ['pass-in-pairs', 'pass-and-go']]],
    );
});

test('every link opens the same board as the item draws, with its title', async () => {
    const { library } = await exportLibrary(
        { libraryDir: LIBRARY, seriesDir: SERIES },
        cb.current,
    );
    for (const item of library.items) {
        const opened = await cb.current.decode(item.link);
        assert.ok(
            cb.current.sameBoard(opened, { ...item.board, title: item.title }),
            item.slug,
        );
    }
});

test("the Coachboard's own items pass and are all exported", async () => {
    const libraryDir = join(ROOT, 'coachboard/src/content/library');
    const { errors, library } = await exportLibrary(
        { libraryDir, seriesDir: join(FIXTURES, 'none') },
        cb.current,
    );
    assert.deepEqual(errors, []);
    const dutch = (await readdir(join(libraryDir, 'nl'))).filter((name) =>
        name.endsWith('.md'),
    );
    assert.deepEqual(
        library.items.map(({ slug }) => `${slug}.md`),
        dutch.sort(),
    );
    assert.deepEqual(library.series, []);
});

test('an error in an English item stops the export too', async () => {
    const paths = await copy({
        'library/en/pass-and-go.md': changed(
            'library/en/pass-and-go.md',
            'level: basic',
            'level: easy',
        ),
    });
    const { errors, library } = await exportLibrary(
        { libraryDir: paths.library, seriesDir: paths.series },
        cb.current,
    );
    assert.equal(library, undefined);
    assert.match(errors[0], /^"en\/pass-and-go": level: /);
});

test('a series that names an invalid Dutch item gets no second error: the item has its own', async () => {
    const paths = await copy({
        'library/nl/pass-and-go.md': changed(
            'library/nl/pass-and-go.md',
            'level: basic',
            'level: easy',
        ),
    });
    const { errors } = await exportLibrary(
        { libraryDir: paths.library, seriesDir: paths.series },
        cb.current,
    );
    assert.equal(errors.length, 1);
    assert.match(errors[0], /^"nl\/pass-and-go": level: /);
});

test('two series with the same position stop the export', async () => {
    const paths = await copy({
        'series/other.md': changed(
            'series/passing.md',
            'title: "Passen"',
            'title: "Nog eens passen"',
        ),
    });
    const { errors, library } = await exportLibrary(
        { libraryDir: paths.library, seriesDir: paths.series },
        cb.current,
    );
    assert.equal(library, undefined);
    assert.deepEqual(errors, [
        '"series/nl/passing": position: 1 is also the position of "series/nl/other"',
    ]);
});

test('a series that names an English-only item is an error', async () => {
    const paths = await copy({
        'library/en/only-english.md': changed(
            'library/en/pass-and-go.md',
            'Pass and go',
            'Only English',
        ),
    });
    const series = changed(
        'series/passing.md',
        '  - pass-and-go\n',
        '  - pass-and-go\n  - only-english\n',
    );
    await writeFile(join(paths.series, 'passing.md'), series);
    const { errors } = await exportLibrary(
        { libraryDir: paths.library, seriesDir: paths.series },
        cb.current,
    );
    assert.deepEqual(errors, [
        '"series/nl/passing": items.2: "only-english" is not a Dutch item',
    ]);
});

test('markdownFiles(): every .md at any depth, sorted, with forward slashes; a missing folder has none', async () => {
    const files = await markdownFiles(LIBRARY);
    assert.deepEqual(
        files.map(({ path }) => path),
        ['en/pass-and-go.md', 'nl/pass-and-go.md', 'nl/pass-in-pairs.md'],
    );
    assert.deepEqual(await markdownFiles(join(FIXTURES, 'none')), []);
});

test('the script writes library.json and says what it wrote', async () => {
    const paths = await copy();
    const { stdout } = await run(
        'node',
        [
            SCRIPT,
            '--library',
            paths.library,
            '--series',
            paths.series,
            '--out',
            paths.out,
        ],
        { cwd: ROOT },
    );
    assert.match(stdout, /^2 items and 1 series in /);
    const written = JSON.parse(await readFile(paths.out, 'utf8'));
    assert.deepEqual(Object.keys(written), ['items', 'series']);
    assert.equal(written.items.length, 2);
});

test('on errors the script prints one line per error, writes nothing and exits with 1', async () => {
    const paths = await copy({
        'library/nl/pass-in-pairs.md': changed(
            'library/nl/pass-in-pairs.md',
            'space: "Een half veld."',
            'space: "Een vak van 6 meter."',
        ),
        'series/passing.md': changed(
            'series/passing.md',
            '  - pass-and-go\n',
            '  - pass-and-go\n  - no-such-item\n',
        ),
    });
    await assert.rejects(
        run(
            'node',
            [
                SCRIPT,
                '--library',
                paths.library,
                '--series',
                paths.series,
                '--out',
                paths.out,
            ],
            { cwd: ROOT },
        ),
        (error) => {
            assert.equal(error.code, 1);
            assert.deepEqual(error.stderr.trimEnd().split('\n'), [
                '"nl/pass-in-pairs": write "6 meter" with a no-break space (U+00A0)',
                '"series/nl/passing": items.2: "no-such-item" is not a Dutch item',
            ]);
            return true;
        },
    );
    await assert.rejects(readFile(paths.out), { code: 'ENOENT' });
});
