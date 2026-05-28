from http.server import BaseHTTPRequestHandler
import json, base64, io
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.chart import BarChart, Reference

MRK = "FF1F4E2E"; LYS = "FFE8F0EA"; GUL = "FFC9A84C"
ROD_T = "FF8B2020"; GRN_T = "FF1F4E2E"; CREAM = "FFF5F0E8"
HVIT = "FFFFFFFF"; MRK_T = "FF0F1A12"; GRAA = "FF5A6E5E"
BLA_LYS = "FFF0F4FF"; GRNN_LYS = "FFD4E6D8"

def fyll(hex): return PatternFill("solid", start_color=hex, end_color=hex)
def f(bold=False, color="FF000000", size=10, italic=False):
    return Font(name="Arial", bold=bold, color=color, size=size, italic=italic)
def sentr(): return Alignment(horizontal="center", vertical="center", wrap_text=True)
def venst(): return Alignment(horizontal="left", vertical="center")
def hoyr(): return Alignment(horizontal="right", vertical="center")
def kant():
    t = Side(style="thin", color="FFEDE7D9")
    return Border(left=t, right=t, top=t, bottom=t)

def sett_bredde(ws, col, w): ws.column_dimensions[get_column_letter(col)].width = w

def hdr(ws, r, c, tekst):
    cel = ws.cell(row=r, column=c, value=tekst)
    cel.font = f(bold=True, color=HVIT, size=10)
    cel.fill = fyll(MRK); cel.alignment = sentr(); cel.border = kant()

def seksjon_hdr(ws, r, c1, c2, tekst):
    for c in range(c1, c2+1):
        ws.cell(row=r, column=c).fill = fyll(MRK)
        ws.cell(row=r, column=c).border = kant()
    cel = ws.cell(row=r, column=c1, value=tekst)
    cel.font = f(bold=True, color=HVIT, size=11)
    cel.alignment = sentr()
    ws.merge_cells(start_row=r, start_column=c1, end_row=r, end_column=c2)

def celle(ws, r, c, v=None, bold=False, farge=MRK_T, bg=HVIT, fmt=None, aln="left"):
    cel = ws.cell(row=r, column=c, value=v)
    cel.font = f(bold=bold, color=farge, size=10)
    cel.fill = fyll(bg)
    cel.alignment = hoyr() if aln=="right" else (sentr() if aln=="center" else venst())
    cel.border = kant()
    if fmt: cel.number_format = fmt
    return cel

KR_FMT = '#,##0" kr";[Red]-#,##0" kr";"-"'

