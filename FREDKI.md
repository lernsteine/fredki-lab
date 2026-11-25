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
