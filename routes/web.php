<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;


Route::resource('posts', PostController::class)
    ->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy'])
    ->middlewareFor(['store', 'edit', 'update', 'destroy'], 'auth');

Route::resource('posts.comments', CommentController::class)
    ->only(['store']);

Route::resource('comments', CommentController::class)
    ->only(['destroy'])
    ->middlewareFor('destroy', 'auth');

require __DIR__ . '/auth.php';
