snap-pad
========

Share and annotate images with anyone in real-time

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

 1. Refactor all front end
  1. Use underscore functions where possible
 2. Features:
  * redo, undo
  * stroke width
  * stroke color
  * select - move, change shape, change arrow
  * comment
 3. Redesign menu
 4. Fix responsive layout
 5. Export sets filename
 6. xBrowser testing
 7. requirejs almond
 8. Sort out requirejs not loading raphaeljs stuf
 9. Fix env, needs to load dist css/js on prod

Questions?
----------

Contact me at gravityapple@gmail.com

