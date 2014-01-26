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

* Transform & Move
* Undo transformations
* Comments - add to shapes
* Shadow on shapes so colours aren't lost
* Drag and drop images
* Paste image from clipboard
* Export sets filename
* xBrowser testing
* Fix env, needs to load dist css/js on prod

* Auto save on change
* Auto update for new changes
* Upload / save progress bar
* Title
* Created / modified date
* Move / resize image
* Fit to screen width / Zoom

* Share options - like no annotations? no comments? password
* Gravatar / fb, tw, gl integration for avatar
* Show who else is viewing - guest or known user, colour coded like google

* requirejs almond
* Sort out requirejs not loading canvg stuff

Questions?
----------

Contact me at gravityapple@gmail.com


