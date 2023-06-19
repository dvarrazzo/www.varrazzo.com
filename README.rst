My own website at https://www.varrazzo.com
==========================================

.. |build| image:: https://travis-ci.org/dvarrazzo/www.varrazzo.com.svg?branch=master
    :target: https://travis-ci.org/dvarrazzo/www.varrazzo.com
    :alt: Website build status

In order to change the website:

- clone the repository
- run ``make setup`` to create the virtualenv
- run ``make serve`` to serve the website on http://localhost:5000/
- hack on the website (pages are in the `content` directory)
- commit and push

The following must be unbroken:

Travis used to build the website and push it to the `github pages repos`__,
served as https://www.varrazzo.com/... but now it's no more and you will have
to do it yourself.
