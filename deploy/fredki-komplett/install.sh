#!/usr/bin/env bash
# FredKI® Komplett – Installation / Aktualisierung
#   sudo ./install.sh
# Wiederholbar: ein zweiter Aufruf aktualisiert auf die neueste Version.

set -euo pipefail
cd "$(dirname "$0")"

fehler() { echo "FEHLER: $*" >&2; exit 1; }

command -v docker >/dev/null 2>&1 || fehler "Docker ist nicht installiert: https://docs.docker.com/engine/install/"
docker compose version >/dev/null 2>&1 || fehler "Docker Compose (Plugin) fehlt: https://docs.docker.com/compose/install/linux/"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Einstellungsdatei .env angelegt."
fi

# geheimen Schlüssel für SearXNG einmalig erzeugen
if ! grep -q '^SEARXNG_SECRET=.\+' .env; then
  secret=$(head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n')
  if grep -q '^SEARXNG_SECRET=' .env; then
    sed -i "s/^SEARXNG_SECRET=.*/SEARXNG_SECRET=${secret}/" .env
  else
    echo "SEARXNG_SECRET=${secret}" >> .env
  fi
fi
chmod 600 .env

# Pflichtangaben prüfen
grep -q '^DOMAIN=.\+' .env || fehler "DOMAIN in .env eintragen."
grep -q '^MODEL_API_URL=.\+' .env || fehler "MODEL_API_URL in .env eintragen (Adresse des Ministral-Servers)."

mkdir -p daten/fredki daten/caddy daten/setup

echo "Lade aktuelle Versionen ..."
if ! docker compose pull fredki searxng caddy setup; then
  echo >&2
  echo "Das FredKI-Image konnte nicht geladen werden. Ist das Paket privat, zuerst anmelden:" >&2
  echo "  docker login ghcr.io -u <github-benutzer>   (Passwort: GitHub-Token mit read:packages)" >&2
  exit 1
fi

docker compose up -d fredki searxng caddy

echo
echo "Starte automatische Einrichtung (beim ersten Mal einige Minuten) ..."
docker compose run --rm setup

domain=$(grep '^DOMAIN=' .env | cut -d= -f2-)
echo
echo "============================================================"
echo " FredKI läuft:  https://${domain}/admin"
echo " Benutzer:      admin"
if [ -f daten/setup/admin-passwort.txt ]; then
  echo " Passwort:      $(cat daten/setup/admin-passwort.txt)"
  echo "                (steht auch in daten/setup/admin-passwort.txt)"
else
  echo " Passwort:      wie in .env (FREDKI_ADMIN_PASSWORD)"
fi
echo "============================================================"
