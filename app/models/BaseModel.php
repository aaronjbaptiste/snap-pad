<?php

class BaseModel extends Eloquent {
    protected $errors;

    public function validate()
    {
        $validation = Validator::make($this->getAttributes(), static::$rules);

        if ($validation->fails()) {
            $this->errors = $validation->messages();
            return false;
        }

        return true;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}