<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // For testing purposes, we'll accept any valid email/password
        return response()->json([
            'token' => 'dummy_token_' . time()
        ]);
    }
}
