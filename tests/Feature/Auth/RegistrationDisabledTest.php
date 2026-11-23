<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

// Registration is off until step 5. The routes are gone, so these tests use the paths.

test('the registration routes do not exist', function () {
    expect(Route::has('register'))->toBeFalse();
    expect(Route::has('register.store'))->toBeFalse();
});

test('the registration screen cannot be opened', function () {
    $this->get('/register')->assertNotFound();
});

test('nobody can register', function () {
    $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertNotFound();

    $this->assertGuest();
    expect(User::count())->toBe(0);
});
