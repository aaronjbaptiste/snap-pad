@extends('master')

@section('toolbar')
    <div id="fixed-header">
      <ul class="toolbar controls">
          <div class="save btn">Saved</div>
          <div class="export btn"></div>
          <div class="delete btn"></div>
      </ul>
      <ul class="toolbar">
          <input type='text' id="color" class="btn" />
          <div class="dropdown stroke">
            <button class="dropdown-toggle sr-only btn" type="button" data-toggle="dropdown">
              <div class="stroke-icon"></div>
              <span class="caret"></span>
            </button>
            
            <ul class="dropdown-menu">
              <li><a role="menuitem" tabindex="-1" data-width="1">1px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="2">2px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="3">3px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="4">4px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="8">8px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="12">12px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="16">16px</a></li>
              <li><a role="menuitem" tabindex="-1" data-width="32">32px</a></li>
            </ul>
          </div>
          <div class="drawCircle btn"></div>
          <div class="drawSquare btn"></div>
          <div class="drawFree btn"></div>
          <div class="drawArrow btn"></div>
          <div class="comment btn"></div>
      </ul>
    </div>
@stop

@section('content')
    <div id="drawing-board">
      <div id="threads"></div>
    </div>
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
      console.log( {{ $image }} );
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