<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return json_encode(['name' => 'nabin',
    'age'=>20,
    'email'=>'7bMl6@example.com']);
});