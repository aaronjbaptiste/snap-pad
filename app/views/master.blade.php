<!doctype html>
<html lang="en">
    <head>
        <title>Snap Pad</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Annotate and share images with anyone for free.">

        <link href="http://fonts.googleapis.com/css?family=Lato|Lobster" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="/css/style.css">
        <link rel='stylesheet' href='/js/vendor/spectrum/spectrum.css'>
    </head>
    <body>

        <header>
          <div class="branding">
            <a class="logo" href="/">Snap Pad</a>
            @yield('slogan')
          </div>
  
          @yield('toolbar')

        </header>

        <div id="page">
          @yield('content')
        </div>

        <footer>
          copyright &copy;
          <a href="https://twitter.com/aaronjbaptiste" title="Twitter link">
             @aaronjbaptiste
          </a>
        </footer>

        @yield('scripts')

    </body>
</html>