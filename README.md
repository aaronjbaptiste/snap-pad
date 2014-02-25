snap-pad
========

Annotate and share images with anyone in real-time

How to build
------------

```bash
cd <your_web_document_root>
```

Clone repo

```bash
git clone https://github.com/aaronjbaptiste/snap-pad.git
```
Install [Composer](http://getcomposer.org/doc/00-intro.md)

```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

Install [Node.js](http://nodejs.org/)

Install snap-pad

```bash
cd snap-pad && composer install
npm install requirejs bower
bower install
```

Make sure your web document root allows read and write access to apache. See [Laravel's Installation docs](http://laravel.com/docs/installation) for more details

Todo
-----

* Export sets filename (save.php?)
* CMD Z for undo on mac?
* Comments - add to shapes
* Delete / rubber
* Auto save on change
* Auto update for new changes
* Upload / save progress bar
* Drag and drop images
* Paste from clipboard images
* Fix env, needs to load dist css/js on prod
* xBrowser testing

Questions?
----------

Contact me at gravityapple@gmail.com


