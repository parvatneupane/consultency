<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthorized. Please login first.'
            ], 401);
        }

        $user = Auth::user();

        if (!$user->role) {
            return response()->json([
                'message' => 'User role not defined.'
            ], 403);
        }

        if ($user->role !== 'superadmin') {
            return response()->json([
                'message' => 'Forbidden. Superadmin access only.'
            ], 403);
        }

        return $next($request);
    }
}