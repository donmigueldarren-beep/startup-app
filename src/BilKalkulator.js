import { useState } from 'react';

const KODER = {
  basis: 'ADDON49',
  pro: 'ADDON99',
};

function sjekkLagretTilgang() {
  try {
    const lagret = localStorage.getItem('addon_tilgang');
    if (lagret === 'pro') return 'pro';
    if (lagret === 'basis') return 'basis';
  } catch (e) {}
  return 'gratis';
}

function lagreTilgang(nivaa) {
  try { localStorage.setItem('addon_tilgang', nivaa); } catch (e) {}
}

function LaasBoks({ krever, onLaasOpp }) {
  const [kode, setKode] = useState('');
  const [feil, setFeil] = useState(false);

  const forsok = () => {
    if (kode.trim().toUpperCase() === KODER.pro) {
      lagreTilgang('pro');
      onLaasOpp('pro');
    } else if (krever === 'basis' && kode.trim().toUpperCase() === KODER.basis) {
      lagreTilgang('basis');
      onLaasOpp('basis');
    } else {
      setFeil(true);
      setTimeout(() => setFeil(false), 2000);
    }
  };

  return (
    <div style={{
      background: '#0f1a12', border: '1px solid #1a3a1e',
      padding: '32px', marginBottom: '12px', textAlign: 'center'
    }}>
      <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔒</div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#f5f0e8', marginBottom: '8px' }}>
        Pro funksjon
      </div>
      <div style={{ fontSize: '13px', color: '#3a6a46', marginBottom: '24px', lineHeight: '1.6' }}>
        René krever Pro (99 kr/mnd).
        <br />
        <a href="mailto:kontakt@addoninvest.no" style={{ color: '#c9a84c', textDecoration: 'none' }}>
          Kontakt oss for tilgang
        </a>
      </div>
      <div style={{ display: 'flex', gap: '8px', maxWidth: '320px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Skriv inn tilgangskode"
          value={kode}
          onChange={e => setKode(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && forsok()}
          style={{
            flex: 1, padding: '10px 14px',
            background: feil ? '#1a0a0a' : '#0a1a0c',
            border: `1px solid ${feil ? '#c84040' : '#1a3a1e'}`,
            color: '#f5f0e8', fontFamily: 'Inter, sans-serif',
            fontSize: '13px', outline: 'none', transition: 'border 0.2s'
          }}
        />
        <button onClick={forsok} style={{
          background: '#c9a84c', color: '#0f1a12', border: 'none',
          padding: '10px 20px', fontFamily: 'Inter, sans-serif',
          fontSize: '11px', letterSpacing: '0.08em',
          textTransform: 'uppercase', cursor: 'pointer', fontWeight: '500'
        }}>
          Lås opp
        </button>
      </div>
      {feil && (
        <div style={{ fontSize: '12px', color: '#c84040', marginTop: '10px' }}>
          Feil kode. Kontakt kontakt@addoninvest.no for tilgang.
        </div>
      )}
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e; --brg-light: #2a6640; --brg-pale: #e8f0ea;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --text: #1a2e1e; --muted: #5a6e5e;
  }
  .bil-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .bil-step { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .bil-step-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .bil-step-num { width: 28px; height: 28px; background: var(--brg); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .bil-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .bil-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .bil-field label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .bil-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border 0.2s; }
  .bil-field input[type=number]:focus { border-color: var(--brg); background: white; }
  .bil-divider { border: none; border-top: 1px solid var(--cream-dark); margin: 20px 0; }
  .bil-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--cream-dark); margin-bottom: 16px; }
  .bil-col { background: var(--cream); padding: 20px; }
  .bil-col-header { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .bil-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .bil-line:last-child { border-bottom: none; }
  .bil-line .k { color: var(--muted); }
  .bil-line .v { font-weight: 500; }
  .bil-result { font-family: 'Playfair Display', serif; font-size: 24px; margin: 10px 0 4px; }
  .bil-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; margin-top: 4px; }
  .bil-badge.green { background: var(--brg-pale); color: var(--brg); }
  .bil-badge.red { background: #fce8e8; color: #8b2020; }
  .bil-badge.amber { background: #fdf6e8; color: #7a5a1e; }
  .bil-verdict { padding: 14px 18px; font-size: 13px; line-height: 1.6; margin-bottom: 16px; border-left: 3px solid; }
  .bil-verdict.green { background: var(--brg-pale); color: var(--brg); border-color: var(--brg); }
  .bil-verdict.amber { background: #fdf6e8; color: #7a5a1e; border-color: var(--gold); }
  .bil-verdict.red { background: #fce8e8; color: #8b2020; border-color: #c84040; }
  .bil-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
  .bil-metric { background: var(--cream); padding: 16px; border: 1px solid var(--cream-dark); }
  .bil-metric .lbl { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .bil-metric .val { font-family: 'Playfair Display', serif; font-size: 20px; }
  .bil-metric .sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .bil-info { background: var(--cream); border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .bil-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .bil-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .bil-table th { text-align: left; padding: 8px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); border-bottom: 1px solid var(--cream-dark); font-weight: 500; }
  .bil-table td { padding: 10px 12px; border-bottom: 1px solid var(--cream-dark); }
  .bil-table tr:last-child td { border-bottom: none; }
  .bil-table tr:hover td { background: var(--cream); }
  .bil-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
  .bil-type-card { border: 1px solid var(--cream-dark); padding: 14px 10px; text-align: center; cursor: pointer; transition: all 0.2s; background: var(--cream); }
  .bil-type-card:hover { border-color: var(--brg); }
  .bil-type-card.active { border-color: var(--brg); background: var(--brg-pale); }
  .bil-type-card .ikon { font-size: 22px; margin-bottom: 6px; }
  .bil-type-card .navn { font-size: 11px; font-weight: 500; color: var(--dark); }
  .bil-type-card .pris { font-size: 10px; color: var(--muted); margin-top: 2px; }
  .bil-belegg-wrap { background: var(--cream); border: 1px solid var(--cream-dark); padding: 16px; margin-bottom: 16px; }
  .bil-belegg-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .bil-slider-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .bil-slider-val { font-size: 16px; font-weight: 500; font-family: 'Playfair Display', serif; color: var(--dark); }
  .bil-highlight { background: var(--brg-pale) !important; }
  .bil-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .rene-seksjon { background: var(--dark); border: 1px solid #1a2e1e; padding: 28px; margin-bottom: 12px; }
  .rene-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px; }
  .rene-avatar { width: 52px; height: 52px; background: linear-gradient(135deg, #2a6640, #c9a84c); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .rene-intro { flex: 1; }
  .rene-navn { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 4px; }
  .rene-tittel { font-size: 11px; color: var(--gold); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
  .rene-bio { font-size: 12px; color: #4a6a4e; line-height: 1.6; }
  .rene-analyse-knapp { background: var(--gold); color: var(--dark); border: none; padding: 12px 28px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; font-weight: 500; }
  .rene-analyse-knapp:hover { background: #b8943c; }
  .rene-analyse-knapp:disabled { opacity: 0.5; cursor: not-allowed; }
  .rene-resultat { background: #0a1a0c; border: 1px solid #1a3a1e; padding: 20px; margin-top: 16px; font-size: 14px; color: #9fc9a8; line-height: 1.8; white-space: pre-wrap; }
  .rene-chat { margin-top: 24px; border-top: 1px solid #1a2e1e; padding-top: 20px; }
  .rene-chat-tittel { font-size: 12px; color: #3a6a46; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px; }
  .rene-chat-meldinger { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; max-height: 320px; overflow-y: auto; }
  .rene-chat-melding { padding: 12px 16px; font-size: 13px; line-height: 1.6; max-width: 85%; }
  .rene-chat-melding.bruker { background: #1a3a1e; color: var(--cream); align-self: flex-end; }
  .rene-chat-melding.ai { background: #0a1a0c; color: #9fc9a8; align-self: flex-start; border: 1px solid #1a3a1e; }
  .rene-chat-melding.laster { color: #3a6a46; font-style: italic; }
  .rene-chat-input-wrap { display: flex; gap: 8px; }
  .rene-chat-input { flex: 1; padding: 10px 14px; background: #0a1a0c; border: 1px solid #1a3a1e; color: var(--cream); font-family: 'Inter', sans-serif; font-size: 13px; outline: none; }
  .rene-chat-input::placeholder { color: #2a4a2e; }
  .rene-chat-input:focus { border-color: var(--gold); }
  .rene-chat-send { background: var(--brg); color: var(--cream); border: none; padding: 10px 20px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .rene-chat-send:hover { background: #2a6640; }
  .rene-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const BIL_TYPER = {
  kompakt: {
    navn: 'Kompaktbil', ikon: '🚗',
    bilpris: 300000, dagspris: 700, forsikringAar: 20000,
    serviceAar: 6000, drivstoffMnd: 1500, avskrivning: 17, utnyttelse: 60,
    info: 'Rimelig å kjøpe og drifte. Passer for privatpersoner og kortere turer. Høy etterspørsel på plattformer som Nabobil.',
    eksempler: 'Toyota Yaris, VW Polo, Skoda Fabia'
  },
  mellomklasse: {
    navn: 'Mellomklasse', ikon: '🚙',
    bilpris: 450000, dagspris: 950, forsikringAar: 26000,
    serviceAar: 8000, drivstoffMnd: 2000, avskrivning: 17, utnyttelse: 60,
    info: 'Mest populære segment for bilutleie. God balanse mellom innkjøpspris og dagspris. Passer for familie og lengre turer.',
    eksempler: 'Toyota Corolla, VW Golf, Skoda Octavia'
  },
  elbil: {
    navn: 'Elbil', ikon: '⚡',
    bilpris: 500000, dagspris: 1050, forsikringAar: 22000,
    serviceAar: 4000, drivstoffMnd: 600, avskrivning: 20, utnyttelse: 55,
    info: 'Lavere driftkostnad men høyere innkjøpspris. Rask avskrivning. Populær i byene. Ladeinfrastruktur er viktig.',
    eksempler: 'Tesla Model 3, VW ID.4, Nissan Leaf'
  },
  suv: {
    navn: 'SUV / Familiebil', ikon: '🚐',
    bilpris: 650000, dagspris: 1300, forsikringAar: 32000,
    serviceAar: 10000, drivstoffMnd: 2800, avskrivning: 17, utnyttelse: 55,
    info: 'Høy dagspris og populær for familier og ferie. Best i sesonger som sommer og vinter.',
    eksempler: 'Toyota RAV4, VW Tiguan, Volvo XC60'
  },
  varebil: {
    navn: 'Varebil', ikon: '🚚',
    bilpris: 400000, dagspris: 1100, forsikringAar: 28000,
    serviceAar: 12000, drivstoffMnd: 3000, avskrivning: 24, utnyttelse: 50,
    info: 'Høy avskrivning (24%) men lav konkurranse. Populær blant håndverkere og folk som skal flytte.',
    eksempler: 'VW Transporter, Mercedes Sprinter, Ford Transit'
  },
  premium: {
    navn: 'Premium', ikon: '🏎️',
    bilpris: 900000, dagspris: 2200, forsikringAar: 55000,
    serviceAar: 20000, drivstoffMnd: 3500, avskrivning: 20, utnyttelse: 35,
    info: 'Høy dagspris men lav utnyttelsesgrad. Krevende segment med spesifikk målgruppe. Vurder nøye.',
    eksempler: 'BMW 5-serie, Mercedes E-klasse, Audi A6'
  }
};

function Field({ label, value, onChange, step = 1, suffix = 'kr', hint = '' }) {
  return (
    <div className="bil-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--muted)', pointerEvents: 'none' }}>{suffix}</span>
      </div>
      {hint && <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontStyle: 'italic' }}>{hint}</div>}
    </div>
  );
}

async function kallRene(meldinger) {
  const svar = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: `Du heter René og er en AI-assistent i Invest Tools by ADDON.
Du hjelper brukere med å forstå tall og muligheter innen bilutleie i Norge.
Du er IKKE en menneskelig rådgiver og gir IKKE finansiell eller juridisk rådgivning.
Svar alltid på norsk, direkte og konkret. Ingen klisjeer.
Minn alltid brukeren på å konsultere en regnskapsfører ved viktige beslutninger.
Hold svar under 200 ord med mindre brukeren ber om mer.`,
      messages: meldinger
    })
  });
  const data = await svar.json();
  return data.content[0].text;
}

function Rene({ tall }) {
  const [analyse, setAnalyse] = useState('');
  const [lasterAnalyse, setLasterAnalyse] = useState(false);
  const [chat, setChat] = useState([]);
  const [melding, setMelding] = useState('');
  const [lasterChat, setLasterChat] = useState(false);

  const hentAnalyse = async () => {
    setLasterAnalyse(true);
    setAnalyse('');
    try {
      const tekst = await kallRene([{ role: 'user', content: `Analyser denne bilutleievirksomheten:

Biltype: ${tall.bilType}
Antall biler: ${tall.antallBiler}
Bilpris per bil: ${tall.bilpris.toLocaleString('no-NO')} kr
Dagspris: ${tall.dagspris} kr
Utnyttelsesgrad: ${tall.utnyttelse}%
Månedlig inntekt: ${tall.inntekt.toLocaleString('no-NO')} kr
Månedlige kostnader: ${tall.kostnader.toLocaleString('no-NO')} kr
Netto per måned: ${tall.netto.toLocaleString('no-NO')} kr
Break-even utnyttelse: ${tall.breakEven}%
ROI år 1: ${tall.roi.toFixed(1)}%

Gi en konkret analyse:
1. Er dette en levedyktig investering?
2. Hva er de viktigste risikoene?
3. Er biltype og prising riktig?
4. Hva bør optimaliseres?` }]);
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
      const kontekst = `Brukeren planlegger bilutleie med ${tall.antallBiler} ${tall.bilType}(er), dagspris ${tall.dagspris} kr, netto ${tall.netto.toLocaleString('no-NO')} kr/mnd.`;
      const historikk = chat.filter(m => m.type === 'bruker' || m.type === 'ai').map(m => ({ role: m.type === 'bruker' ? 'user' : 'assistant', content: m.tekst }));
      const tekst = await kallRene([{ role: 'user', content: kontekst + '\n\nSpørsmål: ' + melding }, ...historikk.slice(-6), nyMelding]);
      setChat(prev => [...prev, { type: 'ai', tekst }]);
    } catch (e) {
      setChat(prev => [...prev, { type: 'ai', tekst: 'Kunne ikke svare akkurat nå. Prøv igjen.' }]);
    }
    setLasterChat(false);
  };

  return (
    <div className="rene-seksjon">
      <div className="rene-header">
        <div className="rene-avatar">🚗</div>
        <div className="rene-intro">
          <div className="rene-navn">René</div>
          <div className="rene-tittel">AI-assistent for bilutleie</div>
          <div className="rene-bio">Hjelper deg forstå tallene dine. Erstatter ikke en regnskapsfører.</div>
        </div>
      </div>
      <button className="rene-analyse-knapp" onClick={hentAnalyse} disabled={lasterAnalyse}>
        {lasterAnalyse ? 'Analyserer...' : 'Analyser mine tall'}
      </button>
      {analyse && <div className="rene-resultat">{analyse}</div>}
      <div className="rene-chat">
        <div className="rene-chat-tittel">Spør René</div>
        {chat.length > 0 && (
          <div className="rene-chat-meldinger">
            {chat.map((m, i) => <div key={i} className={`rene-chat-melding ${m.type}`}>{m.tekst}</div>)}
            {lasterChat && <div className="rene-chat-melding ai laster">Tenker...</div>}
          </div>
        )}
        <div className="rene-chat-input-wrap">
          <input className="rene-chat-input" placeholder="F.eks. hvilken biltype gir best avkastning?" value={melding} onChange={e => setMelding(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMelding()} />
          <button className="rene-chat-send" onClick={sendMelding} disabled={lasterChat || !melding.trim()}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default function BilKalkulator() {
  const [tilgang, setTilgang] = useState(sjekkLagretTilgang);
  const harPro = tilgang === 'pro';

  const [bilType, setBilType] = useState('mellomklasse');
  const [antallBiler, setAntallBiler] = useState(1);
  const [egenkapital, setEgenkapital] = useState(200000);
  const [renteSats, setRenteSats] = useState(6.5);
  const [regnskapKost, setRegnskapKost] = useState(10000);
  const [overstyr, setOverstyr] = useState({});

  const type = BIL_TYPER[bilType];
  const bilpris = overstyr.bilpris ?? type.bilpris;
  const dagspris = overstyr.dagspris ?? type.dagspris;
  const forsikringAar = overstyr.forsikringAar ?? type.forsikringAar;
  const serviceAar = overstyr.serviceAar ?? type.serviceAar;
  const drivstoffMnd = overstyr.drivstoffMnd ?? type.drivstoffMnd;
  const utnyttelse = overstyr.utnyttelse ?? type.utnyttelse;

  const byttType = (nyType) => { setBilType(nyType); setOverstyr({}); };

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const totalBilpris = bilpris * antallBiler;
  const laan = Math.max(0, totalBilpris - egenkapital);
  const renteMnd = laan * (renteSats / 100) / 12;
  const avskrivningAar = totalBilpris * (type.avskrivning / 100);
  const dagerPerMnd = 30 * (utnyttelse / 100);
  const inntektMnd = dagspris * dagerPerMnd * antallBiler;
  const forsikringMnd = (forsikringAar * antallBiler) / 12;
  const serviceMnd = (serviceAar * antallBiler) / 12;
  const regnskapMnd = regnskapKost / 12;
  const totalKostMnd = renteMnd + forsikringMnd + serviceMnd + drivstoffMnd + regnskapMnd;
  const bruttoMnd = inntektMnd - totalKostMnd;
  const skattMnd = Math.max(0, bruttoMnd * 0.22);
  const nettoMnd = bruttoMnd - skattMnd;
  const harRaad = egenkapital >= totalBilpris * 0.25;
  const breakEvenDager = totalKostMnd / (dagspris * antallBiler);
  const breakEvenPst = Math.ceil((breakEvenDager / 30) * 100);
  const roiAar = egenkapital > 0 ? (nettoMnd * 12) / egenkapital * 100 : 0;
  const tilbakebetalingAar = nettoMnd > 0 ? (totalBilpris / (nettoMnd * 12)).toFixed(1) : null;

  const verdiktKlasse = !harRaad ? 'red' : nettoMnd < 0 ? 'red' : utnyttelse < breakEvenPst + 10 ? 'amber' : 'green';
  const verdiktTekst = !harRaad
    ? `Du trenger mer egenkapital. Banken forventer minimum 25% – det vil si ${fmt(totalBilpris * 0.25)} for denne flåten.`
    : nettoMnd < 0
    ? `Negativ kontantstrøm. Du trenger minst ${breakEvenPst}% utnyttelsesgrad for å gå i null.`
    : utnyttelse < breakEvenPst + 10
    ? `Marginalt. Break-even er ${breakEvenPst}% – du er nær kanten med ${utnyttelse}%. Liten margin for ledige perioder.`
    : `Ser lønnsomt ut! ${fmt(nettoMnd)}/mnd netto. Break-even ved ${breakEvenPst}% utnyttelse – du er godt over med ${utnyttelse}%.`;

  const scenarioer = [30, 50, 60, 75, 90].map(pct => {
    const inn = dagspris * 30 * (pct / 100) * antallBiler;
    const kost = renteMnd + forsikringMnd + serviceMnd + drivstoffMnd + regnskapMnd;
    const n = (inn - kost) * 0.78;
    return { pct, inn, netto: n };
  });

  const reneTall = {
    bilType: type.navn, antallBiler, bilpris, dagspris, utnyttelse,
    inntekt: inntektMnd, kostnader: totalKostMnd, netto: nettoMnd,
    breakEven: breakEvenPst, roi: roiAar
  };

  return (
    <div className="bil-wrap">
      <style>{styles}</style>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">1</div>
          <div className="bil-step-title">Type kjøretøy</div>
        </div>
        <div className="bil-type-grid">
          {Object.entries(BIL_TYPER).map(([id, t]) => (
            <div key={id} className={`bil-type-card ${bilType === id ? 'active' : ''}`} onClick={() => byttType(id)}>
              <div className="ikon">{t.ikon}</div>
              <div className="navn">{t.navn}</div>
              <div className="pris">{t.dagspris} kr/dag</div>
            </div>
          ))}
        </div>
        <div className="bil-info">{type.info}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px', fontStyle: 'italic' }}>
          Eksempler: {type.eksempler}
        </div>
        <div className="bil-grid">
          <Field label="Pris per bil" value={bilpris} onChange={v => setOverstyr(o => ({...o, bilpris: v}))} step={50000} hint="Innkjøpspris" />
          <Field label="Antall biler" value={antallBiler} onChange={setAntallBiler} step={1} suffix="stk" />
        </div>
        <div className="bil-metrics">
          <div className="bil-metric">
            <div className="lbl">Total flåteverdi</div>
            <div className="val">{fmt(totalBilpris)}</div>
            <div className="sub">{antallBiler} bil{antallBiler > 1 ? 'er' : ''}</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Avskrivning / år</div>
            <div className="val">{fmt(avskrivningAar)}</div>
            <div className="sub">{type.avskrivning}% av verdi</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Tilbakebetaling</div>
            <div className="val">{tilbakebetalingAar ? tilbakebetalingAar + ' år' : '–'}</div>
            <div className="sub">ved nåværende netto</div>
          </div>
        </div>
      </div>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">2</div>
          <div className="bil-step-title">Inntekt</div>
        </div>
        <div className="bil-grid">
          <Field label="Dagspris per bil" value={dagspris} onChange={v => setOverstyr(o => ({...o, dagspris: v}))} step={50} hint="Markedspris for din biltype" />
        </div>
        <div className="bil-belegg-wrap" style={{ marginTop: '16px' }}>
          <div className="bil-belegg-row">
            <span className="bil-slider-label">Utnyttelsesgrad</span>
            <span className="bil-slider-val">{utnyttelse}%</span>
          </div>
          <input type="range" min="10" max="95" step="5" value={utnyttelse} onChange={e => setOverstyr(o => ({...o, utnyttelse: +e.target.value}))} style={{ width: '100%', accentColor: 'var(--brg)', display: 'block' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#bbb', marginTop: '6px' }}>
            <span>10% – lav</span><span>60% – realistisk</span><span>90% – høy</span>
          </div>
        </div>
        <div className="bil-metrics">
          <div className="bil-metric">
            <div className="lbl">Dager utleid/mnd</div>
            <div className="val">{Math.round(30 * utnyttelse / 100)}</div>
            <div className="sub">per bil</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Månedlig inntekt</div>
            <div className="val" style={{ color: 'var(--brg)' }}>{fmt(inntektMnd)}</div>
            <div className="sub">alle biler</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Årlig inntekt</div>
            <div className="val" style={{ color: 'var(--brg)' }}>{fmt(inntektMnd * 12)}</div>
            <div className="sub">estimert</div>
          </div>
        </div>
      </div>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">3</div>
          <div className="bil-step-title">Kostnader og finansiering</div>
        </div>
        <div className="bil-grid">
          <Field label="Egenkapital" value={egenkapital} onChange={setEgenkapital} step={25000} hint="Minimum 25% av bilpris anbefales" />
          <Field label="Rente på billån" value={renteSats} onChange={setRenteSats} step={0.1} suffix="%" hint="Næringslån typisk 6-8%" />
          <Field label="Forsikring per bil / år" value={forsikringAar} onChange={v => setOverstyr(o => ({...o, forsikringAar: v}))} step={1000} hint="Kaskoforsikring næringsbruk" />
          <Field label="Service og vedlikehold / år" value={serviceAar} onChange={v => setOverstyr(o => ({...o, serviceAar: v}))} step={1000} hint="Inkl. dekk og uforutsett" />
          <Field label="Drivstoff / mnd" value={drivstoffMnd} onChange={v => setOverstyr(o => ({...o, drivstoffMnd: v}))} step={500} hint="Estimat for rengjøring/klargjøring" />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <hr className="bil-divider" />
        <div className="bil-two-col">
          <div className="bil-col">
            <div className="bil-col-header">Månedlige kostnader</div>
            <div className="bil-line"><span className="k">Renter på lån</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(renteMnd)}</span></div>
            <div className="bil-line"><span className="k">Forsikring</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(forsikringMnd)}</span></div>
            <div className="bil-line"><span className="k">Service og vedlikehold</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(serviceMnd)}</span></div>
            <div className="bil-line"><span className="k">Drivstoff / klargjøring</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(drivstoffMnd)}</span></div>
            <div className="bil-line"><span className="k">Regnskapsfører</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(regnskapMnd)}</span></div>
            <div className="bil-line"><span className="k" style={{ fontWeight: '500' }}>Sum kostnader</span><span className="v">{fmt(totalKostMnd)}</span></div>
          </div>
          <div className="bil-col">
            <div className="bil-col-header">Resultat per måned</div>
            <div className="bil-line"><span className="k">Inntekt</span><span className="v" style={{ color: 'var(--brg)' }}>+{fmt(inntektMnd)}</span></div>
            <div className="bil-line"><span className="k">Kostnader</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(totalKostMnd)}</span></div>
            <div className="bil-line"><span className="k">Skatt (22%)</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(skattMnd)}</span></div>
            <div className="bil-result" style={{ color: nettoMnd >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(nettoMnd)}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Break-even: {breakEvenPst}% utnyttelse</div>
          </div>
        </div>
      </div>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">4</div>
          <div className="bil-step-title">Nøkkeltall og anbefaling</div>
        </div>
        <div className="bil-metrics">
          <div className="bil-metric">
            <div className="lbl">ROI per år</div>
            <div className="val" style={{ color: roiAar >= 10 ? 'var(--brg)' : roiAar >= 0 ? '#7a5a1e' : '#8b2020' }}>{roiAar.toFixed(1)}%</div>
            <div className="sub">avkastning på EK</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Break-even</div>
            <div className="val">{breakEvenPst}%</div>
            <div className="sub">{Math.ceil(breakEvenDager)} dager/mnd</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Netto per bil/mnd</div>
            <div className="val" style={{ color: nettoMnd >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmt(nettoMnd / antallBiler)}</div>
            <div className="sub">etter skatt</div>
          </div>
        </div>

        <div className={`bil-verdict ${verdiktKlasse}`}>{verdiktTekst}</div>

        <div className="bil-section-label">Utnyttelsesscenarioer</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="bil-table">
            <thead>
              <tr>
                <th>Utnyttelse</th>
                <th>Dager/mnd</th>
                <th>Inntekt</th>
                <th>Netto/mnd</th>
                <th>Vurdering</th>
              </tr>
            </thead>
            <tbody>
              {scenarioer.map((s, i) => (
                <tr key={i} style={{ background: s.pct === utnyttelse ? 'var(--brg-pale)' : 'transparent' }}>
                  <td style={{ fontWeight: s.pct === utnyttelse ? '500' : '400' }}>{s.pct}%{s.pct === utnyttelse ? ' ←' : ''}</td>
                  <td>{Math.round(30 * s.pct / 100)}</td>
                  <td style={{ color: 'var(--brg)' }}>{fmt(s.inn)}</td>
                  <td style={{ fontWeight: '500', color: s.netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(s.netto)}</td>
                  <td><span className={`bil-badge ${s.netto > 5000 ? 'green' : s.netto >= 0 ? 'amber' : 'red'}`}>{s.netto > 5000 ? 'Lønnsomt' : s.netto >= 0 ? 'Marginalt' : 'Negativt'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bil-section-label" style={{ marginTop: '20px' }}>Krav for bilutleie i Norge</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { ikon: '✓', tekst: 'Registrer AS eller ENK', ok: true },
            { ikon: '✓', tekst: 'Næringsforsikring (kaskoforsikring) på alle biler', ok: true },
            { ikon: '✓', tekst: 'Biler registrert som næringskjøretøy i Statens vegvesen', ok: true },
            { ikon: '✓', tekst: 'MVA-registrering ved over 50 000 kr omsetning', ok: true },
            { ikon: '!', tekst: 'Ingen konsesjon kreves for vanlig korttidsutleie', ok: false },
            { ikon: '!', tekst: 'Alltid skriftlig leieavtale og dokumentasjon av skader', ok: false }
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', padding: '10px 12px', background: 'var(--cream)', border: '1px solid var(--cream-dark)', fontSize: '13px' }}>
              <span style={{ color: r.ok ? 'var(--brg)' : 'var(--gold)', fontWeight: '500' }}>{r.ikon}</span>
              <span style={{ color: 'var(--muted)' }}>{r.tekst}</span>
            </div>
          ))}
        </div>
        <p className="bil-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</p>
      </div>

      {harPro ? (
        <Rene tall={reneTall} />
      ) : (
        <LaasBoks krever="pro" onLaasOpp={setTilgang} />
      )}
    </div>
  );
}