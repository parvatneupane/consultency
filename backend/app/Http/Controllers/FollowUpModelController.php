<?php

namespace App\Http\Controllers;

use App\Models\FollowUpModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FollowUpModelController extends Controller
{

        public function index(Request $request)
        {
            $data = FollowUpModel::where('status', 0)
                ->where('cus_id', $request->cus_id)
                ->orderBy('created_at', 'asc')
                ->get();

            return response()->json([
                'message' => 'FollowUp fetched successfully',
                'data' => $data
            ]);
        }



   public function store(Request $request)
{
    Log::info($request->all());
    // $request->validate(['message' => 'required']);
    $data = FollowUpModel::create([
        'cus_id' => $request->cus_id,
        'message' => $request->message,
    ]);
    return response()->json([
        'message' => 'FollowUp created successfully',
        'data' => $data
    ]);
}


public function update($id, Request $request)
{
    $request->validate([
        'message' => 'required',
    ]);

    $followUpModel = FollowUpModel::find($id);
    if (!$followUpModel) {
        return response()->json([
            'message' => 'FollowUp not found',
        ], 404);
    }

    $followUpModel->update([
        'message' => $request->message
    ]);

    return response()->json([
        'message' => 'FollowUp updated successfully',
        'data' => $followUpModel->fresh()
    ]);
}


    public function destroy($id)
    {
        //
        Log::info($id);
        $followUpModel = FollowUpModel::find($id);
        if (!$followUpModel) {
            return response()->json([
                'message' => 'FollowUp not found',
            ], 404);
        }

        $data = $followUpModel->delete();
        return response()->json([
            'message' => 'FollowUp deleted successfully',
            'data' => $data
        ]);

    }
}
