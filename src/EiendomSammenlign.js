import { useState, useRef, useEffect } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e; --brg-pale: #e8f0ea; --brg-light: #2a6640;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --text: #1a2e1e; --muted: #5a6e5e;
  }
  .es-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .es-step { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .es-step-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .es-step-num { width: 28px; height: 28px; background: var(--dark); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .es-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .es-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .es-field label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .es-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border 0.2s; }
  .es-field input[type=number]:focus { border-color: var(--dark); background: white; }
  .es-divider { border: none; border-top: 1px solid var(--cream-dark); margin: 20px 0; }
  .es-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .es-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--cream-dark); margin-bottom: 16px; }
  .es-col { background: white; padding: 24px; }
  .es-col.privat { border-top: 3px solid var(--gold); }
  .es-col.as { border-top: 3px solid var(--brg); }
  .es-col-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; margin-bottom: 16px; }
  .es-col.privat .es-col-label { color: var(--gold); }
  .es-col.as .es-col-label { color: var(--brg); }
  .es-line { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .es-line:last-child { border-bottom: none; }
  .es-line .k { color: var(--muted); }
  .es-line .v { font-weight: 500; }
  .es-result { font-family: 'Playfair Display', serif; font-size: 28px; margin: 12px 0 4px; }
  .es-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; margin-top: 6px; }
  .es-badge.green { background: var(--brg-pale); color: var(--brg); }
  .es-badge.gold { background: #fdf6e8; color: #7a5a1e; }
  .es-badge.red { background: #fce8e8; color: #8b2020; }
  .es-badge.winner { background: var(--dark); color: var(--cream); }
  .es-slider-wrap { background: var(--cream); border: 1px solid var(--cream-dark); padding: 14px 16px; margin-top: 12px; }
  .es-slider-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .es-slider-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .es-slider-val { font-size: 15px; font-weight: 500; font-family: 'Playfair Display', serif; }
  .es-slider-hints { display: flex; justify-content: space-between; font-size: 11px; color: #bbb; margin-top: 6px; }
  .es-verdict { padding: 16px 20px; font-size: 14px; line-height: 1.7; margin-bottom: 16px; border-left: 3px solid var(--dark); background: #f5f5f0; color: var(--dark); }
  .es-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .ep-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }
  .ep-input { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; }
  .ep-input:focus { border-color: var(--dark); background: white; }
  .ep-hint { font-size: 11px; color: var(--muted); margin-top: 4px; font-style: italic; }
  .ep-kapital-box { background: var(--cream); border: 1px solid var(--cream-dark); padding: 20px; margin-bottom: 20px; }
  .ep-kapital-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
  .ep-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .ep-table th { text-align: left; padding: 8px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); border-bottom: 1px solid var(--cream-dark); font-weight: 500; }
  .ep-table td { padding: 10px 12px; border-bottom: 1px solid var(--cream-dark); }
  .ep-table tr:last-child td { border-bottom: none; }
  .ep-table tr:hover td { background: var(--cream); }
  .ep-highlight { background: var(--brg-pale) !important; }
  .ep-bold { font-weight: 500; }
  .ep-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; }
  .ep-badge.green { background: var(--brg-pale); color: var(--brg); }
  .ep-badge.gold { background: #fdf6e8; color: #7a5a1e; }
  .ep-badge.blue { background: #e8f0f8; color: #1a3a5e; }
  .ep-next { background: var(--dark); padding: 28px; margin-bottom: 12px; }
  .ep-next-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 16px; }
  .ep-next-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .ep-next-item .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #6a7a6e; margin-bottom: 6px; }
  .ep-next-item .val { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); }
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

function Field({ label, value, onChange, step = 1, suffix = 'kr' }) {
  return (
    <div className="es-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--muted)', pointerEvents: 'none' }}>{suffix}</span>
      </div>
    </div>
  );
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

function Graf({ boligpris, nettoPrivat, nettoAS, ekProsentAS, restKapitalPrivat, restKapitalAS }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [visType, setVisType] = useState('as');
  const [prisvekst, setPrisvekst] = useState(3);
  const [refiInfo, setRefiInfo] = useState(null);
  const [grafMetrics, setGrafMetrics] = useState({ bolig: 0, ek: 0, netto: 0 });

  function getEKKrav(y, erAS) {
    if (!erAS) return 0.10;
    if (y <= 2) return 0.30; if (y <= 4) return 0.25; if (y <= 7) return 0.20; return 0.15;
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
        responsive: true, maintainAspectRatio: false,
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
        <div className="ep-graf-metric"><div className="ep-graf-metric-lbl">Boligverdi år 10</div><div className="ep-graf-metric-val">{fmt(grafMetrics.bolig)}</div></div>
        <div className="ep-graf-metric"><div className="ep-graf-metric-lbl">Egenkapital år 10</div><div className="ep-graf-metric-val">{fmt(grafMetrics.ek)}</div></div>
        <div className="ep-graf-metric"><div className="ep-graf-metric-lbl">Akkumulert netto</div><div className="ep-graf-metric-val">{fmt(grafMetrics.netto)}</div></div>
      </div>
      {refiInfo ? (
        <div className="ep-refi-box">
          <div>
            <div className="ep-refi-title">Du kan refinansiere i år {refiInfo.aar}</div>
            <div className="ep-refi-desc">{visType === 'as' ? `AS med ${refiInfo.aar} års historikk får bedre lånevilkår.` : 'Boligen har steget nok til å hente ut egenkapital.'}</div>
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

export default function EiendomSammenlign() {
  const [boligpris, setBoligpris] = useState(3000000);
  const [leie, setLeie] = useState(12000);
  const [felles, setFelles] = useState(3000);
  const [vedlikehold, setVedlikehold] = useState(1500);
  const [dokumentavgiftPst, setDokumentavgiftPst] = useState(2.5);
  const [tinglysingKost, setTinglysingKost] = useState(500);
  const [kapital, setKapital] = useState(500000);
  const [rentePrivat, setRentePrivat] = useState(5.2);
  const [ekProsentPrivat, setEkProsentPrivat] = useState(10);
  const [skattProsentPrivat, setSkattProsentPrivat] = useState(22);
  const [renteAS, setRenteAS] = useState(5.8);
  const [ekProsentAS, setEkProsentAS] = useState(30);
  const [stifteKost, setStifteKost] = useState(36000);
  const [regnskapKost, setRegnskapKost] = useState(10000);
  const [prisvekst, setPrisvekst] = useState(3);
  const [oppussing, setOppussing] = useState(0);
  const [maanedligSparing, setMaanedligSparing] = useState(10000);

  const fmtK = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMndK = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const dokumentavgift = boligpris * (dokumentavgiftPst / 100);
  const ekPrivat = boligpris * (ekProsentPrivat / 100);
  const totPrivat = ekPrivat + dokumentavgift + tinglysingKost;
  const laanPrivat = boligpris - ekPrivat;
  const renteMndPrivat = laanPrivat * (rentePrivat / 100) / 12;
  const bruttoPrivat = leie - renteMndPrivat - felles - vedlikehold;
  const skattPrivat = Math.max(0, bruttoPrivat * (skattProsentPrivat / 100));
  const nettoPrivat = bruttoPrivat - skattPrivat;
  const harPrivat = kapital >= totPrivat;
  const restPrivat = Math.max(0, kapital - totPrivat);

  const ekAS = boligpris * (ekProsentAS / 100);
  const totAS = ekAS + dokumentavgift + tinglysingKost + stifteKost;
  const laanAS = boligpris - ekAS;
  const renteMndAS = laanAS * (renteAS / 100) / 12;
  const bruttoAS = leie - renteMndAS - felles - vedlikehold - (regnskapKost / 12);
  const skattAS = Math.max(0, bruttoAS * 0.22);
  const nettoAS = bruttoAS - skattAS;
  const harAS = kapital >= totAS;
  const restAS = Math.max(0, kapital - totAS);

  const privatVinner = nettoPrivat > nettoAS;
  const asVinner = nettoAS > nettoPrivat;

  const getEKKrav = (y) => { if (y <= 2) return 0.30; if (y <= 4) return 0.25; if (y <= 7) return 0.20; return 0.15; };

  const raderPrivat = (() => {
    const res = [];
    let akk = restPrivat;
    let gjenv = laanPrivat;
    let bv = boligpris + oppussing;
    for (let y = 1; y <= 10; y++) {
      bv = bv * (1 + prisvekst / 100);
      gjenv = Math.max(0, gjenv - gjenv * 0.02);
      akk += nettoPrivat * 12 + maanedligSparing * 12;
      const ek = bv - gjenv;
      const refi = Math.max(0, bv * 0.75 - gjenv);
      res.push({ aar: y, ek, akk, refi, kanRefi: refi > totPrivat * 0.8, maks: refi / 0.10 });
    }
    return res;
  })();

  const raderAS = (() => {
    const res = [];
    let akk = restAS;
    let gjenv = laanAS;
    let bv = boligpris + oppussing;
    for (let y = 1; y <= 10; y++) {
      bv = bv * (1 + prisvekst / 100);
      gjenv = Math.max(0, gjenv - gjenv * 0.02);
      akk += nettoAS * 12 + maanedligSparing * 12;
      const ek = bv - gjenv;
      const refi = Math.max(0, bv * 0.75 - gjenv);
      const ekKrav = getEKKrav(y);
      res.push({ aar: y, ek, akk, refi, kanRefi: refi > totAS * 0.8, ekKrav, maks: refi / ekKrav });
    }
    return res;
  })();

  const forsteRefiPrivat = raderPrivat.find(r => r.kanRefi);
  const forsteRefiAS = raderAS.find(r => r.kanRefi);

  const verdikt = !harPrivat && !harAS
    ? `Du har ikke nok kapital for noen av alternativene. Du trenger minst ${fmtK(totPrivat)} for privat kjøp.`
    : !harPrivat && harAS
    ? `Du har ikke råd til privat kjøp (trenger ${fmtK(totPrivat)}), men kan kjøpe via AS.`
    : harPrivat && !harAS
    ? `Du har råd til privat kjøp, men for AS trenger du ${fmtK(totAS - kapital)} mer.`
    : privatVinner
    ? `Privat kjøp gir best månedlig kontantstrøm (${fmtMndK(nettoPrivat)} vs ${fmtMndK(nettoAS)}). Velg AS hvis du planlegger portefølje med flere enheter.`
    : `AS gir best månedlig kontantstrøm (${fmtMndK(nettoAS)} vs ${fmtMndK(nettoPrivat)}). AS har også fordeler ved reinvestering og porteføljevekst.`;

  return (
    <div className="es-wrap">
      <style>{styles}</style>

      <div className="es-step">
        <div className="es-step-header">
          <div className="es-step-num">1</div>
          <div className="es-step-title">Om boligen (felles for begge)</div>
        </div>
        <div className="es-grid">
          <Field label="Boligpris" value={boligpris} onChange={setBoligpris} step={50000} />
          <Field label="Leieinntekt" value={leie} onChange={setLeie} step={500} suffix="kr/mnd" />
          <Field label="Felleskostnader" value={felles} onChange={setFelles} step={500} suffix="kr/mnd" />
          <Field label="Vedlikehold" value={vedlikehold} onChange={setVedlikehold} step={250} suffix="kr/mnd" />
        </div>
        <div className="es-section-label">Transaksjonskostnader</div>
        <div className="es-grid">
          <Field label="Dokumentavgift" value={dokumentavgiftPst} onChange={setDokumentavgiftPst} step={0.1} suffix="%" />
          <Field label="Tinglysning" value={tinglysingKost} onChange={setTinglysingKost} step={100} />
          <Field label="Tilgjengelig kapital" value={kapital} onChange={setKapital} step={50000} />
        </div>
      </div>

      <div className="es-step">
        <div className="es-step-header">
          <div className="es-step-num">2</div>
          <div className="es-step-title">Forutsetninger per alternativ</div>
        </div>
        <div className="es-compare">
          <div className="es-col privat">
            <div className="es-col-label">Privat kjøp</div>
            <Field label="Boliglånsrente" value={rentePrivat} onChange={setRentePrivat} step={0.1} suffix="%" />
            <div style={{marginTop:'12px'}}><Field label="Egenkapitalkrav" value={ekProsentPrivat} onChange={setEkProsentPrivat} step={1} suffix="%" /></div>
            <div style={{marginTop:'12px'}}><Field label="Skatteprosent" value={skattProsentPrivat} onChange={setSkattProsentPrivat} step={1} suffix="%" /></div>
          </div>
          <div className="es-col as">
            <div className="es-col-label">Kjøp via AS</div>
            <Field label="Rente næringslån" value={renteAS} onChange={setRenteAS} step={0.1} suffix="%" />
            <div style={{marginTop:'12px'}}><Field label="Stifte AS" value={stifteKost} onChange={setStifteKost} step={1000} /></div>
            <div style={{marginTop:'12px'}}><Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} /></div>
            <div className="es-slider-wrap" style={{marginTop:'12px'}}>
              <div className="es-slider-row">
                <span className="es-slider-label">EK-krav bank</span>
                <span className="es-slider-val">{ekProsentAS}%</span>
              </div>
              <input type="range" min="20" max="40" step="1" value={ekProsentAS} onChange={e => setEkProsentAS(+e.target.value)} style={{width:'100%', accentColor:'var(--brg)'}} />
              <div className="es-slider-hints"><span>20%</span><span>30%</span><span>40%</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="es-step">
        <div className="es-step-header">
          <div className="es-step-num">3</div>
          <div className="es-step-title">Sammenligning</div>
        </div>
        <div className="es-compare" style={{marginBottom:'20px'}}>
          <div className="es-col privat">
            <div className="es-col-label">Privat</div>
            <div className="es-line"><span className="k">Oppstart</span><span className="v">{fmtK(totPrivat)}</span></div>
            <div className="es-line"><span className="k">Egenkapital</span><span className="v">{fmtK(ekPrivat)}</span></div>
            <div className="es-line"><span className="k">Restkapital</span><span className="v" style={{color: harPrivat ? '#7a5a1e' : '#8b2020'}}>{harPrivat ? fmtK(restPrivat) : '–'}</span></div>
            <div className="es-line"><span className="k">Månedlig rente</span><span className="v">-{fmtK(renteMndPrivat)}</span></div>
            <div className="es-line"><span className="k">Skatt/mnd</span><span className="v">-{fmtK(skattPrivat)}</span></div>
            <div className="es-result" style={{color: nettoPrivat >= 0 ? '#7a5a1e' : '#8b2020'}}>{fmtMndK(nettoPrivat)}</div>
            <span className={`es-badge ${!harPrivat ? 'red' : privatVinner ? 'winner' : 'gold'}`}>
              {!harPrivat ? 'Mangler ' + fmtK(totPrivat - kapital) : privatVinner ? 'Best kontantstrøm' : 'Du har råd'}
            </span>
          </div>
          <div className="es-col as">
            <div className="es-col-label">Via AS</div>
            <div className="es-line"><span className="k">Oppstart</span><span className="v">{fmtK(totAS)}</span></div>
            <div className="es-line"><span className="k">Egenkapital</span><span className="v">{fmtK(ekAS)}</span></div>
            <div className="es-line"><span className="k">Restkapital</span><span className="v" style={{color: harAS ? 'var(--brg)' : '#8b2020'}}>{harAS ? fmtK(restAS) : '–'}</span></div>
            <div className="es-line"><span className="k">Månedlig rente</span><span className="v">-{fmtK(renteMndAS)}</span></div>
            <div className="es-line"><span className="k">Skatt/mnd</span><span className="v">-{fmtK(skattAS)}</span></div>
            <div className="es-result" style={{color: nettoAS >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMndK(nettoAS)}</div>
            <span className={`es-badge ${!harAS ? 'red' : asVinner ? 'winner' : 'green'}`}>
              {!harAS ? 'Mangler ' + fmtK(totAS - kapital) : asVinner ? 'Best kontantstrøm' : 'Du har råd'}
            </span>
          </div>
        </div>
        <div className="es-verdict">{verdikt}</div>
      </div>

      <Graf
        boligpris={boligpris}
        nettoPrivat={nettoPrivat}
        nettoAS={nettoAS}
        ekProsentAS={ekProsentAS}
        restKapitalPrivat={restPrivat}
        restKapitalAS={restAS}
      />

      <div className="es-step">
        <div className="es-step-header">
          <div className="es-step-num">4</div>
          <div className="es-step-title">10-års prognose side om side</div>
        </div>
        <div className="ep-kapital-box">
          <div style={{fontSize:'12px', fontWeight:'500', color:'var(--dark)', marginBottom:'12px'}}>Forutsetninger for prognosen</div>
          <div className="ep-kapital-grid">
            <InputFelt label="Oppussing" value={oppussing} onChange={setOppussing} hint="Øker boligverdi fra start" />
            <InputFelt label="Månedlig sparing" value={maanedligSparing} onChange={setMaanedligSparing} suffix="kr/mnd" hint="Skytes inn ekstra" />
            <div>
              <label className="ep-label">Prisvekst: {prisvekst}%</label>
              <input type="range" min="0" max="8" step="0.5" value={prisvekst} onChange={e => setPrisvekst(+e.target.value)} style={{width:'100%', accentColor:'var(--brg)', marginTop:'8px', display:'block'}} />
            </div>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className="ep-table">
            <thead>
              <tr>
                <th>År</th>
                <th style={{color:'#7a5a1e'}}>Privat: Egenkapital</th>
                <th style={{color:'#7a5a1e'}}>Privat: Total kapital</th>
                <th style={{color:'#7a5a1e'}}>Privat: Refinansiering</th>
                <th style={{color:'var(--brg)'}}>AS: Egenkapital</th>
                <th style={{color:'var(--brg)'}}>AS: Total kapital</th>
                <th style={{color:'var(--brg)'}}>AS: Refinansiering</th>
              </tr>
            </thead>
            <tbody>
              {raderPrivat.map((rP, i) => {
                const rA = raderAS[i];
                return (
                  <tr key={rP.aar}>
                    <td className="ep-bold">År {rP.aar}</td>
                    <td>{fmt(rP.ek)}</td>
                    <td>{fmt(rP.akk)}</td>
                    <td>{rP.kanRefi ? <span className="ep-badge gold">Ja, {fmt(rP.refi)}</span> : <span style={{fontSize:'12px', color:'var(--muted)'}}>Ikke ennå</span>}</td>
                    <td>{fmt(rA.ek)}</td>
                    <td>{fmt(rA.akk)}</td>
                    <td>{rA.kanRefi ? <span className="ep-badge green">Ja, {fmt(rA.refi)}</span> : <span style={{fontSize:'12px', color:'var(--muted)'}}>Ikke ennå</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {(forsteRefiPrivat || forsteRefiAS) && (
        <div className="ep-next">
          <div className="ep-next-title">Neste leilighet, når har du råd?</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
            <div>
              <div style={{fontSize:'10px', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'12px'}}>Privat</div>
              {forsteRefiPrivat ? (
                <div className="ep-next-grid">
                  <div className="ep-next-item"><div className="lbl">Tidligst refinansiering</div><div className="val">År {forsteRefiPrivat.aar}</div></div>
                  <div className="ep-next-item"><div className="lbl">Kapital fra refi</div><div className="val">{fmt(forsteRefiPrivat.refi)}</div></div>
                  <div className="ep-next-item"><div className="lbl">Maks neste bolig</div><div className="val">{fmt(forsteRefiPrivat.maks)}</div></div>
                </div>
              ) : <div style={{fontSize:'13px', color:'#6a7a6e'}}>Ikke mulig innen 10 år</div>}
            </div>
            <div>
              <div style={{fontSize:'10px', color:'#9fc9a8', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'12px'}}>Via AS</div>
              {forsteRefiAS ? (
                <div className="ep-next-grid">
                  <div className="ep-next-item"><div className="lbl">Tidligst refinansiering</div><div className="val">År {forsteRefiAS.aar}</div></div>
                  <div className="ep-next-item"><div className="lbl">Kapital fra refi</div><div className="val">{fmt(forsteRefiAS.refi)}</div></div>
                  <div className="ep-next-item"><div className="lbl">Maks neste bolig</div><div className="val">{fmt(forsteRefiAS.maks)}</div></div>
                </div>
              ) : <div style={{fontSize:'13px', color:'#6a7a6e'}}>Ikke mulig innen 10 år</div>}
            </div>
          </div>
        </div>
      )}

      <p className="es-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører.</p>
    </div>
  );
}