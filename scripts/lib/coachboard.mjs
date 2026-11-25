// The Coachboard's own code, loaded through Vite like coachboard/scripts/import-link.mjs
// does, so the export checks the items with the same schema and functions as the
// Coachboard's build. Astro is not installed here: the few astro imports those files
// make get the stand-ins below. An import this file doesn't know fails the export, so
// a change in the Coachboard shows up here instead of slipping through.
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../..', import.meta.url));

/** The stand-ins, by import: what the Coachboard's files need from Astro to load. */
const STANDINS = {
    // content.config.ts: defineCollection() keeps the config as it is, so its
    // schema is the one the build uses. reference() is Astro 7.4's own
    // (createReference() in astro/dist/content/runtime.js); like Astro it only
    // shapes the id: checkLibrary() checks that it exists.
    'astro:content': `
        import { z } from 'zod';
        export const defineCollection = (config) => config;
        export function reference(collection) {
            return z
                .union([
                    z.number().transform((num) => num.toString(10)),
                    z.string(),
                    z.object({ id: z.string(), collection: z.string() }),
                    z.object({ slug: z.string(), collection: z.string() }),
                ])
                .transform((lookup, ctx) => {
                    if (typeof lookup === 'object') {
                        if (lookup.collection !== collection) {
                            ctx.addIssue({ code: 'custom', message: 'Reference to ' + collection + ' invalid. Received ' + lookup.collection + '.' });
                            return;
                        }
                        return lookup;
                    }
                    return { id: lookup, collection };
                });
        }`,
    'astro/loaders': `export const glob = (options) => ({ name: 'glob-loader', options });`,
    'astro/zod': `export * from 'zod';`,
    // src/i18n/locales.ts: the locales come from coachboard/astro.config.mjs itself.
    'astro:config/client': `
        import config from '/coachboard/astro.config.mjs';
        export const i18n = config.i18n;`,
    // coachboard/astro.config.mjs: only its i18n is read; the integrations are left out.
    'astro/config': `export const defineConfig = (config) => config;`,
    '@astrojs/sitemap': `export default () => ({ name: '@astrojs/sitemap' });`,
    '@astrojs/svelte': `export default () => ({ name: '@astrojs/svelte' });`,
};

const PREFIX = '\0coachboard-standin:';

/** Resolves the stand-ins, and refuses any other astro import with the way to fix it. */
function standins() {
    return {
        name: 'coachboard-standins',
        enforce: 'pre',
        resolveId(id) {
            if (Object.hasOwn(STANDINS, id)) {
                return PREFIX + id;
            }
            if (/^(astro:|astro\/|@astrojs\/)/.test(id)) {
                throw new Error(
                    `the Coachboard code imports "${id}", which has no stand-in: add one in scripts/lib/coachboard.mjs`,
                );
            }
        },
        load(id) {
            if (id.startsWith(PREFIX)) {
                return STANDINS[id.slice(PREFIX.length)];
            }
        },
    };
}

/**
 * Loads the parts of the Coachboard the export uses. Call close() when done:
 * the Vite server keeps the process alive.
 */
export async function loadCoachboard() {
    const server = await createServer({
        root,
        configFile: false,
        // The nearest tsconfig in coachboard/ extends Astro's, which is not installed here.
        tsconfig: 'tsconfig.json',
        plugins: [standins()],
        // Only modules, no browser: no WebSocket (its port would clash when two
        // exports or test files run at once) and no file watcher.
        server: { middlewareMode: true, hmr: false, ws: false, watch: null },
        appType: 'custom',
        logLevel: 'error',
    });
    try {
        const load = (path) => server.ssrLoadModule(`/coachboard/src/${path}`);
        const [config, library, categories, format, locales] =
            await Promise.all([
                load('content.config.ts'),
                load('lib/library.ts'),
                load('data/categories.ts'),
                load('lib/board/format.ts'),
                load('i18n/locales.ts'),
            ]);
        return {
            schema: config.collections.library.schema,
            checkLibrary: library.checkLibrary,
            checkMeters: library.checkMeters,
            parseId: library.parseId,
            itemPath: library.itemPath,
            DRILL_LISTS: library.DRILL_LISTS,
            AGES: categories.AGES,
            categorySlugs: categories.categorySlugs,
            locales: locales.locales,
            encode: format.encode,
            decode: format.decode,
            sameBoard: format.sameBoard,
            close: () => server.close(),
        };
    } catch (error) {
        await server.close();
        throw error;
    }
}
