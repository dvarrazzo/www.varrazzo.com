# -*- coding: utf-8 -*-

import jinja2
from lektor.pluginsystem import Plugin
from lektor.context import get_asset_url, url_to


class MaybePlugin(Plugin):
    name = "Maybe"
    description = u"Lektor plugin to add maybeasset/maybeurl Jinja filters."

    def on_setup_env(self, **extra):
        maybeasset = jinja2.pass_context(
            lambda ctx, *a, **kw: maybeasset_filter(*a, **kw)
        )
        self.env.jinja_env.filters["maybeasset"] = maybeasset

        maybeurl = jinja2.pass_context(
            lambda ctx, *a, **kw: maybeurl_filter(*a, **kw)
        )
        self.env.jinja_env.filters["maybeurl"] = maybeurl


def maybeasset_filter(txt, **kwargs):
    """
    Return an asset url, but pass through external urls.
    """
    if txt.startswith('http'):
        return txt
    else:
        rv = get_asset_url(txt, **kwargs)
        return rv


def maybeurl_filter(txt, **kwargs):
    """
    Return an url, but pass through external urls.
    """
    if txt.startswith('http'):
        return txt
    else:
        rv = url_to(txt, **kwargs)
        return rv
