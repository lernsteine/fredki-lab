"""
FredKI® Komplett – automatische Ersteinrichtung

Läuft einmal nach dem Start und richtet über die Admin-API ein:
  1. Admin-Passwort setzen
  2. Ministral (oder ein anderes Modell) als Sprachmodell und als Bildmodell anlegen
  3. Werkzeuge „Websuche“ (SearXNG) und „Seite lesen“ anlegen und aktivieren
  4. Agent „FredKI Assistent“ anlegen (Bilder hochladen + Websuche) und veröffentlichen

Der Fortschritt wird in /state/setup-state.json gespeichert. Ein erneuter Lauf setzt
dort fort, wo er aufgehört hat; ist alles erledigt, beendet er sich sofort.
Nur Python-Standardbibliothek.
"""
import json
import os
import secrets
import string
import sys
import time
import urllib.error
import urllib.request

BASE = os.environ.get("FREDKI_INTERNAL_URL", "http://fredki:8080").rstrip("/")
API = f"{BASE}/admin/api"
WS = "default"
STATE_DIR = os.environ.get("STATE_DIR", "/state")
STATE_FILE = os.path.join(STATE_DIR, "setup-state.json")
TOOLS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tools")

DEFAULT_ADMIN_PASSWORD = "MaxKB@123.."
ADMIN_PASSWORD = os.environ.get("FREDKI_ADMIN_PASSWORD", "").strip()
PROVIDER = os.environ.get("MODEL_PROVIDER", "vllm").strip().lower()
MODEL_API_URL = os.environ.get("MODEL_API_URL", "").strip()
MODEL_API_KEY = os.environ.get("MODEL_API_KEY", "").strip() or "kein-schluessel"
MODEL_NAME = os.environ.get("MODEL_NAME", "").strip()
SEARXNG_URL = os.environ.get("SEARXNG_INTERNAL_URL", "http://searxng:8080")
AGENT_NAME = os.environ.get("AGENT_NAME", "FredKI Assistent").strip()


def log(msg):
    print(f"[fredki-setup] {msg}", flush=True)


def load_state():
    try:
        with open(STATE_FILE, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)
    os.chmod(STATE_FILE, 0o600)


def request(method, path, body=None, token=None, timeout=60, raw_url=None):
    url = raw_url or f"{API}{path}"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            payload = resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        payload = e.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(payload)
        except ValueError:
            raise RuntimeError(f"{method} {url} -> HTTP {e.code}: {payload[:300]}")
        raise RuntimeError(f"{method} {url} -> HTTP {e.code}: {parsed.get('message', parsed)}")
    parsed = json.loads(payload) if payload else {}
    if raw_url:
        return parsed
    if parsed.get("code") not in (200, None):
        raise RuntimeError(f"{method} {path} -> {parsed.get('code')}: {parsed.get('message')}")
    return parsed.get("data")


def wait_for_fredki():
    log(f"Warte auf FredKI unter {BASE} ...")
    for _ in range(180):
        try:
            urllib.request.urlopen(f"{BASE}/admin/", timeout=5)
            log("FredKI ist erreichbar.")
            time.sleep(int(os.environ.get("SETUP_SETTLE_SECONDS", "10")))
            return
        except Exception:
            time.sleep(5)
    raise RuntimeError("FredKI ist nach 15 Minuten nicht erreichbar.")


def generate_password():
    # FredKI-Regel: 6–20 Zeichen, Klein- und Großbuchstabe, Ziffer, Sonderzeichen
    alphabet = string.ascii_letters + string.digits
    core = "".join(secrets.choice(alphabet) for _ in range(12))
    return "Fk" + core + secrets.choice("23456789") + "!"


def login(password):
    data = request("POST", "/user/login", {"username": "admin", "password": password})
    return data["token"] if isinstance(data, dict) else data


def step_admin_password(state):
    if state.get("admin_password_set"):
        return login(state["admin_password"])
    try:
        token = login(DEFAULT_ADMIN_PASSWORD)
    except RuntimeError:
        if ADMIN_PASSWORD:
            log("Standardpasswort gilt nicht mehr, melde mit FREDKI_ADMIN_PASSWORD an.")
            token = login(ADMIN_PASSWORD)
            state.update(admin_password_set=True, admin_password=ADMIN_PASSWORD)
            save_state(state)
            return token
        raise
    new_password = ADMIN_PASSWORD or generate_password()
    profile = request("GET", "/user/profile", token=token)
    request(
        "PUT",
        f"/user_manage/{profile['id']}/re_password",
        {"password": new_password, "re_password": new_password},
        token=token,
    )
    state.update(admin_password_set=True, admin_password=new_password)
    save_state(state)
    if not ADMIN_PASSWORD:
        with open(os.path.join(STATE_DIR, "admin-passwort.txt"), "w", encoding="utf-8") as f:
            f.write(new_password + "\n")
        os.chmod(os.path.join(STATE_DIR, "admin-passwort.txt"), 0o600)
        log("Admin-Passwort wurde erzeugt und in daten/setup/admin-passwort.txt abgelegt.")
    else:
        log("Admin-Passwort aus FREDKI_ADMIN_PASSWORD gesetzt.")
    return login(new_password)


