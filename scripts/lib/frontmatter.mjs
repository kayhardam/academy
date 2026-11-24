// Front matter as the Coachboard's build reads it: Astro 7.4's parseFrontmatter()
// and parseYaml() (@astrojs/internal-helpers 0.13), with the same yaml package,
// pattern and options. Only YAML: the items and the series use it, so a TOML
// block (+++) is refused instead of read.
import { parseDocument } from 'yaml';

const FRONTMATTER =
    /(?:^\uFEFF?|^\s*\n)(?:---|\+\+\+)([\s\S]*?\n)(?:---|\+\+\+)/;
const TOML = /(?:^\uFEFF?|^\s*\n)\+\+\+/;

/** The YAML as Astro reads it: YAML 1.2 core, merge keys, timestamps. Throws on the first error. */
export function parseYaml(source) {
    const document = parseDocument(source, {
        customTags: ['timestamp'],
        merge: true,
        schema: 'core',
    });
    if (document.errors.length > 0) {
        throw document.errors[0];
    }
    return document.contents === null ? undefined : document.toJS();
}

/**
 * A Markdown file's front matter and the body after it. A file without front
 * matter has empty data, as in Astro. Throws on invalid YAML, with the first
 * line of the parser's message.
 */
export function parseFrontmatter(code) {
    const match = FRONTMATTER.exec(code);
    if (!match) {
        return { data: {}, body: code };
    }
    if (TOML.test(code)) {
        throw new Error('write the front matter in YAML, between --- lines');
    }
    let parsed;
    try {
        parsed = parseYaml(match[1]);
    } catch (error) {
        throw new Error(firstLine(error.message));
    }
    return {
        data: parsed && typeof parsed === 'object' ? parsed : {},
        body: code.replace(`---${match[1]}---`, ''),
    };
}

/** The first line of a message, so every error is one line. */
export function firstLine(message) {
    return String(message).split('\n')[0].trim();
}
