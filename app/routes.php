<?php

Route::get('image', 
    ['as' => 'image', 'uses' => 'ImageController@index']);

Route::get('image/{hash}', 
    ['as' => 'image.show', 'uses' => 'ImageController@show']);

Route::post('image', 
    ['as' => 'image.store', 'uses' => 'ImageController@store']);

Route::put('image/{hash}', 
    ['as' => 'image.update', 'uses' => 'ImageController@update']);

Route::delete('image/{hash}', 
    ['as' => 'image.delete', 'uses' => 'ImageController@destroy']);


Route::get('/', 
    ['as' => 'home', 'uses' => 'HomeController@index']);

Route::get('/{hash}', 
    ['as' => 'home.show', 'uses' => 'HomeController@show']);