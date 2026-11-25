#!/usr/bin/env bash
# FredKI® Lab – Installation und Aktualisierung
#
# Aufruf im Verzeichnis mit docker-compose.yml:
#   sudo ./install.sh
#
# Das Skript ist wiederholbar: Ein zweiter Aufruf aktualisiert auf die neueste Version.

set -euo pipefail

cd "$(dirname "$0")"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker ist nicht installiert. Anleitung: https://docs.docker.com/engine/install/" >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose (Plugin) fehlt. Anleitung: https://docs.docker.com/compose/install/linux/" >&2
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Einstellungsdatei .env angelegt (Standardwerte)."
fi

# shellcheck disable=SC1091
set -a; . ./.env; set +a
mkdir -p "${FREDKI_DATA_DIR:-/opt/fredki}"

echo "Lade FredKI-Image ${FREDKI_IMAGE:-ghcr.io/lernsteine/fredki-lab:lab} ..."
if ! docker compose pull; then
  echo >&2
  echo "Das Image konnte nicht geladen werden. Ist das Paket privat, zuerst anmelden:" >&2
  echo "  docker login ghcr.io -u <github-benutzer>" >&2
  echo "  (Passwort: ein GitHub-Token mit der Berechtigung read:packages)" >&2
  exit 1
fi

docker compose up -d

echo
echo "FredKI läuft. Erster Start kann 1–2 Minuten dauern."
echo "Aufruf:  http://<server>:${FREDKI_PORT:-8080}/admin"
echo "Login beim ersten Start: admin / MaxKB@123..  (sofort ändern!)"
