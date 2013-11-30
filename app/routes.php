<?php

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);

Route::get('image', 'ImageController@index');

Route::get('image/{hash}', 'ImageController@show');

Route::post('image', ['as' => 'image.store', 'uses' => 'ImageController@store']);

Route::patch('image/{id}', 'ImageController@update')->where('id', '\d+');

Route::delete('image/{id}', 'ImageController@destroy')->where('id', '\d+');