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

Route::post('flashcanvas/save', function()
{
	//TODO redo in laravel terms
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Force download
        $type = 'application/octet-stream';

        //TODO set to filename
        $dis = 'attachment; filename="SnappadExport.png"';

        if (isset($_POST['dataurl'])) {
            // Decode the base64-encoded data
            $data = $_POST['dataurl'];
            $data = substr($data, strpos($data, ',') + 1);
            $data = base64_decode($data);
        } else {
            // Output the raw data
            $data = readfile('php://input');
        }

        $response = Response::make($data, 200);
        $response->header('Content-Type', $type);
        $response->header('Content-Disposition', $dis);
        return $response;
    }
});

// Route::get('thread', 
//     ['as' => 'thread', 'uses' => 'ThreadController@index']);

// Route::get('thread/{id}', 
//     ['as' => 'thread.show', 'uses' => 'ThreadController@show']);

Route::post('thread', 
    ['as' => 'thread.store', 'uses' => 'ThreadController@store']);

// Route::put('thread/{id}', 
//     ['as' => 'thread.update', 'uses' => 'ThreadController@update']);

// Route::delete('thread/{id}', 
//     ['as' => 'thread.delete', 'uses' => 'ThreadController@destroy']);


Route::post('comment', 
    ['as' => 'comment.store', 'uses' => 'CommentController@store']);

// Route::put('comment/{id}', 
//     ['as' => 'comment.update', 'uses' => 'CommentController@update']);

// Route::delete('comment/{id}', 
//     ['as' => 'comment.delete', 'uses' => 'CommentController@destroy']);


Route::get('/', 
    ['as' => 'home', 'uses' => 'HomeController@index']);

Route::get('/{hash}', 
    ['as' => 'home.show', 'uses' => 'HomeController@show']);