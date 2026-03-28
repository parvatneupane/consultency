<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ApplicantDocumentController;
use App\Http\Controllers\ApplicantCOEController;
use App\Http\Controllers\IntakeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FollowUpModelController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\UserManagementController;





Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'registration']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);    
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::prefix('dashboard')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
Route::get('/', [DashboardController::class, 'index']);
 Route::get('/dropouts', [DashboardController::class, 'dropouts']);
});
// customer Api
Route::prefix('customers')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
    Route::get('/', [CustomerController::class, 'index']);   
    Route::post('/', [CustomerController::class, 'store']); 
    Route::get('/{id}', [CustomerController::class, 'show']); 
    Route::put('/{id}', [CustomerController::class, 'update']); // Update customer
   
    Route::post('/approve-to-applicant/{id}', [CustomerController::class, 'approveToApplicant']);
    Route::post('/convert-to-dropout/{id}', [CustomerController::class, 'convertToDropout']);
    Route::post('/convert-to-customer/{id}', [CustomerController::class, 'convertToCustomer']);
   
});
Route::prefix('customers')->middleware(['auth:sanctum', 'superadminoradmin'])->group(function () {
 Route::delete('/{id}', [CustomerController::class, 'destroy']); // Delete customer
});
// employee Api
Route::prefix('employees')->middleware(['auth:sanctum', 'superadminoradmin'])->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);   
    Route::post('/', [EmployeeController::class, 'store']); 
    Route::get('/edit/{id}', [EmployeeController::class, 'show']); 
    Route::put('/{id}', [EmployeeController::class, 'update']); // Update customer
    Route::delete('/{id}', [EmployeeController::class, 'destroy']); // Delete customer
    Route::get('/branches', [EmployeeController::class, 'getBranches']);

});


Route::prefix('followup')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
Route::get('/', [FollowUpModelController::class, 'index']);
Route::post('/', [FollowUpModelController::class, 'store']);
Route::put('/{id}', [FollowUpModelController::class, 'update']);
Route::delete('/{id}', [FollowUpModelController::class, 'destroy']);
});

Route::prefix('applicant')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
 Route::get('/', [ApplicantController::class, 'index']);
Route::post('/', [ApplicantController::class, 'store']);
Route::put('/{id}', [ApplicantController::class, 'update']);
Route::delete('/{id}', [ApplicantController::class, 'destroy']);
});
Route::prefix('intakes')->middleware(['auth:sanctum', 'superadminoradmin'])->group(function () {
Route::post('/', [IntakeController::class, 'store']);
Route::delete('/{id}', [IntakeController::class, 'destroy']);
});

Route::prefix('intakes')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
Route::get('/', [IntakeController::class, 'index']);
Route::get('/{id}', [IntakeController::class, 'show']);
  });  

Route::prefix('document')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
 Route::get('/applicant/{id}', [ApplicantDocumentController::class, 'byApplicant']);
    Route::post('/', [ApplicantDocumentController::class, 'store']);
    Route::get('/download/{id}', [ApplicantDocumentController::class, 'download']);
    Route::delete('/{id}', [ApplicantDocumentController::class, 'destroy']);

});
Route::prefix('coe')->middleware(['auth:sanctum', 'superadminoradminorbranch'])->group(function () {
Route::post('/store', [ApplicantCOEController::class, 'store']);
Route::get('/{applicant_id}', [ApplicantCOEController::class, 'show']);
});
Route::prefix('salary')->middleware(['auth:sanctum', 'superadminoradmin'])->group(function () {
    Route::post('/', [SalaryController::class, 'store']);
    Route::get('/{emp_id}', [SalaryController::class, 'history']); 
});

Route::prefix('users')->middleware(['auth:sanctum', 'superadmin'])->group(function () {
 Route::get('/',[UserManagementController::class,'index']);

    Route::post('/',[UserManagementController::class,'store']);

    Route::get('/{id}',[UserManagementController::class,'show']);

    Route::put('/{id}',[UserManagementController::class,'update']);

    Route::delete('/{id}',[UserManagementController::class,'destroy']);
});


