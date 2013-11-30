<?php

class Image extends Eloquent {

    protected $table = 'images';
    protected $fillable = ['originalName', 'fileName', 'path'];

    public static function boot()
    {
        parent::boot();

        static::created(function($image) {
            $image->hash = Hashids::encrypt($image->id);
            $image->save();
        });
    }

    public static function addNew($file)
    {
        //todo duplicate code with local path etc (see update)
        $localPath = "/uploaded/imgs/";
        $destination = public_path() . $localPath;
        $fileName = uniqid("img");
        $file->move($destination, $fileName);

        $image = static::create([
            'originalName' => $file->getClientOriginalName(),
            'fileName'     => $fileName,
            'path'         => $localPath . $fileName
        ]);

        return $image;
    }

    public static function deleteById($id)
    {
        $image = static::findOrFail($id);

        if (isset($image->paper)) {
            $paperPath = public_path() . $image->paper;
            unlink($paperPath);
        }

        $imagePath = public_path() . $image->path;
        unlink($imagePath);

        $image->delete();
    }

    public static function byHash($hash)
    {
        $image = static::whereHash($hash)->first();

        if (empty($image)) {
            throw new Illuminate\Database\Eloquent\ModelNotFoundException;
        }

        return $image;
    }

    public static function withPaper($hash)
    {
        $image = static::byHash($hash);

        if (isset($image->paper)) {
            $paperPath = public_path() . $image->paper;
            if (file_exists($paperPath)) {
                $image->paperJson = file_get_contents($paperPath);
            }
        }
        
        return $image;
    }

    public static function updatePaper($id, $paper)
    {
        $localPath = "/uploaded/paper/";
        $destination = public_path() . $localPath;
        $fileName = uniqid("pap");
        file_put_contents($destination . $fileName, $paper);

        $image = static::findOrFail($id);
        $image->paper = $localPath . $fileName;
        $image->save();
    }

}