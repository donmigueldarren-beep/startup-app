import { useState } from 'react';

function LaasBoks({ onVisLogin }) {
  return (
    <div style={{
      background: '#0f1a12', border: '1px solid #1a3a1e',
      padding: '48px', textAlign: 'center', marginTop: '40px'
    }}>
      <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔒</div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#f5f0e8', marginBottom: '10px' }}>
        Budsjettark krever Pro
      </div>
      <div style={{ fontSize: '13px', color: '#3a6a46', marginBottom: '28px', lineHeight: '1.7' }}>
        Budsjettarket er en Pro-funksjon (99 kr/mnd).
      </div>
      <button
        onClick={onVisLogin}
        style={{
          background: '#c9a84c', color: '#0f1a12', border: 'none',
          padding: '12px 28px', fontFamily: 'Inter, sans-serif',
          fontSize: '11px', letterSpacing: '0.1em',
          textTransform: 'uppercase', cursor: 'pointer', fontWeight: '500'
        }}
      >
        Logg inn / Oppgrader
      </button>
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  :root {
    --brg: #1f4e2e; --brg-pale: #e8f0ea; --brg-light: #2a6640;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --text: #1a2e1e; --muted: #5a6e5e;
  }
  .bud-wrap { font-family: 'Inter', sans-serif; color: var(--text); }
  .bud-header { background: var(--dark); padding: 32px 0 28px; margin-bottom: 24px; }
  .bud-header-inner { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
  .bud-tittel { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--cream); margin-bottom: 6px; }
  .bud-sub { font-size: 12px; color: #3a6a46; }
  .bud-kilde { font-size: 11px; color: #2a4a2e; margin-top: 4px; }
  .bud-eksport-wrap { display: flex; gap: 8px; }
  .bud-eksport-knapp { padding: 10px 20px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-weight: 500; border: none; transition: all 0.2s; }
  .bud-eksport-knapp.excel { background: #1a6640; color: var(--cream); }
  .bud-eksport-knapp.excel:hover { background: #2a8050; }
  .bud-eksport-knapp.excel:disabled { opacity: 0.5; cursor: not-allowed; }
  .bud-eksport-knapp.pdf { background: var(--gold); color: var(--dark); }
  .bud-eksport-knapp.pdf:hover { background: #d4b558; }
  .bud-tabs { display: flex; gap: 2px; background: var(--cream-dark); margin-bottom: 24px; }
  .bud-tab { padding: 12px 24px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; background: var(--cream); color: var(--muted); border: none; transition: all 0.2s; }
  .bud-tab.aktiv { background: var(--dark); color: var(--cream); }
  .bud-seksjon { background: white; border: 1px solid var(--cream-dark); padding: 28px; margin-bottom: 12px; }
  .bud-seksjon-tittel { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--dark); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
  .bud-to-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--cream-dark); margin-bottom: 20px; }
  .bud-col { background: var(--cream); padding: 20px; }
  .bud-col-header { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; font-weight: 500; }
  .bud-linje { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--cream-dark); font-size: 13px; }
  .bud-linje:last-child { border-bottom: none; }
  .bud-linje .k { color: var(--muted); }
  .bud-linje .v { font-weight: 500; }
  .bud-linje.sum { border-top: 2px solid var(--cream-dark); margin-top: 4px; padding-top: 12px; }
  .bud-linje.sum .k { font-weight: 600; color: var(--text); }
  .bud-resultat { font-family: 'Playfair Display', serif; font-size: 28px; margin: 12px 0 4px; }
  .bud-aar-tabell { width: 100%; border-collapse: collapse; font-size: 12px; display: block; overflow-x: auto; }
  .bud-aar-tabell th { text-align: left; padding: 8px 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); border-bottom: 2px solid var(--cream-dark); font-weight: 500; white-space: nowrap; }
  .bud-aar-tabell td { padding: 9px 10px; border-bottom: 1px solid var(--cream-dark); white-space: nowrap; }
  .bud-aar-tabell tr:hover td { background: var(--cream); }
  .bud-aar-tabell tr.sum-rad td { background: var(--dark); color: var(--cream); font-weight: 500; border-bottom: none; }
  .bud-aar-tabell tr.sum-rad td.pos { color: #9fc9a8; }
  .bud-aar-tabell tr.sum-rad td.neg { color: #c84040; }
  .bud-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .bud-metric { background: var(--cream); padding: 16px; border: 1px solid var(--cream-dark); }
  .bud-metric .lbl { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .bud-metric .val { font-family: 'Playfair Display', serif; font-size: 22px; }
  .bud-metric .sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .bud-felt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
  .bud-felt label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .bud-felt input { width: 100%; padding: 9px 12px; border: 1px solid var(--cream-dark); background: var(--cream); font-family: 'Inter', sans-serif; font-size: 13px; outline: none; box-sizing: border-box; }
  .bud-felt input:focus { border-color: var(--gold); background: white; }
  .bud-ingen-tall { background: var(--cream); border: 1px solid var(--cream-dark); padding: 40px; text-align: center; }
  .bud-ingen-tall p { font-size: 14px; color: var(--muted); margin-bottom: 8px; }
  .bud-ingen-tall small { font-size: 12px; color: #bbb; }
  .bud-kalkulator-valg { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
  .bud-kalkulator-knapp { padding: 8px 18px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; background: var(--cream); border: 1px solid var(--cream-dark); color: var(--muted); transition: all 0.2s; }
  .bud-kalkulator-knapp.aktiv { background: var(--dark); color: var(--cream); border-color: var(--dark); }
  .bud-disclaimer { font-size: 11px; color: var(--muted); font-style: italic; margin-top: 12px; }
  .bud-laster { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); padding: 12px 0; }
`;

function fmtK(n) {
  return Math.round(n).toLocaleString('no-NO') + ' kr';
}

function fmtMnd(n) {
  return (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('no-NO') + ' kr';
}

function hentTallFraStorage(kalkulator) {
  try {
    const data = localStorage.getItem(`addon_budsjett_${kalkulator}`);
    return data ? JSON.parse(data) : null;
  } catch (e) { return null; }
}

function MaanedligBudsjett({ tall }) {
  const [ekstraTall, setEkstraTall] = useState({
    ekstraInntekt: 0,
    ekstraKostnad: 0,
    bufferpst: 5,
  });

  if (!tall) return (
    <div className="bud-ingen-tall">
      <p>Ingen tall funnet for denne kalkulatoren.</p>
      <small>Gå til kalkulatoren og klikk "Åpne budsjettark" for å overføre tallene.</small>
    </div>
  );

  const buffer = tall.totalKost * (ekstraTall.bufferpst / 100);
  const justertKost = tall.totalKost + ekstraTall.ekstraKostnad + buffer;
  const justertInntekt = tall.inntekt + ekstraTall.ekstraInntekt;
  const brutto = justertInntekt - justertKost;
  const skatt = Math.max(0, brutto * (tall.skattSats || 0.22));
  const netto = brutto - skatt;

  return (
    <div>
      <div className="bud-metrics">
        <div className="bud-metric">
          <div className="lbl">Månedlig inntekt</div>
          <div className="val" style={{ color: 'var(--brg)' }}>{fmtK(justertInntekt)}</div>
          <div className="sub">justert</div>
        </div>
        <div className="bud-metric">
          <div className="lbl">Månedlige kostnader</div>
          <div className="val" style={{ color: '#8b2020' }}>{fmtK(justertKost)}</div>
          <div className="sub">inkl. buffer</div>
        </div>
        <div className="bud-metric">
          <div className="lbl">Skatt</div>
          <div className="val" style={{ color: '#7a5a1e' }}>{fmtK(skatt)}</div>
          <div className="sub">{Math.round((tall.skattSats || 0.22) * 100)}%</div>
        </div>
        <div className="bud-metric">
          <div className="lbl">Netto per måned</div>
          <div className="val" style={{ color: netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(netto)}</div>
          <div className="sub">etter skatt</div>
        </div>
      </div>

      <div className="bud-felt-grid">
        <div className="bud-felt">
          <label>Ekstra inntekt / mnd</label>
          <input type="number" value={ekstraTall.ekstraInntekt} step={500}
            onChange={e => setEkstraTall(p => ({ ...p, ekstraInntekt: +e.target.value }))} />
        </div>
        <div className="bud-felt">
          <label>Ekstra kostnad / mnd</label>
          <input type="number" value={ekstraTall.ekstraKostnad} step={500}
            onChange={e => setEkstraTall(p => ({ ...p, ekstraKostnad: +e.target.value }))} />
        </div>
        <div className="bud-felt">
          <label>Buffer for uforutsett: {ekstraTall.bufferpst}%</label>
          <input type="range" min={0} max={20} step={1} value={ekstraTall.bufferpst}
            onChange={e => setEkstraTall(p => ({ ...p, bufferpst: +e.target.value }))}
            style={{ accentColor: 'var(--gold)', marginTop: '8px', width: '100%' }} />
        </div>
      </div>

      <div className="bud-to-col">
        <div className="bud-col">
          <div className="bud-col-header">Inntekter</div>
          {tall.inntektLinjer?.map((l, i) => (
            <div className="bud-linje" key={i}>
              <span className="k">{l.navn}</span>
              <span className="v" style={{ color: 'var(--brg)' }}>+{fmtK(l.verdi)}</span>
            </div>
          ))}
          {ekstraTall.ekstraInntekt > 0 && (
            <div className="bud-linje">
              <span className="k">Ekstra inntekt</span>
              <span className="v" style={{ color: 'var(--brg)' }}>+{fmtK(ekstraTall.ekstraInntekt)}</span>
            </div>
          )}
          <div className="bud-linje sum">
            <span className="k">Sum inntekter</span>
            <span className="v" style={{ color: 'var(--brg)' }}>{fmtK(justertInntekt)}</span>
          </div>
        </div>
        <div className="bud-col">
          <div className="bud-col-header">Kostnader</div>
          {tall.kostnadLinjer?.map((l, i) => (
            <div className="bud-linje" key={i}>
              <span className="k">{l.navn}</span>
              <span className="v" style={{ color: '#8b2020' }}>-{fmtK(l.verdi)}</span>
            </div>
          ))}
          {ekstraTall.ekstraKostnad > 0 && (
            <div className="bud-linje">
              <span className="k">Ekstra kostnad</span>
              <span className="v" style={{ color: '#8b2020' }}>-{fmtK(ekstraTall.ekstraKostnad)}</span>
            </div>
          )}
          <div className="bud-linje">
            <span className="k">Buffer ({ekstraTall.bufferpst}%)</span>
            <span className="v" style={{ color: '#8b2020' }}>-{fmtK(buffer)}</span>
          </div>
          <div className="bud-linje sum">
            <span className="k">Sum kostnader</span>
            <span className="v" style={{ color: '#8b2020' }}>{fmtK(justertKost)}</span>
          </div>
        </div>
      </div>

      <div style={{
        background: netto >= 0 ? 'var(--brg-pale)' : '#fce8e8',
        borderLeft: `3px solid ${netto >= 0 ? 'var(--brg)' : '#c84040'}`,
        padding: '16px 20px'
      }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '6px' }}>Netto per måned</div>
        <div className="bud-resultat" style={{ color: netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(netto)}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Årlig: {fmtK(netto * 12)}</div>
      </div>
    </div>
  );
}

function AarligOversikt({ tall }) {
  if (!tall) return (
    <div className="bud-ingen-tall">
      <p>Ingen tall funnet for denne kalkulatoren.</p>
      <small>Gå til kalkulatoren og klikk "Åpne budsjettark" for å overføre tallene.</small>
    </div>
  );

  const maaneder = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
  const sesong = tall.sesongFaktor || Array(12).fill(1);

  const rader = maaneder.map((mnd, i) => {
    const inntekt = tall.inntekt * sesong[i];
    const kost = tall.totalKost;
    const brutto = inntekt - kost;
    const skatt = Math.max(0, brutto * (tall.skattSats || 0.22));
    const netto = brutto - skatt;
    return { mnd, inntekt, kost, brutto, skatt, netto };
  });

  const totInntekt = rader.reduce((s, r) => s + r.inntekt, 0);
  const totKost = rader.reduce((s, r) => s + r.kost, 0);
  const totNetto = rader.reduce((s, r) => s + r.netto, 0);

  return (
    <div>
      <div className="bud-metrics">
        <div className="bud-metric">
          <div className="lbl">Årsomsetning</div>
          <div className="val" style={{ color: 'var(--brg)' }}>{fmtK(totInntekt)}</div>
        </div>
        <div className="bud-metric">
          <div className="lbl">Årskostnader</div>
          <div className="val" style={{ color: '#8b2020' }}>{fmtK(totKost)}</div>
        </div>
        <div className="bud-metric">
          <div className="lbl">Årsresultat netto</div>
          <div className="val" style={{ color: totNetto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtK(totNetto)}</div>
        </div>
        <div className="bud-metric">
          <div className="lbl">Snitt per måned</div>
          <div className="val" style={{ color: totNetto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtK(totNetto / 12)}</div>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="bud-aar-tabell">
          <thead>
            <tr>
              <th>Måned</th>
              <th>Inntekt</th>
              <th>Kostnader</th>
              <th>Brutto</th>
              <th>Skatt</th>
              <th>Netto</th>
              <th>Akkumulert</th>
            </tr>
          </thead>
          <tbody>
            {rader.map((r, i) => {
              const akk = rader.slice(0, i + 1).reduce((s, x) => s + x.netto, 0);
              return (
                <tr key={i}>
                  <td style={{ fontWeight: '500' }}>{r.mnd}</td>
                  <td style={{ color: 'var(--brg)' }}>{fmtK(r.inntekt)}</td>
                  <td style={{ color: '#8b2020' }}>{fmtK(r.kost)}</td>
                  <td style={{ color: r.brutto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(r.brutto)}</td>
                  <td style={{ color: '#7a5a1e' }}>{fmtK(r.skatt)}</td>
                  <td style={{ fontWeight: '500', color: r.netto >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(r.netto)}</td>
                  <td style={{ color: akk >= 0 ? 'var(--brg)' : '#8b2020' }}>{fmtMnd(akk)}</td>
                </tr>
              );
            })}
            <tr className="sum-rad">
              <td>Totalt</td>
              <td className="pos">{fmtK(totInntekt)}</td>
              <td style={{ color: '#c84040' }}>{fmtK(totKost)}</td>
              <td className={totInntekt - totKost >= 0 ? 'pos' : 'neg'}>{fmtMnd(totInntekt - totKost)}</td>
              <td style={{ color: '#c9a84c' }}>{fmtK(rader.reduce((s, r) => s + r.skatt, 0))}</td>
              <td className={totNetto >= 0 ? 'pos' : 'neg'}>{fmtMnd(totNetto)}</td>
              <td className={totNetto >= 0 ? 'pos' : 'neg'}>{fmtMnd(totNetto)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Budsjettark({ tilgang = 'gratis', onVisLogin = () => {} }) {
  const harPro = tilgang === 'pro';
  const [aktivTab, setAktivTab] = useState('maanedlig');
  const [aktivKalkulator, setAktivKalkulator] = useState('eiendom-privat');
  const [lasterExcel, setLasterExcel] = useState(false);

  const kalkulatorer = [
    { id: 'eiendom-privat', navn: 'Eiendom privat' },
    { id: 'eiendom-as', navn: 'Eiendom AS' },
    { id: 'bil', navn: 'Bilutleie' },
    { id: 'salong', navn: 'Salong' },
  ];

  const tall = hentTallFraStorage(aktivKalkulator);

  const eksporterExcel = async () => {
    if (!tall || lasterExcel) return;
    setLasterExcel(true);
    try {
      const svar = await fetch('/api/budsjett', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kalkulator: aktivKalkulator, tall }),
      });
      const data = await svar.json();
      const bytes = Uint8Array.from(atob(data.xlsx), c => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `budsjett_${aktivKalkulator}_${new Date().getFullYear()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Kunne ikke generere Excel. Prøv igjen.');
    }
    setLasterExcel(false);
  };

  const eksporterPDF = () => { window.print(); };

  return (
    <div className="bud-wrap">
      <style>{styles}</style>
      <style>{`@media print { .bud-eksport-wrap, .bud-tabs, .bud-kalkulator-valg { display: none !important; } }`}</style>

      <div className="bud-header">
        <div className="bud-header-inner">
          <div>
            <div className="bud-tittel">Budsjettark</div>
            <div className="bud-sub">Månedlig og årlig oversikt basert på kalkulatortallene dine</div>
            {tall && <div className="bud-kilde">Tall hentet fra: {kalkulatorer.find(k => k.id === aktivKalkulator)?.navn}</div>}
          </div>
          {harPro && (
            <div className="bud-eksport-wrap">
              <button
                className="bud-eksport-knapp excel"
                onClick={eksporterExcel}
                disabled={!tall || lasterExcel}
              >
                {lasterExcel ? 'Genererer...' : '↓ Last ned Excel'}
              </button>
              <button className="bud-eksport-knapp pdf" onClick={eksporterPDF}>↓ PDF / Print</button>
            </div>
          )}
        </div>
      </div>

      {!harPro ? (
        <LaasBoks onVisLogin={onVisLogin} />
      ) : (
        <>
          <div className="bud-kalkulator-valg">
            {kalkulatorer.map(k => (
              <button
                key={k.id}
                className={`bud-kalkulator-knapp ${aktivKalkulator === k.id ? 'aktiv' : ''}`}
                onClick={() => setAktivKalkulator(k.id)}
              >
                {k.navn}
              </button>
            ))}
          </div>

          <div className="bud-tabs">
            <button className={`bud-tab ${aktivTab === 'maanedlig' ? 'aktiv' : ''}`} onClick={() => setAktivTab('maanedlig')}>
              Månedlig budsjett
            </button>
            <button className={`bud-tab ${aktivTab === 'aarlig' ? 'aktiv' : ''}`} onClick={() => setAktivTab('aarlig')}>
              12-måneders oversikt
            </button>
            <button className={`bud-tab ${aktivTab === 'begge' ? 'aktiv' : ''}`} onClick={() => setAktivTab('begge')}>
              Side om side
            </button>
          </div>

          {aktivTab === 'begge' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="bud-seksjon">
                <div className="bud-seksjon-tittel"><span>📋</span> Månedlig budsjett</div>
                <MaanedligBudsjett tall={tall} />
              </div>
              <div className="bud-seksjon">
                <div className="bud-seksjon-tittel"><span>📅</span> 12-måneders oversikt</div>
                <AarligOversikt tall={tall} />
              </div>
            </div>
          ) : aktivTab === 'maanedlig' ? (
            <div className="bud-seksjon">
              <div className="bud-seksjon-tittel"><span>📋</span> Månedlig budsjett</div>
              <MaanedligBudsjett tall={tall} />
            </div>
          ) : (
            <div className="bud-seksjon">
              <div className="bud-seksjon-tittel"><span>📅</span> 12-måneders oversikt</div>
              <AarligOversikt tall={tall} />
            </div>
          )}

          <p className="bud-disclaimer">Alle tall er estimater basert på kalkulatorinput. Ikke finansiell rådgivning.</p>
        </>
      )}
    </div>
  );
}