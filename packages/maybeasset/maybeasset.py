# -*- coding: utf-8 -*-

import jinja2
from lektor.pluginsystem import Plugin
from lektor.context import get_asset_url


class MaybeAssetPlugin(Plugin):
    name = "MaybeAsset"
    description = u"Lektor plugin that adds a maybeasset Jinja filter."

    def on_setup_env(self, **extra):
        def maybeasset_filter(txt, **kwargs):
            """
            Return an asset url, but pass through external urls.
            """
            if txt.startswith('http'):
                return txt
            else:
                rv = get_asset_url(txt)
                return rv

        maybeasset = jinja2.contextfilter(
            lambda ctx, *a, **kw: maybeasset_filter(*a, **kw)
        )
        self.env.jinja_env.filters["maybeasset"] = maybeasset
