<?php

use App\Http\Controllers\ApplicantController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FollowUpModelController;
use App\Http\Controllers\SalaryController;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'registration']);

// customer Api
Route::prefix('customers')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/', [CustomerController::class, 'index']);   
    Route::post('/', [CustomerController::class, 'store']); 
    Route::get('/{id}', [CustomerController::class, 'show']); 
    Route::put('/{id}', [CustomerController::class, 'update']); // Update customer
    Route::delete('/{id}', [CustomerController::class, 'destroy']); // Delete customer
     Route::post('/approve-to-applicant/{id}', [CustomerController::class, 'approveToApplicant']);

});

// employee Api
Route::prefix('employees')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);   
    Route::post('/', [EmployeeController::class, 'store']); 
     Route::get('/edit/{id}', [EmployeeController::class, 'show']); 
    Route::put('/{id}', [EmployeeController::class, 'update']); // Update customer
    Route::delete('/{id}', [EmployeeController::class, 'destroy']); // Delete customer
    Route::get('/branches', [EmployeeController::class, 'getBranches']);

});


Route::prefix('followup')->middleware(['auth:sanctum', 'admin'])->group(function () {
 Route::get('/', [FollowUpModelController::class, 'index']);
Route::post('/', [FollowUpModelController::class, 'store']);
Route::put('/{id}', [FollowUpModelController::class, 'update']);
Route::delete('/{id}', [FollowUpModelController::class, 'destroy']);
});

Route::prefix('applicant')->middleware(['auth:sanctum', 'admin'])->group(function () {
 Route::get('/', [ApplicantController::class, 'index']);
Route::post('/', [ApplicantController::class, 'store']);
Route::put('/{id}', [ApplicantController::class, 'update']);
Route::delete('/{id}', [ApplicantController::class, 'destroy']);
});
Route::prefix('salary')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/', [SalaryController::class, 'store']);
    Route::get('/{emp_id}', [SalaryController::class, 'history']); 
});





