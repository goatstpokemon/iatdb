<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LendingsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserReviewController;
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

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});


// Public Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// Private User Routes
Route::middleware('auth:sanctum')->prefix('/user')->group(function () {
    Route::get('', [UserController::class, 'index']);
    Route::put('/update', [UserController::class, 'update']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::post('/profile/update', [UserController::class, 'editProfile']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/{id}/edit', [UserController::class, 'editUser']);
    Route::get('/profile/{id}', [UserController::class, 'userProfile']);
    Route::delete('/{id}/delete', [UserController::class, 'destroy']);
});

// Private Product Routes

Route::controller(ProductController::class)->middleware('auth:sanctum')->prefix('/product')->group(function () {
    Route::get('',  'index');
    Route::get('/yours', 'yours');
    Route::get('/category/{category}', 'categoryItems');
    Route::get('/item/{id}', 'show');
    Route::post('/create', 'store');
    Route::post('/item/{id}/update', 'update');
    Route::delete('/item/{id}/delete',  'destroy');
});

// Private Lending Routes
Route::controller(LendingsController::class)->middleware('auth:sanctum')->prefix('/lending')->group(function () {
    Route::get('',  'index');
    Route::get('/requests', 'lendingRequests');
    Route::get('/{id}/accept', 'acceptLendingRequest');
    Route::get('/{id}/reject', 'destroy');
    Route::get('/borrowed', 'getYourLendings');
    Route::get('/lent', 'currentlyLentOut');
    Route::get('/returns/{id}/return', 'returnProduct');
    // Route::get('/{id}', 'show');
    Route::post('/create', 'store');
    Route::post('/{id}/update', 'update');
    Route::delete('/{id}/delete',  'destroy');
});
Route::controller(CategoryController::class)->middleware('auth:sanctum')->prefix('/categories')->group(function () {
    Route::get('',  'index');
    Route::get('/category/{id}', 'show');
    Route::post('/add', 'store');
    Route::post('/{id}/edit', 'edit');
    Route::post('/{id}/delete', 'destroy');
});
// Private Review Routes
Route::controller(UserReviewController::class)->middleware('auth:sanctum')->prefix('/review')->group(function () {
    Route::get('',  'index');
    Route::post('/create', 'addReview');
    Route::get('/{id}', 'show');
    Route::get('/{id}/request', 'requestReview');
    Route::post('/{id}/edit', 'update');
    Route::delete('/{id}/delete',  'destroy');
});
