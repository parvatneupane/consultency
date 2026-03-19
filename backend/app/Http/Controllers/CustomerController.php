<?php

namespace App\Http\Controllers;

use App\Models\CustomerModel;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
public function index(){
    $id = Auth::user()->id;

    $role = User::find($id)->role;
    // Log::info($role);
    if ($role == "superadmin" || $role =="admin"){
    $data = CustomerModel::with('followup','user')->where('status', 0)->get();
     return response()->json([
            'message' => 'Customer fetched successffrully',
            'data' => $data
                 ], 201);
             }
             elseif ($role == "branch"){
             $data = CustomerModel::with('followup','user')->where('status', 0)->where('user_id',$id)->get();
                 return response()->json([
                     'message' => 'Customer fetched successfully',
                     'data' => $data
                     ], 201);
            }else{
            return response()->json([
            'message' => 'Customer fetched successfully',
        ], 201);
}}

    //
    public function store(Request $request)
    {
        // Log::info($request->all());
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => 'nullable|email|max:255',
            'address'         => 'nullable|string|max:255',
            'phone'           => 'nullable|string|max:20',
            'father_name'    => 'nullable|string|max:255',
            'mother_name'    => 'nullable|string|max:255',
            'father_phone'  => 'nullable|string|max:20',
            'mother_phone'  => 'nullable|string|max:20',
            'gender'         => 'nullable|string',
            'education'      => 'nullable|string',
            'course'         => 'nullable|string',
            'study_time'     => 'nullable|string',
            'desire_city'    => 'nullable|string|max:255',
            'referral_type' => 'nullable|string|max:255',
            'referral_name' => 'nullable|string|max:255',
            'referral_phone'=> 'nullable|string|max:20',
            'remarks'        => 'nullable|string',
            'status'         => 'nullable|integer',
        ]);
        Log(Auth::user()->id);

            $validated['user_id'] = Auth::user()->id;
        

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
            'email'           => 'nullable|email|max:255',
            'address'         => 'nullable|string|max:255',
            'phone'           => 'nullable|string|max:20',
            'father_name'    => 'nullable|string|max:255',
            'mother_name'    => 'nullable|string|max:255',
            'father_phone'  => 'nullable|string|max:20',
            'mother_phone'  => 'nullable|string|max:20',
            'gender'         => 'nullable|string',
            'education'      => 'nullable|string',
            'course'         => 'nullable|string',
            'study_time'     => 'nullable|string',
            'desire_city'    => 'nullable|string|max:255',
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
        $customer = CustomerModel::where('id', $id)
                       ->first();

        if (!$customer) {
            return response()->json(['message' => 'customer not found'], 404);
        }

        $customer->delete();

        return response()->json([
            'message' => 'customer deleted successfully'
        ], 200);
    }

     public function approveToApplicant($id)
    {
        $data = CustomerModel::find($id);

        if (!$data) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        $data->update(['status' => 1]);
                

        return response()->json([
            'message' => 'Customer approved successfully',
            'data' => $data
        ], 200);
    }
   public function convertToDropout(Request $request, $id)
{
    $data = CustomerModel::find($id);

    if (!$data) {
        return response()->json(['message' => 'customer not found'], 404);
    }

    // Update status and remarks
    $data->update([
        'status' => 11,
        'remarks' => $request->input('remarks') // get remarks from request
    ]);

    return response()->json([
        'message' => 'Customer dropout successfully',
        'data' => $data
    ], 200);
}
     public function convertToCustomer($id)
    {
        $data = CustomerModel::find($id);

        if (!$data) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        $data->update(['status' => 0]);
                

        return response()->json([
            'message' => 'Customer converted successfully',
            'data' => $data
        ], 200);
    }



}
