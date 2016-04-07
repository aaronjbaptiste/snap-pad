<?php

class Image extends BaseModel {

    protected $table = 'image';
    protected static $rules = [
        'originalName' => 'required',
        'fileName'     => 'required',
        'path'         => 'required',
    ];
    protected $fillable = ['originalName', 'fileName', 'path'];

    public static function boot()
    {
        parent::boot();

        static::created(function($image) {
            $image->hash = Hashids::encode($image->id);
            $image->save();
        });

        static::saving(function($image) {
            return $image->validate();
        });
    }

    protected function setOriginalNameAttribute($value)
    {
        $this->attributes['originalName'] = htmlentities($value);
    }

    public static function addNew($file)
    {
        if (Input::hasFile('image'))
        {
            //todo duplicate code with local path etc (see update)
            $localPath = "/uploaded/imgs/";
            $destination = public_path() . $localPath;
            $fileName = uniqid("img");
            
            $image = new Image;
            $image->originalName = $file->getClientOriginalName();
            $image->fileName = $fileName;
            $image->path = $localPath . $fileName;

            list($width, $height) = getimagesize($file->getRealPath());

            $image->width = $width;
            $image->height = $height;

            if ($image->save()) {
                $file->move($destination, $fileName);
                return $image;
            }
        }

        return false;
    }

    public static function deleteByHash($hash)
    {
        $image = static::whereHash($hash)->firstOrFail();

        if (isset($image->paper)) {
            $paperPath = public_path() . $image->paper;
            unlink($paperPath);
        }

        $imagePath = public_path() . $image->path;
        unlink($imagePath);

        //delete threads and comments too

        $image->delete();
    }

    public static function byHash($hash)
    {
        $image = static::select('id', 'hash', 'width', 'height', 'path', 'paper')->whereHash($hash)->with("threads", "threads.comments")->first();

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
                $image->paperJson = json_decode( file_get_contents($paperPath) );
            }
        } else {
            //Starter template
            $image->paperJson = '[{"type":"Image","src":"' . $image->path . '","width":' . $image->width .',"height":' . $image->height .'}]';
            $image->paperJson = json_decode($image->paperJson);
        }
        
        return $image;
    }

    public static function savePaper($hash, $paper)
    {
        $localPath = "/uploaded/paper/";
        $destination = public_path() . $localPath;
        $fileName = uniqid("pap");

        //todo review security implications
        //of using paper as it was sent.
        //perhaps use htmlentities?
        file_put_contents($destination . $fileName, $paper);

        $image = static::whereHash($hash)->firstOrFail();
        $image->paper = $localPath . $fileName;
        $image->save();
    }

    public function threads() {
        return $this->hasMany('Thread');
    }

}