<?php

use Illuminate\Support\Facades\File;
use Inertia\Ssr\BundleDetector;
use Inertia\Ssr\Gateway;
use Inertia\Ssr\HasHealthCheck;

// When SSR fails, Inertia renders in the browser instead and nothing shows it.
// This test asks the real SSR server for /nl. It is required in CI. Locally it
// is skipped when the SSR server is not running.

test('the server HTML of /nl has the title and the drawing of the first step', function () {
    $gateway = app(Gateway::class);
    $running = $gateway instanceof HasHealthCheck && $gateway->isHealthy();

    if (! $running && ! env('CI')) {
        $this->markTestSkipped(
            'The SSR server is not running. Run "npm run build:ssr" and "php artisan inertia:start-ssr", then run the tests again.'
        );
    }

    expect($running)->toBeTrue('The SSR server is not running. In CI this test is required.');

    // Without a bundle Inertia skips SSR without an error, also with throw_on_error.
    expect(app(BundleDetector::class)->detect())
        ->not->toBeNull('There is no SSR bundle in bootstrap/ssr. Run "npm run build:ssr".');

    // Set here and not in phpunit.xml: for every test it would fail each Inertia
    // page as soon as a bundle exists and the SSR server is not running.
    config(['inertia.ssr.throw_on_error' => true]);

    $title = File::json(base_path('coachboard/src/lib/board/fixtures/v2-drill.json'))['board']['title'];

    $html = $this->withoutExceptionHandling()->get('/nl')->assertOk()->getContent();

    // Inside an <h1>: the title is also in the page props, which are in the HTML without SSR too.
    expect($html)->toMatch('/<h1[^>]*>\s*'.preg_quote($title, '/').'\s*<\/h1>/');

    // viewBox comes before role in the tag, so match the whole tag.
    expect(preg_match('/<svg\b[^>]*\brole="img"[^>]*>/', $html, $svg))
        ->toBe(1, 'The HTML has no <svg> with role="img".');
    expect($svg[0])->toContain('aria-label="Tekening van stap 1"');
});
