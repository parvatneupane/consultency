<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicantCOE;
use Illuminate\Support\Facades\Storage;

class ApplicantCOEController extends Controller
{
    
    /**
     * Store COE (Accepted or Rejected)
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'applicant_id' => 'required|exists:applicant,id',
            'status' => 'required|in:0,1',
        ]);

        $data = [
            'applicant_id' => $request->applicant_id,
            'status' => $request->status,
        ];

        // REJECTED COE
        if ($request->status == 0) {

            $request->validate([
                'remarks' => 'nullable|string',
                'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png'
            ]);

            if ($request->hasFile('document')) {
                $file = $request->file('document');
                $path = $file->store('coe_documents', 'public');
                $data['document'] = $path;
            }

            $data['remarks'] = $request->remarks;
        }

        // ACCEPTED COE
        if ($request->status == 1) {

            $request->validate([
                'joined_school' => 'nullable|string',
                'subject' => 'nullable|string',
                'city' => 'nullable|string',
            ]);

            $data['joined_school'] = $request->joined_school;
            $data['subject'] = $request->subject;
            $data['city'] = $request->city;
        }
   
        $coe = ApplicantCOE::create($data);

        return response()->json([
            'message' => 'COE status saved successfully',
            'data' => $coe
        ]);
    }


    /**
     * Show COE by applicant
     */
    public function show($applicant_id)
    {
        $coe = ApplicantCOE::where('applicant_id', $applicant_id)->first();

        if (!$coe) {
            return response()->json([
                'message' => 'COE record not found'
            ], 404);
        }

        return response()->json([
            'message' => 'COE fetched successfully',
            'data' => $coe
        ]);
    }
}