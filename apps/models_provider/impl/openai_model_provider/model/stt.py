import asyncio
import io
import os
from typing import Dict

from openai import OpenAI

from common.config.tokenizer_manage_config import TokenizerManage
from models_provider.base_model_provider import MaxKBBaseModel
from models_provider.impl.base_stt import BaseSpeechToText


def custom_get_token_ids(text: str):
    tokenizer = TokenizerManage.get_tokenizer()
    return tokenizer.encode(text)


class OpenAISpeechToText(MaxKBBaseModel, BaseSpeechToText):
    api_base: str
    api_key: str
    model: str
    params: dict

    @staticmethod
    def is_cache_model():
        return False

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.api_key = kwargs.get('api_key')
        self.api_base = kwargs.get('api_base')
        self.model = kwargs.get('model')
        self.params = kwargs.get('params')

    @staticmethod
    def new_instance(model_type, model_name, model_credential: Dict[str, object], **model_kwargs):
        optional_params = {}
        if 'max_tokens' in model_kwargs and model_kwargs['max_tokens'] is not None:
            optional_params['max_tokens'] = model_kwargs['max_tokens']
        if 'temperature' in model_kwargs and model_kwargs['temperature'] is not None:
            optional_params['temperature'] = model_kwargs['temperature']
        return OpenAISpeechToText(
            model=model_name,
            api_base=model_credential.get('api_base'),
            api_key=model_credential.get('api_key'),
            params = model_kwargs,
            **optional_params,
        )

    def check_auth(self):
        client = OpenAI(
            base_url=self.api_base,
            api_key=self.api_key
        )
        try:
            client.models.with_raw_response.list()
        except Exception:
            # FredKI: whisper.cpp und ähnliche Server haben kein /models – stattdessen Probe-Transkription
            test_mp3 = os.path.join(os.path.dirname(__file__), '..', '..', 'vllm_model_provider', 'model',
                                    'iat_mp3_16k.mp3')
            with open(test_mp3, 'rb') as audio_file:
                self.speech_to_text(audio_file)

    def speech_to_text(self, audio_file):
        client = OpenAI(
            base_url=self.api_base,
            api_key=self.api_key
        )
        audio_data = audio_file.read()
        buffer = io.BytesIO(audio_data)
        buffer.name = "file.mp3"  # this is the important line

        filter_params = {k: v for k,v in self.params.items() if k not in {'model_id','use_local','streaming','language'}}
        transcription_params = {
            'model': self.model,
            'file': buffer,
        }
        # FredKI: Sprache nicht fest auf Chinesisch; leer = Whisper erkennt die Sprache selbst
        language = self.params.get('language') or os.environ.get('FREDKI_STT_LANGUAGE', '')
        if language:
            transcription_params['language'] = language

        res = client.audio.transcriptions.create(**transcription_params,extra_body=filter_params)
        return res.text

