<?php

class Comment extends Eloquent {
    protected $table = 'comment';
	protected $guarded = array();

    public function thread() {
        return $this->belongsTo('Thread');
    }
}
