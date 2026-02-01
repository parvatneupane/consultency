<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        Log::info($request->all());

        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthorized. Please login first.'
            ], 401);
        }

        if (!isset(Auth::user()->role)) {
            return response()->json([
                'message' => 'User role not defined.'
            ], 403);
        }

        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden. Admin access only.'
            ], 403);
        }

        return $next($request);
    }
}
