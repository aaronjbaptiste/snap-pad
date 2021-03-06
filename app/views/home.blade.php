@extends('master')

@section('slogan')
    <div class="slogan">Annotate and share images with anyone, for free.</div>
@stop

@section('content')
    <div id="main" class="container">
        {{ Form::open(['route' => 'image.store', 'files' => true, 'class' => 'new-image']) }}

            <div id="drop-area">
                <span>Click to upload an image</span>
            </div>

            {{ Form::file('image', ['id' => 'file-upload-button']) }}
            
        {{ Form::close() }}
    </div>
@stop

@section('scripts')
    <script src="/js/vendor/jquery/jquery.js"></script>
    <script>
        (function($) {
            $('#drop-area').click(function() {
                $('#file-upload-button').click();
            });

            $('#file-upload-button').change(function() {
                $('.new-image').submit();
            });
        })($);
    </script>
@stop