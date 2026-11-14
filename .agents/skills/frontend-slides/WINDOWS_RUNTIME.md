# Runtime notes

HTML previews and decks open directly in a browser. On Windows, use `Invoke-Item -LiteralPath` or open the file from Explorer. Use a supported standalone browser if an embedded viewer blocks fullscreen.

For PowerPoint conversion, install `python-pptx` in a Python 3 environment, then run `scripts/extract-pptx.py` with that interpreter. The optional deployment and PDF export scripts are POSIX shell helpers. Use a compatible shell and verify any export.
