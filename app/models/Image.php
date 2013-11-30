<?php

class Image extends Eloquent {

    protected $table = 'images';

    public static function boot()
    {
        parent::boot();

        Image::created(function($image) {
            $image->hash = Hashids::encrypt($image->id);
            $image->save();
        });
    }

}