snap-pad
========

Share and annotate images with anyone in real-time

Todo
----

 * setup somewhere on a domain

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

Install snap-pad & all dependencies

```bash
cd snap-pad && composer install
npm install requirejs bower
bower install
```

Make sure your web document root allows read and write access to apache. See [Laravel's Installation docs](http://laravel.com/docs/installation) for more details


Questions?
----------

Contact me at gravityapple@gmail.com

