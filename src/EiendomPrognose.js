import { useState, useRef, useEffect } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e;
    --brg-light: #2a6640;
    --brg-pale: #e8f0ea;
    --brg-mid: #3a7a50;
    --cream: #f5f0e8;
    --cream-dark: #ede7d9;
    --gold: #c9a84c;
    --dark: #0f1a12;
    --text: #1a2e1e;
    --muted: #5a6e5e;
  }
  .ep-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .ep-step { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .ep-step-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .ep-step-num { width: 28px; height: 28px; background: var(--brg); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .ep-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .ep-info { background: var(--cream); border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .ep-brrr { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--cream-dark); margin-bottom: 20px; }
  .ep-brrr-step { background: var(--cream); padding: 20px; }
  .ep-brrr-step .num { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); margin-bottom: 6px; }
  .ep-brrr-step .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin-bottom: 8px; }
  .ep-brrr-step .desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .ep-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .ep-table th { text-align: left; padding: 8px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); border-bottom: 1px solid var(--cream-dark); font-weight: 500; }
  .ep-table td { padding: 10px 12px; border-bottom: 1px solid var(--cream-dark); }
  .ep-table tr:last-child td { border-bottom: none; }
  .ep-table tr:hover td { background: var(--cream); }
  .ep-highlight { background: var(--brg-pale) !important; }
  .ep-green { color: var(--brg); font-weight: 500; }
  .ep-red { color: #8b2020; }
  .ep-bold { font-weight: 500; }
  .ep-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; }
  .ep-badge.green { background: var(--brg-pale); color: var(--brg); }
  .ep-badge.blue { background: #e8f0f8; color: #1a3a5e; }
  .ep-badge.amber { background: #fdf6e8; color: #7a5a1e; }
  .ep-next { background: var(--dark); padding: 28px; margin-bottom: 12px; }
  .ep-next-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 16px; }
  .ep-next-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .ep-next-item .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #6a7a6e; margin-bottom: 6px; }
  .ep-next-item .val { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); }
  .ep-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }
  .ep-input { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; }
  .ep-input:focus { border-color: var(--brg); background: white; }
  .ep-hint { font-size: 11px; color: var(--muted); margin-top: 4px; font-style: italic; }
  .ep-kapital-box { background: var(--cream); border: 1px solid var(--cream-dark); padding: 20px; margin-bottom: 20px; }
  .ep-kapital-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
  .ep-kapital-item { background: white; border: 1px solid var(--cream-dark); padding: 14px; }
  .ep-kapital-item .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 6px; }
  .ep-kapital-item .val { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--brg); }
  .ep-historikk-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px; }
  .ep-historikk-table th { text-align: left; padding: 8px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); border-bottom: 1px solid var(--cream-dark); }
  .ep-historikk-table td { padding: 10px 12px; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .ep-historikk-table tr:last-child td { border-bottom: none; }
  .ep-timeline { padding-left: 20px; border-left: 2px solid var(--cream-dark); }
  .ep-timeline-item { position: relative; padding-bottom: 20px; padding-left: 16px; }
  .ep-timeline-item:last-child { padding-bottom: 0; }
  .ep-timeline-dot { position: absolute; left: -22px; top: 4px; width: 8px; height: 8px; background: var(--brg); border-radius: 50%; }
  .ep-timeline-dot.future { background: var(--cream-dark); border: 2px solid var(--brg); }
  .ep-timeline-title { font-weight: 500; font-size: 14px; color: var(--dark); margin-bottom: 4px; }
  .ep-timeline-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .ep-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .ep-controls { display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; align-items: flex-end; }
  .ep-toggle { display: flex; gap: 1px; background: var(--cream-dark); }
  .ep-toggle-btn { padding: 8px 16px; background: var(--cream); border: none; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; color: var(--muted); transition: all 0.2s; }
  .ep-toggle-btn.active { background: var(--brg); color: var(--cream); }
  .ep-graf-wrap { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .ep-graf-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); margin-bottom: 4px; }
  .ep-graf-sub { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
  .ep-graf-legend { display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
  .ep-graf-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); }
  .ep-graf-legend-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
  .ep-graf-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--cream-dark); margin-bottom: 20px; }
  .ep-graf-metric { background: var(--cream); padding: 14px 16px; }
  .ep-graf-metric-lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 6px; }
  .ep-graf-metric-val { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .ep-graf-controls { display: flex; gap: 24px; margin-bottom: 20px; flex-wrap: wrap; align-items: flex-end; }
  .ep-refi-box { background: var(--brg-pale); border-left: 3px solid var(--brg); padding: 14px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
  .ep-refi-title { font-size: 13px; font-weight: 500; color: var(--brg); margin-bottom: 4px; }
  .ep-refi-desc { font-size: 12px; color: var(--brg-light); }
  .ep-refi-num { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--brg); white-space: nowrap; }
  .ep-refi-num-lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--brg-light); }
  .ep-no-refi { background: #fdf6e8; border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: #7a5a1e; margin-bottom: 20px; }
`;

function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' mill kr';
  return Math.round(n / 1000) + ' 000 kr';
}

function fmtMnd(n) {
  return (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr';
}

function InputFelt({ label, value, onChange, step = 1000, suffix = 'kr', hint = '' }) {
  return (
    <div>
      <label className="ep-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <input className="ep-input" type="number" value={value} onChange={e => onChange(+e.target.value)} step={step} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--muted)', pointerEvents: 'none' }}>{suffix}</span>
      </div>
      {hint && <div className="ep-hint">{hint}</div>}
    </div>
  );
}

function EiendomGraf({ boligpris, nettoPrivat, nettoAS, ekProsentAS, restKapitalPrivat, restKapitalAS }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [visType, setVisType] = useState('as');
  const [prisvekst, setPrisvekst] = useState(3);
  const [refiInfo, setRefiInfo] = useState(null);
  const [grafMetrics, setGrafMetrics] = useState({ bolig: 0, ek: 0, netto: 0 });

  function getEKKrav(y, erAS) {
    if (!erAS) return 0.10;
    if (y <= 2) return 0.30;
    if (y <= 4) return 0.25;
    if (y <= 7) return 0.20;
    return 0.15;
  }

  function beregnData(pv, erAS) {
    const nettoMnd = erAS ? nettoAS : nettoPrivat;
    const ekStart = erAS ? restKapitalAS : restKapitalPrivat;
    const labels = [], boligVerdier = [], ekVerdier = [], laanVerdier = [];
    let laan = boligpris * (erAS ? ekProsentAS / 100 : 0.90);
    let boligverdi = boligpris;
    let akkNetto = Math.max(0, ekStart);
    let forsteRefi = null;
    for (let y = 1; y <= 10; y++) {
      boligverdi *= (1 + pv / 100);
      laan = Math.max(0, laan * 0.98);
      akkNetto += nettoMnd * 12;
      const ek = boligverdi - laan;
      const refi = Math.max(0, boligverdi * 0.75 - laan);
      const ekKrav = getEKKrav(y, erAS);
      const maks = refi / ekKrav;
      if (!forsteRefi && refi > boligpris * 0.25) {
        forsteRefi = { aar: y, refi: Math.round(refi), maks: Math.round(maks), ekKrav };
      }
      labels.push('År ' + y);
      boligVerdier.push(Math.round(boligverdi));
      ekVerdier.push(Math.round(ek));
      laanVerdier.push(Math.round(laan));
    }
    return { labels, boligVerdier, ekVerdier, laanVerdier, akkNetto: Math.round(akkNetto), forsteRefi };
  }

  function oppdaterMetrics(d) {
    setRefiInfo(d.forsteRefi);
    setGrafMetrics({ bolig: d.boligVerdier[9], ek: d.ekVerdier[9], netto: d.akkNetto });
  }

  function lagChart() {
    if (!window.Chart || !canvasRef.current) return;
    if (chartRef.current) { chartRef.current.destroy(); }
    const d = beregnData(prisvekst, visType === 'as');
    chartRef.current = new window.Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'Boligverdi', data: d.boligVerdier, borderColor: '#1f4e2e', backgroundColor: 'rgba(31,78,46,0.05)', borderWidth: 2, fill: true, pointRadius: 3, pointBackgroundColor: '#1f4e2e', tension: 0.3 },
          { label: 'Egenkapital', data: d.ekVerdier, borderColor: '#c9a84c', backgroundColor: 'rgba(201,168,76,0.04)', borderWidth: 2, fill: false, pointRadius: 3, pointBackgroundColor: '#c9a84c', tension: 0.3 },
          { label: 'Gjenstående lån', data: d.laanVerdier, borderColor: '#b4b2a9', borderDash: [5, 4], borderWidth: 1.5, fill: false, pointRadius: 2, pointBackgroundColor: '#b4b2a9', tension: 0.3 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': ' + Math.round(c.raw).toLocaleString('no-NO') + ' kr' } }
        },
        scales: {
          y: { ticks: { font: { size: 11 }, color: '#5a6e5e', callback: v => v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000) + 'k' }, grid: { color: 'rgba(0,0,0,0.04)' }, border: { display: false } },
          x: { ticks: { font: { size: 11 }, color: '#5a6e5e' }, grid: { display: false }, border: { display: false } }
        }
      }
    });
    oppdaterMetrics(d);
  }

  function oppdaterChart() {
    if (!chartRef.current) return;
    const d = beregnData(prisvekst, visType === 'as');
    chartRef.current.data.labels = d.labels;
    chartRef.current.data.datasets[0].data = d.boligVerdier;
    chartRef.current.data.datasets[1].data = d.ekVerdier;
    chartRef.current.data.datasets[2].data = d.laanVerdier;
    chartRef.current.update();
    oppdaterMetrics(d);
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    script.onload = () => lagChart();
    document.head.appendChild(script);
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (chartRef.current) oppdaterChart();
  }, [visType, prisvekst, boligpris, nettoPrivat, nettoAS]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ep-graf-wrap">
      <div className="ep-graf-title">Utvikling over 10 år</div>
      <div className="ep-graf-sub">Boligverdi, egenkapital og gjenstående lån</div>
      <div className="ep-graf-legend">
        <div className="ep-graf-legend-item"><div className="ep-graf-legend-dot" style={{ background: '#1f4e2e' }}></div>Boligverdi</div>
        <div className="ep-graf-legend-item"><div className="ep-graf-legend-dot" style={{ background: '#c9a84c' }}></div>Egenkapital</div>
        <div className="ep-graf-legend-item"><div className="ep-graf-legend-dot" style={{ background: '#b4b2a9', border: '1px dashed #888' }}></div>Gjenstående lån</div>
      </div>
      <div className="ep-graf-controls">
        <div>
          <div className="ep-label">Vis for</div>
          <div className="ep-toggle">
            <button className={`ep-toggle-btn ${visType === 'as' ? 'active' : ''}`} onClick={() => setVisType('as')}>Via AS</button>
            <button className={`ep-toggle-btn ${visType === 'privat' ? 'active' : ''}`} onClick={() => setVisType('privat')}>Privat</button>
          </div>
        </div>
        <div>
          <div className="ep-label">Prisvekst: {prisvekst}%</div>
          <input type="range" min="0" max="8" step="0.5" value={prisvekst} onChange={e => setPrisvekst(+e.target.value)} style={{ width: '160px', accentColor: 'var(--brg)', display: 'block', marginTop: '8px' }} />
        </div>
      </div>
      <div className="ep-graf-metrics">
        <div className="ep-graf-metric">
          <div className="ep-graf-metric-lbl">Boligverdi år 10</div>
          <div className="ep-graf-metric-val">{fmt(grafMetrics.bolig)}</div>
        </div>
        <div className="ep-graf-metric">
          <div className="ep-graf-metric-lbl">Egenkapital år 10</div>
          <div className="ep-graf-metric-val">{fmt(grafMetrics.ek)}</div>
        </div>
        <div className="ep-graf-metric">
          <div className="ep-graf-metric-lbl">Akkumulert netto</div>
          <div className="ep-graf-metric-val">{fmt(grafMetrics.netto)}</div>
        </div>
      </div>
      {refiInfo ? (
        <div className="ep-refi-box">
          <div>
            <div className="ep-refi-title">Du kan refinansiere i år {refiInfo.aar}</div>
            <div className="ep-refi-desc">{visType === 'as' ? `AS med ${refiInfo.aar} års historikk får bedre lånevilkår. Hent ut kapital til neste kjøp.` : 'Boligen har steget nok til at du kan hente ut egenkapital til neste kjøp.'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ep-refi-num-lbl">Tilgjengelig kapital</div>
            <div className="ep-refi-num">{fmt(refiInfo.refi)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ep-refi-num-lbl">Maks neste bolig</div>
            <div className="ep-refi-num">{fmt(refiInfo.maks)}</div>
          </div>
        </div>
      ) : (
        <div className="ep-no-refi">Refinansiering ikke mulig innen 10 år med disse tallene. Prøv å øke prisveksten.</div>
      )}
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <canvas ref={canvasRef} role="img" aria-label="Linjegraf som viser boligverdi, egenkapital og gjenstående lån over 10 år">Grafen viser utvikling over 10 år.</canvas>
      </div>
    </div>
  );
}

function EiendomPrognose({ boligpris, nettoPrivat, nettoAS, totPrivat, totAS, rentePrivat, renteAS, ekProsentAS, restKapitalPrivat, restKapitalAS }) {
  const [prisvekst, setPrisvekst] = useState(3);
  const [visType, setVisType] = useState('as');
  const [oppussingPrivat, setOppussingPrivat] = useState(0);
  const [privatSparingPrivat, setPrivatSparingPrivat] = useState(10000);
  const [arligInnskuddPrivat, setArligInnskuddPrivat] = useState(120000);
  const [restJustertPrivat, setRestJustertPrivat] = useState(restKapitalPrivat);
  const [oppussingAS, setOppussingAS] = useState(0);
  const [privatSparingAS, setPrivatSparingAS] = useState(10000);
  const [arligInnskuddAS, setArligInnskuddAS] = useState(120000);
  const [restJustertAS, setRestJustertAS] = useState(restKapitalAS);

  const aar = 10;

  const getEKKravAS = (y) => {
    if (y <= 2) return 0.30;
    if (y <= 4) return 0.25;
    if (y <= 7) return 0.20;
    return 0.15;
  };

  const getRenteAS = (y) => {
    if (y <= 2) return renteAS;
    if (y <= 4) return renteAS - 0.3;
    if (y <= 7) return renteAS - 0.5;
    return renteAS - 0.7;
  };

  const byggRader = (netto, rente, ekProsent, oppussing, restJustert, arligInnskudd, erAS) => {
    const rader = [];
    let akkumulert = restJustert;
    let eksternKapital = 0;
    let gjenvaerende = boligpris * (1 - ekProsent);
    let boligverdi = boligpris + oppussing;
    for (let y = 1; y <= aar; y++) {
      boligverdi = boligverdi * (1 + prisvekst / 100);
      const avdrag = gjenvaerende * 0.02;
      gjenvaerende = Math.max(0, gjenvaerende - avdrag);
      const aarligNetto = netto * 12;
      akkumulert += aarligNetto;
      eksternKapital += arligInnskudd;
      const totalKapital = akkumulert + eksternKapital;
      const egenkapital = boligverdi - gjenvaerende;
      const refinansiering = Math.max(0, boligverdi * 0.75 - gjenvaerende);
      const ekKravNeste = erAS ? getEKKravAS(y) : 0.10;
      const renteNeste = erAS ? getRenteAS(y) : rente;
      const kanRefinansiere = refinansiering > (erAS ? totAS : totPrivat) * 0.8;
      const maksNesteBolig = refinansiering / ekKravNeste;
      rader.push({ aar: y, boligverdi, gjenvaerende, egenkapital, aarligNetto, akkumulert, eksternKapital, totalKapital, refinansiering, kanRefinansiere, ekKravNeste, renteNeste, maksNesteBolig });
    }
    return rader;
  };

  const raderPrivat = byggRader(nettoPrivat, rentePrivat, 0.10, oppussingPrivat, restJustertPrivat, arligInnskuddPrivat, false);
  const raderAS = byggRader(nettoAS, renteAS, ekProsentAS / 100, oppussingAS, restJustertAS, arligInnskuddAS, true);
  const rader = visType === 'privat' ? raderPrivat : raderAS;
  const forsteRefinansiering = rader.find(r => r.kanRefinansiere);

  const historikkFaser = [
    { aar: 'År 1 til 2', fase: 'Nystartet AS', ekKrav: '30%', rente: `${renteAS.toFixed(1)}%`, beskrivelse: 'Ingen historikk. Høyt EK-krav og markedsrente.' },
    { aar: 'År 3 til 4', fase: 'Etablert', ekKrav: '25%', rente: `${(renteAS - 0.3).toFixed(1)}%`, beskrivelse: '2 godkjente skattemeldinger med overskudd. Bedre betingelser.' },
    { aar: 'År 5 til 7', fase: 'Solid track record', ekKrav: '20%', rente: `${(renteAS - 0.5).toFixed(1)}%`, beskrivelse: 'Stabil leieinntekt over flere år. Lavere EK-krav.' },
    { aar: 'År 8 og oppover', fase: 'Porteføljeinvestor', ekKrav: '15%', rente: `${(renteAS - 0.7).toFixed(1)}%`, beskrivelse: 'Beste betingelser som profesjonell investor.' }
  ];

  const fasefarger = ['#fdf6e8', '#e8f0f8', 'var(--brg-pale)', '#f0e8f8'];
  const fasetekst = ['#7a5a1e', '#1a3a5e', 'var(--brg)', '#5a1a7a'];

  return (
    <div className="ep-wrap">
      <style>{styles}</style>

      <EiendomGraf
        boligpris={boligpris}
        nettoPrivat={nettoPrivat}
        nettoAS={nettoAS}
        ekProsentAS={ekProsentAS}
        restKapitalPrivat={restKapitalPrivat}
        restKapitalAS={restKapitalAS}
      />

      <div className="ep-step">
        <div className="ep-step-header">
          <div className="ep-step-num">5</div>
          <div className="ep-step-title">BRRR strategien</div>
        </div>
        <div className="ep-brrr">
          {[
            { lbl: 'Buy', num: 'Kjøp', desc: 'Kjøp en underpriset bolig med potensial for verdistigning.' },
            { lbl: 'Rehab', num: 'Oppuss', desc: 'Øk boligens verdi gjennom oppussing for mer egenkapital.' },
            { lbl: 'Rent', num: 'Lei ut', desc: 'Lei ut og la leieinntektene dekke kostnader over tid.' },
            { lbl: 'Refinance', num: 'Refinansier', desc: 'Hent ut egenkapital til neste kjøp uten å selge.' }
          ].map((s, i) => (
            <div className="ep-brrr-step" key={i}>
              <div className="lbl">{s.lbl}</div>
              <div className="num">{s.num}</div>
              <div className="desc">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="ep-info">BRRR lar deg resirkulere egenkapitalen din. Når boligen har steget i verdi refinansierer du og henter ut kapital til neste kjøp uten å selge den første.</div>
      </div>

      <div className="ep-step">
        <div className="ep-step-header">
          <div className="ep-step-num">6</div>
          <div className="ep-step-title">Historikk og lånevilkår i AS over tid</div>
        </div>
        <div className="ep-info">Et AS med stabil kontantstrøm behandles svært annerledes av banken enn et nystartet AS. Historikken akkumuleres og gir bedre betingelser for hvert nye kjøp.</div>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table className="ep-historikk-table">
            <thead>
              <tr>
                <th>Periode</th><th>Fase</th><th>EK-krav</th><th>Rente</th><th>Bankens vurdering</th>
              </tr>
            </thead>
            <tbody>
              {historikkFaser.map((f, i) => (
                <tr key={i}>
                  <td className="ep-bold">{f.aar}</td>
                  <td><span className="ep-badge" style={{ background: fasefarger[i], color: fasetekst[i] }}>{f.fase}</span></td>
                  <td className="ep-bold">{f.ekKrav}</td>
                  <td>{f.rente}</td>
                  <td style={{ fontSize: '12px', color: 'var(--muted)' }}>{f.beskrivelse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: 'var(--cream)', border: '1px solid var(--cream-dark)', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--dark)', marginBottom: '16px' }}>Holdingselskap og driftsselskap</div>
          <div className="ep-timeline">
            {[
              { tittel: 'Holdingselskap eier aksjer', desc: 'Mottar utbytte skattefritt via fritaksmetoden. Reinvesterer i fond eller nye driftsselskaper.', future: false },
              { tittel: 'Driftsselskap bygger historikk', desc: 'Eier eiendommene, tar opp lån og viser overskudd år for år. Bedre betingelser etter 2 til 3 år.', future: false },
              { tittel: 'År 3: Første refinansiering', desc: 'Banken senker EK-krav og rente. Kapital hentes ut til neste kjøp.', future: true },
              { tittel: 'År 5 og oppover: Porteføljeinvestor', desc: 'Med 2 til 3 enheter og solid historikk er driftsselskapet en attraktiv låntaker.', future: true }
            ].map((item, i) => (
              <div className="ep-timeline-item" key={i}>
                <div className={`ep-timeline-dot ${item.future ? 'future' : ''}`}></div>
                <div className="ep-timeline-title">{item.tittel}</div>
                <div className="ep-timeline-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ep-step">
        <div className="ep-step-header">
          <div className="ep-step-num">7</div>
          <div className="ep-step-title">År for år prognose</div>
        </div>
        <div className="ep-controls">
          <div>
            <label className="ep-label">Vis for</label>
            <div className="ep-toggle">
              {['privat', 'as'].map(t => (
                <button key={t} className={`ep-toggle-btn ${visType === t ? 'active' : ''}`} onClick={() => setVisType(t)}>
                  {t === 'privat' ? 'Privat' : 'Via AS'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="ep-label">Prisvekst: {prisvekst}%</label>
            <input type="range" min="0" max="8" step="0.5" value={prisvekst} onChange={e => setPrisvekst(+e.target.value)} style={{ width: '160px', accentColor: 'var(--brg)', display: 'block', marginTop: '8px' }} />
          </div>
        </div>
        <div className="ep-kapital-box">
          <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--dark)', marginBottom: '4px' }}>Kapital til prognosen</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>Restkapital er hentet fra kalkulatoren men kan justeres.</div>
          {visType === 'privat' ? (
            <div className="ep-kapital-grid">
              <InputFelt label="Restkapital etter kjøp" value={restJustertPrivat} onChange={setRestJustertPrivat} hint={`Beregnet: ${fmt(restKapitalPrivat)}`} />
              <InputFelt label="Sett av til oppussing" value={oppussingPrivat} onChange={setOppussingPrivat} hint="Øker boligverdi fra start" />
              <InputFelt label="Månedlig sparing" value={privatSparingPrivat} onChange={v => { setPrivatSparingPrivat(v); setArligInnskuddPrivat(v * 12); }} suffix="kr/mnd" hint="Skytes inn årlig" />
            </div>
          ) : (
            <div className="ep-kapital-grid">
              <InputFelt label="Restkapital etter kjøp" value={restJustertAS} onChange={setRestJustertAS} hint={`Beregnet: ${fmt(restKapitalAS)}`} />
              <InputFelt label="Sett av til oppussing" value={oppussingAS} onChange={setOppussingAS} hint="Øker boligverdi fra start" />
              <InputFelt label="Månedlig sparing" value={privatSparingAS} onChange={v => { setPrivatSparingAS(v); setArligInnskuddAS(v * 12); }} suffix="kr/mnd" hint="Skytes inn i AS årlig" />
            </div>
          )}
          <div className="ep-kapital-grid" style={{ marginTop: '12px' }}>
            <div className="ep-kapital-item">
              <div className="lbl">Restkapital</div>
              <div className="val">{fmt(visType === 'privat' ? restJustertPrivat : restJustertAS)}</div>
            </div>
            <div className="ep-kapital-item">
              <div className="lbl">Oppussing</div>
              <div className="val">{fmt(visType === 'privat' ? oppussingPrivat : oppussingAS)}</div>
            </div>
            <div className="ep-kapital-item">
              <div className="lbl">Årlig innskudd</div>
              <div className="val">{fmt(visType === 'privat' ? arligInnskuddPrivat : arligInnskuddAS)}</div>
            </div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ep-table">
            <thead>
              <tr>
                <th>År</th><th>Boligverdi</th><th>Gjenstående lån</th><th>Egenkapital</th><th>Netto / år</th><th>Total kapital</th>
                {visType === 'as' && <th>EK-krav neste</th>}
                <th>Kan refinansiere</th>
              </tr>
            </thead>
            <tbody>
              {rader.map(r => (
                <tr key={r.aar} className={r.kanRefinansiere && r.aar === forsteRefinansiering?.aar ? 'ep-highlight' : ''}>
                  <td className="ep-bold">År {r.aar}</td>
                  <td>{fmt(r.boligverdi)}</td>
                  <td className="ep-red">{fmt(r.gjenvaerende)}</td>
                  <td className="ep-bold">{fmt(r.egenkapital)}</td>
                  <td className={r.aarligNetto >= 0 ? 'ep-green' : 'ep-red'}>{fmtMnd(r.aarligNetto)}</td>
                  <td className="ep-bold">{fmt(r.totalKapital)}</td>
                  {visType === 'as' && <td><span className="ep-badge blue">{Math.round(r.ekKravNeste * 100)}%</span></td>}
                  <td>
                    {r.kanRefinansiere
                      ? <span className="ep-badge green">Ja, {fmt(r.refinansiering)}</span>
                      : <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Ikke ennå</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {forsteRefinansiering && (
        <div className="ep-next">
          <div className="ep-next-title">Neste leilighet, når har du råd?</div>
          <div className="ep-next-grid">
            <div className="ep-next-item"><div className="lbl">Tidligst refinansiering</div><div className="val">År {forsteRefinansiering.aar}</div></div>
            <div className="ep-next-item"><div className="lbl">Kapital fra refinansiering</div><div className="val">{fmt(forsteRefinansiering.refinansiering)}</div></div>
            <div className="ep-next-item"><div className="lbl">EK-krav neste kjøp</div><div className="val">{Math.round(forsteRefinansiering.ekKravNeste * 100)}%</div></div>
            <div className="ep-next-item"><div className="lbl">Maks boligpris</div><div className="val">{fmt(forsteRefinansiering.maksNesteBolig)}</div></div>
            <div className="ep-next-item"><div className="lbl">Total kapital akkumulert</div><div className="val">{fmt(forsteRefinansiering.totalKapital)}</div></div>
            <div className="ep-next-item"><div className="lbl">Herav privat sparing</div><div className="val">{fmt(forsteRefinansiering.eksternKapital)}</div></div>
          </div>
        </div>
      )}

      <p className="ep-disclaimer">Prognosen er et estimat. Faktiske vilkår varierer mellom banker. Ikke finansiell rådgivning.</p>
    </div>
  );
}

export default EiendomPrognose;