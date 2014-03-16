snap-pad
========

Super simple way to annotate and share images or screenshots

How to build
------------

```bash
cd <your_web_document_root>
```

Clone repo:

```bash
git clone https://github.com/aaronjbaptiste/snap-pad.git
```
Install [Composer](http://getcomposer.org/doc/00-intro.md):

```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

Install [Node.js](http://nodejs.org/)

Install snap-pad:

```bash
cd snap-pad && composer install
npm install requirejs bower
bower install
```

Make sure your web document root allows read and write access for apache. See [Laravel's Installation docs](http://laravel.com/docs/installation) for more details.

Todo
-----

* Saving... Saved! notification (instead of current save button)
* Comments - add to shapes? Visuals
* Fix env, needs to load dist css/js on prod
* Check README.md
* xBrowser testing
* Pictures and json not stored in public
* Code cleanup

Questions?
----------

Contact me at gravityapple@gmail.com


