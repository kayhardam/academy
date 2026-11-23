import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const preprocess = vitePreprocess({ script: true });

export default {
    preprocess: {
        ...preprocess,
        // No script step in coachboard/: oxc would read its tsconfig, which extends Astro's (not installed here).
        script: (input) =>
            input.filename?.includes('/coachboard/')
                ? undefined
                : preprocess.script(input),
    },
};
