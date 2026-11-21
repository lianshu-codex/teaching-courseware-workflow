"""Embed or refresh the offline ink controls in generated HTML slides."""

import argparse
from pathlib import Path
import re

ASSETS = Path(__file__).resolve().parents[1] / "assets" / "deck-ink"
INK_BLOCK = re.compile(r"<!-- deck-ink:start -->\r?\n.*?<!-- deck-ink:end -->", re.S)
HEAD_END = re.compile(r"(?m)^[ \t]*</head\s*>|</head\s*>(?=\s*<body\b)", re.I)


def embed(path, stylesheet, script):
    if path.suffix.lower() != ".html":
        raise ValueError("Expected an .html file")
    original = path.read_bytes()
    encoding = "utf-8-sig" if original.startswith(b"\xef\xbb\xbf") else "utf-8"
    html = original.decode(encoding)
    newline = "\r\n" if "\r\n" in html else "\n"
    block = """<!-- deck-ink:start -->
<style id="deck-ink-style">
{stylesheet}
</style>
<script id="deck-ink-script">
{script}
</script>
<!-- deck-ink:end -->""".format(stylesheet=stylesheet, script=script)
    block = block.replace("\n", newline)
    markers = (html.count("<!-- deck-ink:start -->"), html.count("<!-- deck-ink:end -->"))
    if markers == (1, 1) and INK_BLOCK.search(html):
        updated = INK_BLOCK.sub(lambda _: block, html, count=1)
    elif markers == (0, 0):
        head = HEAD_END.search(html)
        if not head:
            raise ValueError("Expected a closing </head> tag")
        updated = html[:head.start()] + block + newline + html[head.start():]
    else:
        raise ValueError("Malformed or duplicate deck-ink markers")
    if updated != html:
        path.write_bytes(updated.encode(encoding))
    print(f"{path}: {'updated' if updated != html else 'up to date'}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html", nargs="+", type=Path, help="Generated HTML files to update in place")
    args = parser.parse_args()
    css = (ASSETS / "deck-ink.css").read_text(encoding="utf-8").rstrip()
    javascript = (ASSETS / "deck-ink.js").read_text(encoding="utf-8").rstrip()
    for path in args.html:
        try:
            embed(path, css, javascript)
        except (OSError, ValueError) as error:
            parser.exit(1, f"{path}: {error}\n")


if __name__ == "__main__":
    main()
