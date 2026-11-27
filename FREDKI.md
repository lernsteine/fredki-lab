# FredKI® Lab – Abweichungen von FredKI® / MaxKB

Dieses Repo (`lernsteine/fredki-lab`) ist eine Arbeitskopie von `lernsteine/FredKI`
(selbst ein Fork von `1Panel-dev/MaxKB`). Hier wird jede Änderung gegenüber
`lernsteine/FredKI` festgehalten, damit Updates aus dem Original sauber
übernommen werden können.

**Regeln**

- Hinzufügen statt umbauen: neue Dateien und Module bevorzugen, Kerndateien nur minimal ändern.
- Eine Funktion pro Branch und Pull Request, Basis ist immer `v2`.
- Jede Änderung an bestehenden Dateien wird unten mit Datei und Grund eingetragen.
- Abgleich mit dem Original: `git fetch upstream v2 && git merge upstream/v2`
  (Remote `upstream` = `https://github.com/lernsteine/FredKI`).

## Änderungen

### Spracherkennung mit eigenem Whisper-Server (whisper.cpp)

- `apps/models_provider/impl/openai_model_provider/model/stt.py`:
  - Sprache nicht mehr fest `zh`. Ohne Angabe erkennt Whisper die Sprache selbst; optional
    über Modellparameter `language` oder Umgebungsvariable `FREDKI_STT_LANGUAGE` (z. B. `de`).
  - Verbindungstest: Hat der Server kein `/models` (whisper.cpp), wird stattdessen eine kurze
    Probe-Transkription gemacht.
- Einbindung: Modell „OpenAI“ → Typ Spracherkennung, API-Adresse `https://whisper.edugo-server.de/v1`,
  API-Key beliebig (z. B. `none`), Modellname `whisper-large-v3-turbo`.

### Deutsche Zeitzone und direkterer Assistent

- `installer/Dockerfile`: `MAXKB_TIME_ZONE=Europe/Berlin` als Vorgabe im Image. MaxKB nimmt
  sonst `Asia/Shanghai` (`apps/maxkb/conf.py`), dadurch lag `{{global.time}}` 7 Stunden falsch.
  Per Umgebungsvariable weiterhin überschreibbar.
- `deploy/fredki-komplett/setup/setup.py`: Anweisung des „FredKI Assistent“ geschärft – aktuelle
  Daten immer zuerst per Websuche, keine erfundenen Zahlen, kurze Antworten ohne Optionsmenüs,
  höchstens eine Rückfrage, nur tatsächliche Fähigkeiten nennen.

### FredKI-Dateiausgabe + Werkzeug „Dokument erstellen“ (PDF, Word, Excel)

Neue Dateien (konfliktfrei):

- `apps/fredki_files/` – liefert von Werkzeugen erzeugte Dateien unter
  `<chat-pfad>/fredki-datei/<token>/<datei>` aus; Ablage `/tmp/fredki-dateien`,
  automatische Löschung nach 24 h (`FREDKI_FILES_DIR`, `FREDKI_FILES_TTL_HOURS`).
  Liefert nur echte Dateien mit erlaubter Endung (keine Symlinks/Hardlinks/HTML).
- `fredki-tools/dokument-erstellen/` – Werkzeug-Code und Anleitung

Geänderte Dateien (bei Upstream-Merges prüfen):

| Datei | Änderung |
|---|---|
| `apps/maxkb/urls/web.py` | eine Zeile: Route `fredki-datei/` unter dem Chat-Pfad eingebunden |

### Hinweis „Experimentelle Version“ (nur Lab – nicht ins Original übernehmen)

- `README.md`: Warnhinweis ganz oben (experimentell, nicht für Produktivbetrieb, Verweis auf `lernsteine/FredKI`)
- `.github/workflows/fredki-image.yml`: Paketbeschreibung je nach Repo – im Lab als experimentell gekennzeichnet

### Komplettpaket „FredKI Komplett“ (Bilder + Websuche, fertig eingerichtet)

Neue Dateien (konfliktfrei), alles in `deploy/fredki-komplett/`:

- `docker-compose.yml` – FredKI, SearXNG (eigene Suchmaschine), Caddy (HTTPS) und ein
  einmaliger Einrichtungs-Container
- `setup/setup.py` – richtet über die Admin-API ein: Admin-Passwort, Ministral als
  Sprach- und Bildmodell, Werkzeuge „Websuche“, „Seite lesen“ und „Dokument erstellen“,
  Agent „FredKI Assistent“ (Bilder, Websuche, Dokumente, aktuelles Datum) inkl. Veröffentlichung
- `setup/tools/` – Quellcode der Werkzeuge; `dokument_erstellen.py` ist eine Kopie aus
  `fredki-tools/dokument-erstellen/` (bei Änderungen beide anpassen)
- `install.sh`, `.env.example`, `Caddyfile`, `searxng/settings.yml`, `ANLEITUNG.md`

Am FredKI-Code selbst wird nichts geändert – alles nutzt Bordmittel.

### Fertiges Docker-Image und einfache Installation

Neue Dateien (konfliktfrei):

- `.github/workflows/fredki-image.yml` – baut bei jeder Änderung auf `v2` das Image
  `ghcr.io/lernsteine/fredki-lab:latest` (plus feste Version `<commit>`)
- `deploy/` – `docker-compose.yml`, `.env.example`, `install.sh` für Hoster
- `INSTALLATION.md` – Installationsanleitung für Hoster

Hinweis: Die von MaxKB übernommenen Workflows `sync2gitee.yml` (bei jedem Push) und
`llm-code-review.yml` (bei Pull Requests) laufen mangels Zugangsdaten ins Leere und
können unter *Actions* deaktiviert werden.

### Schwedisch (sv-SE) als Oberflächensprache

Neue Dateien (konfliktfrei):

- `ui/src/locales/lang/sv-SE/` – vollständige schwedische Übersetzung aller
  Oberflächentexte (1.862 Schlüssel, Basis: `en-US`)

Geänderte Dateien (bei Upstream-Merges prüfen):

| Datei | Änderung |
|---|---|
| `ui/src/main.ts` | Element-Plus-Sprachpaket `sv` importiert und als `'sv-SE'` registriert |
| `ui/src/chat.ts` | dito für die Chat-Oberfläche |
| `ui/src/locales/index.ts` | Browsersprache `sv*` wird automatisch als `sv-SE` erkannt |

Hinweise:

- Wie bei Deutsch sind nur die Oberflächentexte übersetzt. Meldungen aus dem
  Backend (Django, `apps/locales/`) erscheinen weiterhin in der Fallback-Sprache.
- Kommen in `en-US` neue Schlüssel hinzu, fehlen sie in `sv-SE`, bis sie
  nachgetragen werden; die Oberfläche zeigt dann den Fallback-Text.
