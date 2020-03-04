#!/env/bin/python3

"""
Save a mermaid graph
"""

import sys
import time
import argparse
import subprocess as sp

import requests
from selenium import webdriver
from bromine import Browser


def editor(b):
    return b("#editor textarea")


def editor_conf(b):
    return b("#editor-conf textarea")


def main():
    opt = parse_cmdline()
    graph = opt.infile.read()

    driver = webdriver.Firefox()
    with Browser(driver) as b:

        b.get("https://mermaid-js.github.io/mermaid-live-editor/")

        # wait for the dummy graph to appear
        dummy_url = b(link="Link to Image").wait().attrib['href']

        # The textarea is in a maze of divs and can hardly get a click
        # So click on whereabout it is and send keys like there's no tomorrow
        b.actions.move_to_element(editor(b)).move_by_offset(
            1, 1
        ).click().perform()
        b.actions.key_down(b.Keys.CONTROL).send_keys('a').key_up(
            b.Keys.CONTROL
        ).send_keys(b.Keys.DELETE).perform()

        # copy
        sp.run(
            ["xclip", "-selection", "clipboard"], input=graph.encode('utf8')
        )

        # paste
        b.actions.key_down(b.Keys.CONTROL).send_keys('v').key_up(
            b.Keys.CONTROL
        ).perform()

        # wait for the graph to change
        for i in range(100):
            image_url = b(link="Link to Image").attrib['href']
            if image_url != dummy_url:
                break
            time.sleep(0.1)
        else:
            raise ValueError("didn't get the image url")

        # download the image
        image_url = b(link="Link to Image").attrib['href']

    # save the image
    resp = requests.get(image_url)
    resp.raise_for_status()

    with opt.outfile as f:
        f.buffer.write(resp.content)


def parse_cmdline():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        '-i',
        dest='infile',
        metavar="INPUT",
        type=argparse.FileType('r'),
        default=sys.stdin,
        help="input file (default: stdin)",
    )
    parser.add_argument(
        '-o',
        dest='outfile',
        metavar="OUTPUT",
        type=argparse.FileType('w'),
        default=sys.stdout,
        help="output file (default: stdout)",
    )
    opt = parser.parse_args()

    return opt


if __name__ == '__main__':
    sys.exit(main())
