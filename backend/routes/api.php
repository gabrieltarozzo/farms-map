<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FarmController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui você registra todas as rotas da API. Estas rotas são carregadas pelo
| RouteServiceProvider e são agrupadas no grupo "api".
|
*/

Route::get('/ping', fn () => ['ok' => true]);

// Fazendas
Route::get('/farms', [FarmController::class, 'index']);
Route::get('/farms/{farm}', [FarmController::class, 'show'])->whereNumber('farm');
Route::post('/farms', [FarmController::class, 'store']);