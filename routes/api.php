<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::group(['namespace' => 'Api'], function () {
    Route::group(['prefix' => 'notes'], function () {
        Route::get('/', 'NotesController@index')->name('api.notes.load');
        Route::post('/', 'NotesController@store')->name('api.notes.store');
        Route::put('/{note}', 'NotesController@update')->name('api.notes.update');
        Route::delete('/{note}', 'NotesController@destroy')->name('api.notes.destroy');
    });
});
