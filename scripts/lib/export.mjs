// The whole export: the items of the Coachboard and the series of this site,
// checked, as the data of database/data/library.json.
import { readdir, readFile } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { parseFrontmatter } from './frontmatter.mjs';
import { checkItems, entryId, exportItem } from './library.mjs';
import { checkSeries } from './series.mjs';

/** The language this site shows. Every language is checked; only this one is exported. */
export const LANG = 'nl';

/**
 * Reads and checks every item in `libraryDir` (all languages) and every series
 * in `seriesDir`. Returns { errors } with one line per error, or { library }:
 * the Dutch items sorted by slug and the series sorted by position.
 */
export async function exportLibrary({ libraryDir, seriesDir }, cb) {
    const itemFiles = await markdownFiles(libraryDir);
    const { entries, errors } = checkItems(itemFiles, cb);

    // A series may only name a Dutch item that has a file, valid or not: an
    // invalid item already has its own error.
    const dutchSlugs = new Set(
        itemFiles
            .map(({ path, code }) =>
                cb.parseId(entryId(path, frontmatter(code))),
            )
            .filter(({ lang }) => lang === LANG)
            .map(({ slug }) => slug),
    );
    const checked = checkSeries(await markdownFiles(seriesDir), dutchSlugs, cb);
    errors.push(...checked.errors);
    if (errors.length > 0) {
        return { errors };
    }

    const dutch = entries
        .filter(({ id }) => cb.parseId(id).lang === LANG)
        .sort((a, b) => compare(a.id, b.id));
    return {
        errors: [],
        library: {
            items: await Promise.all(
                dutch.map((entry) => exportItem(entry, cb)),
            ),
            series: checked.series,
        },
    };
}

/**
 * The Markdown files under a folder, at any depth, as { path, code } with a
 * path relative to it and forward slashes, sorted by path. A folder that
 * doesn't exist has none: content/series/nl/ may still be empty.
 */
export async function markdownFiles(dir) {
    let paths;
    try {
        paths = await readdir(dir, { recursive: true });
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
    const files = paths
        .filter((path) => path.endsWith('.md'))
        .map((path) => path.split(sep).join('/'))
        .sort(compare);
    return Promise.all(
        files.map(async (path) => ({
            path,
            code: await readFile(join(dir, path), 'utf8'),
        })),
    );
}

/** A file's front matter, for its id; unreadable front matter is empty here and an error in checkItems(). */
function frontmatter(code) {
    try {
        return parseFrontmatter(code).data;
    } catch {
        return {};
    }
}

/** Code-point order, the same on every machine. */
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
