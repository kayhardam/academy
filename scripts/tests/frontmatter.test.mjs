import assert from 'node:assert/strict';
import { test } from 'node:test';
import { firstLine, parseFrontmatter } from '../lib/frontmatter.mjs';

test('reads the front matter and the body after it', () => {
    const { data, body } = parseFrontmatter(
        '---\ntitle: "Kruisen"\nages: [u10, u12]\n---\n\nUitleg.\n',
    );
    assert.deepEqual(data, { title: 'Kruisen', ages: ['u10', 'u12'] });
    assert.equal(body, '\n\nUitleg.\n');
});

test('a file without front matter has empty data, as in Astro', () => {
    assert.deepEqual(parseFrontmatter('Alleen tekst.\n'), {
        data: {},
        body: 'Alleen tekst.\n',
    });
});

test('reads YAML 1.2 core, as Astro does: yes and no stay text', () => {
    const { data } = parseFrontmatter('---\na: yes\nb: no\nc: 010\n---\n');
    assert.deepEqual(data, { a: 'yes', b: 'no', c: 10 });
});

test('reads merge keys, as Astro does', () => {
    const { data } = parseFrontmatter(
        '---\nbase: &base { x: 1 }\nmore: { <<: *base, y: 2 }\n---\n',
    );
    assert.deepEqual(data.more, { x: 1, y: 2 });
});

test('invalid YAML throws one line', () => {
    assert.throws(
        () => parseFrontmatter('---\ntitle: "open\nages: [u10\n---\n'),
        (error) => !error.message.includes('\n') && error.message.length > 0,
    );
});

test('refuses TOML front matter', () => {
    assert.throws(
        () => parseFrontmatter('+++\ntitle = "Kruisen"\n+++\n'),
        /YAML/,
    );
});

test('firstLine() keeps the first line of a message', () => {
    assert.equal(firstLine('one\ntwo'), 'one');
});
