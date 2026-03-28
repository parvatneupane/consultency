<?php

namespace App\Http\Controllers;

use App\Models\ApplicantDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicantDocumentController extends Controller
{
    // Get documents by applicant
 public function byApplicant($id)
{
    $documents = ApplicantDocument::where('applicant_id', $id)->get()->map(function ($doc) {
        $doc->document_url = $doc->document ? asset('storage/' . $doc->document) : null;
        return $doc;
    });

    return response()->json([
        'data' => $documents
    ], 200);
}

    // Store document
    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicant_id'   => 'required|exists:applicant,id',
            'document_title' => 'required|string|max:255',
            'document'       => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'status'         => 'nullable|integer'
        ]);

        // Prevent duplicate title per applicant
        $exists = ApplicantDocument::where('applicant_id', $validated['applicant_id'])
            ->where('document_title', $validated['document_title'])
            ->first();

        if ($exists) {
            return response()->json([
                'message' => 'Document title already exists for this applicant'
            ], 422);
        }

        // Store file
        if ($request->hasFile('document')) {
            $validated['document'] = $request->file('document')
                ->store('applicant/documents', 'public');
        }

        $document = ApplicantDocument::create($validated);
        $document->document_url = $document->document ? Storage::url($document->document) : null;

        return response()->json([
            'message' => 'Document created successfully',
            'data' => $document
        ], 201);
    }

    // Delete
    public function destroy($id)
    {
        $document = ApplicantDocument::find($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        // Optionally delete file from storage
        if ($document->document && Storage::disk('public')->exists($document->document)) {
            Storage::disk('public')->delete($document->document);
        }

        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully'
        ], 200);
    }

public function download($id)
{
    $document = ApplicantDocument::find($id);

    if (!$document || !$document->document) {
        return response()->json([
            'message' => 'File not found'
        ], 404);
    }

    $path = storage_path('app/public/' . $document->document);

    if (!file_exists($path)) {
        return response()->json([
            'message' => 'File does not exist'
        ], 404);
    }

    // Get the original extension from stored file
    $extension = pathinfo($path, PATHINFO_EXTENSION);

    // Add extension to the download filename
    $downloadName = $document->document_title;
    if (!str_ends_with($downloadName, '.' . $extension)) {
        $downloadName .= '.' . $extension;
    }

    return response()->download($path, $downloadName);
}
}