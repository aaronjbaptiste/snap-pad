<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Snap Pad</title>

        <link href='http://fonts.googleapis.com/css?family=Lato|Lobster' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <header>
          <span id="name"><a href="/">Snap Pad</a></span>
          <div id="slogan">Share and annotate images with anyone, <wbr>in real-time, for free.</div>
        </header>
        <div id="page">

          <? $src = (isset($image)) ? $image : '' ?>

          <script>
            var imageId = <?= (isset($imageId)) ? $imageId : -1 ?>,
                jsonString = <?= (isset($json)) ? $json : '{}' ?>;
          </script>

          <div id="drawing-board"></div>

          <img id="image-pad" src='<?= $src ?>' />
              <div id="main" class="container">
                <?= Form::open(array('route' => 'image.store', 'files' => true)) ?>

                  <div id="drop-area">
                      <span>Click to upload, paste or drop an image</span>
                  </div>

                  <?= Form::file('image', array('id' => 'file-upload-button')) ?>

                <?= Form::close() ?>

              </div>
          </div>
        <footer>
          <a href="https://twitter.com/aaronjbaptiste" title="@aaronjbaptiste">copyright &copy; @aaronjbaptiste</a>
        </footer>

        <!--[if lt IE 9]>
        <script type="text/javascript" src="/js/vendor/flashcanvas/flashcanvas.js"></script>
        <![endif]-->
        <script src="/js/vendor/flashcanvas/canvas2png.js"></script>
        <script src="/js/vendor/raphael/raphael.js"></script>
        <script src="/js/vendor/raphael.JSON/raphael.json.js"></script>
        <script src="/js/vendor/raphael.Export/raphael.export.js"></script>
        <script src="/js/vendor/canvg/rgbcolor.js"></script> 
        <script src="/js/vendor/canvg/StackBlur.js"></script>
        <script src="/js/vendor/canvg/canvg.js"></script> 
        <script data-main="/js/main.js" src="/js/vendor/requirejs/require.js"></script>

    </body>
</html>