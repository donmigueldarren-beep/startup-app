import { useState } from 'react';

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
  .sal-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .sal-step { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .sal-step-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .sal-step-num { width: 28px; height: 28px; background: var(--brg); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Playfair Display', serif; flex-shrink: 0; }
  .sal-step-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); }
  .sal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .sal-field label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .sal-field input[type=number] { width: 100%; padding: 10px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; box-sizing: border-box; transition: border 0.2s; }
  .sal-field input[type=number]:focus { border-color: var(--brg); background: white; }
  .sal-divider { border: none; border-top: 1px solid var(--cream-dark); margin: 20px 0; }
  .sal-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--cream-dark); margin-bottom: 16px; }
  .sal-col { background: var(--cream); padding: 20px; }
  .sal-col-header { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .sal-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .sal-line:last-child { border-bottom: none; }
  .sal-line .k { color: var(--muted); }
  .sal-line .v { font-weight: 500; }
  .sal-result { font-family: 'Playfair Display', serif; font-size: 24px; margin: 10px 0 4px; }
  .sal-badge { display: inline-block; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; margin-top: 6px; }
  .sal-badge.green { background: var(--brg-pale); color: var(--brg); }
  .sal-badge.red { background: #fce8e8; color: #8b2020; }
  .sal-badge.amber { background: #fdf6e8; color: #7a5a1e; }
  .sal-verdict { padding: 14px 18px; font-size: 13px; line-height: 1.6; margin-bottom: 16px; border-left: 3px solid; }
  .sal-verdict.green { background: var(--brg-pale); color: var(--brg); border-color: var(--brg); }
  .sal-verdict.amber { background: #fdf6e8; color: #7a5a1e; border-color: var(--gold); }
  .sal-verdict.red { background: #fce8e8; color: #8b2020; border-color: #c84040; }
  .sal-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
  .sal-metric { background: var(--cream); padding: 16px; border: 1px solid var(--cream-dark); }
  .sal-metric .lbl { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .sal-metric .val { font-family: 'Playfair Display', serif; font-size: 20px; }
  .sal-metric .sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .sal-info { background: var(--cream); border-left: 3px solid var(--gold); padding: 12px 16px; font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .sal-section-label { font-size: 10px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 16px 0 10px; }
  .sal-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .sal-table th { text-align: left; padding: 8px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); border-bottom: 1px solid var(--cream-dark); font-weight: 500; }
  .sal-table td { padding: 10px 12px; border-bottom: 1px solid var(--cream-dark); }
  .sal-table tr:last-child td { border-bottom: none; }
  .sal-disclaimer { font-size: 11px; color: var(--muted); margin-top: 12px; font-style: italic; }
  .sal-toggle { display: flex; gap: 1px; background: var(--cream-dark); margin-bottom: 16px; }
  .sal-toggle-btn { padding: 8px 16px; background: var(--cream); border: none; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; color: var(--muted); }
  .sal-toggle-btn.active { background: var(--brg); color: var(--cream); }
`;

function Field({ label, value, onChange, step = 1, suffix = 'kr' }) {
  return (
    <div className="sal-field">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} step={step} onChange={e => onChange(+e.target.value)} />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--muted)', pointerEvents: 'none' }}>{suffix}</span>
      </div>
    </div>
  );
}

function SalongKalkulator() {
  const [salongType, setSalongType] = useState('frisor');
  const [antallStoler, setAntallStoler] = useState(3);
  const [prisPerKunde, setPrisPerKunde] = useState(600);
  const [kundesPerStol, setKundesPerStol] = useState(4);
  const [arbeidsdagerMnd, setArbeidsdagerMnd] = useState(22);
  const [husleie, setHusleie] = useState(15000);
  const [produkter, setprodukter] = useState(5000);
  const [lonn, setLonn] = useState(35000);
  const [antallAnsatte, setAntallAnsatte] = useState(1);
  const [forsikring, setForsikring] = useState(2000);
  const [regnskapKost, setRegnskapKost] = useState(10000);
  const [oppstartUtstyr, setOppstartUtstyr] = useState(150000);
  const [oppstartInventar, setOppstartInventar] = useState(80000);
  const [depositum, setDepositum] = useState(45000);
  const [egenkapital, setEgenkapital] = useState(300000);

  const fmt = (n) => Math.round(n).toLocaleString('no-NO') + ' kr';
  const fmtMnd = (n) => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr/mnd';

  const inntektMnd = antallStoler * kundesPerStol * arbeidsdagerMnd * prisPerKunde / arbeidsdagerMnd * arbeidsdagerMnd;
  const inntektMndReal = antallStoler * kundesPerStol * prisPerKunde;
  const lonnTotal = lonn * antallAnsatte;
  const arbeidsgiveravgift = lonnTotal * 0.141;
  const regnskapMnd = regnskapKost / 12;
  const totalKostMnd = husleie + produkter + lonnTotal + arbeidsgiveravgift + forsikring + regnskapMnd;
  const bruttoMnd = inntektMndReal - totalKostMnd;
  const skattMnd = Math.max(0, bruttoMnd * 0.22);
  const nettoMnd = bruttoMnd - skattMnd;
  const totalOppstart = oppstartUtstyr + oppstartInventar + depositum;
  const harRaad = egenkapital >= totalOppstart;
  const breakEvenKunder = Math.ceil(totalKostMnd / prisPerKunde);
  const breakEvenPerStol = Math.ceil(breakEvenKunder / antallStoler);
  const roiAar = egenkapital > 0 ? (nettoMnd * 12) / egenkapital * 100 : 0;

  const salongTyper = [
    { id: 'frisor', lbl: 'Frisør' },
    { id: 'negler', lbl: 'Negler' },
    { id: 'hudpleie', lbl: 'Hudpleie' },
    { id: 'kombinert', lbl: 'Kombinert' }
  ];

  let verdiktKlasse = 'green';
  let verdiktTekst = '';
  if (!harRaad) {
    verdiktKlasse = 'red';
    verdiktTekst = `Du har ikke nok kapital til oppstart. Du trenger minimum ${fmt(totalOppstart)} – du mangler ${fmt(totalOppstart - egenkapital)}.`;
  } else if (nettoMnd < 0) {
    verdiktKlasse = 'red';
    verdiktTekst = `Negativ kontantstrøm med disse tallene. Du trenger minst ${breakEvenKunder} kunder per måned for å gå i null, det vil si ${breakEvenPerStol} per stol per dag.`;
  } else if (nettoMnd < 10000) {
    verdiktKlasse = 'amber';
    verdiktTekst = `Marginalt lønnsomt. Du tjener ${fmt(nettoMnd)} netto per måned. Vurder om du kan øke prisene, fylle flere timer eller redusere kostnader.`;
  } else {
    verdiktKlasse = 'green';
    verdiktTekst = `Ser lønnsomt ut! Du tjener ${fmt(nettoMnd)} netto per måned etter skatt. Break-even er ${breakEvenKunder} kunder per måned totalt.`;
  }

  const scenarioer = [
    { lbl: 'Lav belegg (50%)', kunder: Math.round(antallStoler * kundesPerStol * 0.5) },
    { lbl: 'Realistisk (75%)', kunder: Math.round(antallStoler * kundesPerStol * 0.75) },
    { lbl: 'Nåværende (100%)', kunder: antallStoler * kundesPerStol },
    { lbl: 'Full kapasitet (125%)', kunder: Math.round(antallStoler * kundesPerStol * 1.25) }
  ].map(s => {
    const inn = s.kunder * prisPerKunde;
    const netto = (inn - totalKostMnd) * 0.78;
    return { ...s, inntekt: inn, netto };
  });

  return (
    <div className="sal-wrap">
      <style>{styles}</style>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">1</div>
          <div className="sal-step-title">Om salongen</div>
        </div>
        <div className="sal-info">
          Lokaler for frisør og hudpleie må meldes til kommunen og oppfylle hygienekrav. Du trenger fagbrev for å drive frisørvirksomhet selv, men kan ansette fagutdannede uten å ha det selv.
        </div>
        <div className="sal-section-label">Type salong</div>
        <div className="sal-toggle">
          {salongTyper.map(t => (
            <button key={t.id} className={`sal-toggle-btn ${salongType === t.id ? 'active' : ''}`} onClick={() => setSalongType(t.id)}>
              {t.lbl}
            </button>
          ))}
        </div>
        <div className="sal-grid">
          <Field label="Antall stoler / behandlingsplasser" value={antallStoler} onChange={setAntallStoler} step={1} suffix="stk" />
          <Field label="Pris per kunde / behandling" value={prisPerKunde} onChange={setPrisPerKunde} step={50} />
          <Field label="Kunder per stol per dag" value={kundesPerStol} onChange={setKundesPerStol} step={1} suffix="stk" />
          <Field label="Arbeidsdager per måned" value={arbeidsdagerMnd} onChange={setArbeidsdagerMnd} step={1} suffix="dager" />
        </div>
        <div className="sal-metrics">
          <div className="sal-metric">
            <div className="lbl">Kunder per måned</div>
            <div className="val">{antallStoler * kundesPerStol * arbeidsdagerMnd}</div>
            <div className="sub">totalt alle stoler</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Månedlig inntekt</div>
            <div className="val" style={{ color: 'var(--brg)' }}>{fmt(inntektMndReal)}</div>
            <div className="sub">ved full kapasitet</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Årlig inntekt</div>
            <div className="val" style={{ color: 'var(--brg)' }}>{fmt(inntektMndReal * 12)}</div>
            <div className="sub">estimert</div>
          </div>
        </div>
      </div>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">2</div>
          <div className="sal-step-title">Bemanning</div>
        </div>
        <div className="sal-grid">
          <Field label="Antall ansatte" value={antallAnsatte} onChange={setAntallAnsatte} step={1} suffix="stk" />
          <Field label="Lønn per ansatt / mnd" value={lonn} onChange={setLonn} step={1000} />
        </div>
        <div className="sal-info" style={{ marginTop: '12px' }}>
          Arbeidsgiveravgift er 14,1% av lønn og kommer i tillegg. Frisørfaget har tariffavtale gjennom Virke og Fagforbundet. Minimumslønn fra april 2025 er ca. 34 000 kr/mnd for fagutdannet.
        </div>
        <div className="sal-metrics">
          <div className="sal-metric">
            <div className="lbl">Total lønn / mnd</div>
            <div className="val" style={{ color: '#8b2020' }}>{fmt(lonnTotal)}</div>
            <div className="sub">{antallAnsatte} ansatt{antallAnsatte > 1 ? 'e' : ''}</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Arbeidsgiveravgift</div>
            <div className="val" style={{ color: '#8b2020' }}>{fmt(arbeidsgiveravgift)}</div>
            <div className="sub">14,1% av lønn</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Total lønnskostnad</div>
            <div className="val" style={{ color: '#8b2020' }}>{fmt(lonnTotal + arbeidsgiveravgift)}</div>
            <div className="sub">inkl. avgift</div>
          </div>
        </div>
      </div>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">3</div>
          <div className="sal-step-title">Kostnader og oppstart</div>
        </div>
        <div className="sal-grid">
          <Field label="Husleie / mnd" value={husleie} onChange={setHusleie} step={1000} />
          <Field label="Produkter og forbruksmateriell" value={produkter} onChange={setProdukt => setProdukt(setProdukt)} step={500} suffix="kr/mnd" />
          <Field label="Forsikring / mnd" value={forsikring} onChange={setForsikring} step={500} />
          <Field label="Regnskapsfører / år" value={regnskapKost} onChange={setRegnskapKost} step={1000} />
        </div>
        <div className="sal-section-label">Oppstartskostnader</div>
        <div className="sal-grid">
          <Field label="Utstyr og inventar" value={oppstartUtstyr} onChange={setOppstartUtstyr} step={10000} />
          <Field label="Innredning og renovering" value={oppstartInventar} onChange={setOppstartInventar} step={10000} />
          <Field label="Depositum leie (3 mnd)" value={depositum} onChange={setDepositum} step={5000} />
          <Field label="Din tilgjengelige kapital" value={egenkapital} onChange={setEgenkapital} step={25000} />
        </div>
        <hr className="sal-divider" />
        <div className="sal-two-col">
          <div className="sal-col">
            <div className="sal-col-header">Månedlige kostnader</div>
            <div className="sal-line"><span className="k">Husleie</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(husleie)}</span></div>
            <div className="sal-line"><span className="k">Lønn inkl. avgift</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(lonnTotal + arbeidsgiveravgift)}</span></div>
            <div className="sal-line"><span className="k">Produkter</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(produkter)}</span></div>
            <div className="sal-line"><span className="k">Forsikring</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(forsikring)}</span></div>
            <div className="sal-line"><span className="k">Regnskapsfører</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(regnskapMnd)}</span></div>
            <div className="sal-line"><span className="k" style={{ fontWeight: '500' }}>Totalt</span><span className="v">{fmt(totalKostMnd)}</span></div>
          </div>
          <div className="sal-col">
            <div className="sal-col-header">Resultat per måned</div>
            <div className="sal-line"><span className="k">Inntekt</span><span className="v" style={{ color: 'var(--brg)' }}>+{fmt(inntektMndReal)}</span></div>
            <div className="sal-line"><span className="k">Kostnader</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(totalKostMnd)}</span></div>
            <div className="sal-line"><span className="k">Skatt (22%)</span><span className="v" style={{ color: '#8b2020' }}>-{fmt(skattMnd)}</span></div>
            <div className="sal-result" style={{ color: nettoMnd >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(nettoMnd)}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Break-even: {breakEvenKunder} kunder/mnd</div>
          </div>
        </div>
      </div>

      <div className="sal-step">
        <div className="sal-step-header">
          <div className="sal-step-num">4</div>
          <div className="sal-step-title">Nøkkeltall og anbefaling</div>
        </div>
        <div className="sal-metrics" style={{ marginBottom: '20px' }}>
          <div className="sal-metric">
            <div className="lbl">Oppstartskostnad</div>
            <div className="val" style={{ color: harRaad ? 'var(--brg)' : '#8b2020' }}>{fmt(totalOppstart)}</div>
            <div className="sub">{harRaad ? 'Du har råd' : 'Mangler ' + fmt(totalOppstart - egenkapital)}</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">Break-even per stol</div>
            <div className="val">{breakEvenPerStol}</div>
            <div className="sub">kunder per dag</div>
          </div>
          <div className="sal-metric">
            <div className="lbl">ROI per år</div>
            <div className="val" style={{ color: roiAar >= 15 ? 'var(--brg)' : roiAar >= 0 ? '#7a5a1e' : '#8b2020' }}>{roiAar.toFixed(1)}%</div>
            <div className="sub">avkastning på EK</div>
          </div>
        </div>

        <div className={`sal-verdict ${verdiktKlasse}`}>{verdiktTekst}</div>

        <div className="sal-section-label">Beleggscenarioer</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="sal-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Kunder/mnd</th>
                <th>Inntekt/mnd</th>
                <th>Netto/mnd</th>
                <th>Vurdering</th>
              </tr>
            </thead>
            <tbody>
              {scenarioer.map((s, i) => (
                <tr key={i} style={{ background: i === 2 ? 'var(--brg-pale)' : 'transparent' }}>
                  <td style={{ fontWeight: i === 2 ? '500' : '400' }}>{s.lbl}{i === 2 ? ' ←' : ''}</td>
                  <td>{s.kunder}</td>
                  <td style={{ color: 'var(--brg)' }}>{fmt(s.inntekt)}</td>
                  <td style={{ fontWeight: '500', color: s.netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(s.netto)}</td>
                  <td><span className={`sal-badge ${s.netto > 15000 ? 'green' : s.netto >= 0 ? 'amber' : 'red'}`}>{s.netto > 15000 ? 'Lønnsomt' : s.netto >= 0 ? 'Marginalt' : 'Negativt'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sal-section-label" style={{ marginTop: '20px' }}>Krav for salong i Norge</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { ikon: '✓', tekst: 'Meld lokalet til kommunen før oppstart', ok: true },
            { ikon: '✓', tekst: 'Lokalet må oppfylle hygienekrav (folkehelseloven)', ok: true },
            { ikon: '✓', tekst: 'Fagbrev kreves for å utføre frisørarbeid selv', ok: true },
            { ikon: '✓', tekst: 'MVA-registrering ved over 50 000 kr omsetning', ok: true },
            { ikon: '!', tekst: 'Du kan ansette fagutdannede uten fagbrev selv', ok: false },
            { ikon: '!', tekst: 'Yrkesskadeforsikring er obligatorisk ved ansatte', ok: false }
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', padding: '10px 12px', background: 'var(--cream)', border: '1px solid var(--cream-dark)', fontSize: '13px' }}>
              <span style={{ color: r.ok ? 'var(--brg)' : 'var(--gold)', fontWeight: '500' }}>{r.ikon}</span>
              <span style={{ color: 'var(--muted)' }}>{r.tekst}</span>
            </div>
          ))}
        </div>

        <p className="sal-disclaimer">Tallene er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</p>
      </div>
    </div>
  );
}

export default SalongKalkulator;