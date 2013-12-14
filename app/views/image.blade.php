@extends('master')

@section('toolbar')
    <ul id="toolbar">
        <button type="button" class="drawCircle btn btn-default">Circle</button>
        <button type="button" class="drawSquare btn btn-default">Square</button>
        <button type="button" class="drawFree btn btn-default">Free</button>
        <button type="button" class="drawArrow btn btn-default">Arrow</button>
        <button type="button" class="save btn btn-default">Save</button>
        <button type="button" class="export btn btn-default">Export</button>
        <button type="button" class="delete btn btn-danger">Delete</button>
    </ul>
@stop

@section('content')
    <div id="drawing-board"></div>
@stop

@section('scripts')
    <!--[if lt IE 9]>
    <script type="text/javascript" src="/js/vendor/flashcanvas/flashcanvas.js"></script>
    <![endif]-->
    <script src="/js/vendor/flashcanvas/bin/canvas2png.js"></script>
    <script src="/js/vendor/canvg/rgbcolor.js"></script> 
    <script src="/js/vendor/canvg/StackBlur.js"></script>
    <script src="/js/vendor/canvg/canvg.js"></script> 

    <script>
      var require = {
        config: {
          'views/views': {
            'image' : {{ $image }}
          }
        }
      };
    </script>
    <script data-main="/js/main.js" src="/js/vendor/requirejs/require.js"></script>
@stop