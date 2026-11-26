import os
import re
import secrets
import urllib.parse

_FILES_DIR = "/tmp/fredki-dateien"
_LINK_PREFIX = "/chat/fredki-datei"
_W_REG = [
    278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
    1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
    333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
    556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584, 761,
    556, 0, 222, 556, 333, 1000, 556, 556, 333, 1000, 667, 333, 1000, 0, 611, 0,
    0, 222, 222, 333, 333, 350, 556, 1000, 333, 1000, 500, 333, 944, 0, 500, 667,
    278, 333, 556, 556, 556, 556, 260, 556, 333, 737, 370, 556, 584, 333, 737, 333,
    400, 584, 333, 333, 333, 556, 537, 278, 333, 333, 365, 556, 834, 834, 834, 611,
    667, 667, 667, 667, 667, 667, 1000, 722, 667, 667, 667, 667, 278, 278, 278, 278,
    722, 722, 778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667, 667, 611,
    556, 556, 556, 556, 556, 556, 889, 500, 556, 556, 556, 556, 278, 278, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 584, 611, 556, 556, 556, 556, 500, 556, 500,
]
_W_BOLD = [
    278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
    975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
    333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
    611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584, 761,
    556, 0, 278, 556, 500, 1000, 556, 556, 333, 1000, 667, 333, 1000, 0, 611, 0,
    0, 278, 278, 500, 500, 350, 556, 1000, 333, 1000, 556, 333, 944, 0, 500, 667,
    278, 333, 556, 556, 556, 556, 280, 556, 333, 737, 370, 556, 584, 333, 737, 333,
    400, 584, 333, 333, 333, 611, 556, 278, 333, 333, 365, 556, 834, 834, 834, 611,
    722, 722, 722, 722, 722, 722, 1000, 722, 667, 667, 667, 667, 278, 278, 278, 278,
    722, 722, 778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667, 667, 611,
    556, 556, 556, 556, 556, 556, 889, 556, 556, 556, 556, 556, 278, 278, 278, 278,
    611, 611, 611, 611, 611, 611, 611, 584, 611, 611, 611, 611, 611, 556, 611, 556,
]


def _inline_runs(text):
    """Zerlegt **fett** in Abschnitte: [(text, fett), ...]."""
    runs = []
    for i, part in enumerate(re.split(r"\*\*", text)):
        if part:
            runs.append((part.replace("__", ""), i % 2 == 1))
    return runs or [("", False)]


