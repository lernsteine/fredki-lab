import json
import urllib.parse
import urllib.request


def websuche(suchbegriff: str, anzahl: int = 5) -> str:
    """Sucht aktuelle Informationen im Internet. Gibt Titel, Link und Kurztext der besten Treffer zurück."""
    searxng_url = "__SEARXNG_URL__"
    anzahl = max(1, min(int(anzahl or 5), 10))
    query = urllib.parse.urlencode({"q": suchbegriff, "format": "json", "language": "de"})
    req = urllib.request.Request(
        f"{searxng_url.rstrip('/')}/search?{query}",
        headers={"User-Agent": "FredKI-Websuche/1.0", "Accept": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        return f"Die Websuche ist gerade nicht erreichbar ({e})."
    treffer = data.get("results", [])[:anzahl]
    if not treffer:
        return f"Keine Treffer für: {suchbegriff}"
    zeilen = []
    for i, t in enumerate(treffer, 1):
        titel = (t.get("title") or "").strip()
        link = (t.get("url") or "").strip()
        text = (t.get("content") or "").strip().replace("\n", " ")[:400]
        zeilen.append(f"[{i}] {titel}\n{link}\n{text}")
    return "\n\n".join(zeilen)
