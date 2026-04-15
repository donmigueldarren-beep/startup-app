import { useState } from 'react';
import EiendomPrognose from './EiendomPrognose';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
  .ek-wrap { font-family: 'DM Sans', sans-serif; color: #1a1a1a; }
  .ek-step { background: #fff; border: 1px solid #e8e4df; border-radius: 16px; padding: 28px; margin-bottom: 16px; }
  .ek-step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .ek-step-num { width: 28px; height: 28px; border-radius: 50%; background: #1a1a1a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; flex-shrink: 0; }
  .ek-step-title { font-family: 'DM Serif Display', serif; font-size: 18px; }
  .ek-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ek-field label { display: block; font-size: 12px; color: #888; margin-bottom: 6px; letter-spacing: 0.03em; text-transform: uppercase; }
  .ek-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid #e0dbd5; border-radius: 8px; font-size: 15px; font-family: 'DM Sans', sans-serif; background: #faf9f7; transition: border 0.2s; outline: none; box-sizing: border-box; }
  .ek-field input[type=number]:focus { border-color: #1a1a1a; background: #fff; }
  .ek-divider { border: none; border-top: 1px solid #e8e4df; margin: 20px 0; }
  .ek-col-header { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 12px; }
  .ek-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e8e4df; border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
  .ek-col { background: #faf9f7; padding: 20px; }
  .ek-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0ece8; font-size: 13px; }
  .ek-line:last-child { border-bottom: none; }
  .ek-line .k { color: #888; }
  .ek-line .v { font-weight: 500; }
  .ek-result { font-size: 22px; font-family: 'DM Serif Display', serif; margin: 8px 0 4px; }
  .ek-badge { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 20px; margin-top: 4px; }
  .ek-badge.green { background: #dcfce7; color: #166534; }
  .ek-badge.red { background: #fee2e2; color: #991b1b; }
  .ek-slider-wrap { background: #faf9f7; border: 1px solid #e8e4df; border-radius: 10px; padding: 14px 16px; margin-top: 12px; }
  .ek-slider-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .ek-slider-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.03em; }
  .ek-slider-val { font-size: 15px; font-weight: 500; }
  input[type=range] { width: 100%; accent-color: #1a1a1a; }
  .ek-slider-hints { display: flex; justify-content: space-between; font-size: 11px; color: #bbb; margin-top: 6px; }
  .ek-verdict { border-radius: 12px; padding: 16px 20px; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
  .ek-verdict.green { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
  .ek-verdict.amber { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
  .ek-verdict.red { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
  .ek-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .ek-compare-card { border-radius: 12px; padding: 20px; border: 1.5px solid #e8e4df; }
  .ek-compare-card.winner { border-color: #1a1a1a; background: #fafaf9; }
  .ek-disclaimer { font-size: 11px; color: #bbb; margin-top: 12px; }
  .ek-section-label { font-size: 12px; font-weight: 500; color: #555; text-transform: uppercase; letter-spacing: 0.05em; margin: 16px 0 10px; }
`;

function Field({ label, value, onChange, step = 1, suffix = 'kr' }) {
  return (
    <div className="ek-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#aaa', pointerEvents: 'none' }}>{suffix}</span>
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
    ? `Du har råd til å kjøpe privat, men ikke via AS med ${ekProsentAS}% egenkapitalkrav. Prøv å justere EK-kravet eller øk kapitalen.`
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
          <Field label="Forventet leieinntekt" value={leie} onChange={setLeie} step={500} suffix="kr/mnd" />
          <Field label="Felleskostnader" value={felles} onChange={setFelles} step={500} suffix="kr/mnd" />
          <Field label="Forsikring + vedlikehold" value={vedlikehold} onChange={setVedlikehold} step={250} suffix="kr/mnd" />
        </div>
        <div className="ek-section-label">Transaksjonskostnader</div>
        <div className="ek-grid">
          <Field label="Dokumentavgift" value={dokumentavgiftPst} onChange={setDokumentavgiftPst} step={0.1} suffix="%" />
          <Field label="Tinglysningskostnad" value={tinglysingKost} onChange={setTinglysingKost} step={100} />
        </div>
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">2</div>
          <div className="ek-step-title">Privat kjøp</div>
        </div>
        <div className="ek-grid">
          <Field label="Din tilgjengelige kapital" value={kapitalPrivat} onChange={setKapitalPrivat} step={50000} />
          <Field label="Rente på boliglån" value={rentePrivat} onChange={setRentePrivat} step={0.1} suffix="%" />
          <Field label="Egenkapitalkrav" value={ekProsentPrivat} onChange={setEkProsentPrivat} step={1} suffix="%" />
          <Field label="Skatteprosent på overskudd" value={skattProsentPrivat} onChange={setSkattProsentPrivat} step={1} suffix="%" />
        </div>
        <hr className="ek-divider" />
        <div className="ek-two-col">
          <div className="ek-col">
            <div className="ek-col-header">Oppstartskostnader</div>
            <div className="ek-line"><span className="k">Egenkapital ({ekProsentPrivat}%)</span><span className="v">{fmt(ekPrivat)}</span></div>
            <div className="ek-line"><span className="k">Dokumentavgift ({dokumentavgiftPst}%)</span><span className="v">{fmt(dokumentavgift)}</span></div>
            <div className="ek-line"><span className="k">Tinglysning</span><span className="v">{fmt(tinglysingKost)}</span></div>
            <div className="ek-line"><span className="k" style={{fontWeight:'500'}}>Totalt</span><span className="v">{fmt(totPrivat)}</span></div>
            {harPrivat && <div className="ek-line"><span className="k" style={{color:'#16a34a'}}>Restkapital</span><span className="v" style={{color:'#16a34a'}}>{fmt(restKapitalPrivat)}</span></div>}
            <span className={`ek-badge ${harPrivat ? 'green' : 'red'}`}>
              {harPrivat ? 'Du har råd' : 'Mangler ' + fmt(totPrivat - kapitalPrivat)}
            </span>
          </div>
          <div className="ek-col">
            <div className="ek-col-header">Månedlig økonomi</div>
            <div className="ek-line"><span className="k">Leieinntekt</span><span className="v" style={{color:'#16a34a'}}>+{fmt(leie)}</span></div>
            <div className="ek-line"><span className="k">Renter ({rentePrivat}%)</span><span className="v" style={{color:'#dc2626'}}>-{fmt(renteMndPrivat)}</span></div>
            <div className="ek-line"><span className="k">Felles + vedlikehold</span><span className="v" style={{color:'#dc2626'}}>-{fmt(felles + vedlikehold)}</span></div>
            <div className="ek-line"><span className="k">Skatt ({skattProsentPrivat}%)</span><span className="v" style={{color:'#dc2626'}}>-{fmt(skattPrivat)}</span></div>
            <div className="ek-result" style={{color: nettoPrivat >= 0 ? '#16a34a' : '#dc2626'}}>{fmtMnd(nettoPrivat)}</div>
          </div>
        </div>
      </div>

      <div className="ek-step">
        <div className="ek-step-header">
          <div className="ek-step-num">3</div>
          <div className="ek-step-title">Kjøp via AS</div>
        </div>
        <div className="ek-grid">
          <Field label="Din tilgjengelige kapital" value={kapitalAS} onChange={setKapitalAS} step={50000} />
          <Field label="Rente på næringslån" value={renteAS} onChange={setRenteAS} step={0.1} suffix="%" />
          <Field label="Kostnad å stifte AS" value={stifteKost} onChange={setStifteKost} step={1000} />
          <Field label="Regnskapsfører (per år)" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <div className="ek-slider-wrap">
          <div className="ek-slider-row">
            <span className="ek-slider-label">Egenkapitalkrav fra banken</span>
            <span className="ek-slider-val">{ekProsentAS}%</span>
          </div>
          <input type="range" min="20" max="40" step="1" value={ekProsentAS} onChange={e => setEkProsentAS(+e.target.value)} />
          <div className="ek-slider-hints">
            <span>20% – god historikk</span>
            <span>30% – nystartet AS</span>
            <span>40% – streng bank</span>
          </div>
        </div>
        <hr className="ek-divider" />
        <div className="ek-two-col">
          <div className="ek-col">
            <div className="ek-col-header">Oppstartskostnader</div>
            <div className="ek-line"><span className="k">Egenkapital ({ekProsentAS}%)</span><span className="v">{fmt(ekAS)}</span></div>
            <div className="ek-line"><span className="k">Dokumentavgift ({dokumentavgiftPst}%)</span><span className="v">{fmt(dokumentavgift)}</span></div>
            <div className="ek-line"><span className="k">Stifte AS</span><span className="v">{fmt(stifteKost)}</span></div>
            <div className="ek-line"><span className="k">Tinglysning</span><span className="v">{fmt(tinglysingKost)}</span></div>
            <div className="ek-line"><span className="k" style={{fontWeight:'500'}}>Totalt</span><span className="v">{fmt(totAS)}</span></div>
            {harAS && <div className="ek-line"><span className="k" style={{color:'#16a34a'}}>Restkapital</span><span className="v" style={{color:'#16a34a'}}>{fmt(restKapitalAS)}</span></div>}
            <span className={`ek-badge ${harAS ? 'green' : 'red'}`}>
              {harAS ? 'Du har råd' : 'Mangler ' + fmt(totAS - kapitalAS)}
            </span>
          </div>
          <div className="ek-col">
            <div className="ek-col-header">Månedlig økonomi</div>
            <div className="ek-line"><span className="k">Leieinntekt</span><span className="v" style={{color:'#16a34a'}}>+{fmt(leie)}</span></div>
            <div className="ek-line"><span className="k">Renter ({renteAS}%)</span><span className="v" style={{color:'#dc2626'}}>-{fmt(renteMndAS)}</span></div>
            <div className="ek-line"><span className="k">Felles + vedlikehold</span><span className="v" style={{color:'#dc2626'}}>-{fmt(felles + vedlikehold)}</span></div>
            <div className="ek-line"><span className="k">Regnskapsfører</span><span className="v" style={{color:'#dc2626'}}>-{fmt(regnskapKost / 12)}</span></div>
            <div className="ek-line"><span className="k">Skatt (22%)</span><span className="v" style={{color:'#dc2626'}}>-{fmt(skattAS)}</span></div>
            <div className="ek-result" style={{color: nettoAS >= 0 ? '#16a34a' : '#dc2626'}}>{fmtMnd(nettoAS)}</div>
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
            <div style={{fontSize:'12px', color:'#888', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'6px'}}>Privat</div>
            <div className="ek-result" style={{color: nettoPrivat >= 0 ? '#16a34a' : '#dc2626'}}>{fmtMnd(nettoPrivat)}</div>
            <div style={{fontSize:'12px', color:'#888'}}>Oppstart: {fmt(totPrivat)}</div>
            {harPrivat && <div style={{fontSize:'12px', color:'#16a34a', marginTop:'4px'}}>Restkapital: {fmt(restKapitalPrivat)}</div>}
            {nettoPrivat >= nettoAS && <span className="ek-badge green" style={{marginTop:'8px'}}>Best kontantstrøm</span>}
          </div>
          <div className={`ek-compare-card ${nettoAS > nettoPrivat ? 'winner' : ''}`}>
            <div style={{fontSize:'12px', color:'#888', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'6px'}}>Via AS ({ekProsentAS}% EK)</div>
            <div className="ek-result" style={{color: nettoAS >= 0 ? '#16a34a' : '#dc2626'}}>{fmtMnd(nettoAS)}</div>
            <div style={{fontSize:'12px', color:'#888'}}>Oppstart: {fmt(totAS)}</div>
            {harAS && <div style={{fontSize:'12px', color:'#16a34a', marginTop:'4px'}}>Restkapital: {fmt(restKapitalAS)}</div>}
            {nettoAS > nettoPrivat && <span className="ek-badge green" style={{marginTop:'8px'}}>Best kontantstrøm</span>}
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