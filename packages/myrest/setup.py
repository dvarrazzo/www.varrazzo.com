from setuptools import setup

setup(
    author=u"Daniele Varrazzo",
    author_email="daniele-varrazzo@gmail.com",
    description="Lektor plugin to add some reST roles/directive used here.",
    keywords="Lektor plugin restructuredtext",
    license="BSD-3-Clause",
    long_description_content_type="text/markdown",
    name="lektor-myrest",
    py_modules=["myrest"],
    version="0.1",
    classifiers=[
        "Environment :: Plugins",
        "Environment :: Web Environment",
        "Framework :: Lektor",
        "License :: OSI Approved :: BSD License",
    ],
    entry_points={"lektor.plugins": ["myrest = myrest:MyRestPlugin"]},
)
