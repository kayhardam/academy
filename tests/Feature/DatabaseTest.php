<?php

use Illuminate\Support\Facades\DB;

test('the tests run on PostgreSQL 18', function () {
    expect(DB::connection()->getDriverName())->toBe('pgsql');

    $version = (int) DB::scalar('show server_version_num');

    expect($version)->toBeGreaterThanOrEqual(180000)->toBeLessThan(190000);
});
