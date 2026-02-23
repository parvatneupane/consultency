<?php

namespace App\Http\Controllers;

use App\Models\ApplicantDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApplicantDocumentController extends Controller
{
    /**
     * GET /api/applicant-documents
     */
    public function index()
    {
        $data = ApplicantDocument::with('applicant')->get();

        return response()->json([
            'message' => 'Documents fetched successfully',
            'data' => $data
        ], 200);
    }

    /**
     * POST /api/applicant-documents
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicant_id'   => 'required|exists:applicant,id',
            'document_title' => 'required|string|max:255',
            'document'       => 'required|file|mimes:jpg,jpeg,png,pdf',
            'status'         => 'nullable|integer'
        ]);

        // Prevent duplicate document title per applicant
        $exists = ApplicantDocument::where('applicant_id', $request->applicant_id)
            ->where('document_title', $request->document_title)
            ->first();

        if ($exists) {
            return response()->json([
                'message' => 'Document title already exists for this applicant'
            ], 422);
        }

        if ($request->hasFile('document')) {
            $validated['document'] = $request->file('document')
                ->store('applicant/documents', 'public');
        }

        Log::info('Applicant Document create', $validated);

        $document = ApplicantDocument::create($validated);

        return response()->json([
            'message' => 'Document created successfully',
            'data' => $document
        ], 201);
    }

    /**
     * GET /api/applicant-documents/{id}
     */
    public function show($id)
    {
        $document = ApplicantDocument::where('id', $id)->first();

        if (!$document) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        return response()->json([
            'data' => $document
        ], 200);
    }

    /**
     * PUT /api/applicant-documents/{id}
     */
    public function update(Request $request, $id)
    {
        $document = ApplicantDocument::where('id', $id)->first();

        if (!$document) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        $validated = $request->validate([
            'document_title' => 'required|string|max:255',
            'document'       => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            'status'         => 'nullable|integer'
        ]);

        // Prevent duplicate title (except current record)
        $exists = ApplicantDocument::where('applicant_id', $document->applicant_id)
            ->where('document_title', $request->document_title)
            ->where('id', '!=', $id)
            ->first();

        if ($exists) {
            return response()->json([
                'message' => 'Document title already exists for this applicant'
            ], 422);
        }

        if ($request->hasFile('document')) {
            $validated['document'] = $request->file('document')
                ->store('applicant/documents', 'public');
        }

        Log::info('Applicant Document update', $validated);

        $document->update($validated);

        return response()->json([
            'message' => 'Document updated successfully',
            'data' => $document
        ], 200);
    }

    /**
     * DELETE /api/applicant-documents/{id}
     */
    public function destroy($id)
    {
        $document = ApplicantDocument::where('id', $id)->first();

        if (!$document) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully'
        ], 200);
    }
}