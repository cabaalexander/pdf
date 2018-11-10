# vim: ts=8:sw=8

CHAPTERS_DIR = $(shell find ./dist -name "chapters" -type d)

.PHONY: all
all: scrap-all merge-pdfs

.PHONY: scrap
scrap:
	@node index.js ${o}

.PHONY: scrap-all
scrap-all:
	@node index.js scrap/*.js

.PHONY: merge
merge:
	@node ./src/merge-pdf.js $(CHAPTERS_DIR)

