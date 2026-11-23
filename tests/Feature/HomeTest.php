<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the root redirects to /nl', function () {
    $this->get('/')->assertRedirect('/nl');
});

test('/nl shows the page Home with a title and a board', function () {
    $this->get('/nl')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->whereType('title', 'string')
            ->has('board.frames'));
});

test('the HTML of /nl says the page is Dutch', function () {
    $this->get('/nl')
        ->assertOk()
        ->assertSee('<html lang="nl"', escape: false);
});

test('the route /nl is named home', function () {
    expect(route('home', absolute: false))->toBe('/nl');
});
