<?php

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);

Route::get('image', 'ImageController@index');

Route::get('image/{id}', 'ImageController@show');

Route::post('image', ['as' => 'image.store', 'uses' => 'ImageController@store']);

Route::patch('image/{id}', 'ImageController@update');

Route::delete('image/{id}', 'ImageController@destroy');