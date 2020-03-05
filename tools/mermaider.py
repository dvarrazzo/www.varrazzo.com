#!/usr/bin/env python3

"""
Save a mermaid graph
"""

import sys
import json
import base64
import argparse

import requests


def editor(b):
    return b("#editor textarea")


def editor_conf(b):
    return b("#editor-conf textarea")


def main():
    opt = parse_cmdline()
    graph = opt.infile.read()

    # TODO: configurable config
    data = {"code": graph, "mermaid": {"theme": "default"}}

    b64 = base64.encodebytes(json.dumps(data).encode("utf8")).decode("utf8")
    frag = "".join(b64.splitlines()).replace("+", "-").replace("=", "")
    url = "https://mermaid.ink/img/" + frag

    # save the image
    resp = requests.get(url)
    resp.raise_for_status()

    with opt.outfile as f:
        f.buffer.write(resp.content)


def parse_cmdline():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "-i",
        dest="infile",
        metavar="INPUT",
        type=argparse.FileType("r"),
        default=sys.stdin,
        help="input file (default: stdin)",
    )
    parser.add_argument(
        "-o",
        dest="outfile",
        metavar="OUTPUT",
        type=argparse.FileType("w"),
        default=sys.stdout,
        help="output file (default: stdout)",
    )
    opt = parser.parse_args()

    return opt


if __name__ == "__main__":
    sys.exit(main())
