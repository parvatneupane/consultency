<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FollowUpModelController;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'registration']);

// customer Api
Route::prefix('customers')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/', [CustomerController::class, 'index']);   
    Route::post('/', [CustomerController::class, 'store']); 
    Route::get('/{id}', [CustomerController::class, 'show']); 
    Route::put('/{id}', [CustomerController::class, 'update']); // Update customer
    Route::delete('/{id}', [CustomerController::class, 'destroy']); // Delete customer
});


Route::prefix('followup')->middleware(['auth:sanctum', 'admin'])->group(function () {
 Route::get('/', [FollowUpModelController::class, 'index']);
Route::post('/', [FollowUpModelController::class, 'store']);
Route::put('/{id}', [FollowUpModelController::class, 'update']);
Route::delete('/{id}', [FollowUpModelController::class, 'destroy']);
});




