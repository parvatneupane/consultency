<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;
use App\Models\EmployeeModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class SalaryController extends Controller
{
    //
    public function index(){
   
    }

public function store(Request $request)
{
    try {

        $validated = $request->validate([
            'emp_id'  => 'required|exists:employees,id',
            'amount'  => 'required|numeric|min:0',
            'date'    => 'required|date',
            'remarks' => 'nullable|string',
            'slip'    => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $slipPath = null;

        if ($request->hasFile('slip')) {
            $slipPath = $request->file('slip')
                ->store('salary_slips', 'public');
        }

      
        $salary = Salary::create([
            'emp_id'  => $validated['emp_id'],
            'amount'  => $validated['amount'],
            'date'    => $validated['date'],
            'remarks' => $validated['remarks'] ?? null,
            'slip'    => $slipPath,
            'status'  => 0, 
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Salary created successfully',
            'data'    => $salary
        ], 201);

    } catch (ValidationException $e) {

        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors'  => $e->errors(),
        ], 422);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'error'   => $e->getMessage(),
        ], 500);
    }
}



public function history(Request $request, $emp_id)
  {
    try {

        $employee = EmployeeModel::find($emp_id);

        if (!$employee) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found'
            ], 404);
        }

        $perPage = $request->get('per_page', 5);

      
        $salaries = Salary::where('emp_id', $emp_id)
            ->orderBy('date', 'desc')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Salary history fetched successfully',
            'data' => $salaries
        ], 200);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'error'   => $e->getMessage()
        ], 500);
    }
}



}
