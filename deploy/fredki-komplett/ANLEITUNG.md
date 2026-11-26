# FredKI® Komplett – Anleitung für den Hoster

Dieses Paket startet ein vollständig eingerichtetes FredKI® unter
**https://claudefred.lernsteine.com** mit:

- **Bilder erkennen:** Bilder im Chat hochladen, FredKI beschreibt und erklärt sie
  (Ministral 3 auf dem GPU-Server)
- **Websuche:** eigene Suchmaschine (SearXNG) auf diesem Server, ohne externe API-Schlüssel
- **HTTPS:** Zertifikat von Let's Encrypt, automatisch erneuert (Caddy)
- **Automatische Einrichtung:** Modell, Werkzeuge und ein fertiger Agent werden beim
  ersten Start angelegt – nichts muss in der Oberfläche geklickt werden

## Voraussetzungen

- Linux-Server mit Docker und Docker Compose (Plugin)
- mindestens 4 CPU-Kerne, 8 GB RAM, 50 GB Speicher
- DNS: `claudefred.lernsteine.com` zeigt auf diesen Server
- Ports **80 und 443** sind frei (Caddy holt darüber das Zertifikat)
- Der GPU-Server mit Ministral 3 ist von diesem Server aus erreichbar

## Installation

1. Diesen Ordner `fredki-komplett` auf den Server kopieren.
2. In der Datei `.env` (falls nicht mitgeliefert: `.env.example` nach `.env` kopieren)
   **eine** Zeile ausfüllen:

   ```
   MODEL_API_URL=http://<gpu-server>:8000/v1
   ```

   (bei Ollama: `MODEL_PROVIDER=ollama` und `MODEL_API_URL=http://<gpu-server>:11434`;
   ggf. `MODEL_API_KEY`, falls der Modellserver einen Schlüssel verlangt)
3. Starten:

   ```bash
   sudo ./install.sh
   ```

Am Ende zeigt das Skript Adresse, Benutzer und das erzeugte Admin-Passwort an.
Das Passwort steht zusätzlich in `daten/setup/admin-passwort.txt`.

## Zugang zum FredKI-Paket

Das Paket ist privat. Die Zugangsdaten (`GHCR_USER`, `GHCR_TOKEN`) stehen bereits in
der von LERNSTEINE gelieferten `.env` – `install.sh` meldet sich damit automatisch an.

## Betrieb

| Aufgabe | Befehl |
|---|---|
| Aktualisieren | `sudo ./install.sh` (erneut ausführen) |
| Status | `docker compose ps` |
| Logs | `docker compose logs -f fredki` |
| Einrichtung wiederholen (nach Fehler) | `docker compose run --rm setup` |
| Stoppen | `docker compose down` |

**Datensicherung:** Alles Wichtige liegt im Ordner `daten/` (FredKI-Datenbank,
Uploads, Zertifikate, Einrichtungsstand) und in `.env`. Vor Updates sichern.

## Bereits einen Reverse Proxy auf dem Server?

Dann den Dienst `caddy` in `docker-compose.yml` entfernen, beim Dienst `fredki`
`ports: ["127.0.0.1:8080:8080"]` ergänzen und den vorhandenen Proxy auf
`http://127.0.0.1:8080` für `claudefred.lernsteine.com` zeigen lassen.

## Wenn die Einrichtung meldet …

- **„MODEL_API_URL ist nicht gesetzt“** → Schritt 2 nachholen.
- **„API domain name is invalid“ / Modellfehler** → Ist der GPU-Server von hier
  erreichbar? Test: `curl http://<gpu-server>:8000/v1/models`
- **Anmeldefehler beim Admin** → Wurde das Passwort schon von Hand geändert? Dann
  dieses Passwort als `FREDKI_ADMIN_PASSWORD` in `.env` eintragen und
  `docker compose run --rm setup` ausführen.
