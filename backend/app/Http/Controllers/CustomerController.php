<?php

namespace App\Http\Controllers;

use App\Models\CustomerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
public function index(){
    $id = Auth::user()->id;
    $data = CustomerModel::with('followup')->where('status', 0)->where('user_id',$id)->get();
     return response()->json([
            'message' => 'Customer fetched successfully',
            'data' => $data
        ], 201);
}

    //
    public function store(Request $request)
    {
        // Log::info($request->all());
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => 'required|email|max:255',
            'address'         => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'father_name'    => 'nullable|string|max:255',
            'mother_name'    => 'nullable|string|max:255',
            'father_phone'  => 'nullable|string|max:20',
            'mother_phone'  => 'nullable|string|max:20',
            'gender'         => 'required|string',
            'education'      => 'required|string',
            'course'         => 'required|string',
            'study_time'     => 'required|string',
            'desire_city'    => 'required|string|max:255',
            'referral_type' => 'nullable|string|max:255',
            'referral_name' => 'nullable|string|max:255',
            'referral_phone'=> 'nullable|string|max:20',
            'remarks'        => 'nullable|string',
            'status'         => 'nullable|integer',
        ]);
        Log(Auth::user()->id);

$validated['user_id'] = Auth::user()->id;
        Log::info($validated);

        $customer = CustomerModel::create($validated);

        return response()->json([
            'message' => 'Customer created successfully',
            'data' => $customer
        ], 201);
    }

    // GET /api/customers/{id}
    public function show($id)
    {
        $customer = CustomerModel::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return response()->json($customer, 200);
    }

    public function update(Request $request, $id)
    {
        $customer = CustomerModel::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $validated = $request->validate([
            'name'            => 'sometimes|required|string|max:255',
            'email'           => 'sometimes|required|email|max:255',
            'address'         => 'sometimes|required|string|max:255',
            'phone'           => 'sometimes|required|string|max:20',
            'father_name'    => 'nullable|string|max:255',
            'mother_name'    => 'nullable|string|max:255',
            'father_phone'  => 'nullable|string|max:20',
            'mother_phone'  => 'nullable|string|max:20',
            'gender'         => 'sometimes|required|string',
            'education'      => 'sometimes|required|string',
            'course'         => 'sometimes|required|string',
            'study_time'     => 'sometimes|required|string',
            'desire_city'    => 'sometimes|required|string|max:255',
            'referral_type' => 'nullable|string|max:255',
            'referral_name' => 'nullable|string|max:255',
            'referral_phone'=> 'nullable|string|max:20',
            'remarks'        => 'nullable|string',
            'status'         => 'nullable|integer',
        ]);

        $customer->update($validated);

        return response()->json([
            'message' => 'Customer updated successfully',
            'data' => $customer
        ], 200);
    }

    // DELETE /api/customers/{id}
    public function destroy($id)
    {
        $customer = CustomerModel::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully'
        ], 200);
    }
}
