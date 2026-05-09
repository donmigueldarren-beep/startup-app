import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e; --brg-light: #2a6640; --brg-pale: #e8f0ea;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --text: #1a2e1e; --muted: #5a6e5e;
  }
  .sal-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .sal-step { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .sal-step-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .sal-step-num { width: 28px; height: 28px; background: var(--brg); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .sal-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .sal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .sal-field label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .sal-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border 0.2s; }
  .sal-field input[type=number]:focus { border-color: var(--brg); background: white; }
  .sal-divider { border: none; border-top: 1px solid var(--cream-dark); margin: 20px 0; }
  .sal-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--cream-dark); margin-bottom: 16px; }
  .sal-col { background: var(--cream); padding: 20px; }
  .sal-col-header { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .sal-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .sal-line:last-child { border-bottom: none; }
  .sal-line .k { color: var(--muted); }
  .sal-line .v { font-weight: 500; }
  .sal-result { font-family: 'Playfair Display', serif; font-size: 24px; margin: 10px 0 4px; }
  .sal-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; margin-top: 6px; }
  .sal-badge.green { background: var(--brg-pale); color: var(--brg); }
  .sal-badge.red { background: #fce8e8; color: #8b2020; }
  .sal-badge.amber { background: #fdf6e8; color: #7a5a1e; }
  .sal-verdict { padding: 14px 18px; font-size: 13px; line-height: 1.6; margin-bottom: 16px; border-left: 3px solid; }
  .sal-verdict.green { background: var(--brg-pale); color: var(--brg); border-color: var(--brg); }
  .sal-verdict.amber { background: #fdf6e8; color: #7a5a1e; border-color: var(--gold); }
  .sal-verdict.red { background: #fce8e8; color: #8b2020; border-color: #c84040; }
  .sal-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
  .sal-metric { background: var(--cream); padding: 16px; border: 1px solid var(--cream-dark); }
  .sal-metric .lbl { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .sal-metric .val { font-family: 'Playfair Display', serif; font-size: 20px; }
  .sal-metric .sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .sal-info { background: var(--cream); border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .sal-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .sal-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .sal-table th { text-align: left; padding: 8px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); border-bottom: 1px solid var(--cream-dark); font-weight: 500; }
  .sal-table td { padding: 10px 12px; border-bottom: 1px solid var(--cream-dark); }
  .sal-table tr:last-child td { border-bottom: none; }
  .sal-table tr:hover td { background: var(--cream); }
  .sal-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .sal-type-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 16px; }
  .sal-type-card { border: 1px solid var(--cream-dark); padding: 14px 10px; text-align: center; cursor: pointer; transition: all 0.2s; background: var(--cream); }
  .sal-type-card:hover { border-color: var(--brg); }
  .sal-type-card.active { border-color: var(--brg); background: var(--brg-pale); }
  .sal-type-card .ikon { font-size: 22px; margin-bottom: 6px; }
  .sal-type-card .navn { font-size: 11px; font-weight: 500; color: var(--dark); letter-spacing: 0.04em; }
  .sal-type-card .pris { font-size: 10px; color: var(--muted); margin-top: 2px; }
  .sal-enk-as { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
  .sal-enk-card { border: 1px solid var(--cream-dark); padding: 16px; cursor: pointer; transition: all 0.2s; background: var(--cream); }
  .sal-enk-card:hover { border-color: var(--brg); }
  .sal-enk-card.active { border-color: var(--brg); background: var(--brg-pale); }
  .sal-enk-card .tittel { font-family: 'Playfair Display', serif; font-size: 15px; color: var(--dark); margin-bottom: 6px; }
  .sal-enk-card .fordel { font-size: 11px; color: var(--muted); line-height: 1.5; }
  .sal-enk-card.active .tittel { color: var(--brg); }
  .sal-belegg-wrap { background: var(--cream); border: 1px solid var(--cream-dark); padding: 16px; margin-bottom: 16px; }
  .sal-belegg-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .sal-slider-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .sal-slider-val { font-size: 16px; font-weight: 500; font-family: 'Playfair Display', serif; color: var(--dark); }
  .sal-highlight { background: var(--brg-pale) !important; }
  .ai-seksjon { background: var(--dark); border: 1px solid #1a2e1e; padding: 28px; margin-bottom: 12px; }
  .ai-seksjon-tittel { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--cream); margin-bottom: 6px; display: flex; align-items: center; gap: 10px; }
  .ai-seksjon-sub { font-size: 12px; color: #3a6a46; margin-bottom: 20px; }
  .ai-analyse-knapp { background: var(--gold); color: var(--dark); border: none; padding: 12px 28px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; font-weight: 500; }
  .ai-analyse-knapp:hover { background: #b8943c; }
  .ai-analyse-knapp:disabled { opacity: 0.5; cursor: not-allowed; }
  .ai-analyse-resultat { background: #0a1a0c; border: 1px solid #1a3a1e; padding: 20px; margin-top: 16px; font-size: 14px; color: #9fc9a8; line-height: 1.8; white-space: pre-wrap; }
  .ai-chat { margin-top: 24px; border-top: 1px solid #1a2e1e; padding-top: 20px; }
  .ai-chat-tittel { font-size: 12px; color: #3a6a46; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px; }
  .ai-chat-meldinger { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; max-height: 320px; overflow-y: auto; }
  .ai-chat-melding { padding: 12px 16px; font-size: 13px; line-height: 1.6; max-width: 85%; }
  .ai-chat-melding.bruker { background: #1a3a1e; color: var(--cream); align-self: flex-end; }
  .ai-chat-melding.ai { background: #0a1a0c; color: #9fc9a8; align-self: flex-start; border: 1px solid #1a3a1e; }
  .ai-chat-melding.laster { color: #3a6a46; font-style: italic; }
  .ai-chat-input-wrap { display: flex; gap: 8px; }
  .ai-chat-input { flex: 1; padding: 10px 14px; background: #0a1a0c; border: 1px solid #1a3a1e; color: var(--cream); font-family: 'Inter', sans-serif; font-size: 13px; outline: none; }
  .ai-chat-input::placeholder { color: #2a4a2e; }
  .ai-chat-input:focus { border-color: var(--gold); }
  .ai-chat-send { background: var(--brg); color: var(--cream); border: none; padding: 10px 20px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .ai-chat-send:hover { background: #2a6640; }
  .ai-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
  .ai-spark { font-size: 16px; }
`;

const SALONG_TYPER = {
  frisor: {
    navn: 'Frisør', ikon: '✂️', prisPerBehandling: 650, behandlingerPerDag: 5,
    behandlingstidMin: 60, produktProsent: 12, oppstartUtstyr: 120000,
    oppstartInventar: 100000, husleie: 18000,
    fagkrav: 'Fagbrev kreves for å klippe selv. Du kan ansette faglærte uten fagbrev selv.',
    typiskPriser: 'Klipp dame: 500-900 kr, Herreklipp: 300-500 kr, Farge: 800-2000 kr',
    enk_anbefalt: true,
    enk_begrunnelse: 'ENK er vanligst for solosalong. AS lønner seg først ved 2+ ansatte eller høy gjeld.'
  },
  negler: {
    navn: 'Negler', ikon: '💅', prisPerBehandling: 500, behandlingerPerDag: 6,
    behandlingstidMin: 60, produktProsent: 18, oppstartUtstyr: 60000,
    oppstartInventar: 40000, husleie: 8000,
    fagkrav: 'Ingen formelt fagbrev kreves, men HMS-kurs anbefales. Lokalet må meldes kommunen.',
    typiskPriser: 'Gele negler: 400-700 kr, Neglforlengelse: 600-900 kr, Nailart: 100-300 kr ekstra',
    enk_anbefalt: true,
    enk_begrunnelse: 'Neglesalong drives nesten alltid som ENK eller ENK med leiestoler. Lav kapital kreves.'
  },
  hudpleie: {
    navn: 'Hudpleie', ikon: '🧖', prisPerBehandling: 850, behandlingerPerDag: 4,
    behandlingstidMin: 75, produktProsent: 20, oppstartUtstyr: 150000,
    oppstartInventar: 80000, husleie: 14000,
    fagkrav: 'Ingen lovkrav om fagbrev, men autorisasjon fra bransjeorganisasjon anbefales sterkt.',
    typiskPriser: 'Ansiktsbehandling: 700-1200 kr, Kroppsbehandling: 800-1400 kr, Voksing: 200-600 kr',
    enk_anbefalt: true,
    enk_begrunnelse: 'ENK er klart vanligst for soloterapeut. AS er aktuelt ved klinikk med flere ansatte.'
  },
  lash: {
    navn: 'Lash & Brow', ikon: '👁️', prisPerBehandling: 750, behandlingerPerDag: 4,
    behandlingstidMin: 90, produktProsent: 15, oppstartUtstyr: 50000,
    oppstartInventar: 35000, husleie: 7000,
    fagkrav: 'Ingen lovkrav, men kurs og sertifisering fra leverandør er nødvendig. Meld lokalet.',
    typiskPriser: 'Vipper sett: 600-900 kr, Påfyll: 350-500 kr, Bryn laminering: 400-600 kr',
    enk_anbefalt: true,
    enk_begrunnelse: 'Svært ofte ENK. Lav terskel og lave oppstartskostnader gjør ENK til klart beste valg.'
  },
  kombinert: {
    navn: 'Kombinert', ikon: '💎', prisPerBehandling: 700, behandlingerPerDag: 5,
    behandlingstidMin: 70, produktProsent: 15, oppstartUtstyr: 200000,
    oppstartInventar: 150000, husleie: 25000,
    fagkrav: 'Avhenger av hvilke tjenester du tilbyr. Frisør krever fagbrev.',
    typiskPriser: 'Varierer etter tjenester. Kombisalong har gjerne høyere snittbonger.',
    enk_anbefalt: false,
    enk_begrunnelse: 'Kombinert salong med flere ansatte og høyere omsetning kan forsvare AS-struktur.'
  }
};

function Field({ label, value, onChange, step = 1, suffix = 'kr', hint = '' }) {
  return (
    <div className="sal-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--muted)', pointerEvents: 'none' }}>{suffix}</span>
      </div>
      {hint && <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontStyle: 'italic' }}>{hint}</div>}
    </div>
  );
}

async function kallClaude(meldinger) {
  const svar = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: `Du er en norsk rådgiver for salong- og skjønnhetsbransjen hos Invest Tools by ADDON.
Du gir konkrete, ærlige råd om oppstart og drift av salong i Norge.
Svar alltid på norsk. Vær direkte og konkret.
Aldri si at du er en AI. Presenter deg som Invest Tools-rådgiver.
Hold svar under 200 ord med mindre brukeren ber om mer.`,
      messages: meldinger
    })
  });
  const data = await svar.json();
  return data.content[0].text;
}

function AIAssistent({ tall }) {
  const [analyse, setAnalyse] = useState('');
  const [lasterAnalyse, setLasterAnalyse] = useState(false);
  const [chat, setChat] = useState([]);
  const [melding, setMelding] = useState('');
  const [lasterChat, setLasterChat] = useState(false);

  const hentAnalyse = async () => {
    setLasterAnalyse(true);
    setAnalyse('');
    try {
      const tekst = await kallClaude([{ role: 'user', content: `Analyser denne salongvirksomheten:
Type: ${tall.salongType}
Selskapsform: ${tall.selskapsform}
Antall behandlingsplasser: ${tall.antallStoler}
Pris per behandling: ${tall.prisPerBehandling} kr
Behandlinger per plass per dag: ${tall.behandlingerPerDag}
Beleggsprosent: ${tall.belegg}%
Månedlig omsetning: ${tall.omsetning.toLocaleString('no-NO')} kr
Månedlige kostnader: ${tall.kostnader.toLocaleString('no-NO')} kr
Netto per måned: ${tall.netto.toLocaleString('no-NO')} kr
Ansatte: ${tall.antallAnsatte}
Oppstartskostnad: ${tall.oppstart.toLocaleString('no-NO')} kr
Break-even kunder per dag per plass: ${tall.breakEvenPerStol}

Gi en konkret analyse:
1. Er dette en levedyktig satsing?
2. Hva er de viktigste risikoene?
3. Hva bør optimaliseres først?
4. Er valgt selskapsform riktig?` }]);
      setAnalyse(tekst);
    } catch (e) {
      setAnalyse('Kunne ikke hente analyse akkurat nå. Prøv igjen.');
    }
    setLasterAnalyse(false);
  };

  const sendMelding = async () => {
    if (!melding.trim() || lasterChat) return;
    const nyMelding = { role: 'user', content: melding };
    setChat(prev => [...prev, { type: 'bruker', tekst: melding }]);
    setMelding('');
    setLasterChat(true);
    try {
      const kontekst = `Brukeren planlegger en ${tall.salongType}-salong (${tall.selskapsform}) med ${tall.antallStoler} plass(er), netto ${tall.netto.toLocaleString('no-NO')} kr/mnd.`;
      const historikk = chat.filter(m => m.type === 'bruker' || m.type === 'ai').map(m => ({ role: m.type === 'bruker' ? 'user' : 'assistant', content: m.tekst }));
      const tekst = await kallClaude([{ role: 'user', content: kontekst + '\n\nSpørsmål: ' + melding }, ...historikk.slice(-6), nyMelding]);
      setChat(prev => [...prev, { type: 'ai', tekst }]);
    } catch (e) {
      setChat(prev => [...prev, { type: 'ai', tekst: 'Kunne ikke svare akkurat nå. Prøv igjen.' }]);
    }
    setLasterChat(false);
  };

  return (
    <div className="ai-seksjon">
      <div className="ai-seksjon-tittel"><span className="ai-spark">✦</span> AI-rådgiver</div>
      <div className="ai-seksjon-sub">Få en personlig analyse av dine tall, eller still spørsmål om salong-bransjen</div>
      <button className="ai-analyse-knapp" onClick={hentAnalyse} disabled={lasterAnalyse}>
        {lasterAnalyse ? 'Analyserer...' : 'Analyser mine tall'}
      </button>
      {analyse && <div className="ai-analyse-resultat">{analyse}</div>}
      <div className="ai-chat">
        <div className="ai-chat-tittel">Still et spørsmål</div>
        {chat.length > 0 && (
          <div className="ai-chat-meldinger">
            {chat.map((m, i) => <div key={i} className={`ai-chat-melding ${m.type}`}>{m.tekst}</div>)}
            {lasterChat && <div className="ai-chat-melding ai laster">Tenker...</div>}
          </div>
        )}
        <div className="ai-chat-input-wrap">
          <input className="ai-chat-input" placeholder="F.eks. bør jeg starte som ENK eller AS?" value={melding} onChange={e => setMelding(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMelding()} />
          <button className="ai-chat-send" onClick={sendMelding} disabled={lasterChat || !melding.trim()}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default function SalongKalkulator() {
  const [salongType, setSalongType] = useState('frisor');
  const [selskapsform, setSelskapsform] = useState('enk');
  const [antallStoler, setAntallStoler] = useState(1);
  const [belegg, setBelegg] = useState(75);
  const [egenkapital, setEgenkapital] = useState(200000);

  // Overstyrte verdier - nullstilles når type byttes
  const [overstyr, setOverstyr] = useState({});

  const type = SALONG_TYPER[salongType];

  // Hent verdi: bruk overstyrt hvis finnes, ellers default fra type
  const prisPerBehandling = overstyr.pris ?? type.prisPerBehandling;
  const behandlingerPerDag = overstyr.behandlinger ?? type.behandlingerPerDag;
  const husleie = overstyr.husleie ?? type.husleie;
  const oppstartUtstyr = overstyr.oppstartUtstyr ?? type.oppstartUtstyr;
  const oppstartInventar = overstyr.oppstartInventar ?? type.oppstartInventar;
  const depositum = overstyr.depositum ?? (type.husleie * 3);

  const [antallAnsatte, setAntallAnsatte] = useState(0);
  const [lonnPerAnsatt, setLonnPerAnsatt] = useState(34000);
  const [forsikring, setForsikring] = useState(1500);
  const [markedsforing, setMarkedsforing] = useState(2000);
  const [regnskapKost, setRegnskapKost] = useState(0);

  const byttType = (nyType) => {
    setSalongType(nyType);
    setOverstyr({}); // nullstill alle overstyrte verdier
  };

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const behandlingerMnd = Math.round(antallStoler * behandlingerPerDag * 22 * (belegg / 100));
  const omsetning = behandlingerMnd * prisPerBehandling;
  const produktKost = omsetning * (type.produktProsent / 100);
  const lonnTotal = lonnPerAnsatt * antallAnsatte;
  const aga = lonnTotal * 0.141;
  const feriepenger = lonnTotal * 0.102;
  const pensjon = lonnTotal * 0.02;
  const regnskapMnd = regnskapKost / 12;
  const totalKost = husleie + produktKost + lonnTotal + aga + feriepenger + pensjon + forsikring + markedsforing + regnskapMnd;
  const brutto = omsetning - totalKost;
  const skattSats = selskapsform === 'as' ? 0.22 : 0.33;
  const skatt = Math.max(0, brutto * skattSats);
  const netto = brutto - skatt;

  const totalOppstart = oppstartUtstyr + oppstartInventar + depositum + (selskapsform === 'as' ? 36000 : 2000);
  const harRaad = egenkapital >= totalOppstart;
  const breakEvenOmsetning = totalKost / (1 - skattSats);
  const breakEvenBehandlinger = Math.ceil(breakEvenOmsetning / prisPerBehandling);
  const breakEvenPerStol = antallStoler > 0 ? Math.ceil(breakEvenBehandlinger / antallStoler / 22) : 0;
  const roiAar = egenkapital > 0 ? (netto * 12) / egenkapital * 100 : 0;
  const tilbakebetalingMnd = netto > 0 ? Math.ceil(totalOppstart / netto) : null;

  const scenarioer = [50, 65, 75, 90, 100].map(pct => {
    const beh = Math.round(antallStoler * behandlingerPerDag * 22 * (pct / 100));
    const oms = beh * prisPerBehandling;
    const pk = oms * (type.produktProsent / 100);
    const kost = husleie + pk + lonnTotal + aga + feriepenger + pensjon + forsikring + markedsforing + regnskapMnd;
    const n = (oms - kost) * (1 - skattSats);
    return { pct, beh, oms, netto: n };
  });

  const verdiktKlasse = !harRaad ? 'red' : netto < 0 ? 'red' : netto < 15000 ? 'amber' : 'green';
  const verdiktTekst = !harRaad
    ? `Du mangler ${fmt(totalOppstart - egenkapital)} for å komme i gang. Vurder leiemodell (leiestol) for å redusere oppstartskostnaden betydelig.`
    : netto < 0
    ? `Negativ kontantstrøm. Du trenger ${breakEvenBehandlinger} behandlinger/mnd (${breakEvenPerStol}/dag per plass) for å gå i null.`
    : netto < 15000
    ? `Marginalt lønnsomt med ${fmt(netto)}/mnd. For en solosalong kan dette holde, men det er lite buffer mot dårlige måneder.`
    : `Ser godt ut! ${fmt(netto)}/mnd netto. Break-even er ${breakEvenPerStol} behandlinger per plass per dag.`;

  const aiTall = { salongType: type.navn, selskapsform: selskapsform.toUpperCase(), antallStoler, prisPerBehandling, behandlingerPerDag, belegg, omsetning, kostnader: totalKost, netto, antallAnsatte, oppstart: totalOppstart, breakEvenPerStol };

  return (
    <div className="sal-wrap">
      <style>{styles}</style>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">1</div>
          <div className="sal-step-title">Type salong</div>
        </div>
        <div className="sal-type-grid">
          {Object.entries(SALONG_TYPER).map(([id, t]) => (
            <div key={id} className={`sal-type-card ${salongType === id ? 'active' : ''}`} onClick={() => byttType(id)}>
              <div className="ikon">{t.ikon}</div>
              <div className="navn">{t.navn}</div>
              <div className="pris">ca. {t.prisPerBehandling} kr/beh.</div>
            </div>
          ))}
        </div>

        <div className="sal-info">{type.fagkrav}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px', fontStyle: 'italic' }}>
          Typiske priser: {type.typiskPriser}
        </div>

        <div className="sal-section-label">Selskapsform</div>
        <div className="sal-enk-as">
          <div className={`sal-enk-card ${selskapsform === 'enk' ? 'active' : ''}`} onClick={() => { setSelskapsform('enk'); setRegnskapKost(0); }}>
            <div className="tittel">ENK (Enkeltpersonforetak)</div>
            <div className="fordel">Ingen aksjekapital. Enklere drift. Anbefalt for solo og oppstart. Skatt som personinntekt (~33%).</div>
            {type.enk_anbefalt && <div style={{ fontSize: '10px', color: 'var(--brg)', marginTop: '8px', fontWeight: '500' }}>✓ Anbefalt for {type.navn.toLowerCase()}</div>}
          </div>
          <div className={`sal-enk-card ${selskapsform === 'as' ? 'active' : ''}`} onClick={() => { setSelskapsform('as'); setRegnskapKost(12000); }}>
            <div className="tittel">AS (Aksjeselskap)</div>
            <div className="fordel">Krever 30 000 kr aksjekapital. Regnskapsfører nødvendig. Bedre ved 2+ ansatte og høy omsetning. Skatt 22% i selskapet.</div>
            {!type.enk_anbefalt && <div style={{ fontSize: '10px', color: 'var(--brg)', marginTop: '8px', fontWeight: '500' }}>✓ Kan være aktuelt for {type.navn.toLowerCase()}</div>}
          </div>
        </div>
        <div className="sal-info">{type.enk_begrunnelse}</div>
      </div>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">2</div>
          <div className="sal-step-title">Kapasitet og inntekt</div>
        </div>
        <div className="sal-grid">
          <Field label="Antall behandlingsplasser" value={antallStoler} onChange={setAntallStoler} step={1} suffix="stk" hint="Stoler, benker eller kabinetter" />
          <Field label="Pris per behandling" value={prisPerBehandling} onChange={v => setOverstyr(o => ({...o, pris: v}))} step={50} hint={`Snitt for ${type.navn.toLowerCase()}`} />
          <Field label="Behandlinger per plass per dag" value={behandlingerPerDag} onChange={v => setOverstyr(o => ({...o, behandlinger: v}))} step={1} suffix="stk" />
        </div>

        <div className="sal-belegg-wrap">
          <div className="sal-belegg-row">
            <span className="sal-slider-label">Beleggsprosent</span>
            <span className="sal-slider-val">{belegg}%</span>
          </div>
          <input type="range" min="30" max="100" step="5" value={belegg} onChange={e => setBelegg(+e.target.value)} style={{ width: '100%', accentColor: 'var(--brg)', display: 'block' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#bbb', marginTop: '6px' }}>
            <span>30% – oppstart</span><span>75% – realistisk</span><span>100% – fullt</span>
          </div>
        </div>

        <div className="sal-metrics">
          <div className="sal-metric">
            <div className="lbl">Behandlinger/mnd</div>
            <div className="val">{behandlingerMnd}</div>
            <div className="sub">ved {belegg}% belegg</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Månedlig omsetning</div>
            <div className="val" style={{ color: 'var(--brg)' }}>{fmt(omsetning)}</div>
            <div className="sub">eks. mva</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Produktkostnad</div>
            <div className="val" style={{ color: '#8b2020' }}>{fmt(produktKost)}</div>
            <div className="sub">{type.produktProsent}% av omsetning</div>
          </div>
        </div>
      </div>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">3</div>
          <div className="sal-step-title">Kostnader</div>
        </div>
        <div className="sal-grid">
          <Field label="Husleie / mnd" value={husleie} onChange={v => setOverstyr(o => ({...o, husleie: v}))} step={1000} hint="Kan variere mye etter lokasjon" />
          <Field label="Forsikring / mnd" value={forsikring} onChange={setForsikring} step={250} hint="Innbo, ansvar, yrkesskade" />
          <Field label="Markedsføring / mnd" value={markedsforing} onChange={setMarkedsforing} step={500} hint="Instagram, Google, flyers" />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} hint={selskapsform === 'enk' ? 'Ikke nødvendig for ENK' : 'Påkrevd for AS'} />
        </div>

        <div className="sal-section-label">Bemanning</div>
        <div className="sal-grid">
          <Field label="Antall ansatte (ekskl. deg selv)" value={antallAnsatte} onChange={setAntallAnsatte} step={1} suffix="stk" hint="0 = solodrift" />
          <Field label="Lønn per ansatt / mnd" value={lonnPerAnsatt} onChange={setLonnPerAnsatt} step={1000} hint="Minimumslønn 2025: ca. 34 000 kr" />
        </div>
        {antallAnsatte > 0 && (
          <div className="sal-info" style={{ marginTop: '8px' }}>
            Total lønnskostnad inkl. arbeidsgiveravgift (14,1%), feriepenger (10,2%) og pensjon (2%): <strong>{fmt(lonnTotal + aga + feriepenger + pensjon)}/mnd</strong>
          </div>
        )}

        <div className="sal-section-label">Oppstartskostnader</div>
        <div className="sal-grid">
          <Field label="Utstyr og maskiner" value={oppstartUtstyr} onChange={v => setOverstyr(o => ({...o, oppstartUtstyr: v}))} step={10000} hint="Stoler, utstyr, kassasystem" />
          <Field label="Innredning og renovering" value={oppstartInventar} onChange={v => setOverstyr(o => ({...o, oppstartInventar: v}))} step={10000} hint="Møbler, belysning, dekor" />
          <Field label="Depositum leie" value={depositum} onChange={v => setOverstyr(o => ({...o, depositum: v}))} step={5000} hint="Vanligvis 3 måneder husleie" />
          <Field label="Din tilgjengelige kapital" value={egenkapital} onChange={setEgenkapital} step={25000} />
        </div>
      </div>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">4</div>
          <div className="sal-step-title">Resultat</div>
        </div>

        <div className="sal-two-col">
          <div className="sal-col">
            <div className="sal-col-header">Månedlige kostnader</div>
            <div className="sal-line"><span className="k">Husleie</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(husleie)}</span></div>
            <div className="sal-line"><span className="k">Produkter ({type.produktProsent}%)</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(produktKost)}</span></div>
            {antallAnsatte > 0 && <div className="sal-line"><span className="k">Lønn inkl. avgifter</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(lonnTotal + aga + feriepenger + pensjon)}</span></div>}
            <div className="sal-line"><span className="k">Forsikring</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(forsikring)}</span></div>
            <div className="sal-line"><span className="k">Markedsføring</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(markedsforing)}</span></div>
            {regnskapMnd > 0 && <div className="sal-line"><span className="k">Regnskapsfører</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(regnskapMnd)}</span></div>}
            <div className="sal-line"><span className="k" style={{ fontWeight: '500' }}>Sum kostnader</span><span className="v">{fmt(totalKost)}</span></div>
          </div>
          <div className="sal-col">
            <div className="sal-col-header">Resultat per måned</div>
            <div className="sal-line"><span className="k">Omsetning</span><span className="v" style={{ color: 'var(--brg)' }}>+{fmt(omsetning)}</span></div>
            <div className="sal-line"><span className="k">Kostnader</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(totalKost)}</span></div>
            <div className="sal-line"><span className="k">Skatt ({selskapsform === 'as' ? '22' : '33'}%)</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(skatt)}</span></div>
            <div className="sal-result" style={{ color: netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(netto)}</div>
          </div>
        </div>

        <div className={`sal-verdict ${verdiktKlasse}`}>{verdiktTekst}</div>

        <div className="sal-metrics">
          <div className="sal-metric">
            <div className="lbl">Oppstartskostnad</div>
            <div className="val" style={{ color: harRaad ? 'var(--brg)' : '#8b2020' }}>{fmt(totalOppstart)}</div>
            <div className="sub">{harRaad ? 'Du har råd' : 'Mangler ' + fmt(totalOppstart - egenkapital)}</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Tilbakebetaling</div>
            <div className="val">{tilbakebetalingMnd ? tilbakebetalingMnd + ' mnd' : '–'}</div>
            <div className="sub">ved nåværende netto</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">ROI år 1</div>
            <div className="val" style={{ color: roiAar >= 15 ? 'var(--brg)' : roiAar >= 0 ? '#7a5a1e' : '#8b2020' }}>{roiAar.toFixed(1)}%</div>
            <div className="sub">avkastning på kapital</div>
          </div>
        </div>

        <div className="sal-section-label">Beleggscenarioer</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="sal-table">
            <thead>
              <tr>
                <th>Belegg</th>
                <th>Behandlinger/mnd</th>
                <th>Omsetning</th>
                <th>Netto/mnd</th>
                <th>Vurdering</th>
              </tr>
            </thead>
            <tbody>
              {scenarioer.map((s, i) => (
                <tr key={i} className={s.pct === belegg ? 'sal-highlight' : ''}>
                  <td style={{ fontWeight: s.pct === belegg ? '500' : '400' }}>{s.pct}%{s.pct === belegg ? ' ←' : ''}</td>
                  <td>{s.beh}</td>
                  <td style={{ color: 'var(--brg)' }}>{fmt(s.oms)}</td>
                  <td style={{ fontWeight: '500', color: s.netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(s.netto)}</td>
                  <td><span className={`sal-badge ${s.netto > 15000 ? 'green' : s.netto >= 0 ? 'amber' : 'red'}`}>{s.netto > 15000 ? 'Lønnsomt' : s.netto >= 0 ? 'Marginalt' : 'Negativt'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sal-section-label" style={{ marginTop: '20px' }}>Leiestol-alternativet</div>
        <div className="sal-info">
          Vurder leiestolmodellen: Du leier ut plasser til selvstendig næringsdrivende behandlere for 3 000-8 000 kr/mnd per plass. Du slipper lønnskostnader og risiko, men mister kontroll over kvalitet og kundeopplevelse. Populært i negle- og lash-bransjen.
        </div>

        <p className="sal-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</p>
      </div>

      <AIAssistent tall={aiTall} />
    </div>
  );
}