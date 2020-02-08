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

Travis will |build| the website and push it to the `github pages repos`__,
served as https://www.varrazzo.com/.

.. __: https://github.com/dvarrazzo/dvarrazzo.github.io
