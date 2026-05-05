import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e;
    --brg-pale: #e8f0ea;
    --cream: #f5f0e8;
    --cream-dark: #ede7d9;
    --gold: #c9a84c;
    --dark: #0f1a12;
    --text: #1a2e1e;
    --muted: #5a6e5e;
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
  input[type=range] { width: 100%; accent-color: var(--brg); }
  .es-slider-hints { display: flex; justify-content: space-between; font-size: 11px; color: #bbb; margin-top: 6px; }

  .es-verdict { padding: 16px 20px; font-size: 14px; line-height: 1.7; margin-bottom: 16px; border-left: 3px solid var(--dark); background: #f5f5f0; color: var(--dark); }
  .es-verdict strong { font-weight: 600; }
  .es-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }

  .es-rad { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .es-rad:last-child { border-bottom: none; }
  .es-rad-label { color: var(--muted); }
  .es-rad-vals { display: flex; gap: 24px; }
  .es-rad-val { font-weight: 500; min-width: 100px; text-align: right; }
  .es-rad-val.privat { color: #7a5a1e; }
  .es-rad-val.as { color: var(--brg); }
  .es-rad-val.winner { font-weight: 700; }
`;

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

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const dokumentavgift = boligpris * (dokumentavgiftPst / 100);

  // Privat
  const ekPrivat = boligpris * (ekProsentPrivat / 100);
  const totPrivat = ekPrivat + dokumentavgift + tinglysingKost;
  const laanPrivat = boligpris - ekPrivat;
  const renteMndPrivat = laanPrivat * (rentePrivat / 100) / 12;
  const bruttoPrivat = leie - renteMndPrivat - felles - vedlikehold;
  const skattPrivat = Math.max(0, bruttoPrivat * (skattProsentPrivat / 100));
  const nettoPrivat = bruttoPrivat - skattPrivat;
  const harPrivat = kapital >= totPrivat;
  const restPrivat = Math.max(0, kapital - totPrivat);

  // AS
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
  const ingenHarRaad = !harPrivat && !harAS;

  const verdikt = ingenHarRaad
    ? `Du har ikke nok kapital for noen av alternativene. Du trenger minst ${fmt(totPrivat)} for privat kjøp.`
    : !harPrivat && harAS
    ? `Du har ikke råd til privat kjøp (trenger ${fmt(totPrivat)}), men kan kjøpe via AS.`
    : harPrivat && !harAS
    ? `Du har råd til privat kjøp. For AS trenger du ${fmt(totAS - kapital)} mer i kapital.`
    : privatVinner
    ? `Privat kjøp gir best månedlig kontantstrøm (${fmtMnd(nettoPrivat)} vs ${fmtMnd(nettoAS)}). Velg AS hvis du planlegger å bygge portefølje med flere enheter.`
    : `AS gir best månedlig kontantstrøm (${fmtMnd(nettoAS)} vs ${fmtMnd(nettoPrivat)}). Husk at AS også har fordeler ved reinvestering og vekst.`;

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
            <div style={{marginTop:'12px'}}>
              <Field label="Egenkapitalkrav" value={ekProsentPrivat} onChange={setEkProsentPrivat} step={1} suffix="%" />
            </div>
            <div style={{marginTop:'12px'}}>
              <Field label="Skatteprosent" value={skattProsentPrivat} onChange={setSkattProsentPrivat} step={1} suffix="%" />
            </div>
          </div>
          <div className="es-col as">
            <div className="es-col-label">Kjøp via AS</div>
            <Field label="Rente næringslån" value={renteAS} onChange={setRenteAS} step={0.1} suffix="%" />
            <div style={{marginTop:'12px'}}>
              <Field label="Stifte AS" value={stifteKost} onChange={setStifteKost} step={1000} />
            </div>
            <div style={{marginTop:'12px'}}>
              <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
            </div>
            <div className="es-slider-wrap" style={{marginTop:'12px'}}>
              <div className="es-slider-row">
                <span className="es-slider-label">EK-krav bank</span>
                <span className="es-slider-val">{ekProsentAS}%</span>
              </div>
              <input type="range" min="20" max="40" step="1" value={ekProsentAS} onChange={e => setEkProsentAS(+e.target.value)} />
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
            <div className="es-line"><span className="k">Oppstart</span><span className="v">{fmt(totPrivat)}</span></div>
            <div className="es-line"><span className="k">Egenkapital</span><span className="v">{fmt(ekPrivat)}</span></div>
            <div className="es-line"><span className="k">Restkapital</span><span className="v" style={{color: harPrivat ? 'var(--brg)' : '#8b2020'}}>{harPrivat ? fmt(restPrivat) : '–'}</span></div>
            <div className="es-line"><span className="k">Månedlig rente</span><span className="v">-{fmt(renteMndPrivat)}</span></div>
            <div className="es-line"><span className="k">Skatt/mnd</span><span className="v">-{fmt(skattPrivat)}</span></div>
            <div className="es-result" style={{color: nettoPrivat >= 0 ? '#7a5a1e' : '#8b2020'}}>{fmtMnd(nettoPrivat)}</div>
            <span className={`es-badge ${!harPrivat ? 'red' : privatVinner ? 'winner' : 'gold'}`}>
              {!harPrivat ? 'Mangler ' + fmt(totPrivat - kapital) : privatVinner ? 'Best kontantstrøm' : 'Du har råd'}
            </span>
          </div>
          <div className="es-col as">
            <div className="es-col-label">Via AS</div>
            <div className="es-line"><span className="k">Oppstart</span><span className="v">{fmt(totAS)}</span></div>
            <div className="es-line"><span className="k">Egenkapital</span><span className="v">{fmt(ekAS)}</span></div>
            <div className="es-line"><span className="k">Restkapital</span><span className="v" style={{color: harAS ? 'var(--brg)' : '#8b2020'}}>{harAS ? fmt(restAS) : '–'}</span></div>
            <div className="es-line"><span className="k">Månedlig rente</span><span className="v">-{fmt(renteMndAS)}</span></div>
            <div className="es-line"><span className="k">Skatt/mnd</span><span className="v">-{fmt(skattAS)}</span></div>
            <div className="es-result" style={{color: nettoAS >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMnd(nettoAS)}</div>
            <span className={`es-badge ${!harAS ? 'red' : asVinner ? 'winner' : 'green'}`}>
              {!harAS ? 'Mangler ' + fmt(totAS - kapital) : asVinner ? 'Best kontantstrøm' : 'Du har råd'}
            </span>
          </div>
        </div>

        <div className="es-verdict">{verdikt}</div>
        <p className="es-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører.</p>
      </div>
    </div>
  );
}