<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\AuthController;

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Calculator routes
Route::post('/calculator', [CalculatorController::class, 'calculate']);
Route::get('/calculation/{id}', [CalculatorController::class, 'show']);

// For Part 2 - Authentication stub
Route::post('/auth/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    // For testing purposes, we'll accept any valid email/password
    return response()->json([
        'token' => 'dummy_token_' . time()
    ]);
}); 