.PHONY: build serve setup docs publish

PYTHON=$(CURDIR)/env/bin/python
LEKTOR=$(CURDIR)/env/bin/lektor
DOC_BRANCH=master

build:
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
