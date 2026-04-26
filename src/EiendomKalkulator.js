import { useState, useRef } from 'react';
import EiendomPrognose from './EiendomPrognose';

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
  .ek-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .ek-compare-card { padding: 20px; border: 1px solid var(--cream-dark); background: white; }
  .ek-compare-card.winner { border-color: var(--brg); border-width: 2px; }
  .ek-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .ek-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .ek-info { background: var(--cream); border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
`;

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

function EiendomKalkulator() {
  const [boligpris, setBoligpris] = useState(3000000);
  const [leie, setLeie] = useState(12000);
  const [felles, setFelles] = useState(3000);
  const [vedlikehold, setVedlikehold] = useState(1500);
  const [dokumentavgiftPst, setDokumentavgiftPst] = useState(2.5);
  const [tinglysingKost, setTinglysingKost] = useState(500);
  const [kapitalPrivat, setKapitalPrivat] = useState(500000);
  const [rentePrivat, setRentePrivat] = useState(5.2);
  const [ekProsentPrivat, setEkProsentPrivat] = useState(10);
  const [skattProsentPrivat, setSkattProsentPrivat] = useState(22);
  const [kapitalAS, setKapitalAS] = useState(500000);
  const [renteAS, setRenteAS] = useState(5.8);
  const [ekProsentAS, setEkProsentAS] = useState(30);
  const [stifteKost, setStifteKost] = useState(36000);
  const [regnskapKost, setRegnskapKost] = useState(10000);

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const dokumentavgift = boligpris * (dokumentavgiftPst / 100);
  const ekPrivat = boligpris * (ekProsentPrivat / 100);
  const totPrivat = ekPrivat + dokumentavgift + tinglysingKost;
  const laanPrivat = boligpris - ekPrivat;
  const renteMndPrivat = laanPrivat * (rentePrivat / 100) / 12;
  const bruttoPrivat = leie - renteMndPrivat - felles - vedlikehold;
  const skattPrivat = Math.max(0, bruttoPrivat * (skattProsentPrivat / 100));
  const nettoPrivat = bruttoPrivat - skattPrivat;
  const harPrivat = kapitalPrivat >= totPrivat;
  const restKapitalPrivat = Math.max(0, kapitalPrivat - totPrivat);

  const ekAS = boligpris * (ekProsentAS / 100);
  const totAS = ekAS + dokumentavgift + tinglysingKost + stifteKost;
  const laanAS = boligpris - ekAS;
  const renteMndAS = laanAS * (renteAS / 100) / 12;
  const bruttoAS = leie - renteMndAS - felles - vedlikehold - (regnskapKost / 12);
  const skattAS = Math.max(0, bruttoAS * 0.22);
  const nettoAS = bruttoAS - skattAS;
  const harAS = kapitalAS >= totAS;
  const restKapitalAS = Math.max(0, kapitalAS - totAS);

  const verdiktKlasse = !harPrivat && !harAS ? 'red' : harPrivat && harAS ? 'green' : 'amber';
  const verdiktTekst = !harPrivat && !harAS
    ? `Du har ikke nok kapital for noen av alternativene. Du trenger minst ${fmt(totPrivat)} for å kjøpe privat.`
    : !harPrivat
    ? `Du har ikke nok kapital for privat kjøp (trenger ${fmt(totPrivat)}), men kan vurdere AS hvis du øker kapitalen til ${fmt(totAS)}.`
    : !harAS
    ? `Du har råd til å kjøpe privat, men ikke via AS med ${ekProsentAS}% egenkapitalkrav.`
    : `Du har råd til begge alternativene. ${nettoPrivat > nettoAS ? 'Privat gir best månedlig kontantstrøm.' : 'AS gir best månedlig kontantstrøm.'} Velg AS hvis du planlegger portefølje med flere enheter.`;

  return (
    <div className="ek-wrap">
      <style>{styles}</style>

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
          <div className="ek-step-title">Privat kjøp</div>
        </div>
        <div className="ek-grid">
          <Field label="Tilgjengelig kapital" value={kapitalPrivat} onChange={setKapitalPrivat} step={50000} />
          <Field label="Rente" value={rentePrivat} onChange={setRentePrivat} step={0.1} suffix="%" />
          <Field label="Egenkapitalkrav" value={ekProsentPrivat} onChange={setEkProsentPrivat} step={1} suffix="%" />
          <Field label="Skatteprosent" value={skattProsentPrivat} onChange={setSkattProsentPrivat} step={1} suffix="%" />
        </div>
        <hr className="ek-divider" />
        <div className="ek-two-col">
          <div className="ek-col">
            <div className="ek-col-header">Oppstartskostnader</div>
            <div className="ek-line"><span className="k">Egenkapital ({ekProsentPrivat}%)</span><span className="v">{fmt(ekPrivat)}</span></div>
            <div className="ek-line"><span className="k">Dokumentavgift</span><span className="v">{fmt(dokumentavgift)}</span></div>
            <div className="ek-line"><span className="k">Tinglysning</span><span className="v">{fmt(tinglysingKost)}</span></div>
            <div className="ek-line"><span className="k" style={{fontWeight:'500'}}>Totalt</span><span className="v">{fmt(totPrivat)}</span></div>
            {harPrivat && <div className="ek-line"><span className="k" style={{color:'var(--brg)'}}>Restkapital</span><span className="v" style={{color:'var(--brg)'}}>{fmt(restKapitalPrivat)}</span></div>}
            <span className={`ek-badge ${harPrivat ? 'green' : 'red'}`}>{harPrivat ? 'Du har råd' : 'Mangler ' + fmt(totPrivat - kapitalPrivat)}</span>
          </div>
          <div className="ek-col">
            <div className="ek-col-header">Månedlig økonomi</div>
            <div className="ek-line"><span className="k">Leieinntekt</span><span className="v" style={{color:'var(--brg)'}}>+{fmt(leie)}</span></div>
            <div className="ek-line"><span className="k">Renter ({rentePrivat}%)</span><span className="v" style={{color:'#8b2020'}}>-{fmt(renteMndPrivat)}</span></div>
            <div className="ek-line"><span className="k">Felles + vedlikehold</span><span className="v" style={{color:'#8b2020'}}>-{fmt(felles+vedlikehold)}</span></div>
            <div className="ek-line"><span className="k">Skatt ({skattProsentPrivat}%)</span><span className="v" style={{color:'#8b2020'}}>-{fmt(skattPrivat)}</span></div>
            <div className="ek-result" style={{color: nettoPrivat >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMnd(nettoPrivat)}</div>
          </div>
        </div>
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">3</div>
          <div className="ek-step-title">Kjøp via AS</div>
        </div>
        <div className="ek-grid">
          <Field label="Tilgjengelig kapital" value={kapitalAS} onChange={setKapitalAS} step={50000} />
          <Field label="Rente næringslån" value={renteAS} onChange={setRenteAS} step={0.1} suffix="%" />
          <Field label="Stifte AS" value={stifteKost} onChange={setStifteKost} step={1000} />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <div className="ek-slider-wrap">
          <div className="ek-slider-row">
            <span className="ek-slider-label">Egenkapitalkrav fra banken</span>
            <span className="ek-slider-val">{ekProsentAS}%</span>
          </div>
          <input type="range" min="20" max="40" step="1" value={ekProsentAS} onChange={e => setEkProsentAS(+e.target.value)} />
          <div className="ek-slider-hints">
            <span>20% – god historikk</span>
            <span>30% – nystartet</span>
            <span>40% – streng bank</span>
          </div>
        </div>
        <hr className="ek-divider" />
        <div className="ek-two-col">
          <div className="ek-col">
            <div className="ek-col-header">Oppstartskostnader</div>
            <div className="ek-line"><span className="k">Egenkapital ({ekProsentAS}%)</span><span className="v">{fmt(ekAS)}</span></div>
            <div className="ek-line"><span className="k">Dokumentavgift</span><span className="v">{fmt(dokumentavgift)}</span></div>
            <div className="ek-line"><span className="k">Stifte AS</span><span className="v">{fmt(stifteKost)}</span></div>
            <div className="ek-line"><span className="k">Tinglysning</span><span className="v">{fmt(tinglysingKost)}</span></div>
            <div className="ek-line"><span className="k" style={{fontWeight:'500'}}>Totalt</span><span className="v">{fmt(totAS)}</span></div>
            {harAS && <div className="ek-line"><span className="k" style={{color:'var(--brg)'}}>Restkapital</span><span className="v" style={{color:'var(--brg)'}}>{fmt(restKapitalAS)}</span></div>}
            <span className={`ek-badge ${harAS ? 'green' : 'red'}`}>{harAS ? 'Du har råd' : 'Mangler ' + fmt(totAS - kapitalAS)}</span>
          </div>
          <div className="ek-col">
            <div className="ek-col-header">Månedlig økonomi</div>
            <div className="ek-line"><span className="k">Leieinntekt</span><span className="v" style={{color:'var(--brg)'}}>+{fmt(leie)}</span></div>
            <div className="ek-line"><span className="k">Renter ({renteAS}%)</span><span className="v" style={{color:'#8b2020'}}>-{fmt(renteMndAS)}</span></div>
            <div className="ek-line"><span className="k">Felles + vedlikehold</span><span className="v" style={{color:'#8b2020'}}>-{fmt(felles+vedlikehold)}</span></div>
            <div className="ek-line"><span className="k">Regnskapsfører</span><span className="v" style={{color:'#8b2020'}}>-{fmt(regnskapKost/12)}</span></div>
            <div className="ek-line"><span className="k">Skatt (22%)</span><span className="v" style={{color:'#8b2020'}}>-{fmt(skattAS)}</span></div>
            <div className="ek-result" style={{color: nettoAS >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMnd(nettoAS)}</div>
          </div>
        </div>
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">4</div>
          <div className="ek-step-title">Sammenligning og anbefaling</div>
        </div>
        <div className="ek-compare-grid">
          <div className={`ek-compare-card ${nettoPrivat >= nettoAS ? 'winner' : ''}`}>
            <div style={{fontSize:'10px', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'8px'}}>Privat</div>
            <div className="ek-result" style={{color: nettoPrivat >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMnd(nettoPrivat)}</div>
            <div style={{fontSize:'12px', color:'var(--muted)'}}>Oppstart: {fmt(totPrivat)}</div>
            {harPrivat && <div style={{fontSize:'12px', color:'var(--brg)', marginTop:'4px'}}>Restkapital: {fmt(restKapitalPrivat)}</div>}
            {nettoPrivat >= nettoAS && <div><span className="ek-badge green" style={{marginTop:'8px'}}>Best kontantstrøm</span></div>}
          </div>
          <div className={`ek-compare-card ${nettoAS > nettoPrivat ? 'winner' : ''}`}>
            <div style={{fontSize:'10px', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'8px'}}>Via AS ({ekProsentAS}% EK)</div>
            <div className="ek-result" style={{color: nettoAS >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMnd(nettoAS)}</div>
            <div style={{fontSize:'12px', color:'var(--muted)'}}>Oppstart: {fmt(totAS)}</div>
            {harAS && <div style={{fontSize:'12px', color:'var(--brg)', marginTop:'4px'}}>Restkapital: {fmt(restKapitalAS)}</div>}
            {nettoAS > nettoPrivat && <div><span className="ek-badge green" style={{marginTop:'8px'}}>Best kontantstrøm</span></div>}
          </div>
        </div>
        <div className={`ek-verdict ${verdiktKlasse}`}>{verdiktTekst}</div>
        <p className="ek-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</p>
      </div>

      <EiendomPrognose
        boligpris={boligpris}
        nettoPrivat={nettoPrivat}
        nettoAS={nettoAS}
        totPrivat={totPrivat}
        totAS={totAS}
        rentePrivat={rentePrivat}
        renteAS={renteAS}
        ekProsentAS={ekProsentAS}
        restKapitalPrivat={restKapitalPrivat}
        restKapitalAS={restKapitalAS}
      />
    </div>
  );
}

export default EiendomKalkulator;