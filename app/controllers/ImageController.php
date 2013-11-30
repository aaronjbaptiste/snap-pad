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
		return View::make('image', compact('image'));
	}

	public function store()
	{

		$image = Image::addNew(Input::file('image'));

		if ($image) {
			return Redirect::action('ImageController@show', array($image->hash));	
		}

		return Redirect::home();
	}

	public function update($id)
	{
		//fixme anyone can currently update any image by guessing id
		Image::updatePaper($id, Input::get('paper'));
	}

	public function destroy($id)
	{
		//fixme anyone can currently delete any image by guessing id
		Image::deleteById($id);
	}

}