import { useState } from 'react';
import EiendomPrognose from './EiendomSammenlign';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e;
    --brg-light: #2a6640;
    --brg-pale: #e8f0ea;
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
  .ek-step-num { width: 28px; height: 28px; background: var(--gold); color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .ek-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .ek-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ek-field label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .ek-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border 0.2s; }
  .ek-field input[type=number]:focus { border-color: var(--gold); background: white; }
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
  .ek-badge.gold { background: #fdf6e8; color: #7a5a1e; }
  .ek-badge.red { background: #fce8e8; color: #8b2020; }
  .ek-verdict { padding: 14px 18px; font-size: 13px; line-height: 1.6; margin-bottom: 16px; border-left: 3px solid; }
  .ek-verdict.green { background: var(--brg-pale); color: var(--brg); border-color: var(--brg); }
  .ek-verdict.amber { background: #fdf6e8; color: #7a5a1e; border-color: var(--gold); }
  .ek-verdict.red { background: #fce8e8; color: #8b2020; border-color: #c84040; }
  .ek-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .ek-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .ek-privat-banner { background: #fdf6e8; border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: #7a5a1e; line-height: 1.6; margin-bottom: 16px; }
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

export default function EiendomPrivat() {
  const [boligpris, setBoligpris] = useState(3000000);
  const [leie, setLeie] = useState(12000);
  const [felles, setFelles] = useState(3000);
  const [vedlikehold, setVedlikehold] = useState(1500);
  const [dokumentavgiftPst, setDokumentavgiftPst] = useState(2.5);
  const [tinglysingKost, setTinglysingKost] = useState(500);
  const [kapital, setKapital] = useState(500000);
  const [rente, setRente] = useState(5.2);
  const [ekProsent, setEkProsent] = useState(10);
  const [skattProsent, setSkattProsent] = useState(22);

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const dokumentavgift = boligpris * (dokumentavgiftPst / 100);
  const ek = boligpris * (ekProsent / 100);
  const tot = ek + dokumentavgift + tinglysingKost;
  const laan = boligpris - ek;
  const renteMnd = laan * (rente / 100) / 12;
  const brutto = leie - renteMnd - felles - vedlikehold;
  const skatt = Math.max(0, brutto * (skattProsent / 100));
  const netto = brutto - skatt;
  const harRaad = kapital >= tot;
  const restKapital = Math.max(0, kapital - tot);

  return (
    <div className="ek-wrap">
      <style>{styles}</style>

      <div className="ek-privat-banner">
        Privat kjøp: Enklere å komme i gang, lavere egenkapitalkrav og ingen regnskapsfører. Best for én enkelt enhet.
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
          <div className="ek-step-title">Din økonomi</div>
        </div>
        <div className="ek-grid">
          <Field label="Tilgjengelig kapital" value={kapital} onChange={setKapital} step={50000} />
          <Field label="Boliglånsrente" value={rente} onChange={setRente} step={0.1} suffix="%" />
          <Field label="Egenkapitalkrav" value={ekProsent} onChange={setEkProsent} step={1} suffix="%" />
          <Field label="Skatteprosent" value={skattProsent} onChange={setSkattProsent} step={1} suffix="%" />
        </div>
        <hr className="ek-divider" />
        <div className="ek-two-col">
          <div className="ek-col">
            <div className="ek-col-header">Oppstartskostnader</div>
            <div className="ek-line"><span className="k">Egenkapital ({ekProsent}%)</span><span className="v">{fmt(ek)}</span></div>
            <div className="ek-line"><span className="k">Dokumentavgift</span><span className="v">{fmt(dokumentavgift)}</span></div>
            <div className="ek-line"><span className="k">Tinglysning</span><span className="v">{fmt(tinglysingKost)}</span></div>
            <div className="ek-line"><span className="k" style={{fontWeight:'500'}}>Totalt</span><span className="v">{fmt(tot)}</span></div>
            {harRaad && <div className="ek-line"><span className="k" style={{color:'var(--brg)'}}>Restkapital</span><span className="v" style={{color:'var(--brg)'}}>{fmt(restKapital)}</span></div>}
            <span className={`ek-badge ${harRaad ? 'gold' : 'red'}`}>{harRaad ? 'Du har råd' : 'Mangler ' + fmt(tot - kapital)}</span>
          </div>
          <div className="ek-col">
            <div className="ek-col-header">Månedlig økonomi</div>
            <div className="ek-line"><span className="k">Leieinntekt</span><span className="v" style={{color:'var(--brg)'}}>+{fmt(leie)}</span></div>
            <div className="ek-line"><span className="k">Renter ({rente}%)</span><span className="v" style={{color:'#8b2020'}}>-{fmt(renteMnd)}</span></div>
            <div className="ek-line"><span className="k">Felles + vedlikehold</span><span className="v" style={{color:'#8b2020'}}>-{fmt(felles+vedlikehold)}</span></div>
            <div className="ek-line"><span className="k">Skatt ({skattProsent}%)</span><span className="v" style={{color:'#8b2020'}}>-{fmt(skatt)}</span></div>
            <div className="ek-result" style={{color: netto >= 0 ? 'var(--brg)' : '#8b2020'}}>{fmtMnd(netto)}</div>
          </div>
        </div>
        <div className={`ek-verdict ${!harRaad ? 'red' : netto >= 0 ? 'green' : 'amber'}`}>
          {!harRaad
            ? `Du mangler ${fmt(tot - kapital)} for å gjennomføre kjøpet.`
            : netto >= 0
            ? `Lønnsomt! Du sitter igjen med ${fmtMnd(netto)} etter alle kostnader og skatt.`
            : `Negativt resultat på ${fmtMnd(netto)}. Vurder høyere leie eller lavere kjøpspris.`}
        </div>
        <p className="ek-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører.</p>
      </div>

      <EiendomPrognose
        boligpris={boligpris}
        nettoPrivat={netto}
        nettoAS={null}
        totPrivat={tot}
        totAS={null}
        rentePrivat={rente}
        renteAS={null}
        ekProsentAS={null}
        restKapitalPrivat={restKapital}
        restKapitalAS={null}
      />
    </div>
  );
}