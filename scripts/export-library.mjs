// The library for the database: npm run export
//
// Reads every item in coachboard/src/content/library/ (all languages) and every
// series in content/series/nl/, checks them as the Coachboard's build does
// (with its own schema and functions, scripts/lib/coachboard.mjs), and writes
// the Dutch items and the series to database/data/library.json. On an error it
// prints one line per error, writes nothing and exits with 1.
//
// The folders and the file can be given for tests:
//   node scripts/export-library.mjs --library <dir> --series <dir> --out <file>
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { loadCoachboard } from './lib/coachboard.mjs';
import { exportLibrary } from './lib/export.mjs';
import { firstLine } from './lib/frontmatter.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

const { values } = parseArgs({
    options: {
        library: {
            type: 'string',
            default: resolve(root, 'coachboard/src/content/library'),
        },
        series: { type: 'string', default: resolve(root, 'content/series/nl') },
        out: {
            type: 'string',
            default: resolve(root, 'database/data/library.json'),
        },
    },
});

let result;
try {
    const cb = await loadCoachboard();
    try {
        result = await exportLibrary(
            { libraryDir: values.library, seriesDir: values.series },
            cb,
        );
    } finally {
        await cb.close();
    }
} catch (error) {
    result = { errors: [`export failed: ${firstLine(error.message)}`] };
}

if (result.errors.length > 0) {
    for (const error of result.errors) {
        console.error(error);
    }
    process.exit(1);
}

const { items, series } = result.library;
await mkdir(dirname(values.out), { recursive: true });
await writeFile(values.out, `${JSON.stringify(result.library, null, 2)}\n`);
console.log(
    `${items.length} items and ${series.length} series in ${relative(process.cwd(), values.out)}`,
);
