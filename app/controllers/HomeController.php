<?php

class HomeController extends BaseController {

    public function index()
    {
        return View::make('home');
    }

    public function show($hash)
    {
        $image = Image::withPaper($hash);
        return View::make('image', compact('image'));
    }

}