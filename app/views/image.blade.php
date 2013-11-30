@extends('master')

@section('toolbar')
    <ul id="toolbar">
        <button type="button" class="draw btn btn-default">Draw</button>
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
    <script src="/js/vendor/raphael/raphael.js"></script>
    <script src="/js/vendor/raphael.JSON/raphael.json.js"></script>
    <script src="/js/vendor/raphael.Export/raphael.export.js"></script>
    <script src="/js/vendor/canvg/rgbcolor.js"></script> 
    <script src="/js/vendor/canvg/StackBlur.js"></script>
    <script src="/js/vendor/canvg/canvg.js"></script> 

    <script>
      var require = {
        config: {
          'views/app': {
            'image' : {{ $image }}
          }
        }
      };
    </script>
    <script data-main="/js/main.js" src="/js/vendor/requirejs/require.js"></script>
@stop