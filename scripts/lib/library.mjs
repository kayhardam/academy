// The Coachboard's items, checked as its build checks them and shaped for
// database/data/library.json. `cb` is what loadCoachboard() returns: the
// checks are the Coachboard's own, this file only feeds them.
import { firstLine, parseFrontmatter } from './frontmatter.mjs';

/**
 * Every item in every language, checked like src/data/library.ts and the
 * schema in src/content.config.ts do in the Coachboard's build. `files` are
 * { path, code }, the path relative to src/content/library/ ("nl/foo.md").
 * Returns the valid entries ({ id, data, body }) and one line per error. As in
 * the build, checkLibrary() and checkMeters() run only when every file reads
 * and passes the schema, so an invalid item never adds a second, misleading error.
 */
export function checkItems(files, cb) {
    const errors = [];
    const entries = [];
    for (const { path, code } of files) {
        let read;
        try {
            read = parseFrontmatter(code);
        } catch (error) {
            errors.push(`"${entryId(path)}": ${error.message}`);
            continue;
        }
        const id = entryId(path, read.data);
        const parsed = cb.schema.safeParse(read.data);
        if (!parsed.success) {
            errors.push(...issues(id, parsed.error.issues));
            continue;
        }
        entries.push({ id, data: parsed.data, body: read.body });
    }
    if (errors.length > 0) {
        return { entries: [], errors };
    }
    errors.push(
        ...cb.checkLibrary(
            entries.map(({ id, data }) => ({
                id,
                type: data.type,
                ages: data.ages.map((age) => cb.AGES.indexOf(age)),
                board: data.board,
                related: data.related,
            })),
            cb.locales,
            cb.categorySlugs,
        ),
        ...cb.checkMeters(entries),
    );
    return { entries: errors.length > 0 ? [] : entries, errors };
}

/**
 * The id Astro's glob loader gives a file: a `slug` in its front matter, or
 * else its path without ".md". Astro also slugifies that path; checkLibrary()
 * demands a file name that already is a slug, so for a valid file both agree.
 */
export function entryId(path, data = {}) {
    return data.slug ? String(data.slug) : path.replace(/\.md$/, '');
}

/** The schema's issues as one line each: the id, the field and the message. */
export function issues(id, list) {
    return list.map((issue) => {
        const field = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
        return `"${id}": ${field}${firstLine(issue.message)}`;
    });
}

/**
 * One item as library.json holds it. `link` opens the board as "Open in the
 * board" on the Coachboard's item page does (LibraryItem.astro): the drawing
 * with the item's title. `path` is the item's page after the locale prefix.
 */
export async function exportItem({ id, data }, cb) {
    const { lang, slug } = cb.parseId(id);
    const { type, title, category, ages, level, summary, board } = data;
    return {
        lang,
        slug,
        type,
        title,
        category,
        ages,
        level,
        summary,
        details: details(data, cb.DRILL_LISTS),
        board,
        link: await cb.encode({ ...board, title }),
        path: cb.itemPath(type, slug),
    };
}

/** What the page shows besides the steps: a tactic's coaching points; a drill's goal, setup and lists, in the Coachboard's order. */
export function details(data, drillLists) {
    if (data.type !== 'drill') {
        return { coachingPoints: data.coachingPoints };
    }
    return {
        goal: data.goal,
        organization: data.organization,
        ...Object.fromEntries(drillLists.map((list) => [list, data[list]])),
    };
}
