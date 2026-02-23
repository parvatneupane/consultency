<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\CustomerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApplicantController extends Controller
{
    //
     public function index()
    {
        $data = CustomerModel::where('status', 1)->with('applicants')->get();
        Log::info($data);
        return response()->json([
            'message' => 'Applicants fetched successfully',
            'data'    => $data]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cus_id'        => 'required|exists:customer,id',
            'applied_city'    => 'required|string|max:255',
            'applied_colllege' => 'required|string|max:255',
            'coe_charge'    => 'required|integer',
            'documentation_charge' => 'required|integer',
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
             'cus_id'        => 'required|exists:customer,id',
            'applied_city'    => 'required|string|max:255',
            'applied_colllege' => 'required|string|max:255',
            'coe_charge'    => 'required|integer',
            'documentation_charge' => 'required|integer',
            'coe_status'    => 'nullable|integer',
            'status'        => 'nullable|integer',
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
