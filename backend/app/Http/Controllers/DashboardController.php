<?php

namespace App\Http\Controllers;

use App\Models\CustomerModel;
use App\Models\EmployeeModel;
use App\Models\Applicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;
        $id = $user->id;

        if ($role === 'admin') {
            // Admin sees all counts
            $customers = CustomerModel::count();
            $employees = EmployeeModel::count();
            $applicants = Applicant::count();
        } elseif ($role === 'branch') {
           
            $customers = CustomerModel::where('user_id', $id)->count();
            
            $employees = EmployeeModel::where('user_id', $id)->count();
            
            $applicants = Applicant::where('cus_id', $id)->count();
        } else {
          
            $customers = 0;
            $employees = 0;
            $applicants = 0;
        }

        return response()->json([
            'Customers' => $customers,
            'employees' => $employees,
            'applicants' => $applicants,
        ], 200);
    }
}