<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


Route::get('/admin', function () {
    return view('admin');
});

Route::get('/candidat', function () {
    return view('candidat');
});

