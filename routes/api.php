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

Route::post('user/login', 'API\UserController@login');
Route::post('user/register', 'API\UserController@register');

Route::group(['middleware' => ['auth:api', 'isAdminOrSelf']], function(){
    Route::post('user/details', 'API\UserController@details');
    Route::post('user/logout', 'API\UserController@logout');
});


//products mangement routes with only access for admin
Route::group(['middleware' => ['auth:api', 'isAdmin']], function(){
    Route::post('products', 'API\ProductController@store');
    Route::put('products/{id}', 'API\ProductController@update');
    Route::delete('products/{id}', 'API\ProductController@destroy');
});

//public product routes
Route::get('products', 'API\ProductController@index');
Route::post('products/{id}', 'API\ProductController@show');
