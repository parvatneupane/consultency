<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminAndAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check login
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthorized. Please login first.'
            ], 401);
        }

        $user = Auth::user();

        // Check role exists
        if (!isset($user->role)) {
            return response()->json([
                'message' => 'User role not defined.'
            ], 403);
        }

        // Allow access only if role is 'superadmin' or 'admin' or 'branch'
        if (!in_array($user->role, ['superadmin','admin'])) {
            return response()->json([
                'message' => 'Forbidden. Admin or Branch access only.'
            ], 403);
        }

        // Proceed if role is allowed
        return $next($request);
    }
}