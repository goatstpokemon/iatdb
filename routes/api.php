<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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
    Route::get('', [UserController::class, 'index']);
    Route::put('/update', [UserController::class, 'update']);
    Route::delete('{id}/delete', [UserController::class, 'destroy']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::post('/profile/update', [UserController::class, 'editProfile']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::get('profile/{id}', [UserController::class, 'userProfile']);
});

// Private Product Routes

Route::controller(ProductController::class)->middleware('auth:sanctum')->prefix('/product')->group(function () {
    Route::get('',  'index');
    Route::get('/yours', 'yours');
    Route::get('/category/{category}', 'categoryItems'); // Change the route URL to include '/category'
    Route::get('/item/{id}', 'show'); // Change the route URL to include '/item'
    Route::post('/create', 'store');
    Route::post('/item/{id}/update', 'update');
    Route::delete('/item/{id}/delete',  'destroy');
});

// Private Lending Routes
Route::controller(LendingController::class)->middleware('auth:sanctum')->prefix('/lending')->group(function () {
    Route::get('',  'index');
    Route::get('/yours', 'yours');
    Route::get('/category/{category}', 'categoryItems'); // Change the route URL to include '/category'
    Route::get('/item/{id}', 'show'); // Change the route URL to include '/item'
    Route::post('/create', 'store');
    Route::post('/item/{id}/update', 'update');
    Route::delete('/item/{id}/delete',  'destroy');
});
// Private Borrowing Routes

// Private Review Routes
