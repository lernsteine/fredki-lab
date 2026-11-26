import html.parser
import urllib.request


def seite_lesen(url: str) -> str:
    """Öffnet eine Webseite (z. B. einen Treffer der Websuche) und gibt ihren Text zurück, gekürzt auf rund 6000 Zeichen."""
    if not url.lower().startswith(("http://", "https://")):
        return "Bitte eine vollständige Adresse mit http:// oder https:// angeben."

    class _Text(html.parser.HTMLParser):
        def __init__(self):
            super().__init__()
            self.teile = []
            self._skip = 0

        def handle_starttag(self, tag, attrs):
            if tag in ("script", "style", "noscript", "svg", "nav", "footer", "header"):
                self._skip += 1

        def handle_endtag(self, tag):
            if tag in ("script", "style", "noscript", "svg", "nav", "footer", "header") and self._skip:
                self._skip -= 1

        def handle_data(self, data):
            if not self._skip and data.strip():
                self.teile.append(data.strip())

    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (FredKI-Seite-lesen/1.0)"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            typ = resp.headers.get("Content-Type", "")
            if "html" not in typ and "text" not in typ:
                return f"Die Seite ist kein Text (Typ: {typ})."
            roh = resp.read(2_000_000).decode(resp.headers.get_content_charset() or "utf-8", errors="replace")
    except Exception as e:
        return f"Die Seite konnte nicht geladen werden ({e})."
    parser = _Text()
    parser.feed(roh)
    text = " ".join(parser.teile)
    return text[:6000] if text else "Auf der Seite wurde kein lesbarer Text gefunden."
