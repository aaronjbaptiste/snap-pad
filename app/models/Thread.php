<?php

class Thread extends Eloquent {
    protected $table = 'thread';
	protected $guarded = array();

    public function comments() {
        return $this->hasMany('Comment');
    }

    public function image() {
        return $this->belongsTo('Image');
    }
}
