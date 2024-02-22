<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate(['email' => 'required', 'password' => 'required']);
        if (!Auth::attempt($credentials)) {
            return ValidationException::withMessages(['email' => [
                __('auth.failed')
            ]]);
        }
        return $request->user();
    }
    public function logout()
    {
        Auth::logout();
    }

    public function signup(Request $request)
    {
        $user = User::create($request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]));
        return $user;
    }
}
