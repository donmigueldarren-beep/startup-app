import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
  .bil-wrap { font-family: 'DM Sans', sans-serif; color: #1a1a1a; }
  .bil-step { background: #fff; border: 1px solid #e8e4df; border-radius: 16px; padding: 28px; margin-bottom: 16px; }
  .bil-step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .bil-step-num { width: 28px; height: 28px; border-radius: 50%; background: #1a1a1a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; flex-shrink: 0; }
  .bil-step-title { font-family: 'DM Serif Display', serif; font-size: 18px; }
  .bil-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .bil-field label { display: block; font-size: 12px; color: #888; margin-bottom: 6px; letter-spacing: 0.03em; text-transform: uppercase; }
  .bil-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid #e0dbd5; border-radius: 8px; font-size: 15px; font-family: 'DM Sans', sans-serif; background: #faf9f7; transition: border 0.2s; outline: none; box-sizing: border-box; }
  .bil-field input[type=number]:focus { border-color: #1a1a1a; background: #fff; }
  .bil-divider { border: none; border-top: 1px solid #e8e4df; margin: 20px 0; }
  .bil-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e8e4df; border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
  .bil-col { background: #faf9f7; padding: 20px; }
  .bil-col-header { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 12px; }
  .bil-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0ece8; font-size: 13px; }
  .bil-line:last-child { border-bottom: none; }
  .bil-line .k { color: #888; }
  .bil-line .v { font-weight: 500; }
  .bil-result { font-size: 22px; font-family: 'DM Serif Display', serif; margin: 8px 0 4px; }
  .bil-badge { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 20px; margin-top: 4px; }
  .bil-badge.green { background: #dcfce7; color: #166534; }
  .bil-badge.red { background: #fee2e2; color: #991b1b; }
  .bil-badge.amber { background: #fef9c3; color: #92400e; }
  .bil-verdict { border-radius: 12px; padding: 16px 20px; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
  .bil-verdict.green { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
  .bil-verdict.amber { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
  .bil-verdict.red { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
  .bil-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
  .bil-metric { background: #faf9f7; border-radius: 10px; padding: 16px; }
  .bil-metric .lbl { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
  .bil-metric .val { font-size: 20px; font-weight: 500; font-family: 'DM Serif Display', serif; }
  .bil-metric .sub { font-size: 11px; color: #888; margin-top: 2px; }
  .bil-info { background: #faf9f7; border: 1px solid #e8e4df; border-radius: 10px; padding: 14px 16px; font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 16px; }
  .bil-section-label { font-size: 12px; font-weight: 500; color: #555; text-transform: uppercase; letter-spacing: 0.05em; margin: 16px 0 10px; }
  .bil-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .bil-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; border-bottom: 1px solid #e8e4df; font-weight: 500; }
  .bil-table td { padding: 10px 12px; border-bottom: 1px solid #f0ece8; }
  .bil-table tr:last-child td { border-bottom: none; }
  .bil-disclaimer { font-size: 11px; color: #bbb; margin-top: 12px; }
`;

function Field({ label, value, onChange, step = 1, suffix = 'kr' }) {
  return (
    <div className="bil-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#aaa', pointerEvents: 'none' }}>{suffix}</span>
      </div>
    </div>
  );
}

function BilKalkulator() {
  // Bil
  const [bilpris, setBilpris] = useState(400000);
  const [antallBiler, setAntallBiler] = useState(1);
  const [bilType, setBilType] = useState('bensin');

  // Inntekt
  const [dagspris, setDagspris] = useState(800);
  const [utnyttelsesgrad, setUtnyttelsesgrad] = useState(60);

  // Kostnader
  const [forsikringAar, setForsikringAar] = useState(25000);
  const [serviceAar, setServiceAar] = useState(8000);
  const [drivstoffMnd, setDrivstoffMnd] = useState(2000);
  const [egenkapital, setEgenkapital] = useState(200000);
  const [renteSats, setRenteSats] = useState(6.5);
  const [regnskapKost, setRegnskapKost] = useState(10000);

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  // Beregninger
  const totalBilpris = bilpris * antallBiler;
  const laan = Math.max(0, totalBilpris - egenkapital);
  const renteMnd = laan * (renteSats / 100) / 12;
  const avskrivningMnd = (totalBilpris * 0.17) / 12; // 17% avskrivning per år
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
  const roiAar = totalBilpris > 0 ? (nettoMnd * 12) / egenkapital * 100 : 0;

  // Avskrivning info
  const avskrivningsSats = bilType === 'varebil' ? 24 : 17;
  const avskrivningAar = totalBilpris * (avskrivningsSats / 100);

  let verdiktKlasse = 'green';
  let verdiktTekst = '';

  if (!harRaad) {
    verdiktKlasse = 'red';
    verdiktTekst = `Du trenger mer egenkapital. Banken forventer minimum 25% egenkapital ved billån til næring – det vil si ${fmt(totalBilpris * 0.25)} for denne flåten.`;
  } else if (nettoMnd < 0) {
    verdiktKlasse = 'red';
    verdiktTekst = `Negativ kontantstrøm med disse tallene. Du må enten øke dagsprisen, øke utnyttelsesgraden til minst ${Math.ceil(breakEvenPst)}%, eller redusere kostnadene.`;
  } else if (utnyttelsesgrad < breakEvenPst + 10) {
    verdiktKlasse = 'amber';
    verdiktTekst = `Du er nær break-even. Du trenger ${Math.ceil(breakEvenPst)}% utnyttelsesgrad for å gå i null. Med ${utnyttelsesgrad}% har du liten margin for ledige dager.`;
  } else {
    verdiktKlasse = 'green';
    verdiktTekst = `Ser lønnsomt ut! Du tjener ${fmt(nettoMnd)} netto per måned etter skatt. Break-even er ${Math.ceil(breakEvenPst)}% utnyttelse – du har god margin med ${utnyttelsesgrad}%.`;
  }

  // Flåtescenarioer
  const scenarioer = [1, 2, 3, 5].map(n => {
    const laan2 = Math.max(0, bilpris * n - egenkapital);
    const rente2 = laan2 * (renteSats / 100) / 12;
    const inntekt2 = dagspris * 30 * (utnyttelsesgrad / 100) * n;
    const kost2 = rente2 + (forsikringAar * n / 12) + (serviceAar * n / 12) + (drivstoffMnd * n) + regnskapMnd;
    const netto2 = (inntekt2 - kost2) * 0.78;
    return { n, netto: netto2 };
  });

  return (
    <div className="bil-wrap">
      <style>{styles}</style>

      {/* Steg 1 – Om bilen */}
      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">1</div>
          <div className="bil-step-title">Om bilen / flåten</div>
        </div>
        <div className="bil-info">
          Bilutleie i Norge krever ingen særskilt tillatelse, men du må registrere et AS eller ENK, ha ansvarsforsikring på hver bil, og registrere bilene som næringskjøretøy. Biler til utleie kan <strong>ikke</strong> bruke private bilforsikringer.
        </div>
        <div className="bil-grid">
          <Field label="Pris per bil" value={bilpris} onChange={setBilpris} step={50000} />
          <Field label="Antall biler" value={antallBiler} onChange={setAntallBiler} step={1} suffix="stk" />
        </div>
        <div className="bil-section-label">Biltype</div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[
            { id: 'bensin', lbl: 'Bensin/diesel' },
            { id: 'elbil', lbl: 'Elbil' },
            { id: 'varebil', lbl: 'Varebil' }
          ].map(t => (
            <button key={t.id} onClick={() => setBilType(t.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: bilType === t.id ? '2px solid #1a1a1a' : '1px solid #ddd', background: bilType === t.id ? '#1a1a1a' : '#fff', color: bilType === t.id ? '#fff' : '#333', cursor: 'pointer', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>
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
            <div className="lbl">Avskrivning per år</div>
            <div className="val">{fmt(avskrivningAar)}</div>
            <div className="sub">{avskrivningsSats}% av bilverdi</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Verditap år 1</div>
            <div className="val">{fmt(totalBilpris * 0.20)}</div>
            <div className="sub">ca. 20% av kjøpspris</div>
          </div>
        </div>
      </div>

      {/* Steg 2 – Inntekt */}
      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">2</div>
          <div className="bil-step-title">Inntekt</div>
        </div>
        <div className="bil-grid">
          <Field label="Dagspris per bil" value={dagspris} onChange={setDagspris} step={50} />
          <div className="bil-field">
            <label>Utnyttelsesgrad: {utnyttelsesgrad}%</label>
            <input type="range" min="10" max="100" step="5" value={utnyttelsesgrad} onChange={e => setUtnyttelsesgrad(+e.target.value)} style={{ width: '100%', marginTop: '8px', accentColor: '#1a1a1a' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#bbb', marginTop: '4px' }}>
              <span>10% – svært lav</span>
              <span>60% – realistisk</span>
              <span>90% – høy sesong</span>
            </div>
          </div>
        </div>
        <div className="bil-metrics">
          <div className="bil-metric">
            <div className="lbl">Dager utleid per mnd</div>
            <div className="val">{Math.round(30 * utnyttelsesgrad / 100)}</div>
            <div className="sub">per bil</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Månedlig inntekt</div>
            <div className="val" style={{ color: '#16a34a' }}>{fmt(inntektMnd)}</div>
            <div className="sub">alle biler samlet</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Årlig inntekt</div>
            <div className="val" style={{ color: '#16a34a' }}>{fmt(inntektMnd * 12)}</div>
            <div className="sub">estimert</div>
          </div>
        </div>
      </div>

      {/* Steg 3 – Kostnader */}
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
          <Field label="Drivstoff / mnd (alle biler)" value={drivstoffMnd} onChange={setDrivstoffMnd} step={500} />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <hr className="bil-divider" />
        <div className="bil-two-col">
          <div className="bil-col">
            <div className="bil-col-header">Månedlige kostnader</div>
            <div className="bil-line"><span className="k">Rentekostnad</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(renteMnd)}</span></div>
            <div className="bil-line"><span className="k">Forsikring</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(forsikringMnd)}</span></div>
            <div className="bil-line"><span className="k">Service/vedlikehold</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(serviceMnd)}</span></div>
            <div className="bil-line"><span className="k">Drivstoff</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(drivstoffMnd)}</span></div>
            <div className="bil-line"><span className="k">Regnskapsfører</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(regnskapMnd)}</span></div>
            <div className="bil-line"><span className="k" style={{ fontWeight: '500' }}>Total kostnad</span><span className="v">{fmt(totalKostMnd)}</span></div>
          </div>
          <div className="bil-col">
            <div className="bil-col-header">Resultat per måned</div>
            <div className="bil-line"><span className="k">Inntekt</span><span className="v" style={{ color: '#16a34a' }}>+{fmt(inntektMnd)}</span></div>
            <div className="bil-line"><span className="k">Kostnader</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(totalKostMnd)}</span></div>
            <div className="bil-line"><span className="k">Skatt (22%)</span><span className="v" style={{ color: '#dc2626' }}>-{fmt(skattMnd)}</span></div>
            <div className="bil-result" style={{ color: nettoMnd >= 0 ? '#16a34a' : '#dc2626' }}>{fmtMnd(nettoMnd)}</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Break-even: {Math.ceil(breakEvenPst)}% utnyttelse</div>
          </div>
        </div>
      </div>

      {/* Steg 4 – Nøkkeltall */}
      <div className="bil-step">
        <div className="bil-step-header">
          <div className="bil-step-num">4</div>
          <div className="bil-step-title">Nøkkeltall og anbefaling</div>
        </div>
        <div className="bil-metrics" style={{ marginBottom: '20px' }}>
          <div className="bil-metric">
            <div className="lbl">ROI per år</div>
            <div className="val" style={{ color: roiAar >= 10 ? '#16a34a' : roiAar >= 0 ? '#92400e' : '#dc2626' }}>{roiAar.toFixed(1)}%</div>
            <div className="sub">avkastning på EK</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Break-even utnyttelse</div>
            <div className="val">{Math.ceil(breakEvenPst)}%</div>
            <div className="sub">{Math.ceil(breakEvenDager)} dager/mnd per bil</div>
          </div>
          <div className="bil-metric">
            <div className="lbl">Netto per bil/mnd</div>
            <div className="val" style={{ color: nettoMnd >= 0 ? '#16a34a' : '#dc2626' }}>{fmt(nettoMnd / antallBiler)}</div>
            <div className="sub">etter skatt</div>
          </div>
        </div>

        <div className={`bil-verdict ${verdiktKlasse}`}>{verdiktTekst}</div>

        <div className="bil-section-label">Flåtescenarioer – hva skjer ved vekst?</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="bil-table">
            <thead>
              <tr>
                <th>Antall biler</th>
                <th>Estimert netto/mnd</th>
                <th>Netto per bil</th>
                <th>Vurdering</th>
              </tr>
            </thead>
            <tbody>
              {scenarioer.map(s => (
                <tr key={s.n} style={{ background: s.n === antallBiler ? '#f0fdf4' : 'transparent' }}>
                  <td style={{ fontWeight: s.n === antallBiler ? '500' : '400' }}>{s.n} bil{s.n > 1 ? 'er' : ''}{s.n === antallBiler ? ' ← nå' : ''}</td>
                  <td style={{ fontWeight: '500', color: s.netto >= 0 ? '#16a34a' : '#dc2626' }}>{fmtMnd(s.netto)}</td>
                  <td style={{ color: '#666' }}>{fmt(s.netto / s.n)}</td>
                  <td>
                    <span className={`bil-badge ${s.netto > 5000 * s.n ? 'green' : s.netto >= 0 ? 'amber' : 'red'}`}>
                      {s.netto > 5000 * s.n ? 'Lønnsomt' : s.netto >= 0 ? 'Marginalt' : 'Negativt'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bil-section-label" style={{ marginTop: '20px' }}>Viktige krav for bilutleie i Norge</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { ikon: '✓', tekst: 'Registrere AS eller ENK i Brønnøysund', ok: true },
            { ikon: '✓', tekst: 'Næringsforsikring på alle biler (ikke privat)', ok: true },
            { ikon: '✓', tekst: 'MVA-registrering ved over 50 000 kr omsetning', ok: true },
            { ikon: '✓', tekst: 'Registrere biler som næringskjøretøy', ok: true },
            { ikon: '!', tekst: 'Ingen særskilt konsesjon kreves for vanlig bilutleie', ok: false },
            { ikon: '!', tekst: 'Leieavtale med leietaker anbefales alltid skriftlig', ok: false }
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', padding: '10px 12px', background: '#faf9f7', borderRadius: '8px', fontSize: '13px' }}>
              <span style={{ color: r.ok ? '#16a34a' : '#92400e', fontWeight: '500' }}>{r.ikon}</span>
              <span style={{ color: '#555' }}>{r.tekst}</span>
            </div>
          ))}
        </div>

        <p className="bil-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</p>
      </div>
    </div>
  );
}

export default BilKalkulator;