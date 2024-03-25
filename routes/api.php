<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



// Public Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// Private User Routes
Route::middleware('auth:sanctum')->prefix('user')->group(function () {
    Route::get('/{id}', [User::class, 'show']);
    Route::put('/update', [User::class, 'update']);
    Route::delete('/delete', [User::class, 'destroy']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [User::class, 'profile']);
    Route::post('/profile/update', [User::class, 'updateProfile']);
});

// Private Product Routes

// Private Lending Routes

// Private Borrowing Routes

// Private Review Routes