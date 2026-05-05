import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e; --brg-pale: #e8f0ea; --brg-light: #2a6640;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --text: #1a2e1e; --muted: #5a6e5e;
  }
  .ek-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .ek-step { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .ek-step-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .ek-step-num { width: 28px; height: 28px; background: var(--brg); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .ek-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .ek-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ek-field label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .ek-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border 0.2s; }
  .ek-field input[type=number]:focus { border-color: var(--brg); background: white; }
  .ek-divider { border: none; border-top: 1px solid var(--cream-dark); margin: 20px 0; }
  .ek-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--cream-dark); margin-bottom: 16px; }
  .ek-col { background: var(--cream); padding: 20px; }
  .ek-col-header { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .ek-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .ek-line:last-child { border-bottom: none; }
  .ek-line .k { color: var(--muted); }
  .ek-line .v { font-weight: 500; }
  .ek-result { font-family: 'Playfair Display', serif; font-size: 24px; margin: 10px 0 4px; }
  .ek-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; margin-top: 6px; }
  .ek-badge.green { background: var(--brg-pale); color: var(--brg); }
  .ek-badge.red { background: #fce8e8; color: #8b2020; }
  .ek-slider-wrap { background: var(--cream); border: 1px solid var(--cream-dark); padding: 14px 16px; margin-top: 12px; }
  .ek-slider-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .ek-slider-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .ek-slider-val { font-size: 15px; font-weight: 500; font-family: 'Playfair Display', serif; }
  input[type=range] { width: 100%; accent-color: var(--brg); }
  .ek-slider-hints { display: flex; justify-content: space-between; font-size: 11px; color: #bbb; margin-top: 6px; }
  .ek-verdict { padding: 14px 18px; font-size: 13px; line-height: 1.6; margin-bottom: 16px; border-left: 3px solid; }
  .ek-verdict.green { background: var(--brg-pale); color: var(--brg); border-color: var(--brg); }
  .ek-verdict.amber { background: #fdf6e8; color: #7a5a1e; border-color: var(--gold); }
  .ek-verdict.red { background: #fce8e8; color: #8b2020; border-color: #c84040; }
  .ek-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .ek-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .ek-banner { background: var(--brg-pale); border-left: 3px solid var(--brg); padding: 12px 16px; font-size: 13px; color: var(--brg); line-height: 1.6; margin-bottom: 16px; }
  .ep-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }
  .ep-input { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; }
  .ep-input:focus { border-color: var(--brg); background: white; }
  .ep-hint { font-size: 11px; color: var(--muted); margin-top: 4px; font-style: italic; }
  .ep-kapital-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
  .ep-kapital-box { background: var(--cream); border: 1px solid var(--cream-dark); padding: 20px; margin-bottom: 20px; }
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
  .ep-next { background: var(--dark); padding: 28px; margin-bottom: 12px; }
  .ep-next-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 16px; }
  .ep-next-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .ep-next-item .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #6a7a6e; margin-bottom: 6px; }
  .ep-next-item .val { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); }
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
`;

function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' mill kr';
  return Math.round(n / 1000) + ' 000 kr';
}

function Field({ label, value, onChange, step = 1, suffix = 'kr' }) {
  return (
    <div className="ek-field">
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

export default function EiendomAS() {
  const [boligpris, setBoligpris] = useState(3000000);
  const [leie, setLeie] = useState(12000);
  const [felles, setFelles] = useState(3000);
  const [vedlikehold, setVedlikehold] = useState(1500);
  const [dokumentavgiftPst, setDokumentavgiftPst] = useState(2.5);
  const [tinglysingKost, setTinglysingKost] = useState(500);
  const [kapital, setKapital] = useState(500000);
  const [rente, setRente] = useState(5.8);
  const [ekProsent, setEkProsent] = useState(30);
  const [stifteKost, setStifteKost] = useState(36000);
  const [regnskapKost, setRegnskapKost] = useState(10000);
  const [prisvekst, setPrisvekst] = useState(3);
  const [oppussing, setOppussing] = useState(0);
  const [maanedligSparing, setMaanedligSparing] = useState(10000);

  const fmtK = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMndK = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const dokumentavgift = boligpris * (dokumentavgiftPst / 100);
  const ek = boligpris * (ekProsent / 100);
  const tot = ek + dokumentavgift + tinglysingKost + stifteKost;
  const laan = boligpris - ek;
  const renteMnd = laan * (rente / 100) / 12;
  const brutto = leie - renteMnd - felles - vedlikehold - (regnskapKost / 12);
  const skatt = Math.max(0, brutto * 0.22);
  const netto = brutto - skatt;
  const harRaad = kapital >= tot;
  const restKapital = Math.max(0, kapital - tot);

  const getEKKrav = (y) => { if (y <= 2) return 0.30; if (y <= 4) return 0.25; if (y <= 7) return 0.20; return 0.15; };
  const getRente = (y) => { if (y <= 2) return rente; if (y <= 4) return rente - 0.3; if (y <= 7) return rente - 0.5; return rente - 0.7; };

  const rader = (() => {
    const res = [];
    let akkumulert = restKapital;
    let gjenvLaan = laan;
    let boligverdi = boligpris + oppussing;
    for (let y = 1; y <= 10; y++) {
      boligverdi = boligverdi * (1 + prisvekst / 100);
      gjenvLaan = Math.max(0, gjenvLaan - gjenvLaan * 0.02);
      akkumulert += netto * 12 + maanedligSparing * 12;
      const egenkapital = boligverdi - gjenvLaan;
      const refinansiering = Math.max(0, boligverdi * 0.75 - gjenvLaan);
      const ekKravNeste = getEKKrav(y);
      const kanRefinansiere = refinansiering > tot * 0.8;
      res.push({ aar: y, boligverdi, gjenvLaan, egenkapital, akkumulert, refinansiering, kanRefinansiere, ekKravNeste, maksNesteBolig: refinansiering / ekKravNeste });
    }
    return res;
  })();

  const forsteRefi = rader.find(r => r.kanRefinansiere);

  const historikkFaser = [
    { aar: 'År 1 til 2', fase: 'Nystartet AS', ekKrav: '30%', rente: `${rente.toFixed(1)}%`, beskrivelse: 'Ingen historikk. Høyt EK-krav og markedsrente.' },
    { aar: 'År 3 til 4', fase: 'Etablert', ekKrav: '25%', rente: `${(rente - 0.3).toFixed(1)}%`, beskrivelse: '2 godkjente skattemeldinger med overskudd. Bedre betingelser.' },
    { aar: 'År 5 til 7', fase: 'Solid track record', ekKrav: '20%', rente: `${(rente - 0.5).toFixed(1)}%`, beskrivelse: 'Stabil leieinntekt over flere år. Lavere EK-krav.' },
    { aar: 'År 8 og oppover', fase: 'Porteføljeinvestor', ekKrav: '15%', rente: `${(rente - 0.7).toFixed(1)}%`, beskrivelse: 'Beste betingelser som profesjonell investor.' }
  ];
  const fasefarger = ['#fdf6e8', '#e8f0f8', 'var(--brg-pale)', '#f0e8f8'];
  const fasetekst = ['#7a5a1e', '#1a3a5e', 'var(--brg)', '#5a1a7a'];

  return (
    <div className="ek-wrap">
      <style>{styles}</style>

      <div className="ek-banner">
        Kjøp via AS: Høyere egenkapitalkrav og ekstra kostnader, men bedre for portefølje og reinvestering av overskudd.
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">1</div>
          <div className="ek-step-title">Om boligen</div>
        </div>
        <div className="ek-grid">
          <Field label="Boligpris" value={boligpris} onChange={setBoligpris} step={50000} />
          <Field label="Leieinntekt" value={leie} onChange={setLeie} step={500} suffix="kr/mnd" />
          <Field label="Felleskostnader" value={felles} onChange={setFelles} step={500} suffix="kr/mnd" />
          <Field label="Vedlikehold" value={vedlikehold} onChange={setVedlikehold} step={250} suffix="kr/mnd" />
        </div>
        <div className="ek-section-label">Transaksjonskostnader</div>
        <div className="ek-grid">
          <Field label="Dokumentavgift" value={dokumentavgiftPst} onChange={setDokumentavgiftPst} step={0.1} suffix="%" />
          <Field label="Tinglysning" value={tinglysingKost} onChange={setTinglysingKost} step={100} />
        </div>
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">2</div>
          <div className="ek-step-title">AS-kostnader</div>
        </div>
        <div className="ek-grid">
          <Field label="Tilgjengelig kapital" value={kapital} onChange={setKapital} step={50000} />
          <Field label="Rente næringslån" value={rente} onChange={setRente} step={0.1} suffix="%" />
          <Field label="Stifte AS" value={stifteKost} onChange={setStifteKost} step={1000} />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <div className="ek-slider-wrap">
          <div className="ek-slider-row">
            <span className="ek-slider-label">Egenkapitalkrav fra banken</span>
            <span className="ek-slider-val">{ekProsent}%</span>
          </div>
          <input type="range" min="20" max="40" step="1" value={ekProsent} onChange={e => setEkProsent(+e.target.value)} />
          <div className="ek-slider-hints"><span>20% – god historikk</span><span>30% – nystartet</span><span>40% – streng bank</span></div>
        </div>
        <hr className="ek-divider" />
        <div className="ek-two-col">
          <div className="ek-col">
            <div className="ek-col-header">Oppstartskostnader</div>
            <div className="ek-line"><span className="k">Egenkapital ({ekProsent}%)</span><span className="v">{fmtK(ek)}</span></div>
            <div className="ek-line"><span className="k">Dokumentavgift</span><span className="v">{fmtK(dokumentavgift)}</span></div>
            <div className="ek-line"><span className="k">Stifte AS</span><span className="v">{fmtK(stifteKost)}</span></div>
            <div className="ek-line"><span className="k">Tinglysning</span><span className="v">{fmtK(tinglysingKost)}</span></div>
            <div className="ek-line"><span className="k" style={{fontWeight:'500'}}>Totalt</span><span className="v">{fmtK(tot)}</span></div>
            {harRaad && <div className="ek-line"><span className="k" style={{color:'var(--brg)'}}>Restkapital</span><span className="v" style={{color:'var(--brg)'}}>{fmtK(restKapital)}</span></div>}
            <span className={`ek-badge ${harRaad ? 'green' : 'red'}`}>{harRaad ? 'Du har råd' : 'Mangler ' + fmtK(tot - kapital)}</span>
          </div>
          <div className="ek-col">
            <div className="ek-col-header">Månedlig økonomi</div>
            <div className="ek-line"><span className="k">Leieinntekt</span><span className="v" style={{color:'var(--brg)'}}>+{fmtK(leie)}</span></div>
            <div className="ek-line"><span className="k">Renter ({rente}%)</span><span className="v" style={{color:'#8b2020'}}>-{fmtK(renteMnd)}</span></div>
            <div className="ek-line"><span className="k">Felles + vedlikehold</span><span className="v" style={{color:'#8b2020'}}>-{fmtK(felles+vedlikehold)}</span></div>
            <div className="ek-line"><span className="k">Regnskapsfører</span><span className="v" style={{color:'#8b2020'}}>-{fmtK(regnskapKost/12)}</span></div>
            <div className="ek-line"><span className="k">Skatt (22%)</span><span className="v" style={{color:'#8b2020'}}>-{fmtK(skatt)}</span></div>
            <div className="ek-result" style={{color: netto >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMndK(netto)}</div>
          </div>
        </div>
        <div className={`ek-verdict ${!harRaad ? 'red' : netto >= 0 ? 'green' : 'amber'}`}>
          {!harRaad ? `Du mangler ${fmtK(tot - kapital)} for å gjennomføre kjøpet via AS.`
            : netto >= 0 ? `Lønnsomt! Du sitter igjen med ${fmtMndK(netto)} etter alle kostnader og skatt.`
            : `Negativt resultat på ${fmtMndK(netto)}. Vurder høyere leie eller lavere kjøpspris.`}
        </div>
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">3</div>
          <div className="ek-step-title">Historikk og lånevilkår over tid</div>
        </div>
        <div style={{overflowX:'auto', marginBottom:'24px'}}>
          <table className="ep-historikk-table">
            <thead>
              <tr><th>Periode</th><th>Fase</th><th>EK-krav</th><th>Rente</th><th>Bankens vurdering</th></tr>
            </thead>
            <tbody>
              {historikkFaser.map((f, i) => (
                <tr key={i}>
                  <td style={{fontWeight:'500'}}>{f.aar}</td>
                  <td><span className="ep-badge" style={{background: fasefarger[i], color: fasetekst[i]}}>{f.fase}</span></td>
                  <td style={{fontWeight:'500'}}>{f.ekKrav}</td>
                  <td>{f.rente}</td>
                  <td style={{fontSize:'12px', color:'var(--muted)'}}>{f.beskrivelse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{background:'var(--cream)', border:'1px solid var(--cream-dark)', padding:'20px'}}>
          <div style={{fontSize:'13px', fontWeight:'500', color:'var(--dark)', marginBottom:'16px'}}>Veien fra nystartet til porteføljeinvestor</div>
          <div className="ep-timeline">
            {[
              { tittel: 'Driftsselskap bygger historikk', desc: 'Eier eiendommene, tar opp lån og viser overskudd år for år.', future: false },
              { tittel: 'År 3: Første refinansiering', desc: 'Banken senker EK-krav og rente. Kapital hentes ut til neste kjøp.', future: true },
              { tittel: 'År 5 til 7: Solid track record', desc: 'Stabil leieinntekt og 20% EK-krav. Enklere å vokse porteføljen.', future: true },
              { tittel: 'År 8 og oppover: Porteføljeinvestor', desc: 'Med 2 til 3 enheter og solid historikk er AS en attraktiv låntaker.', future: true }
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

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">4</div>
          <div className="ek-step-title">10-års prognose</div>
        </div>
        <div className="ep-kapital-box">
          <div style={{fontSize:'12px', fontWeight:'500', color:'var(--dark)', marginBottom:'12px'}}>Forutsetninger for prognosen</div>
          <div className="ep-kapital-grid">
            <InputFelt label="Oppussing" value={oppussing} onChange={setOppussing} hint="Øker boligverdi fra start" />
            <InputFelt label="Månedlig sparing" value={maanedligSparing} onChange={setMaanedligSparing} suffix="kr/mnd" hint="Skytes inn i AS" />
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
                <th>År</th><th>Boligverdi</th><th>Gjenstående lån</th><th>Egenkapital</th><th>Total kapital</th><th>EK-krav neste</th><th>Kan refinansiere</th>
              </tr>
            </thead>
            <tbody>
              {rader.map(r => (
                <tr key={r.aar} className={r.kanRefinansiere && r.aar === forsteRefi?.aar ? 'ep-highlight' : ''}>
                  <td className="ep-bold">År {r.aar}</td>
                  <td>{fmt(r.boligverdi)}</td>
                  <td className="ep-red">{fmt(r.gjenvLaan)}</td>
                  <td className="ep-bold">{fmt(r.egenkapital)}</td>
                  <td className="ep-bold">{fmt(r.akkumulert)}</td>
                  <td><span className="ep-badge blue">{Math.round(r.ekKravNeste * 100)}%</span></td>
                  <td>{r.kanRefinansiere ? <span className="ep-badge green">Ja, {fmt(r.refinansiering)}</span> : <span style={{fontSize:'12px', color:'var(--muted)'}}>Ikke ennå</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {forsteRefi && (
        <div className="ep-next">
          <div className="ep-next-title">Neste leilighet, når har du råd?</div>
          <div className="ep-next-grid">
            <div className="ep-next-item"><div className="lbl">Tidligst refinansiering</div><div className="val">År {forsteRefi.aar}</div></div>
            <div className="ep-next-item"><div className="lbl">Kapital fra refinansiering</div><div className="val">{fmt(forsteRefi.refinansiering)}</div></div>
            <div className="ep-next-item"><div className="lbl">EK-krav neste kjøp</div><div className="val">{Math.round(forsteRefi.ekKravNeste * 100)}%</div></div>
            <div className="ep-next-item"><div className="lbl">Maks boligpris neste</div><div className="val">{fmt(forsteRefi.maksNesteBolig)}</div></div>
            <div className="ep-next-item"><div className="lbl">Total kapital akkumulert</div><div className="val">{fmt(forsteRefi.akkumulert)}</div></div>
          </div>
        </div>
      )}

      <p className="ek-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører.</p>
    </div>
  );
}