def _parse_markdown(md):
    """Einfacher Markdown-Leser: Überschriften, Absätze, Listen, Tabellen, Trennlinien."""
    blocks, para, table = [], [], []

    def flush_para():
        if para:
            blocks.append(("p", " ".join(s.strip() for s in para)))
            para.clear()

    def flush_table():
        if table:
            rows = [r for r in table if not re.match(r"^\s*\|?\s*:?-{2,}", r)]
            cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
            if cells:
                blocks.append(("table", cells))
            table.clear()

    for raw in (md or "").replace("\r\n", "\n").split("\n"):
        line = raw.rstrip()
        if line.strip().startswith("|"):
            flush_para()
            table.append(line)
            continue
        flush_table()
        if not line.strip():
            flush_para()
            continue
        m = re.match(r"^(#{1,4})\s+(.*)$", line.strip())
        if m:
            flush_para()
            blocks.append(("h", len(m.group(1)), m.group(2).strip()))
            continue
        if re.match(r"^\s*(-{3,}|\*{3,}|_{3,})\s*$", line):
            flush_para()
            blocks.append(("hr",))
            continue
        m = re.match(r"^(\s*)([-*+•])\s+(.*)$", line)
        if m:
            flush_para()
            blocks.append(("li", "•", m.group(3), len(m.group(1)) // 2))
            continue
        m = re.match(r"^(\s*)(\d+[.)])\s+(.*)$", line)
        if m:
            flush_para()
            blocks.append(("li", m.group(2), m.group(3), len(m.group(1)) // 2))
            continue
        para.append(line)
    flush_para()
    flush_table()
    return blocks


def _safe_filename(title, ext):
    base = re.sub(r"[^\w\- äöüÄÖÜß]", "", title or "Dokument").strip().replace(" ", "_")
    return (base[:60] or "Dokument") + "." + ext


# ---------------------------------------------------------------- PDF ----------

def _enc(s):
    return s.encode("cp1252", errors="replace")


def _width(s, bold, size):
    table = _W_BOLD if bold else _W_REG
    total = 0
    for b in _enc(s):
        w = table[b - 32] if 32 <= b < 256 else 500
        total += w * 0.65 if b == 0xAE else w  # ® wird verkleinert und hochgestellt gesetzt
    return total * size / 1000.0


def _pdf_str(s):
    data = _enc(s).replace(b"\\", b"\\\\").replace(b"(", b"\\(").replace(b")", b"\\)")
    return b"(" + data + b")"


def _wrap_runs(runs, size, max_width):
    """Bricht formatierte Abschnitte in Zeilen um: [[(text, fett), ...], ...]."""
    words = []
    for text, bold in runs:
        for piece in re.split(r"(\s+)", text):
            if piece:
                words.append((piece, bold))
    lines, line, width = [], [], 0.0
    for piece, bold in words:
        if piece.isspace():
            if line:
                w = _width(" ", bold, size)
                line.append((" ", bold))
                width += w
            continue
        w = _width(piece, bold, size)
        if line and width + w > max_width:
            while line and line[-1][0] == " ":
                width -= _width(" ", line[-1][1], size)
                line.pop()
            lines.append(line)
            line, width = [], 0.0
        while w > max_width and len(piece) > 1:
            cut = len(piece)
            while cut > 1 and _width(piece[:cut], bold, size) > max_width:
                cut -= 1
            lines.append([(piece[:cut], bold)])
            piece = piece[cut:]
            w = _width(piece, bold, size)
        line.append((piece, bold))
        width += w
    if line:
        lines.append(line)
    return lines or [[("", False)]]


class _PdfBuilder:
    W, H, M = 595.28, 841.89, 56.0

    def __init__(self, title):
        self.title = title
        self.pages = []
        self.ops = None
        self.y = 0.0
        self._new_page()

    def _new_page(self):
        if self.ops is not None:
            self.pages.append(self.ops)
        self.ops = []
        self.y = self.H - self.M

    def _need(self, height):
        if self.y - height < self.M + 20:
            self._new_page()

    def text(self, x, y, s, bold=False, size=10.5, gray=0.0):
        font = b"/F2" if bold else b"/F1"
        for i, part in enumerate(s.split("\u00ae")):
            if i > 0:  # ® verkleinert und hochgestellt
                self.ops.append(b"BT %s %.2f Tf %.3f g %.2f %.2f Td %s Tj ET"
                                % (font, size * 0.65, gray, x, y + size * 0.35, _pdf_str("\u00ae")))
                x += _width("\u00ae", bold, size)
            if part:
                self.ops.append(b"BT %s %.2f Tf %.3f g %.2f %.2f Td %s Tj ET" % (font, size, gray, x, y, _pdf_str(part)))
                x += _width(part, bold, size)

    def line(self, x1, y1, x2, y2, gray=0.6, width=0.6):
        self.ops.append(b"%.3f G %.2f w %.2f %.2f m %.2f %.2f l S" % (gray, width, x1, y1, x2, y2))

    def rect_fill(self, x, y, w, h, gray):
        self.ops.append(b"%.3f g %.2f %.2f %.2f %.2f re f" % (gray, x, y, w, h))

    def paragraph(self, runs, size=10.5, indent=0.0, space_after=6.0, prefix=None):
        width = self.W - 2 * self.M - indent
        leading = size * 1.4
        for i, ln in enumerate(_wrap_runs(runs, size, width)):
            self._need(leading)
            self.y -= leading
            if i == 0 and prefix:
                self.text(self.M + indent - 14, self.y, prefix, False, size)
            x = self.M + indent
            for piece, bold in ln:
                self.text(x, self.y, piece, bold, size)
                x += _width(piece, bold, size)
        self.y -= space_after

    def table(self, rows):
        cols = max(len(r) for r in rows)
        rows = [r + [""] * (cols - len(r)) for r in rows]
        size, pad = 9.5, 4.0
        total = self.W - 2 * self.M
        col_w = total / cols
        leading = size * 1.35
        self.y -= 4
        for ri, row in enumerate(rows):
            wrapped = [_wrap_runs(_inline_runs(c), size, col_w - 2 * pad) for c in row]
            h = max(len(w) for w in wrapped) * leading + 2 * pad
            self._need(h)
            top = self.y
            if ri == 0:
                self.rect_fill(self.M, top - h, total, h, 0.92)
            for ci, lines in enumerate(wrapped):
                ty = top - pad
                for ln in lines:
                    ty -= leading
                    x = self.M + ci * col_w + pad
                    for piece, bold in ln:
                        self.text(x, ty + 3, piece, bold or ri == 0, size)
                        x += _width(piece, bold or ri == 0, size)
            self.line(self.M, top, self.M + total, top)
            self.line(self.M, top - h, self.M + total, top - h)
            for ci in range(cols + 1):
                self.line(self.M + ci * col_w, top, self.M + ci * col_w, top - h)
            self.y = top - h
        self.y -= 10

    def build(self):
        self.pages.append(self.ops)
        n = len(self.pages)
        for i, ops in enumerate(self.pages, 1):
            footer = "Seite %d von %d" % (i, n)
            self.ops = ops
            self.text(self.M, 30, self.title, False, 8, 0.5)
            self.text(self.W - self.M - _width(footer, False, 8), 30, footer, False, 8, 0.5)
        objs = [
            b"<< /Type /Catalog /Pages 2 0 R >>",
            None,
            b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
            b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
            b"<< /Title %s /Producer (FredKI) >>" % _pdf_str(self.title),
        ]
        kids = []
        for ops in self.pages:
            stream = b"\n".join(ops)
            objs.append(b"<< /Length %d >>\nstream\n" % len(stream) + stream + b"\nendstream")
            content_id = len(objs)
            objs.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 %.2f %.2f] "
                        b"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents %d 0 R >>"
                        % (self.W, self.H, content_id))
            kids.append(len(objs))
        objs[1] = b"<< /Type /Pages /Kids [%s] /Count %d >>" % (
            b" ".join(b"%d 0 R" % k for k in kids), len(kids))
        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = []
        for i, obj in enumerate(objs, 1):
            offsets.append(len(out))
            out += b"%d 0 obj\n" % i + obj + b"\nendobj\n"
        xref = len(out)
        out += b"xref\n0 %d\n0000000000 65535 f \n" % (len(objs) + 1)
        for off in offsets:
            out += b"%010d 00000 n \n" % off
        out += b"trailer\n<< /Size %d /Root 1 0 R /Info 5 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (len(objs) + 1, xref)
        return bytes(out)


def _make_pdf(title, blocks):
    pdf = _PdfBuilder(title)
    pdf.paragraph([(title, True)], size=20, space_after=7)
    pdf.line(pdf.M, pdf.y, pdf.W - pdf.M, pdf.y, gray=0.3, width=1.2)
    pdf.y -= 12
    sizes = {1: 16, 2: 13.5, 3: 12, 4: 11}
    for b in blocks:
        if b[0] == "h":
            pdf._need(40)
            pdf.y -= 6
            pdf.paragraph([(b[2].replace("**", ""), True)], size=sizes.get(b[1], 11), space_after=4)
        elif b[0] == "p":
            pdf.paragraph(_inline_runs(b[1]))
        elif b[0] == "li":
            pdf.paragraph(_inline_runs(b[2]), indent=18 + 16 * b[3], space_after=2, prefix=b[1])
        elif b[0] == "table":
            pdf.table(b[1])
        elif b[0] == "hr":
            pdf._need(12)
            pdf.y -= 6
            pdf.line(pdf.M, pdf.y, pdf.W - pdf.M, pdf.y)
            pdf.y -= 8
    return pdf.build()


# --------------------------------------------------------------- Word ----------

def _add_runs(paragraph, text, force_bold=False):
    for piece, bold in _inline_runs(text):
        for i, part in enumerate(piece.split("\u00ae")):
            if i > 0:
                sup = paragraph.add_run("\u00ae")
                sup.bold = bold or force_bold
                sup.font.superscript = True
            if part:
                paragraph.add_run(part).bold = bold or force_bold


def _make_docx(title, blocks, path):
    import docx

    doc = docx.Document()
    doc.core_properties.title = title
    _add_runs(doc.add_heading("", level=0), title)
    for b in blocks:
        if b[0] == "h":
            _add_runs(doc.add_heading("", level=min(b[1], 4)), b[2].replace("**", ""))
        elif b[0] in ("p", "li"):
            if b[0] == "li":
                style = "List Bullet" if b[1] == "•" else "List Number"
                if b[3] > 0:
                    style += " 2"
                p = doc.add_paragraph(style=style)
                text = b[2]
            else:
                p = doc.add_paragraph()
                text = b[1]
            _add_runs(p, text)
        elif b[0] == "table":
            rows = b[1]
            cols = max(len(r) for r in rows)
            t = doc.add_table(rows=len(rows), cols=cols)
            t.style = "Table Grid"
            for ri, row in enumerate(rows):
                for ci in range(cols):
                    cell = t.cell(ri, ci)
                    cell.text = ""
                    _add_runs(cell.paragraphs[0], row[ci] if ci < len(row) else "", ri == 0)
        elif b[0] == "hr":
            doc.add_paragraph("—" * 20)
    doc.save(path)


# -------------------------------------------------------------- Excel ----------

def _make_xlsx(title, blocks, path):
    import openpyxl
    from openpyxl.styles import Font, PatternFill

    wb = openpyxl.Workbook()
    tables = [b[1] for b in blocks if b[0] == "table"]
    if tables:
        for ti, rows in enumerate(tables):
            ws = wb.active if ti == 0 else wb.create_sheet()
            ws.title = ("Tabelle %d" % (ti + 1))[:31]
            for ri, row in enumerate(rows, 1):
                for ci, value in enumerate(row, 1):
                    clean = value.replace("**", "")
                    try:
                        number = float(clean.replace(".", "").replace(",", ".")) if re.match(
                            r"^-?[\d.]+(,\d+)?$", clean) else None
                    except ValueError:
                        number = None
                    cell = ws.cell(row=ri, column=ci, value=number if number is not None else clean)
                    if ri == 1:
                        cell.font = Font(bold=True)
                        cell.fill = PatternFill("solid", fgColor="E8EEF7")
            for column in ws.columns:
                width = max(len(str(c.value or "")) for c in column)
                ws.column_dimensions[column[0].column_letter].width = min(max(10, width + 2), 60)
            ws.freeze_panes = "A2"
    else:
        ws = wb.active
        ws.title = "Inhalt"
        ws.cell(row=1, column=1, value=title).font = Font(bold=True, size=14)
        r = 3
        for b in blocks:
            text = b[2] if b[0] in ("h", "li") else (b[1] if b[0] == "p" else "")
            if text:
                cell = ws.cell(row=r, column=1, value=text.replace("**", ""))
                if b[0] == "h":
                    cell.font = Font(bold=True)
                r += 1
        ws.column_dimensions["A"].width = 100
    wb.save(path)


def dokument_erstellen(titel: str, inhalt: str, dateiformat: str = "pdf") -> str:
    """Erstellt ein Dokument zum Herunterladen (PDF, Word oder Excel) aus Markdown-Text. inhalt: der vollständige Text in Markdown (Überschriften mit #, Listen mit -, Tabellen mit |, **fett**). dateiformat: pdf, docx oder xlsx (xlsx übernimmt Markdown-Tabellen als Tabellenblätter). Gibt einen Download-Link zurück, den du dem Nutzer unverändert weitergibst."""
    ext = (dateiformat or "pdf").lower().strip().lstrip(".")
    ext = {"word": "docx", "doc": "docx", "excel": "xlsx", "xls": "xlsx"}.get(ext, ext)
    if ext not in ("pdf", "docx", "xlsx"):
        return "Unbekanntes Format '%s'. Möglich sind: pdf, docx, xlsx." % dateiformat
    titel = (titel or "Dokument").strip()[:150]
    blocks = _parse_markdown(inhalt)
    token = secrets.token_urlsafe(16)
    folder = os.path.join(_FILES_DIR, token)
    try:
        os.makedirs(folder, exist_ok=True)
    except OSError as e:
        return "Die Datei konnte nicht gespeichert werden (%s). Bitte den Administrator informieren." % e
    filename = _safe_filename(titel, ext)
    path = os.path.join(folder, filename)
    try:
        if ext == "pdf":
            with open(path, "wb") as f:
                f.write(_make_pdf(titel, blocks))
        elif ext == "docx":
            _make_docx(titel, blocks, path)
        else:
            _make_xlsx(titel, blocks, path)
    except Exception as e:
        return "Beim Erstellen der Datei ist ein Fehler aufgetreten: %s" % e
    link = "%s/%s/%s" % (_LINK_PREFIX, token, urllib.parse.quote(filename))
    return ("Die Datei wurde erstellt. Gib dem Nutzer diesen Link genau so weiter "
            "(nicht verändern, nicht kürzen): [\U0001F4C4 %s herunterladen](%s) – der Link ist 24 Stunden gültig."
            % (filename, link))