def lag_excel(kalkulator, tall):
    wb = Workbook()

    ws = wb.active
    ws.title = "Månedlig budsjett"
    sett_bredde(ws, 1, 30); sett_bredde(ws, 2, 18); sett_bredde(ws, 3, 18); sett_bredde(ws, 4, 18)

    inntekter = tall.get("inntektLinjer", [])
    kostnader = tall.get("kostnadLinjer", [])
    skatt_sats = tall.get("skattSats", 0.22)
    inntekt = tall.get("inntekt", 0)
    total_kost = tall.get("totalKost", 0)
    brutto = inntekt - total_kost
    skatt = max(0, brutto * skatt_sats)
    netto = brutto - skatt

    kalkulator_navn = {
        "eiendom-privat": "EIENDOM PRIVAT",
        "eiendom-as": "EIENDOM VIA AS",
        "bil": "BILUTLEIE",
        "salong": "SALONG"
    }.get(kalkulator, kalkulator.upper())

    ws.row_dimensions[1].height = 38
    ws.merge_cells("A1:D1")
    cel = ws["A1"]; cel.value = f"BUDSJETTARK — {kalkulator_navn}"
    cel.font = f(bold=True, color=HVIT, size=14)
    cel.fill = fyll(MRK); cel.alignment = sentr()

    ws.row_dimensions[2].height = 16
    ws.merge_cells("A2:D2")
    ws["A2"].value = "Tall hentet fra kalkulatoren · Fyll inn faktiske tall i de blå cellene"
    ws["A2"].font = f(color=GRAA, size=9, italic=True)
    ws["A2"].alignment = sentr(); ws["A2"].fill = fyll(CREAM)

    ws.row_dimensions[3].height = 8

    ws.row_dimensions[4].height = 22
    seksjon_hdr(ws, 4, 1, 4, "SAMMENDRAG")
    ws.row_dimensions[5].height = 18
    for c, t in enumerate(["BESKRIVELSE","BUDSJETT","FAKTISK","AVVIK"], 1):
        hdr(ws, 5, c, t)

    samm_rader = [
        ("Inntekter", inntekt, GRN_T),
        ("Kostnader", total_kost, ROD_T),
        ("Brutto resultat", brutto, GRN_T if brutto>=0 else ROD_T),
        ("Skatt (%d%%)" % int(skatt_sats*100), skatt, "FF7A5A1E"),
        ("Netto resultat", netto, GRN_T if netto>=0 else ROD_T),
    ]
    for i, (navn, bud, farve) in enumerate(samm_rader):
        r = 6 + i
        ws.row_dimensions[r].height = 18
        er_siste = i == len(samm_rader) - 1
        bg = LYS if er_siste else HVIT
        celle(ws, r, 1, navn, bold=er_siste, bg=bg)
        celle(ws, r, 2, bud, bold=er_siste, farge=farve, bg=bg, fmt=KR_FMT, aln="right")
        celle(ws, r, 3, None, bg=BLA_LYS, fmt=KR_FMT, aln="right")
        celle(ws, r, 4, f"=IF(C{r}=\"\",\"-\",C{r}-B{r})", bg=HVIT, fmt=KR_FMT, aln="right")

    rad = 12

    ws.row_dimensions[rad].height = 8; rad += 1
    ws.row_dimensions[rad].height = 22
    seksjon_hdr(ws, rad, 1, 4, "INNTEKTER"); rad += 1
    ws.row_dimensions[rad].height = 18
    for c, t in enumerate(["BESKRIVELSE","BUDSJETT","FAKTISK","AVVIK"], 1):
        hdr(ws, rad, c, t)
    rad += 1
    inn_start = rad
    for l in inntekter:
        ws.row_dimensions[rad].height = 18
        celle(ws, rad, 1, l["navn"], bg=CREAM if rad%2==0 else HVIT)
        celle(ws, rad, 2, l["verdi"], farge=GRN_T, bg=CREAM if rad%2==0 else HVIT, fmt=KR_FMT, aln="right")
        celle(ws, rad, 3, None, bg=BLA_LYS, fmt=KR_FMT, aln="right")
        celle(ws, rad, 4, f"=IF(C{rad}=\"\",\"-\",C{rad}-B{rad})", bg=HVIT, fmt=KR_FMT, aln="right")
        rad += 1
    inn_slutt = rad - 1
    ws.row_dimensions[rad].height = 18
    celle(ws, rad, 1, "Sum inntekter", bold=True, bg=LYS)
    celle(ws, rad, 2, f"=SUM(B{inn_start}:B{inn_slutt})", bold=True, farge=GRN_T, bg=LYS, fmt=KR_FMT, aln="right")
    celle(ws, rad, 3, f"=IF(COUNTA(C{inn_start}:C{inn_slutt})=0,\"-\",SUM(C{inn_start}:C{inn_slutt}))", bold=True, bg=LYS, fmt=KR_FMT, aln="right")
    celle(ws, rad, 4, f"=IF(C{rad}=\"-\",\"-\",C{rad}-B{rad})", bold=True, bg=LYS, fmt=KR_FMT, aln="right")
    rad += 1

    ws.row_dimensions[rad].height = 8; rad += 1
    ws.row_dimensions[rad].height = 22
    seksjon_hdr(ws, rad, 1, 4, "KOSTNADER"); rad += 1
    ws.row_dimensions[rad].height = 18
    for c, t in enumerate(["BESKRIVELSE","BUDSJETT","FAKTISK","AVVIK"], 1):
        hdr(ws, rad, c, t)
    rad += 1
    kost_start = rad
    for l in kostnader:
        ws.row_dimensions[rad].height = 18
        celle(ws, rad, 1, l["navn"], bg=CREAM if rad%2==0 else HVIT)
        celle(ws, rad, 2, l["verdi"], farge=ROD_T, bg=CREAM if rad%2==0 else HVIT, fmt=KR_FMT, aln="right")
        celle(ws, rad, 3, None, bg=BLA_LYS, fmt=KR_FMT, aln="right")
        celle(ws, rad, 4, f"=IF(C{rad}=\"\",\"-\",C{rad}-B{rad})", bg=HVIT, fmt=KR_FMT, aln="right")
        rad += 1
    kost_slutt = rad - 1
    ws.row_dimensions[rad].height = 18
    celle(ws, rad, 1, "Sum kostnader", bold=True, bg=LYS)
    celle(ws, rad, 2, f"=SUM(B{kost_start}:B{kost_slutt})", bold=True, farge=ROD_T, bg=LYS, fmt=KR_FMT, aln="right")
    celle(ws, rad, 3, f"=IF(COUNTA(C{kost_start}:C{kost_slutt})=0,\"-\",SUM(C{kost_start}:C{kost_slutt}))", bold=True, bg=LYS, fmt=KR_FMT, aln="right")
    celle(ws, rad, 4, f"=IF(C{rad}=\"-\",\"-\",C{rad}-B{rad})", bold=True, bg=LYS, fmt=KR_FMT, aln="right")
    rad += 1

    ws.row_dimensions[rad].height = 8; rad += 1
    ws.row_dimensions[rad].height = 22
    seksjon_hdr(ws, rad, 1, 4, "NETTO RESULTAT PER MÅNED"); rad += 1
    ws.row_dimensions[rad].height = 28
    celle(ws, rad, 1, "Netto (etter skatt)", bold=True, bg=LYS)
    celle(ws, rad, 2, netto, bold=True, farge=GRN_T if netto>=0 else ROD_T, bg=LYS, fmt=KR_FMT, aln="right")
    celle(ws, rad, 3, None, bg=BLA_LYS, fmt=KR_FMT, aln="right")
    celle(ws, rad, 4, f"=IF(C{rad}=\"\",\"-\",C{rad}-B{rad})", bold=True, bg=LYS, fmt=KR_FMT, aln="right")
    rad += 1
    ws.row_dimensions[rad].height = 18
    celle(ws, rad, 1, "Årlig netto (estimert)", bg=CREAM)
    celle(ws, rad, 2, f"=B{rad-1}*12", farge=GRN_T if netto>=0 else ROD_T, bg=CREAM, fmt=KR_FMT, aln="right")
    celle(ws, rad, 3, f"=IF(C{rad-1}=\"\",\"-\",C{rad-1}*12)", bg=CREAM, fmt=KR_FMT, aln="right")
    celle(ws, rad, 4, f"=IF(C{rad}=\"-\",\"-\",C{rad}-B{rad})", bg=CREAM, fmt=KR_FMT, aln="right")

    rad += 2
    ws.merge_cells(start_row=rad, start_column=1, end_row=rad, end_column=4)
    cel = ws.cell(row=rad, column=1, value="Blå celler = fyll inn faktiske tall  ·  Avvik = Faktisk minus Budsjett")
    cel.font = f(color=GRAA, size=9, italic=True)
    cel.alignment = venst()

    # 12-MÅNEDER ARK
    ws2 = wb.create_sheet("12-måneder")
    sett_bredde(ws2, 1, 10)
    for c in range(2, 9): sett_bredde(ws2, c, 16)

    ws2.row_dimensions[1].height = 38
    ws2.merge_cells("A1:H1")
    cel = ws2["A1"]; cel.value = f"12-MÅNEDERS OVERSIKT — {kalkulator_navn}"
    cel.font = f(bold=True, color=HVIT, size=14)
    cel.fill = fyll(MRK); cel.alignment = sentr()

    ws2.row_dimensions[2].height = 16
    ws2.merge_cells("A2:H2")
    ws2["A2"].value = "Månedlig fordeling basert på kalkulatortallene"
    ws2["A2"].font = f(color=GRAA, size=9, italic=True)
    ws2["A2"].alignment = sentr(); ws2["A2"].fill = fyll(CREAM)

    ws2.row_dimensions[3].height = 18
    for c, t in enumerate(["MÅNED","INNTEKT","KOSTNADER","BRUTTO","SKATT","NETTO","AKKUMULERT","NETTO MÅL"], 1):
        hdr(ws2, 3, c, t)

    maaneder = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"]
    for i, mnd in enumerate(maaneder):
        r = 4 + i
        ws2.row_dimensions[r].height = 18
        bg = CREAM if i%2==0 else HVIT
        celle(ws2, r, 1, mnd, bold=True, bg=bg)
        celle(ws2, r, 2, inntekt, farge=GRN_T, bg=bg, fmt=KR_FMT, aln="right")
        celle(ws2, r, 3, total_kost, farge=ROD_T, bg=bg, fmt=KR_FMT, aln="right")
        celle(ws2, r, 4, f"=B{r}-C{r}", bg=bg, fmt=KR_FMT, aln="right")
        celle(ws2, r, 5, f"=MAX(0,D{r}*{skatt_sats})", farge="FF7A5A1E", bg=bg, fmt=KR_FMT, aln="right")
        celle(ws2, r, 6, f"=D{r}-E{r}", bold=True, bg=bg, fmt=KR_FMT, aln="right")
        akk_f = f"=F{r}" if i==0 else f"=G{r-1}+F{r}"
        celle(ws2, r, 7, akk_f, bold=True, bg=bg, fmt=KR_FMT, aln="right")
        celle(ws2, r, 8, None, bg=BLA_LYS, fmt=KR_FMT, aln="right")

    ws2.row_dimensions[16].height = 22
    celle(ws2, 16, 1, "TOTALT", bold=True, farge=HVIT, bg=MRK, aln="center")
    for c, frm in enumerate([
        "=SUM(B4:B15)","=SUM(C4:C15)","=SUM(D4:D15)",
        "=SUM(E4:E15)","=SUM(F4:F15)","=G15","=SUM(H4:H15)"
    ], 2):
        celle(ws2, 16, c, frm, bold=True, farge=HVIT, bg=MRK, fmt=KR_FMT, aln="right")

    chart = BarChart()
    chart.type = "col"
    chart.title = "Månedlig netto resultat"
    chart.y_axis.title = "NOK"
    chart.style = 10; chart.width = 22; chart.height = 13
    data_ref = Reference(ws2, min_col=6, max_col=6, min_row=3, max_row=15)
    cats = Reference(ws2, min_col=1, min_row=4, max_row=15)
    chart.add_data(data_ref, titles_from_data=True)
    chart.set_categories(cats)
    chart.series[0].graphicalProperties.solidFill = "1F4E2E"
    ws2.add_chart(chart, "A18")

    # INFO ARK
    ws3 = wb.create_sheet("Info")
    sett_bredde(ws3, 1, 8); sett_bredde(ws3, 2, 50)
    ws3.merge_cells("A1:B1")
    cel = ws3["A1"]; cel.value = "BRUKERGUIDE"
    cel.font = f(bold=True, color=HVIT, size=12)
    cel.fill = fyll(MRK); cel.alignment = sentr()

    guide = [
        ("", ""),
        ("FARGE", "BETYR"),
        ("Hvit/kremfarget celle", "Budsjett-tall fra kalkulatoren"),
        ("Blå celle", "Faktisk beløp — fyll inn her"),
        ("Grønn tekst", "Inntekter eller positiv verdi"),
        ("Rød tekst", "Kostnader eller negativ verdi"),
        ("", ""),
        ("AVVIK", "Faktisk minus Budsjett. Positivt = bedre enn budsjett."),
        ("", ""),
        ("TIPS", "Oppdater faktiske tall månedlig for best oversikt."),
    ]
    for i, (k, v) in enumerate(guide):
        r = 2 + i
        ws3.row_dimensions[r].height = 18
        cel1 = ws3.cell(row=r, column=1, value=k)
        cel2 = ws3.cell(row=r, column=2, value=v)
        if k in ("FARGE","AVVIK","TIPS"):
            cel1.font = f(bold=True, color=HVIT, size=10)
            cel1.fill = fyll(MRK)
            cel2.font = f(bold=True, color=HVIT, size=10)
            cel2.fill = fyll(MRK)
        else:
            cel1.font = f(color=MRK_T, size=10)
            cel2.font = f(color=MRK_T, size=10)
            bg = CREAM if i%2==0 else HVIT
            cel1.fill = fyll(bg); cel2.fill = fyll(bg)
        cel1.border = kant(); cel2.border = kant()
        cel1.alignment = venst(); cel2.alignment = venst()

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return base64.b64encode(buf.read()).decode()


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        data = json.loads(self.rfile.read(length))
        result = lag_excel(data.get("kalkulator", "eiendom-privat"), data.get("tall", {}))
        body = json.dumps({"xlsx": result}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()