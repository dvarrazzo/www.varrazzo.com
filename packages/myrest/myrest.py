import re
import html

from docutils import nodes
from docutils.parsers.rst import Directive, directives, roles, states
from docutils.parsers.rst.roles import set_classes

from lektor.pluginsystem import Plugin
from lektor.context import get_ctx, url_to


def ref_role(name, rawtext, text, lineno, inliner, options={}, content=[]):
    # match "model/id" or "label <model/id>"
    m = re.match(
        r"(?i)(?:([a-z0-9_-]+)/([a-z0-9_-]+))"
        r"|(?:([^<]+?)\s*<([a-z0-9_-]+)/([a-z0-9_-]+)>)",
        text,
    )
    if m is None:
        msg = inliner.reporter.error(
            "ref shoud be 'model/id' or 'label <model/id>', got '%s'" % text
        )
        prb = inliner.problematic(rawtext, rawtext, msg)
        return [prb], [msg]

    if m.group(3) is not None:
        _, _, label, model, id = m.groups()
    else:
        model, id, label, _, _ = m.groups()

    ctx = get_ctx()
    assert ctx
    pad = get_ctx().pad
    assert pad

    entry = pad.query(model).get(id)
    if entry is None:
        msg = inliner.reporter.error(
            "object with model=%s id=%s not found" % (model, id)
        )
        prb = inliner.problematic(rawtext, rawtext, msg)
        return [prb], [msg]

    if not label:
        label = entry["title"]

    url = entry.parent.path + "/" + entry["_slug"] + "/"
    roles.set_classes(options)
    node = nodes.reference(rawtext, label, refuri=url, **options)
    return [node], []


roles.register_local_role("ref", ref_role)


class Photo(Directive):
    align_values = ("left", "center", "right")

    def align(argument):
        # This is not callable as self.align.  We cannot make it a
        # staticmethod because we're saving an unbound method in
        # option_spec below.
        return directives.choice(argument, Photo.align_values)

    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        "height": directives.nonnegative_int,
        "width": directives.nonnegative_int,
        "quality": directives.nonnegative_int,
        "class": directives.class_option,
    }

    def run(self):
        ctx = get_ctx()
        record = ctx.record
        if record is None:
            # it happens rendering pages referencing this such as rss
            return []
        image = record.attachments.get(id=self.arguments[0])
        if image is None:
            raise self.error("no such attachment: %s" % self.arguments[0])
        thumb = image.thumbnail(
            self.options.get("width", 382),
            self.options.get("height", 255),
            quality=self.options.get("quality", 60),
        )

        desc = image.exif.description
        if desc:
            desc = html.escape(desc.splitlines()[0], quote=True)
            alt = f'alt="{desc}"'
            title = f'title="{desc}"'
        else:
            alt = title = ""

        cls = f"class='{' '.join(self.options['class'])}'" if self.options["class"] else ""

        messages = []
        raw_node = nodes.raw(
            "",
            f"""
 <a href="{url_to(image)}" data-rel="lightcase:gal" {title}>
    <img {alt} {cls} src="{url_to(thumb)}" />
 </a>
 """,
            format="html",
        )
        return messages + [raw_node]

        """
        if 'align' in self.options:
            if self.options['align'] not in self.align_values:
                raise self.error(
                    'Error in "%s" directive: "%s" is not a valid value for '
                    'the "align" option.  Valid values for "align" are: "%s".'
                    % (self.name, self.options['align'],
                       '", "'.join(self.align_values)))
        messages = []
        reference = directives.uri(self.arguments[0])
        self.options['uri'] = reference
        reference_node = nodes.reference(refuri=self.arguments[0], data_rel="lightcase:gal")
        set_classes(self.options)
        image_node = nodes.image(self.block_text, **self.options)
        self.add_name(image_node)
        if reference_node:
            reference_node += image_node
            return messages + [reference_node]
        else:
            return messages + [image_node]
        """


directives.register_directive("photo", Photo)


class MyRestPlugin(Plugin):
    name = "myrest"
    description = "Add a few roles/directives to reST markup."
