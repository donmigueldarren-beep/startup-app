import { useState } from 'react';

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
  .bil-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
`;

function Field({ label, value, onChange, step = 1, suffix = 'kr' }) {
  return (
    <div className="bil-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--muted)', pointerEvents: 'none' }}>{suffix}</span>
      </div>
    </div>
  );
}

function BilKalkulator() {
  const [bilpris, setBilpris] = useState(400000);
  const [antallBiler, setAntallBiler] = useState(1);
  const [bilType, setBilType] = useState('bensin');
  const [dagspris, setDagspris] = useState(800);
  const [utnyttelsesgrad, setUtnyttelsesgrad] = useState(60);
  const [forsikringAar, setForsikringAar] = useState(25000);
  const [serviceAar, setServiceAar] = useState(8000);
  const [drivstoffMnd, setDrivstoffMnd] = useState(2000);
  const [egenkapital, setEgenkapital] = useState(200000);
  const [renteSats, setRenteSats] = useState(6.5);
  const [regnskapKost, setRegnskapKost] = useState(10000);

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const totalBilpris = bilpris * antallBiler;
  const laan = Math.max(0, totalBilpris - egenkapital);
  const renteMnd = laan * (renteSats / 100) / 12;
  const avskrivningsSats = bilType === 'varebil' ? 24 : 17;
  const avskrivningAar = totalBilpris * (avskrivningsSats / 100);
  const dagerPerMnd = 30 * (utnyttelsesgrad / 100);
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
  const breakEvenPst = (breakEvenDager / 30) * 100;
  const roiAar = egenkapital > 0 ? (nettoMnd * 12) / egenkapital * 100 : 0;

  let verdiktKlasse = 'green';
  let verdiktTekst = '';
  if (!harRaad) {
    verdiktKlasse = 'red';
    verdiktTekst = `Du trenger mer egenkapital. Banken forventer minimum 25% – det vil si ${fmt(totalBilpris * 0.25)} for denne flåten.`;
  } else if (nettoMnd < 0) {
    verdiktKlasse = 'red';
    verdiktTekst = `Negativ kontantstrøm. Du må øke dagsprisen, øke utnyttelsesgraden til minst ${Math.ceil(breakEvenPst)}%, eller redusere kostnadene.`;
  } else if (utnyttelsesgrad < breakEvenPst + 10) {
    verdiktKlasse = 'amber';
    verdiktTekst = `Du er nær break-even. Du trenger ${Math.ceil(breakEvenPst)}% utnyttelsesgrad for å gå i null – liten margin for ledige dager.`;
  } else {
    verdiktKlasse = 'green';
    verdiktTekst = `Ser lønnsomt ut. Du tjener ${fmt(nettoMnd)} netto per måned etter skatt. Break-even er ${Math.ceil(breakEvenPst)}% – god margin med ${utnyttelsesgrad}%.`;
  }

  const scenarioer = [1, 2, 3, 5].map(n => {
    const l = Math.max(0, bilpris * n - egenkapital);
    const r = l * (renteSats / 100) / 12;
    const inn = dagspris * 30 * (utnyttelsesgrad / 100) * n;
    const kost = r + (forsikringAar * n / 12) + (serviceAar * n / 12) + (drivstoffMnd * n) + regnskapMnd;
    return { n, netto: (inn - kost) * 0.78 };
  });

  return (
    <div className="bil-wrap">
      <style>{styles}</style>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">1</div>
          <div className="bil-step-title">Om bilen / flåten</div>
        </div>
        <div className="bil-info">
          Bilutleie krever ingen særskilt tillatelse, men du må registrere AS eller ENK, ha næringsforsikring på alle biler og registrere dem som næringskjøretøy.
        </div>
        <div className="bil-grid">
          <Field label="Pris per bil" value={bilpris} onChange={setBilpris} step={50000} />
          <Field label="Antall biler" value={antallBiler} onChange={setAntallBiler} step={1} suffix="stk" />
        </div>
        <div className="bil-section-label">Biltype</div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[{ id: 'bensin', lbl: 'Bensin/diesel' }, { id: 'elbil', lbl: 'Elbil' }, { id: 'varebil', lbl: 'Varebil' }].map(t => (
            <button key={t.id} onClick={() => setBilType(t.id)} style={{ padding: '8px 16px', border: bilType === t.id ? '2px solid var(--brg)' : '1px solid var(--cream-dark)', background: bilType === t.id ? 'var(--brg)' : 'var(--cream)', color: bilType === t.id ? 'var(--cream)' : 'var(--text)', cursor: 'pointer', fontSize: '12px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}>
              {t.lbl}
            </button>
          ))}
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
            <div className="sub">{avskrivningsSats}% av verdi</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Verditap år 1</div>
            <div className="val">{fmt(totalBilpris * 0.20)}</div>
            <div className="sub">ca. 20%</div>
          </div>
        </div>
      </div>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">2</div>
          <div className="bil-step-title">Inntekt</div>
        </div>
        <div className="bil-grid">
          <Field label="Dagspris per bil" value={dagspris} onChange={setDagspris} step={50} />
          <div className="bil-field">
            <label>Utnyttelsesgrad: {utnyttelsesgrad}%</label>
            <input type="range" min="10" max="100" step="5" value={utnyttelsesgrad} onChange={e => setUtnyttelsesgrad(+e.target.value)} style={{ width: '100%', marginTop: '8px', accentColor: 'var(--brg)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#bbb', marginTop: '4px' }}>
              <span>10% – lav</span><span>60% – realistisk</span><span>90% – høy</span>
            </div>
          </div>
        </div>
        <div className="bil-metrics">
          <div className="bil-metric">
            <div className="lbl">Dager utleid / mnd</div>
            <div className="val">{Math.round(30 * utnyttelsesgrad / 100)}</div>
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
          <Field label="Egenkapital" value={egenkapital} onChange={setEgenkapital} step={25000} />
          <Field label="Rente på billån" value={renteSats} onChange={setRenteSats} step={0.1} suffix="%" />
          <Field label="Forsikring per bil / år" value={forsikringAar} onChange={setForsikringAar} step={1000} />
          <Field label="Service og vedlikehold / år" value={serviceAar} onChange={setServiceAar} step={1000} />
          <Field label="Drivstoff / mnd" value={drivstoffMnd} onChange={setDrivstoffMnd} step={500} />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <hr className="bil-divider" />
        <div className="bil-two-col">
          <div className="bil-col">
            <div className="bil-col-header">Månedlige kostnader</div>
            <div className="bil-line"><span className="k">Renter</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(renteMnd)}</span></div>
            <div className="bil-line"><span className="k">Forsikring</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(forsikringMnd)}</span></div>
            <div className="bil-line"><span className="k">Service</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(serviceMnd)}</span></div>
            <div className="bil-line"><span className="k">Drivstoff</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(drivstoffMnd)}</span></div>
            <div className="bil-line"><span className="k">Regnskapsfører</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(regnskapMnd)}</span></div>
            <div className="bil-line"><span className="k" style={{ fontWeight: '500' }}>Totalt</span><span className="v">{fmt(totalKostMnd)}</span></div>
          </div>
          <div className="bil-col">
            <div className="bil-col-header">Resultat per måned</div>
            <div className="bil-line"><span className="k">Inntekt</span><span className="v" style={{ color: 'var(--brg)' }}>+{fmt(inntektMnd)}</span></div>
            <div className="bil-line"><span className="k">Kostnader</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(totalKostMnd)}</span></div>
            <div className="bil-line"><span className="k">Skatt (22%)</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(skattMnd)}</span></div>
            <div className="bil-result" style={{ color: nettoMnd >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(nettoMnd)}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Break-even: {Math.ceil(breakEvenPst)}% utnyttelse</div>
          </div>
        </div>
      </div>

      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">4</div>
          <div className="bil-step-title">Nøkkeltall og anbefaling</div>
        </div>
        <div className="bil-metrics" style={{ marginBottom: '20px' }}>
          <div className="bil-metric">
            <div className="lbl">ROI per år</div>
            <div className="val" style={{ color: roiAar >= 10 ? 'var(--brg)' : roiAar >= 0 ? '#7a5a1e' : '#8b2020' }}>{roiAar.toFixed(1)}%</div>
            <div className="sub">avkastning på EK</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Break-even</div>
            <div className="val">{Math.ceil(breakEvenPst)}%</div>
            <div className="sub">{Math.ceil(breakEvenDager)} dager/mnd</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Netto per bil/mnd</div>
            <div className="val" style={{ color: nettoMnd >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmt(nettoMnd / antallBiler)}</div>
            <div className="sub">etter skatt</div>
          </div>
        </div>

        <div className={`bil-verdict ${verdiktKlasse}`}>{verdiktTekst}</div>

        <div className="bil-section-label">Flåtescenarioer</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="bil-table">
            <thead>
              <tr>
                <th>Antall biler</th>
                <th>Netto/mnd</th>
                <th>Per bil</th>
                <th>Vurdering</th>
              </tr>
            </thead>
            <tbody>
              {scenarioer.map(s => (
                <tr key={s.n} style={{ background: s.n === antallBiler ? 'var(--brg-pale)' : 'transparent' }}>
                  <td style={{ fontWeight: s.n === antallBiler ? '500' : '400' }}>{s.n} bil{s.n > 1 ? 'er' : ''}{s.n === antallBiler ? ' ←' : ''}</td>
                  <td style={{ fontWeight: '500', color: s.netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(s.netto)}</td>
                  <td style={{ color: 'var(--muted)' }}>{fmt(s.netto / s.n)}</td>
                  <td><span className={`bil-badge ${s.netto > 5000 * s.n ? 'green' : s.netto >= 0 ? 'amber' : 'red'}`}>{s.netto > 5000 * s.n ? 'Lønnsomt' : s.netto >= 0 ? 'Marginalt' : 'Negativt'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bil-section-label" style={{ marginTop: '20px' }}>Krav for bilutleie i Norge</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { ikon: '✓', tekst: 'Registrere AS eller ENK', ok: true },
            { ikon: '✓', tekst: 'Næringsforsikring på alle biler', ok: true },
            { ikon: '✓', tekst: 'MVA-registrering ved 50 000+ kr omsetning', ok: true },
            { ikon: '✓', tekst: 'Biler registrert som næringskjøretøy', ok: true },
            { ikon: '!', tekst: 'Ingen konsesjon kreves for vanlig bilutleie', ok: false },
            { ikon: '!', tekst: 'Alltid skriftlig leieavtale med leietaker', ok: false }
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', padding: '10px 12px', background: 'var(--cream)', border: '1px solid var(--cream-dark)', fontSize: '13px' }}>
              <span style={{ color: r.ok ? 'var(--brg)' : 'var(--gold)', fontWeight: '500' }}>{r.ikon}</span>
              <span style={{ color: 'var(--muted)' }}>{r.tekst}</span>
            </div>
          ))}
        </div>

        <p className="bil-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</p>
      </div>
    </div>
  );
}

export default BilKalkulator;