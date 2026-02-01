<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'registration']);

// customer Api
Route::prefix('customers')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/', [CustomerController::class, 'index']);   // Get all customers
    Route::post('/', [CustomerController::class, 'store']); // Create customer
    Route::get('/{id}', [CustomerController::class, 'show']); // Get single customer
    Route::put('/{id}', [CustomerController::class, 'update']); // Update customer
    Route::delete('/{id}', [CustomerController::class, 'destroy']); // Delete customer
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
   
});




