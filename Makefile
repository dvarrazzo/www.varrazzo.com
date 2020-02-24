.PHONY: build serve setup docs publish pgmp-docs

PYTHON=$(CURDIR)/env/bin/python
LEKTOR=$(CURDIR)/env/bin/lektor

TRACKING_ID = $(shell jq --raw-output '.tracking_id' databags/analytics.json)

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

pgmp-docs: pgmp/docs/env pgmp/docs/_templates/layout.html
	make PYTHON=$(PYTHON) -C pgmp/docs

pgmp/docs/env: pgmp/README.rst
	make PYTHON=$(PYTHON) -C pgmp/docs env

pgmp/README.rst:
	test -d pgmp/.git \
		|| git clone https://github.com/dvarrazzo/pgmp.git
	git -C pgmp pull

pgmp/docs/_templates/layout.html: templates/sphinx-layout.html databags/analytics.json
	mkdir -p $(dir $@)
	TRACKING_ID=${TRACKING_ID} envsubst < $< > $@
