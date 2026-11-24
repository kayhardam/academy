// The series of this site: content/series/nl/<slug>.md, front matter only.
//
//   ---
//   title: "Kruisen"
//   summary: "At least 50 characters: shown under the title and used as the meta description."
//   ages: [u10, u12]
//   items:
//     - crossing-in-pairs
//     - crossing-cb-lb
//   ---
//
// `ages` is a run of age groups from the Coachboard's AGES, youngest first and
// without a gap, as an item lists them. `items` are slugs of Dutch items, in
// the order the series shows them, each once.
import { z } from 'zod';
import { firstLine, parseFrontmatter } from './frontmatter.mjs';
import { issues } from './library.mjs';

/** A file name as the Coachboard allows it for an item (checkLibrary()): lowercase-kebab-case. */
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** The front matter of a series. Strict, so a misspelt field is an error instead of being ignored. */
export function seriesSchema(ages) {
    return z
        .object({
            title: z.string().min(1),
            summary: z.string().min(50),
            ages: z.array(z.enum(ages)).min(1),
            items: z.array(z.string().min(1)).min(1),
        })
        .strict();
}

/**
 * Every series, checked. `files` are { path, code }, the path relative to
 * content/series/nl/ ("kruisen.md"); `itemSlugs` are the slugs of the Dutch
 * items; `cb` gives the Coachboard's AGES and checkMeters(). Returns the
 * series in the order of `files` and one line per error.
 */
export function checkSeries(files, itemSlugs, cb) {
    const schema = seriesSchema(cb.AGES);
    const errors = [];
    const series = [];
    for (const { path, code } of files) {
        const slug = path.replace(/\.md$/, '');
        const id = `series/nl/${slug}`;
        const before = errors.length;
        if (!SLUG.test(slug)) {
            errors.push(
                `"${id}": the file name must be lowercase-kebab-case, with no subfolders`,
            );
        }
        let read;
        try {
            read = parseFrontmatter(code);
        } catch (error) {
            errors.push(`"${id}": ${firstLine(error.message)}`);
            continue;
        }
        if (read.body.trim() !== '') {
            errors.push(
                `"${id}": write nothing below the front matter; the site shows only its fields`,
            );
        }
        const parsed = schema.safeParse(read.data);
        if (!parsed.success) {
            errors.push(...issues(id, parsed.error.issues));
            continue;
        }
        const { title, summary, ages, items } = parsed.data;
        errors.push(...agesInOrder(id, ages, cb.AGES));
        errors.push(...knownItems(id, items, itemSlugs));
        errors.push(...cb.checkMeters([{ id, data: parsed.data }]));
        if (errors.length === before) {
            series.push({ lang: 'nl', slug, title, summary, ages, items });
        }
    }
    return { series: errors.length > 0 ? [] : series, errors };
}

/** A run of age groups, youngest first, without a gap: the rule checkLibrary() has for an item. */
export function agesInOrder(id, ages, all) {
    const at = ages.map((age) => all.indexOf(age));
    return at.some((age, i) => i > 0 && age !== at[i - 1] + 1)
        ? [`"${id}": list the age groups in order, without a gap`]
        : [];
}

/** Every item of a series exists in Dutch and comes once. */
export function knownItems(id, items, itemSlugs) {
    const errors = [];
    items.forEach((slug, i) => {
        if (!itemSlugs.has(slug)) {
            errors.push(`"${id}": items.${i}: "${slug}" is not a Dutch item`);
        } else if (items.indexOf(slug) !== i) {
            errors.push(
                `"${id}": items.${i}: "${slug}" is in the series twice`,
            );
        }
    });
    return errors;
}
