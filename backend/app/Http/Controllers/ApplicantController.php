<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\CustomerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Log;

class ApplicantController extends Controller
{
    //
public function index()
{
    try {
        $user = Auth::user();
        $role = $user->role;
        $id = $user->id;

        if ($role === 'admin') {
            $data = CustomerModel::where('status', 1)
                ->with('applicants.documents', 'applicants.coe', 'user')
                ->get();
        } elseif ($role === 'branch') {
            $data = CustomerModel::where('status', 1)
                ->where('user_id', $id)
                ->with('applicants.documents', 'applicants.coe', 'user')
                ->get();
        } else {
            $data = collect();
        }
Log::info($data);
        return response()->json([
            'message' => 'Applicants fetched successfully',
            'data'    => $data
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Server Error',
            'error'   => $e->getMessage()
        ], 500);
    }
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cus_id'        => 'nullable|',
            
            'applied_city'    => 'nullable|string|max:255',
            'applied_college' => 'nullable|string|max:255',
             'intake'               => 'nullable|string|max:255',
            'coe_charge'    => 'nullable|integer',
            'documentation_charge' => 'nullable|integer',
            'coe_status'    => 'nullable|integer',
            'status'        => 'nullable|integer',
        ]);

        $applicant = Applicant::create($validated);

        return response()->json([
            'message' => 'Applicant created successfully',
            'data'    => $applicant
        ], 201);
    }


public function update(Request $request, $id)
{
    
    $applicant = Applicant::findOrFail($id);

    $validated = $request->validate([
        'applied_city'         => 'nullable|string|max:255',
        'applied_college'      => 'nullable|string|max:255',
        'intake'               => 'nullable|string|max:255',
        'coe_charge'           => 'nullable|integer',
        'documentation_charge' => 'nullable|integer',
    ]);

    $applicant->update($validated);

    return response()->json([
        'message' => 'Applicant updated successfully',
        'data'    => $applicant
    ]);
}

    public function destroy($id)
    {
        $applicant = Applicant::findOrFail($id);
        if (!$applicant) {
            return response()->json(['message' => 'Applicant not found'], 404);
        }
        $applicant->delete();

        return response()->json([
            'message' => 'Applicant deleted successfully'
        ]);
    }



    
}
