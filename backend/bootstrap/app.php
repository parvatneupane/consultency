<?php

use App\Http\Middleware\AdminOrBranchMiddleware;
use App\Http\Middleware\SuperAdminMiddleware;
use App\Http\Middleware\SuperAdminAndAdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
           $middleware->alias([
            'superadminoradminorbranch' => AdminOrBranchMiddleware::class,
           'superadmin' => SuperAdminMiddleware::class,
           'superadminoradmin' => SuperAdminAndAdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
