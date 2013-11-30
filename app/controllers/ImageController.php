<?php

class ImageController extends BaseController {

	public function index()
	{
		return Redirect::home();
	}

	public function show($hash)
	{
		$id = Hashids::decrypt($hash)[0];

		$image = Image::findOrFail($id);
		$paperPath = public_path() . $image->paper;
		$paperJson = "{}";

		if(file_exists($paperPath)) {
			$paperJson = file_get_contents($paperPath);
		}

		return View::make('image', array(
			'image' => $image, 
			'paperJson' => json_encode($paperJson)
		));
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

		    $url = Hashids::encrypt($image->id);

		    return Redirect::action('ImageController@show', array($url));
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