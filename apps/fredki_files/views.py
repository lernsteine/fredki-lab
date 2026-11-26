# coding=utf-8
"""
    @project: FredKI Lab
    @file: views.py
    @desc: Liefert von Werkzeugen erzeugte Dateien aus.

    Ablauf:
      1. Ein FredKI-Werkzeug (läuft als Benutzer "sandbox") schreibt eine Datei nach
         <FREDKI_FILES_DIR>/<token>/<dateiname> und gibt dem Chat den Link
         <chat-pfad>/fredki-datei/<token>/<dateiname> zurück.
      2. Diese View liefert die Datei als Download aus, solange sie jünger als
         FREDKI_FILES_TTL_HOURS ist (Standard 24 h). Ältere Dateien werden gelöscht.

    Der zufällige Token (mind. 16 Zeichen) ist die Zugangsberechtigung – wer den Link hat,
    kann die Datei herunterladen, ähnlich einem Freigabelink.
"""
import mimetypes
import os
import re
import shutil
import stat
import time

from django.http import FileResponse, HttpResponseNotAllowed, HttpResponseNotFound

FILES_DIR = os.environ.get('FREDKI_FILES_DIR', '/tmp/fredki-dateien')
TTL_SECONDS = float(os.environ.get('FREDKI_FILES_TTL_HOURS', '24')) * 3600
CLEANUP_INTERVAL_SECONDS = 600
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'xlsx', 'pptx', 'csv', 'txt', 'md', 'png', 'jpg', 'jpeg'}

_TOKEN_RE = re.compile(r'^[A-Za-z0-9_-]{16,64}$')
_last_cleanup = [0.0]


def ensure_files_dir():
    """Ablageordner anlegen: beschreibbar für die Gruppe root (der Benutzer "sandbox" gehört dazu)."""
    try:
        os.makedirs(FILES_DIR, exist_ok=True)
        st = os.lstat(FILES_DIR)
        if stat.S_ISDIR(st.st_mode) and st.st_uid == os.getuid():
            os.chmod(FILES_DIR, 0o1770)
    except OSError:
        pass


def _cleanup():
    now = time.time()
    if now - _last_cleanup[0] < CLEANUP_INTERVAL_SECONDS:
        return
    _last_cleanup[0] = now
    try:
        entries = list(os.scandir(FILES_DIR))
    except OSError:
        return
    for entry in entries:
        try:
            st = entry.stat(follow_symlinks=False)
            if now - st.st_mtime > TTL_SECONDS:
                if stat.S_ISDIR(st.st_mode):
                    shutil.rmtree(entry.path, ignore_errors=True)
                else:
                    os.unlink(entry.path)
        except OSError:
            continue


def _not_found():
    # eigene Antwort statt Http404: FredKIs 404-Handler würde unter /chat sonst die Chat-Seite zeigen
    return HttpResponseNotFound(
        '<!doctype html><meta charset="utf-8"><title>Datei nicht gefunden</title>'
        '<p style="font-family:sans-serif;margin:3em">Datei nicht gefunden oder abgelaufen. '
        'Download-Links von FredKI sind 24 Stunden gültig – bitte die Datei im Chat neu erstellen lassen.</p>',
        content_type='text/html; charset=utf-8')


def download(request, token, name):
    if request.method not in ('GET', 'HEAD'):
        return HttpResponseNotAllowed(['GET', 'HEAD'])
    _cleanup()
    if not _TOKEN_RE.match(token):
        return _not_found()
    folder = os.path.join(FILES_DIR, token)
    try:
        folder_stat = os.lstat(folder)
    except OSError:
        return _not_found()
    if not stat.S_ISDIR(folder_stat.st_mode) or time.time() - folder_stat.st_mtime > TTL_SECONDS:
        return _not_found()

    files = []
    for entry in os.scandir(folder):
        st = entry.stat(follow_symlinks=False)
        # nur echte Dateien: keine Symlinks, keine Hardlinks auf fremde Dateien
        if stat.S_ISREG(st.st_mode) and st.st_nlink == 1:
            files.append(entry)
    if len(files) != 1:
        return _not_found()
    file_entry = files[0]
    extension = file_entry.name.rsplit('.', 1)[-1].lower() if '.' in file_entry.name else ''
    if extension not in ALLOWED_EXTENSIONS:
        return _not_found()

    try:
        fd = os.open(file_entry.path, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0))
    except OSError:
        return _not_found()
    content_type = mimetypes.guess_type(file_entry.name)[0] or 'application/octet-stream'
    response = FileResponse(os.fdopen(fd, 'rb'), as_attachment=True, filename=file_entry.name,
                            content_type=content_type)
    response['X-Content-Type-Options'] = 'nosniff'
    response['Cache-Control'] = 'private, max-age=3600'
    return response


ensure_files_dir()
