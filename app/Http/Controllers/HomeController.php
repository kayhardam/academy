<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $data = File::json(base_path('coachboard/src/lib/board/fixtures/v2-drill.json'));

        return Inertia::render('Home', [
            'title' => $data['board']['title'],
            'board' => $data['board'],
        ]);
    }
}
