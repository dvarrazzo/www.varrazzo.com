from setuptools import setup

setup(
    author=u"Daniele Varrazzo",
    author_email="daniele-varrazzo@gmail.com",
    description="Lektor plugin that adds a maybeasset Jinja filter.",
    keywords="Lektor plugin static-site jinja2 jinja filter",
    license="BSD-3-Clause",
    long_description_content_type="text/markdown",
    name="lektor-maybeasset",
    py_modules=["maybeasset"],
    version="0.1",
    classifiers=[
        "Environment :: Plugins",
        "Environment :: Web Environment",
        "Framework :: Lektor",
        "License :: OSI Approved :: BSD License",
    ],
    entry_points={"lektor.plugins": ["maybeasset = maybeasset:MaybeAssetPlugin"]},
)
