import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
  .ep-wrap { font-family: 'DM Sans', sans-serif; color: #1a1a1a; margin-top: 16px; }
  .ep-step { background: #fff; border: 1px solid #e8e4df; border-radius: 16px; padding: 28px; margin-bottom: 16px; }
  .ep-step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .ep-step-num { width: 28px; height: 28px; border-radius: 50%; background: #1a1a1a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; flex-shrink: 0; }
  .ep-step-title { font-family: 'DM Serif Display', serif; font-size: 18px; }
  .ep-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .ep-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; border-bottom: 1px solid #e8e4df; font-weight: 500; }
  .ep-table td { padding: 10px 12px; border-bottom: 1px solid #f0ece8; }
  .ep-table tr:last-child td { border-bottom: none; }
  .ep-table tr:hover td { background: #faf9f7; }
  .ep-green { color: #16a34a; font-weight: 500; }
  .ep-red { color: #dc2626; }
  .ep-bold { font-weight: 500; }
  .ep-highlight { background: #f0fdf4 !important; }
  .ep-badge { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 20px; }
  .ep-badge.green { background: #dcfce7; color: #166534; }
  .ep-badge.blue { background: #dbeafe; color: #1e40af; }
  .ep-badge.amber { background: #fef9c3; color: #92400e; }
  .ep-brrr { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #e8e4df; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
  .ep-brrr-step { background: #faf9f7; padding: 16px; }
  .ep-brrr-step .num { font-family: 'DM Serif Display', serif; font-size: 22px; margin-bottom: 4px; }
  .ep-brrr-step .lbl { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 8px; }
  .ep-brrr-step .desc { font-size: 12px; color: #666; line-height: 1.5; }
  .ep-info { background: #faf9f7; border: 1px solid #e8e4df; border-radius: 10px; padding: 14px 16px; font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 16px; }
  .ep-next { background: #1a1a1a; color: #fff; border-radius: 12px; padding: 20px 24px; margin-bottom: 16px; }
  .ep-next .title { font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff; margin-bottom: 12px; }
  .ep-next-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .ep-next-item .lbl { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
  .ep-next-item .val { font-size: 16px; font-weight: 500; color: #fff; }
  .ep-disclaimer { font-size: 11px; color: #bbb; margin-top: 12px; }
  .ep-input { width: 100%; padding: 8px 40px 8px 12px; border: 1px solid #e0dbd5; border-radius: 8px; font-size: 14px; background: #faf9f7; box-sizing: border-box; outline: none; font-family: 'DM Sans', sans-serif; }
  .ep-input:focus { border-color: #1a1a1a; background: #fff; }
  .ep-label { font-size: 12px; color: #888; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.03em; }
  .ep-hint { font-size: 11px; color: #bbb; margin-top: 4px; }
  .ep-kapital-box { background: #faf9f7; border: 1px solid #e8e4df; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
  .ep-kapital-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 12px; }
  .ep-kapital-item { background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 12px; }
  .ep-kapital-item .lbl { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
  .ep-kapital-item .val { font-size: 16px; font-weight: 500; color: #16a34a; }
  .ep-timeline { position: relative; padding-left: 24px; }
  .ep-timeline-item { position: relative; padding-bottom: 20px; }
  .ep-timeline-item:last-child { padding-bottom: 0; }
  .ep-timeline-dot { position: absolute; left: -24px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: #1a1a1a; }
  .ep-timeline-dot.future { background: #e8e4df; border: 2px solid #1a1a1a; }
  .ep-timeline-line { position: absolute; left: -20px; top: 14px; width: 2px; height: calc(100% - 4px); background: #e8e4df; }
  .ep-timeline-title { font-weight: 500; font-size: 14px; margin-bottom: 4px; }
  .ep-timeline-desc { font-size: 12px; color: #666; line-height: 1.5; }
`;

function fmt(n) { return Math.round(n).toLocaleString('no-NO') + ' kr'; }
function fmtMnd(n) { return (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr'; }

function InputFelt({ label, value, onChange, step = 1000, suffix = 'kr', hint = '' }) {
  return (
    <div>
      <label className="ep-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          className="ep-input"
          type="number"
          value={value}
          onChange={e => onChange(+e.target.value)}
          step={step}
        />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#aaa', pointerEvents: 'none' }}>{suffix}</span>
      </div>
      {hint && <div className="ep-hint">{hint}</div>}
    </div>
  );
}

function EiendomPrognose({ boligpris, nettoPrivat, nettoAS, totPrivat, totAS, rentePrivat, renteAS, ekProsentAS, restKapitalPrivat, restKapitalAS }) {
  const [prisvekst, setPrisvekst] = useState(3);
  const [visType, setVisType] = useState('as');

  // Privat kapitalvariabler
  const [oppussingPrivat, setOppussingPrivat] = useState(0);
  const [privatSparingPrivat, setPrivatSparingPrivat] = useState(10000);
  const [arligInnskuddPrivat, setArligInnskuddPrivat] = useState(restKapitalPrivat > 0 ? Math.round(restKapitalPrivat / 12) : 5000);
  const [restJustertPrivat, setRestJustertPrivat] = useState(restKapitalPrivat);

  // AS kapitalvariabler
  const [oppussingAS, setOppussingAS] = useState(0);
  const [privatSparingAS, setPrivatSparingAS] = useState(10000);
  const [arligInnskuddAS, setArligInnskuddAS] = useState(privatSparingAS * 12);
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
    { aar: 'År 1–2', fase: 'Nystartet AS', ekKrav: '30%', rente: `${renteAS.toFixed(1)}%`, beskrivelse: 'Ingen historikk. Høyt EK-krav, markedsrente, sidesikkerhet fra eier kreves ofte.' },
    { aar: 'År 3–4', fase: 'Etablert', ekKrav: '25%', rente: `${(renteAS - 0.3).toFixed(1)}%`, beskrivelse: '2 godkjente skattemeldinger med overskudd. Banken reduserer risikopåslaget.' },
    { aar: 'År 5–7', fase: 'Solid track record', ekKrav: '20%', rente: `${(renteAS - 0.5).toFixed(1)}%`, beskrivelse: 'Stabil leieinntekt over flere år. Bedre betingelser og lavere EK-krav.' },
    { aar: 'År 8+', fase: 'Porteføljeinvestor', ekKrav: '15%', rente: `${(renteAS - 0.7).toFixed(1)}%`, beskrivelse: 'Profesjonell investor med flere enheter. Beste betingelser.' }
  ];

  const fasefarger = ['#fef9c3', '#dbeafe', '#dcfce7', '#f3e8ff'];
  const fasetekst = ['#92400e', '#1e40af', '#166534', '#6b21a8'];

  return (
    <div className="ep-wrap">
      <style>{styles}</style>

      {/* BRRR */}
      <div className="ep-step">
        <div className="ep-step-header">
          <div className="ep-step-num">5</div>
          <div className="ep-step-title">BRRR-strategien</div>
        </div>
        <div className="ep-brrr">
          {[
            { lbl: 'Buy', num: 'Kjøp', desc: 'Kjøp en underpriset bolig med potensial for verdistigning eller oppussingsgevinst.' },
            { lbl: 'Rehab', num: 'Oppuss', desc: 'Øk boligens verdi gjennom oppussing. Mer verdi gir mer egenkapital å refinansiere.' },
            { lbl: 'Rent', num: 'Lei ut', desc: 'Lei ut og la leieinntektene dekke kostnader og bygge kapital over tid.' },
            { lbl: 'Refinance', num: 'Refinansier', desc: 'Ta ut opparbeidet egenkapital som ny egenkapital til neste kjøp – uten å selge.' }
          ].map((s, i) => (
            <div className="ep-brrr-step" key={i}>
              <div className="lbl">{s.lbl}</div>
              <div className="num">{s.num}</div>
              <div className="desc">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="ep-info">
          BRRR lar deg resirkulere egenkapitalen din. Når boligen har steget i verdi og du har betalt ned gjeld, refinansierer du og henter ut kapital til neste kjøp – uten å selge den første.
        </div>
      </div>

      {/* Historikk AS */}
      <div className="ep-step">
        <div className="ep-step-header">
          <div className="ep-step-num">6</div>
          <div className="ep-step-title">Historikk og lånevilkår i AS over tid</div>
        </div>
        <div className="ep-info">
          Et AS med stabil kontantstrøm over tid behandles svært annerledes av banken enn et nystartet AS. Historikken akkumuleres i driftsselskapet og gir bedre betingelser for hvert nye kjøp.
        </div>
        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <table className="ep-table">
            <thead>
              <tr>
                <th>Periode</th>
                <th>Fase</th>
                <th>EK-krav</th>
                <th>Rente</th>
                <th>Bankens vurdering</th>
              </tr>
            </thead>
            <tbody>
              {historikkFaser.map((f, i) => (
                <tr key={i}>
                  <td className="ep-bold">{f.aar}</td>
                  <td><span className="ep-badge" style={{ background: fasefarger[i], color: fasetekst[i] }}>{f.fase}</span></td>
                  <td className="ep-bold">{f.ekKrav}</td>
                  <td>{f.rente}</td>
                  <td style={{ fontSize: '12px', color: '#666' }}>{f.beskrivelse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#faf9f7', border: '1px solid #e8e4df', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '12px' }}>Holdingselskap + driftsselskap</div>
          <div className="ep-timeline">
            {[
              { tittel: 'Holdingselskap – eier aksjer', desc: 'Mottar utbytte skattefritt via fritaksmetoden. Reinvesterer i fond eller nye driftsselskaper.', future: false },
              { tittel: 'Driftsselskap – bygger historikk', desc: 'Eier eiendommene, tar opp lån, viser overskudd år for år. Etter 2–3 år får selskapet bedre lånebetingelser automatisk.', future: false },
              { tittel: 'År 3: Første refinansiering', desc: 'Driftsselskapet kan vise til historikk. Banken senker EK-krav og rente. Kapital hentes ut til neste kjøp.', future: true },
              { tittel: 'År 5+: Porteføljeinvestor', desc: 'Med 2–3 enheter og solid historikk er driftsselskapet en attraktiv låntaker med de beste betingelsene.', future: true }
            ].map((item, i, arr) => (
              <div className="ep-timeline-item" key={i}>
                {i < arr.length - 1 && <div className="ep-timeline-line"></div>}
                <div className={`ep-timeline-dot ${item.future ? 'future' : ''}`}></div>
                <div className="ep-timeline-title">{item.tittel}</div>
                <div className="ep-timeline-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prognose */}
      <div className="ep-step">
        <div className="ep-step-header">
          <div className="ep-step-num">7</div>
          <div className="ep-step-title">År-for-år prognose</div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div>
            <label className="ep-label">Vis for</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['privat', 'as'].map(t => (
                <button key={t} onClick={() => setVisType(t)} style={{ padding: '6px 14px', borderRadius: '6px', border: visType === t ? '2px solid #1a1a1a' : '1px solid #ddd', background: visType === t ? '#1a1a1a' : '#fff', color: visType === t ? '#fff' : '#333', cursor: 'pointer', fontSize: '13px' }}>
                  {t === 'privat' ? 'Privat' : 'Via AS (med historikk)'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="ep-label">Prisvekst: {prisvekst}%</label>
            <input type="range" min="0" max="8" step="0.5" value={prisvekst} onChange={e => setPrisvekst(+e.target.value)} style={{ width: '160px', accentColor: '#1a1a1a' }} />
          </div>
        </div>

        {/* Kapitalinnstillinger */}
        <div className="ep-kapital-box">
          <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
            Kapital til prognosen – {visType === 'privat' ? 'Privat' : 'AS'}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
            Restkapital er automatisk hentet fra kalkulatoren, men kan justeres. Du kan også sette av noe til oppussing.
          </div>

          {visType === 'privat' ? (
            <div className="ep-kapital-grid">
              <InputFelt
                label="Restkapital etter kjøp"
                value={restJustertPrivat}
                onChange={setRestJustertPrivat}
                hint={`Beregnet: ${fmt(restKapitalPrivat)}`}
              />
              <InputFelt
                label="Sett av til oppussing"
                value={oppussingPrivat}
                onChange={setOppussingPrivat}
                hint="Øker boligverdi fra start"
              />
              <InputFelt
                label="Månedlig privat sparing"
                value={privatSparingPrivat}
                onChange={v => { setPrivatSparingPrivat(v); setArligInnskuddPrivat(v * 12); }}
                suffix="kr/mnd"
                hint="Skytes inn i investeringen årlig"
              />
            </div>
          ) : (
            <div className="ep-kapital-grid">
              <InputFelt
                label="Restkapital etter kjøp"
                value={restJustertAS}
                onChange={setRestJustertAS}
                hint={`Beregnet: ${fmt(restKapitalAS)}`}
              />
              <InputFelt
                label="Sett av til oppussing"
                value={oppussingAS}
                onChange={setOppussingAS}
                hint="Øker boligverdi fra start"
              />
              <InputFelt
                label="Månedlig privat sparing"
                value={privatSparingAS}
                onChange={v => { setPrivatSparingAS(v); setArligInnskuddAS(v * 12); }}
                suffix="kr/mnd"
                hint="Skytes inn i AS én gang i året"
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <div className="ep-kapital-item">
              <div className="lbl">Restkapital i prognosen</div>
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
                <th>År</th>
                <th>Boligverdi</th>
                <th>Gjenstående lån</th>
                <th>Egenkapital</th>
                <th>Netto/år</th>
                <th>Innskudd/år</th>
                <th>Total kapital</th>
                {visType === 'as' && <th>EK-krav neste</th>}
                {visType === 'as' && <th>Rente neste</th>}
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
                  <td className="ep-green">+{fmt(visType === 'privat' ? arligInnskuddPrivat : arligInnskuddAS)}</td>
                  <td className="ep-bold">{fmt(r.totalKapital)}</td>
                  {visType === 'as' && <td><span className="ep-badge blue">{Math.round(r.ekKravNeste * 100)}%</span></td>}
                  {visType === 'as' && <td>{r.renteNeste.toFixed(1)}%</td>}
                  <td>
                    {r.kanRefinansiere
                      ? <span className="ep-badge green">Ja – {fmt(r.refinansiering)}</span>
                      : <span style={{ fontSize: '12px', color: '#bbb' }}>Ikke ennå</span>
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
          <div className="title">Neste leilighet – når har du råd?</div>
          <div className="ep-next-grid">
            <div className="ep-next-item">
              <div className="lbl">Tidligst refinansiering</div>
              <div className="val">År {forsteRefinansiering.aar}</div>
            </div>
            <div className="ep-next-item">
              <div className="lbl">Kapital fra refinansiering</div>
              <div className="val">{fmt(forsteRefinansiering.refinansiering)}</div>
            </div>
            <div className="ep-next-item">
              <div className="lbl">EK-krav neste kjøp</div>
              <div className="val">{Math.round(forsteRefinansiering.ekKravNeste * 100)}%</div>
            </div>
            <div className="ep-next-item">
              <div className="lbl">Maks boligpris</div>
              <div className="val">{fmt(forsteRefinansiering.maksNesteBolig)}</div>
            </div>
            <div className="ep-next-item">
              <div className="lbl">Total kapital akkumulert</div>
              <div className="val">{fmt(forsteRefinansiering.totalKapital)}</div>
            </div>
            <div className="ep-next-item">
              <div className="lbl">Herav privat sparing</div>
              <div className="val">{fmt(forsteRefinansiering.eksternKapital)}</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '12px', marginBottom: '0' }}>
            {visType === 'as'
              ? `AS med ${forsteRefinansiering.aar} års historikk får estimert ${Math.round(forsteRefinansiering.ekKravNeste * 100)}% EK-krav og ${forsteRefinansiering.renteNeste.toFixed(1)}% rente på neste lån.`
              : 'Refinansiering beregnet ved 75% belåningsgrad. Faktisk godkjenning avhenger av banken og din økonomi.'
            }
          </p>
        </div>
      )}

      {!forsteRefinansiering && (
        <div className="ep-step">
          <p style={{ fontSize: '14px', color: '#666' }}>
            Med disse tallene er ikke refinansiering mulig innen 10 år. Prøv å øke prisvekst, oppussingsverdi eller månedssparing.
          </p>
        </div>
      )}

      <p className="ep-disclaimer">Prognosen er et estimat. Faktiske vilkår varierer mellom banker. Ikke finansiell rådgivning.</p>
    </div>
  );
}

export default EiendomPrognose;