def detect_model_name():
    if MODEL_NAME:
        return MODEL_NAME
    if PROVIDER == "vllm":
        base = MODEL_API_URL.rstrip("/")
        base = base if base.endswith("/v1") else base + "/v1"
        req = urllib.request.Request(f"{base}/models", headers={"Authorization": f"Bearer {MODEL_API_KEY}"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            models = json.loads(resp.read().decode("utf-8")).get("data", [])
        names = [m.get("id") for m in models if m.get("id")]
    else:
        with urllib.request.urlopen(f"{MODEL_API_URL.rstrip('/')}/api/tags", timeout=15) as resp:
            names = [m.get("name") for m in json.loads(resp.read().decode("utf-8")).get("models", [])]
    preferred = [n for n in names if "ministral" in n.lower()] or names
    if not preferred:
        raise RuntimeError("Am Modellserver wurde kein Modell gefunden. Bitte MODEL_NAME setzen.")
    log(f"Modell automatisch erkannt: {preferred[0]}")
    return preferred[0]


def create_model(token, model_type, display_name, model_name):
    provider_key = {"vllm": "model_vllm_provider", "ollama": "model_ollama_provider"}[PROVIDER]
    data = request(
        "POST",
        f"/workspace/{WS}/model",
        {
            "name": display_name,
            "provider": provider_key,
            "model_type": model_type,
            "model_name": model_name,
            "model_params_form": [],
            "credential": {"api_base": MODEL_API_URL, "api_key": MODEL_API_KEY},
        },
        token=token,
        timeout=180,
    )
    return data["id"]


def step_models(state, token):
    if state.get("llm_model_id"):
        return
    if not MODEL_API_URL:
        raise RuntimeError("MODEL_API_URL ist nicht gesetzt (Adresse des Modellservers, z. B. http://gpu:8000/v1).")
    if PROVIDER not in ("vllm", "ollama"):
        raise RuntimeError("MODEL_PROVIDER muss 'vllm' oder 'ollama' sein.")
    model_name = detect_model_name()
    state["model_name"] = model_name
    state["llm_model_id"] = create_model(token, "LLM", "Ministral (Text + Bild)", model_name)
    save_state(state)
    log("Sprachmodell angelegt.")
    try:
        state["image_model_id"] = create_model(token, "IMAGE", "Ministral (Bildmodell)", model_name)
        log("Bildmodell angelegt.")
    except RuntimeError as e:
        log(f"Hinweis: Bildmodell nicht angelegt ({e}). Der Agent nutzt das Sprachmodell mit Bildfunktion.")
    save_state(state)


def read_tool(filename, replacements=None):
    with open(os.path.join(TOOLS_DIR, filename), encoding="utf-8") as f:
        code = f.read()
    for key, value in (replacements or {}).items():
        code = code.replace(key, value)
    return code


def create_tool(token, name, desc, code, fields):
    data = request(
        "POST",
        f"/workspace/{WS}/tool",
        {
            "name": name,
            "desc": desc,
            "code": code,
            "input_field_list": fields,
            "init_field_list": [],
            "is_active": True,
            "folder_id": WS,
        },
        token=token,
    )
    tool_id = data["id"] if isinstance(data, dict) else data
    request(
        "PUT",
        f"/workspace/{WS}/tool/{tool_id}",
        {"name": name, "desc": desc, "code": code, "input_field_list": fields, "is_active": True},
        token=token,
    )
    return tool_id


def step_tools(state, token):
    if not state.get("tool_websuche_id"):
        state["tool_websuche_id"] = create_tool(
            token,
            "Websuche",
            "Sucht aktuelle Informationen im Internet (über die eigene Suchmaschine SearXNG).",
            read_tool("websuche.py", {"__SEARXNG_URL__": SEARXNG_URL}),
            [
                {"name": "suchbegriff", "type": "string", "is_required": True, "source": "custom", "desc": "Suchbegriff"},
                {"name": "anzahl", "type": "int", "is_required": False, "source": "custom", "desc": "Anzahl Treffer"},
            ],
        )
        save_state(state)
        log("Werkzeug „Websuche“ angelegt.")
    if not state.get("tool_seite_lesen_id"):
        state["tool_seite_lesen_id"] = create_tool(
            token,
            "Seite lesen",
            "Öffnet eine Webseite und gibt ihren Text zurück.",
            read_tool("seite_lesen.py"),
            [{"name": "url", "type": "string", "is_required": True, "source": "custom", "desc": "Adresse der Seite"}],
        )
        save_state(state)
        log("Werkzeug „Seite lesen“ angelegt.")


SYSTEM_PROMPT = """Du bist der FredKI Assistent. Antworte freundlich, klar und auf Deutsch, außer der Nutzer schreibt in einer anderen Sprache.

Bilder: Wenn der Nutzer ein Bild hochlädt, beschreibe und erkläre es genau. Lies enthaltenen Text vollständig ab, wenn danach gefragt wird.

Websuche: Nutze das Werkzeug „websuche“, wenn eine Frage aktuelle Informationen braucht (Nachrichten, Preise, Termine, neue Entwicklungen) oder wenn du dir nicht sicher bist. Mit „seite_lesen“ kannst du einen Treffer genauer lesen. Verwende dann nur Informationen aus den Treffern und nenne am Ende die Quellen als Links. Erfinde keine Quellen."""


def build_workflow(state):
    llm_id = state["llm_model_id"]
    tool_ids = [state["tool_websuche_id"], state["tool_seite_lesen_id"]]
    file_upload_setting = {
        "maxFiles": 3,
        "fileLimit": 20,
        "document": False,
        "image": True,
        "audio": False,
        "video": False,
        "other": False,
        "otherExtensions": [],
        "local_upload": True,
        "url_upload": False,
    }
    start_fields = [{"label": "Benutzerfrage", "value": "question"}, {"label": "Bild", "value": "image"}]
    chat_id = "fredki-ai-chat"
    return {
        "nodes": [
            {
                "id": "base-node",
                "type": "base-node",
                "x": 360,
                "y": 2810,
                "properties": {
                    "config": {},
                    "height": 825.6,
                    "stepName": "Basisinformationen",
                    "node_data": {
                        "desc": "",
                        "name": AGENT_NAME,
                        "prologue": "Hallo, ich bin der FredKI Assistent. Du kannst mir Fragen stellen, "
                        "Bilder hochladen oder mich etwas im Internet nachschlagen lassen.",
                        "file_upload_enable": True,
                        "file_upload_setting": file_upload_setting,
                    },
                    "input_field_list": [],
                },
            },
            {
                "id": "start-node",
                "type": "start-node",
                "x": 430,
                "y": 3660,
                "properties": {
                    "config": {
                        "fields": start_fields,
                        "globalFields": [{"label": "Aktuelle Zeit", "value": "time"}],
                    },
                    "fields": start_fields,
                    "height": 276,
                    "stepName": "Start",
                    "globalFields": [{"label": "Aktuelle Zeit", "value": "time"}],
                },
            },
            {
                "id": chat_id,
                "type": "ai-chat-node",
                "x": 1000,
                "y": 3660,
                "properties": {
                    "config": {"fields": [{"label": "KI-Antwort", "value": "answer"}]},
                    "height": 763,
                    "stepName": "KI-Chat",
                    "node_data": {
                        "prompt": "{{Start.question}}",
                        "system": SYSTEM_PROMPT,
                        "model_id": llm_id,
                        "model_id_type": "custom",
                        "dialogue_number": 6,
                        "is_result": True,
                        "dialogue_type": "WORKFLOW",
                        "vision": True,
                        "image_list": ["start-node", "image"],
                        "tool_ids": tool_ids,
                        "mcp_output_enable": False,
                    },
                },
            },
        ],
        "edges": [
            {
                "id": "fredki-edge-start-chat",
                "type": "app-edge",
                "sourceNodeId": "start-node",
                "targetNodeId": chat_id,
                "startPoint": {"x": 590, "y": 3660},
                "endPoint": {"x": 840, "y": 3660},
                "properties": {},
                "pointsList": [
                    {"x": 590, "y": 3660},
                    {"x": 700, "y": 3660},
                    {"x": 730, "y": 3660},
                    {"x": 840, "y": 3660},
                ],
                "sourceAnchorId": "start-node_right",
                "targetAnchorId": f"{chat_id}_left",
            }
        ],
    }


def step_agent(state, token):
    if not state.get("agent_id"):
        work_flow = build_workflow(state)
        base = work_flow["nodes"][0]["properties"]["node_data"]
        data = request(
            "POST",
            f"/workspace/{WS}/application",
            {
                "name": AGENT_NAME,
                "desc": "Beantwortet Fragen, versteht hochgeladene Bilder und sucht bei Bedarf im Internet.",
                "prologue": base["prologue"],
                "type": "WORK_FLOW",
                "folder_id": WS,
                "work_flow": work_flow,
                "file_upload_enable": True,
                "file_upload_setting": base["file_upload_setting"],
            },
            token=token,
        )
        state["agent_id"] = data["id"]
        save_state(state)
        log(f"Agent „{AGENT_NAME}“ angelegt.")
    if not state.get("agent_published"):
        request("PUT", f"/workspace/{WS}/application/{state['agent_id']}/publish", {}, token=token, timeout=120)
        state["agent_published"] = True
        save_state(state)
        log(f"Agent „{AGENT_NAME}“ veröffentlicht.")


def main():
    state = load_state()
    if state.get("done"):
        log("Einrichtung ist bereits abgeschlossen – nichts zu tun.")
        return 0
    wait_for_fredki()
    token = step_admin_password(state)
    step_models(state, token)
    step_tools(state, token)
    step_agent(state, token)
    state["done"] = True
    save_state(state)
    domain = os.environ.get("DOMAIN", "")
    log("Fertig. FredKI ist eingerichtet.")
    if domain:
        log(f"Verwaltung: https://{domain}/admin  (Benutzer: admin)")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        log(f"FEHLER: {e}")
        log("Nach Behebung erneut starten mit:  docker compose run --rm setup")
        sys.exit(1)
