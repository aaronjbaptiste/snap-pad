<?php

class ImageController extends BaseController {

	public function index()
	{
		$images = Image::all();
		return View::make('images', compact('images'));
	}

	public function show($hash)
	{
		$image = Image::withPaper($hash);
		return $image;
	}

	public function store()
	{
		$image = Image::addNew( Input::file('image') );

		if ($image) {
			return Redirect::route('home.show', array($image->hash));	
		}

		return Redirect::home();
	}

	public function update($hash)
	{
		Image::savePaper($hash, json_encode(Input::get('paperJson'), JSON_NUMERIC_CHECK) );
	}

	public function destroy($hash)
	{
		Image::deleteByHash($hash);
		return Response::json("deleted", 204);
	}

}