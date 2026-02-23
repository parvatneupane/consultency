<?php

namespace App\Http\Controllers;

use App\Models\EmployeeModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use function Illuminate\Log\log;

class EmployeeController extends Controller
{
    /**
     * GET /api/employees
     */
    public function index()
    {

        $data = EmployeeModel::with('user')->get();

        return response()->json([
            'message' => 'Employees fetched successfully',
            'data' => $data
        ], 200);
    }

    public function getBranches()
{
  
    $branches = User::select('id', 'name')->get();

    return response()->json([
        'message' => 'Branches fetched successfully',
        'data' => $branches
    ], 200);
}

    /**
     * POST /api/employees
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'address'        => 'required|string|max:255',
            'phone'          => 'required|string|max:20',
            'designation'    => 'required|string|max:255',
            'monthly_salary' => 'required|numeric',
            'remarks'        => 'required|string|max:255',
            'pan_scan'       => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            'document_scan'  => 'nullable|file|mimes:jpg,jpeg,png,pdf',
        ]);

        if ($request->hasFile('pan_scan')) {
            $validated['pan_scan'] = $request->file('pan_scan')
                ->store('employee/pan', 'public');
        }

        if ($request->hasFile('document_scan')) {
            $validated['document_scan'] = $request->file('document_scan')
                ->store('employee/documents', 'public');
        }

        $validated['user_id'] = Auth::id();

        Log::info('Employee create', $validated);

        $employee = EmployeeModel::create($validated);

        return response()->json([
            'message' => 'Employee created successfully',
            'data' => $employee
        ], 201);
    }

 
    public function show($id)
    {
        $employee = EmployeeModel::get()->where('id', $id)->first();

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

       return response()->json([
                                    'data' => $employee
                                ], 200);

    }

    /**
     * PUT /api/employees/{id}
     */
    public function update(Request $request, $id)
    {

    Log::info($request->all());
        $employee = EmployeeModel::where('id', $id)
            ->first();
            Log::info($employee);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'address'        => 'required|string|max:255',
            'phone'          => 'required|string|max:20',
            'designation'    => 'required|string|max:255',
            'monthly_salary' => 'required|numeric',
            'remarks'        => 'required|string|max:255',
            'pan_scan'       => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            'document_scan'  => 'nullable|file|mimes:jpg,jpeg,png,pdf',
        ]);

        if ($request->hasFile('pan_scan')) {
            $validated['pan_scan'] = $request->file('pan_scan')
                ->store('employee/pan', 'public');
        }

        if ($request->hasFile('document_scan')) {
            $validated['document_scan'] = $request->file('document_scan')
                ->store('employee/documents', 'public');
        }
   
        $employee->update($validated);


        return response()->json([
            'message' => 'Employee updated successfully',
            'data' => $employee
        ], 200);
    }

    /**
     * DELETE /api/employees/{id}
     */
    public function destroy($id)
    {
        $employee = EmployeeModel::where('id', $id)
                       ->first();

        if (!$employee) {
            return response()->json(['message' => '3Employee not found'], 404);
        }

        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully'
        ], 200);
    }

   
}
