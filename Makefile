.PHONY: build serve setup docs publish pgmp-docs

PYTHON=$(CURDIR)/env/bin/python
LEKTOR=$(CURDIR)/env/bin/lektor

build: assets/pgmp/index.html
	echo 'y' | $(LEKTOR) build -O build

serve:
	$(LEKTOR) serve

setup:
	test -x $(PYTHON) || virtualenv -p python3 env
	test -x $(LEKTOR) || env/bin/pip install -r requirements.txt

publish:
	git -C build add -A
	git -C build commit -m "updated on $$(date -Iseconds)"
	git -C build push

assets/pgmp/index.html: pgmp/docs/html/index.html
	cp -r $$(dirname $<) $$(dirname $@)

pgmp/docs/html/index.html: pgmp-docs

pgmp-docs: pgmp/docs/env
	make PYTHON=$(PYTHON) -C pgmp/docs

pgmp/docs/env: pgmp/README.rst
	make PYTHON=$(PYTHON) -C pgmp/docs env

pgmp/README.rst:
	test -d pgmp/.git \
		|| git clone https://github.com/dvarrazzo/pgmp.git
	git -C pgmp pull
