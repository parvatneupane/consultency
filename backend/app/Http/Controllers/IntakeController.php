<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Intake;

class IntakeController extends Controller
{
    // GET all intakes
    public function index()
    {
        $intakes = Intake::latest()->get();

        return response()->json([
            'status' => true,
            'data' => $intakes
        ]);
    }

    // STORE new intake
    public function store(Request $request)
    {
       
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $intake = Intake::create([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Intake created successfully',
            'data' => $intake
        ]);
    }

    // SHOW single intake
    public function show($id)
    {
        $intake = Intake::find($id);

        if (!$intake) {
            return response()->json([
                'status' => false,
                'message' => 'Intake not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $intake
        ]);
    }



    // DELETE intake
    public function destroy($id)
    {
        $intake = Intake::find($id);

        if (!$intake) {
            return response()->json([
                'status' => false,
                'message' => 'Intake not found'
            ], 404);
        }

        $intake->delete();

        return response()->json([
            'status' => true,
            'message' => 'Intake deleted successfully'
        ]);
    }
}