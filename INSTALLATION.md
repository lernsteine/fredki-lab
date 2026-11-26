# FredKI® Lab installieren

Anleitung für Hoster. FredKI® Lab läuft als ein einziger Docker-Container, genau wie
das offizielle MaxKB. Datenbank und Redis sind im Container enthalten.

Bei jeder Änderung im Repo baut GitHub automatisch ein fertiges Image:

```
ghcr.io/lernsteine/fredki-lab:latest
```

## Voraussetzungen

- Linux-Server mit Docker (empfohlen: 4 CPU-Kerne, 8 GB RAM, 50 GB Speicher)
- HTTPS davor (nginx, Caddy, Traefik o. Ä.) – die Moodle-Plugins verbinden sich nur per HTTPS
- Falls das Paket privat ist: Zugangsdaten von LERNSTEINE (siehe unten)

## Variante A: wie gewohnt mit `docker run`

Wer MaxKB bisher so installiert hat, tauscht nur den Image-Namen:

```bash
docker run -d --name=fredki --restart=always -p 8080:8080 \
  -v /opt/fredki:/opt/maxkb \
  ghcr.io/lernsteine/fredki-lab:latest
```

Aktualisieren:

```bash
docker pull ghcr.io/lernsteine/fredki-lab:latest
docker rm -f fredki
# dann den docker-run-Befehl oben erneut ausführen
```

## Variante B: noch einfacher mit dem Installationsskript

```bash
git clone https://github.com/lernsteine/fredki-lab.git
cd fredki-lab/deploy
sudo ./install.sh
```

Für ein Update dasselbe Skript erneut ausführen. Einstellungen (Port, Datenverzeichnis,
feste Version) stehen in `deploy/.env`.

Ohne Zugriff aufs Repo genügen die zwei Dateien `deploy/docker-compose.yml` und
`deploy/.env.example`, dann `docker compose up -d`.

## Erster Aufruf

`https://<ihre-domain>/admin` – Login `admin` / `MaxKB@123..`, Passwort sofort ändern.

## Zugang, wenn das Paket privat ist

```bash
docker login ghcr.io -u <github-benutzer>
# Passwort: GitHub-Token mit der Berechtigung "read:packages"
```

## Feste Version statt „immer neueste“

Jede Version hat zusätzlich einen eigenen Namen, z. B. `1fd38a4`. Für einen
Produktivbetrieb eine feste Version eintragen und gezielt aktualisieren.

## Wichtig

- **Datensicherung:** Alle Daten liegen in `/opt/fredki` (bzw. `FREDKI_DATA_DIR`). Vor jedem Update sichern.
- **Eigener Server für das Lab:** Beim ersten Start passt FredKI® Lab die Datenbank an. Ein
  bestehendes Produktivsystem nicht einfach auf das Lab-Image umstellen – dafür einen
  separaten Test-Server verwenden.
