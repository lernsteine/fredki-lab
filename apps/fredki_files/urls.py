# coding=utf-8
"""
    @project: FredKI Lab
    @file: urls.py
    @desc: Download-Route der FredKI-Dateiausgabe (eingebunden unter <chat-pfad>/fredki-datei/)
"""
from django.urls import path

from . import views

app_name = 'fredki_files'

urlpatterns = [
    path('<str:token>/<str:name>', views.download, name='download'),
]
