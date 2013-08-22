<?php

class ImageController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return View::make('landing');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$filename = '';
		if (Input::hasFile('image'))
		{
		    $file = Input::file('image');
		    $filename = $file->getClientOriginalName();
		    
		    DB::insert('insert into images (id, fileName, originalName, extension) values (?, ?, ?, ?)', array(null, $filename, $filename, null));

		    //fixme this is temporary
		    $id = DB::getPdo()->lastInsertId();


		    //fixme, the app key doens't seem to make the url very random
		    $hash = self::alphaID($id, false, 6, Config::get('app.key'));
		    $file->move(base_path() . "/public/uploaded", $filename);
		}
		return Redirect::action('ImageController@show', array($hash));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($hash)
	{
		$id = self::alphaID($hash, true, 6, Config::get('app.key'));
		$results = DB::select('select * from images where id = ?', array($id));
		$fileName = $results[0]->fileName;

		$hash = self::alphaID($id, false, 6, Config::get('app.key'));

		$jsonFile = base_path() . "/public/uploaded/" . $hash . ".json";
		$paperJson = "{}";

		if(file_exists($jsonFile)) {
			$paperJson = file_get_contents($jsonFile);
		}

		$paperJson = json_encode($paperJson);


		return View::make('landing', array("image" => "/uploaded/$fileName", "imageId" => $id, "json" => $paperJson));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$hash = self::alphaID($id, false, 6, Config::get('app.key'));
		file_put_contents(base_path() . "/public/uploaded/" . $hash . ".json", Request::getContent());
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	/*
	 * @author	Kevin van Zonneveld <kevin@vanzonneveld.net>
	 * @author	Simon Franz
	 * @author	Deadfish
	 * @copyright 2008 Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 * @license   http://www.opensource.org/licenses/bsd-license.php New BSD Licence
	 * @version   SVN: Release: $Id: alphaID.inc.php 344 2009-06-10 17:43:59Z kevin $
	 * @link	  http://kevin.vanzonneveld.net/
	 *
	 * @param mixed   $in	  String or long input to translate
	 * @param boolean $to_num  Reverses translation when true
	 * @param mixed   $pad_up  Number or boolean padds the result up to a specified length
	 * @param string  $passKey Supplying a password makes it harder to calculate the original ID
	 *
	 * @return mixed string or long
	 */
	public static function alphaID($in, $to_num = false, $pad_up = false, $passKey = null)
	{
		$index = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if ($passKey !== null) {

			for ($n = 0; $n<strlen($index); $n++) {
				$i[] = substr( $index,$n ,1);
			}

			$passhash = hash('sha256',$passKey);
			$passhash = (strlen($passhash) < strlen($index))
				? hash('sha512',$passKey)
				: $passhash;

			for ($n=0; $n < strlen($index); $n++) {
				$p[] =  substr($passhash, $n ,1);
			}

			array_multisort($p,  SORT_DESC, $i);
			$index = implode($i);
		}

		$base  = strlen($index);

		if ($to_num) {
			// Digital number  <<--  alphabet letter code
			$in  = strrev($in);
			$out = 0;
			$len = strlen($in) - 1;
			for ($t = 0; $t <= $len; $t++) {
				$bcpow = bcpow($base, $len - $t);
				$out   = $out + strpos($index, substr($in, $t, 1)) * $bcpow;
			}

			if (is_numeric($pad_up)) {
				$pad_up--;
				if ($pad_up > 0) {
					$out -= pow($base, $pad_up);
				}
			}
			$out = sprintf('%F', $out);
			$out = substr($out, 0, strpos($out, '.'));
		} else {
			// Digital number  -->>  alphabet letter code
			if (is_numeric($pad_up)) {
				$pad_up--;
				if ($pad_up > 0) {
					$in += pow($base, $pad_up);
				}
			}

			$out = "";
			for ($t = floor(log($in, $base)); $t >= 0; $t--) {
				$bcp = bcpow($base, $t);
				$a   = floor($in / $bcp) % $base;
				$out = $out . substr($index, $a, 1);
				$in  = $in - ($a * $bcp);
			}
			$out = strrev($out); // reverse
		}

		return $out;
	}


}