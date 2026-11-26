# Werkzeug „Dokument erstellen“ (PDF, Word, Excel)

Lässt FredKI®-Agenten Dokumente erzeugen und im Chat als Download-Link ausgeben,
z. B. „Fasse unser Gespräch als PDF zusammen“ oder „Erstelle daraus eine Excel-Tabelle“.

- **PDF:** Titel, Überschriften, Absätze, **fett**, Aufzählungen, nummerierte Listen,
  Tabellen, Trennlinien, Seitenzahlen. Keine zusätzlichen Pakete nötig.
- **Word (.docx):** dieselben Elemente als echte Word-Formatvorlagen (python-docx).
- **Excel (.xlsx):** Markdown-Tabellen werden zu Tabellenblättern, Zahlen bleiben Zahlen (openpyxl).
- Das ® wird überall leicht hochgestellt gesetzt.

## Voraussetzung

FredKI® Lab ab der Version mit **FredKI-Dateiausgabe** (Modul `apps/fredki_files`).
Sie liefert die erzeugten Dateien unter `/chat/fredki-datei/<token>/<datei>` aus und
löscht sie nach 24 Stunden.

## Einrichten in FredKI®

1. **Tool → Erstellen**
   - Name: `Dokument erstellen`
   - Beschreibung: `Erstellt PDF-, Word- oder Excel-Dateien zum Herunterladen.`
   - Code: Inhalt von `dokument_erstellen.py` einfügen
   - Eingabeparameter: `titel` (string, Pflicht), `inhalt` (string, Pflicht), `dateiformat` (string, optional)
2. Tool aktivieren.
3. Im Agenten beim **KI-Chat**-Knoten das Tool hinzufügen.
4. Im Systemprompt ergänzen:
   > Wenn der Nutzer ein Dokument, ein PDF, eine Word- oder Excel-Datei möchte, nutze das
   > Werkzeug „dokument_erstellen“. Schreibe den Inhalt vollständig in Markdown. Gib den
   > Download-Link aus dem Ergebnis unverändert an den Nutzer weiter.

## Einstellungen (optional, Umgebungsvariablen des FredKI-Containers)

| Variable | Standard | Bedeutung |
|---|---|---|
| `FREDKI_FILES_DIR` | `/tmp/fredki-dateien` | Ablageordner (muss mit `_FILES_DIR` im Werkzeug übereinstimmen) |
| `FREDKI_FILES_TTL_HOURS` | `24` | Gültigkeit der Download-Links in Stunden |

## Hinweis

Wer den Link kennt, kann die Datei herunterladen, bis sie abläuft (wie ein Freigabelink).
Die Links enthalten einen zufälligen, nicht erratbaren Schlüssel.
