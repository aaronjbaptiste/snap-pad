<?php

class ImageController extends BaseController {

	public function index()
	{
		$images = Image::all();
		
		return View::make('images', compact('images'));
		//return Redirect::home();
	}

	public function show($hash)
	{
		$image = Image::where('hash', $hash)->first();

		if (empty($image)) {
			return "Can't find image $hash";
		}

		$paperPath = public_path() . $image->paper;

		if (file_exists($paperPath)) {
			$paperJson = json_encode(file_get_contents($paperPath));
		}

		return View::make('image', compact('image', 'paperJson'));
	}

	public function store()
	{

		if (Input::hasFile('image'))
		{
		    $file = Input::file('image');

		    //move file
		    $localPath = "/uploaded/imgs/";
		    $destination = public_path() . $localPath;
		    $fileName = uniqid("img");
		    $file->move($destination, $fileName);

		    //todo move to model!

		    $image = new Image();
		    $image->originalName = $file->getClientOriginalName();
		    $image->fileName = $fileName;
		    $image->path = $localPath . $fileName;
		  	$image->save();

		    return Redirect::action('ImageController@show', array($image->hash));
		}

		return Redirect::home();
	}

	public function update($id)
	{
		$paper = Input::get('paper');
		$paperString = json_encode($paper);

		$localPath = "/uploaded/paper/";
		$destination = public_path() . $localPath;
		$fileName = uniqid("pap");
		file_put_contents($destination . $fileName, $paperString);

		$image = Image::findOrFail($id);
		$image->paper = $localPath . $fileName;
		$image->save();
	}

	public function destroy($id)
	{
		$image = Image::findOrFail($id);

		if (isset($image->paper)) {
			$paperPath = public_path() . $image->paper;
			unlink($paperPath);
		}

		$imagePath = public_path() . $image->path;
		unlink($imagePath);
		
		$image->delete();
	}

}