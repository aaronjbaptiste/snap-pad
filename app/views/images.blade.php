@extends('master')

@section('content')

    <div class="container">
        <h1>All Images</h1>
        <ul class="list-group">
            @foreach ($images as $image)
                <li class = "list-group-item">{{ link_to("image/{$image->hash}", $image->hash) }}</li>
            @endforeach
        </ul> 
    </div>

@stop