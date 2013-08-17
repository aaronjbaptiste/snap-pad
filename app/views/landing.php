<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Snap Pad</title>

        <link href="http://fonts.googleapis.com/css?family=Lato|Lobster" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <script type="text/x-handlebars">
          <header>
            <span id="name">Snap Pad</span>
            <div id="slogan">Share and annotate images with anyone, <wbr>in real-time, for free.</div>
          </header>
          <div class="page">
          <img id="image-pad" src='' />
              <div id="main" class="container">
                <form {{action "uploadImage" on="submit"}}>

                  <div id="drop-area" {{action "uploadFile"}}>
                      <span>Click to upload, paste or drop an image</span>
                  </div>

                  <input type="file" id="file-upload-button">
                </form>

              </div>
          </div>
          <footer>
            <a href="https://twitter.com/aaronjbaptiste" title="@aaronjbaptiste">copyright &copy; @aaronjbaptiste</a>
          </footer>
        </script>

        <script src="js/libs/jquery-1.9.1.js"></script>
        <script src="js/libs/handlebars-1.0.0-rc.4.js"></script>
        <script src="js/libs/ember-1.0.0-rc.6.1.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>