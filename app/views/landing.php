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
          <?php
            $src = (isset($image)) ? $image : '';
          ?>

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

        <script data-main="/js/main.js" src="/js/vendor/requirejs/require.js"></script>

    </body>
</html>