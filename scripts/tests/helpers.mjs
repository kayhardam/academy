import { readFileSync } from 'node:fs';
import { after, before } from 'node:test';
import { loadCoachboard } from '../lib/coachboard.mjs';

export const FIXTURES = new URL('./fixtures/', import.meta.url).pathname;

/** A fixture's text, by its path under fixtures/. */
export function fixture(path) {
    return readFileSync(`${FIXTURES}${path}`, 'utf8');
}

/** A fixture with one piece replaced: fails when the piece isn't there, so a test can't pass by accident. */
export function changed(path, from, to) {
    const code = fixture(path);
    if (!code.includes(from)) {
        throw new Error(`${path} has no ${JSON.stringify(from)}`);
    }
    return code.replace(from, to);
}

/** The Coachboard's code for the tests in a file: `cb.current` after before(). */
export function useCoachboard() {
    const cb = { current: null };
    before(async () => {
        cb.current = await loadCoachboard();
    });
    after(() => cb.current?.close());
    return cb;
}
