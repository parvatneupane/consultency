<?php

namespace App\Http\Controllers;

use App\Models\CustomerModel;
use App\Models\EmployeeModel;
use App\Models\User;
use App\Models\Applicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;
        $id = $user->id;

        $currentDate = Carbon::now();
        $currentMonth = $currentDate->month;
        $currentYear = $currentDate->year;

        $lastMonthDate = $currentDate->copy()->subMonth();
        $lastMonth = $lastMonthDate->month;
        $lastMonthYear = $lastMonthDate->year;

        // Month names
        $currentMonthName = $currentDate->format('F');
        $lastMonthName = $lastMonthDate->format('F');

        if (in_array($role, ['admin','superadmin'])) {

            // TOTAL COUNTS
            $customers = CustomerModel::where('status',0)->count();

            $employees = EmployeeModel::count();

            // Applicants = Applicant table + Customers with status=1
            $applicants =CustomerModel::where('status',1)->count();

            // CURRENT MONTH
            $customersThisMonth = CustomerModel::whereMonth('created_at', $currentMonth)
                ->whereYear('created_at', $currentYear)
                ->count();

            $applicantsThisMonth = CustomerModel::where('status',1)
                    ->whereMonth('created_at', $currentMonth)
                    ->whereYear('created_at', $currentYear)
                    ->count();

            // LAST MONTH
            $customersLastMonth = CustomerModel::where('status',0)->whereMonth('created_at', $lastMonth)
                ->whereYear('created_at', $lastMonthYear)
                ->count();

            $applicantsLastMonth = CustomerModel::where('status',1)
                    ->whereMonth('created_at', $lastMonth)
                    ->whereYear('created_at', $lastMonthYear)
                    ->count();

        } elseif ($role === 'branch') {

            // TOTAL COUNTS FOR BRANCH
            $customers = CustomerModel::where('status',0)->where('user_id', $id)->count();
            $employees = EmployeeModel::where('user_id', $id)->count();

            $applicants =CustomerModel::where('status',1)->where('user_id', $id)->count();

            // CURRENT MONTH
            $customersThisMonth = CustomerModel::where('status',0)->where('user_id', $id)
                ->whereMonth('created_at', $currentMonth)
                ->whereYear('created_at', $currentYear)
                ->count();

            $applicantsThisMonth = CustomerModel::where('status',1)
                ->where('user_id', $id)
                ->whereMonth('created_at', $currentMonth)
                ->whereYear('created_at', $currentYear)
                ->count();

            // LAST MONTH
            $customersLastMonth = CustomerModel::where('status',0)->where('user_id', $id)
                ->whereMonth('created_at', $lastMonth)
                ->whereYear('created_at', $lastMonthYear)
                ->count();

            $applicantsLastMonth = CustomerModel::where('status',1)
                ->where('user_id', $id)
                ->whereMonth('created_at', $lastMonth)
                ->whereYear('created_at', $lastMonthYear)
                ->count();

        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ],403);
        }

        return response()->json([
            'Customers' => $customers,
            'Employees' => $employees,
            'Applicants' => $applicants,

            'current_month' => $currentMonthName,
            'last_month' => $lastMonthName,

            'customers_this_month' => $customersThisMonth,
            'customers_increase' => $customersThisMonth - $customersLastMonth,

            'applicants_this_month' => $applicantsThisMonth,
            'applicants_increase' => $applicantsThisMonth - $applicantsLastMonth,

        ],200);
    }

        public function dropouts()
{
    
    $id = Auth::user()->id;
    $role = User::find($id)->role;

    if ($role == "superadmin" || $role == "admin") {

        $data = CustomerModel::with('user')
            ->where('status', 11)
            ->get();

    } elseif ($role == "branch") {

        $data = CustomerModel::with('user')
            ->where('status', 11)
            ->where('user_id', $id)
            ->get();

    } else {
        return response()->json([
            'message' => 'Unauthorized'
        ], 403);
    }

    return response()->json([
        'message' => 'Dropout students fetched successfully',
        'data' => $data
    ], 200);
}
}