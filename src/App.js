import { useState } from 'react';
import EiendomKalkulator from './EiendomKalkulator';
import BilKalkulator from './BilKalkulator';
import './App.css';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }

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

  .app { font-family: 'Inter', sans-serif; background: var(--cream); min-height: 100vh; color: var(--text); }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: var(--dark); padding: 18px 48px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid #2a3a2e;
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); letter-spacing: 0.02em; cursor: pointer; }
  .nav-logo em { font-style: italic; color: var(--gold); }
  .nav-links { display: flex; gap: 28px; }
  .nav-link { font-size: 12px; color: #9aaa9e; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: color 0.2s; }
  .nav-link:hover { color: var(--cream); }
  .nav-cta { background: var(--brg); color: var(--cream); border: none; padding: 9px 20px; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .nav-cta:hover { background: var(--brg-light); }

  .hero { background: var(--dark); padding: 120px 48px 80px; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; overflow: hidden; }
  .hero-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gold); }
  .hero-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 28px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(40px, 7vw, 72px); line-height: 1.05; color: var(--cream); letter-spacing: -0.01em; margin-bottom: 20px; max-width: 800px; }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 16px; color: #9aaa9e; line-height: 1.7; max-width: 480px; margin-bottom: 44px; font-weight: 300; }
  .hero-btns { display: flex; gap: 12px; }
  .btn-primary { background: var(--brg); color: var(--cream); border: none; padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .btn-primary:hover { background: var(--brg-light); }
  .btn-secondary { background: transparent; color: var(--cream); border: 1px solid #3a4a3e; padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s; }
  .btn-secondary:hover { border-color: #6a8a6e; }

  .stats { display: flex; border-top: 1px solid #2a3a2e; border-bottom: 1px solid #2a3a2e; background: var(--dark); }
  .stat { flex: 1; padding: 28px 48px; border-right: 1px solid #2a3a2e; }
  .stat:last-child { border-right: none; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--cream); margin-bottom: 4px; }
  .stat-lbl { font-size: 11px; color: #6a7a6e; letter-spacing: 0.06em; text-transform: uppercase; }

  .bransjer { padding: 80px 48px; background: var(--cream); max-width: 1200px; margin: 0 auto; }
  .bransjer-full { background: var(--cream); }
  .section-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--brg); margin-bottom: 12px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 36px; color: var(--dark); margin-bottom: 40px; letter-spacing: -0.01em; }

  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--cream-dark); }
  .cards-row2 { display: grid; grid-template-columns: 1fr 2fr; gap: 1px; background: var(--cream-dark); margin-top: 1px; }
  .card { background: var(--cream); padding: 32px; cursor: pointer; position: relative; min-height: 200px; transition: background 0.2s; }
  .card:hover { background: #ede8de; }
  .card.coming { opacity: 0.6; cursor: default; }
  .card.coming:hover { background: var(--cream); }
  .card-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 20px; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--dark); margin-bottom: 10px; }
  .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
  .card-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .card-tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; background: var(--brg-pale); color: var(--brg); }
  .card-arrow { position: absolute; bottom: 32px; right: 32px; font-size: 16px; color: var(--brg-mid); transition: transform 0.2s; }
  .card:not(.coming):hover .card-arrow { transform: translate(2px, -2px); }
  .coming-pill { display: inline-block; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; background: var(--cream-dark); color: var(--muted); padding: 4px 10px; margin-bottom: 16px; }
  .more-card { background: var(--cream); padding: 24px 32px; display: flex; align-items: center; gap: 16px; }
  .more-card-text { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--muted); font-style: italic; }

  .hvorfor { background: var(--brg); padding: 80px 48px; }
  .hvorfor-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .hvorfor-title { font-family: 'Playfair Display', serif; font-size: 36px; color: var(--cream); margin-bottom: 16px; }
  .hvorfor-title em { font-style: italic; color: var(--gold); }
  .hvorfor-sub { font-size: 14px; color: #9fc9a8; line-height: 1.7; font-weight: 300; }
  .hvorfor-items { display: flex; flex-direction: column; gap: 24px; }
  .hvorfor-punkt { display: flex; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .hvorfor-punkt:last-child { border-bottom: none; padding-bottom: 0; }
  .hvorfor-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
  .hvorfor-tekst-title { font-size: 14px; font-weight: 500; color: var(--cream); margin-bottom: 4px; }
  .hvorfor-tekst-desc { font-size: 13px; color: #9aaa9e; line-height: 1.6; }

  .kalkulator-view { padding: 100px 48px 80px; max-width: 900px; margin: 0 auto; }
  .kalkulator-back { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); cursor: pointer; margin-bottom: 32px; background: none; border: none; font-family: 'Inter', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s; }
  .kalkulator-back:hover { color: var(--text); }
  .kalkulator-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--cream-dark); }
  .kalkulator-header-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--brg); margin-bottom: 10px; }
  .kalkulator-header-title { font-family: 'Playfair Display', serif; font-size: 40px; color: var(--dark); letter-spacing: -0.01em; }

  footer { border-top: 1px solid #2a3a2e; padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; background: var(--dark); }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 15px; color: var(--cream); }
  .footer-logo em { color: var(--gold); font-style: italic; }
  .footer-disclaimer { font-size: 11px; color: #4a5a4e; max-width: 400px; text-align: right; }
`;

const bransjer = [
  {
    id: 'eiendom', num: '01',
    navn: 'Eiendomsutleie',
    desc: 'Sammenlign privat kjøp vs AS, BRRR-strategi og porteføljevekst over tid.',
    tags: ['Utleie', 'BRRR', 'AS vs privat'],
    coming: false
  },
  {
    id: 'bil', num: '02',
    navn: 'Bilutleie',
    desc: 'Fra enkeltbil til flåte – finn break-even og avkastning på kapitalen.',
    tags: ['Flåte', 'ROI', 'Break-even'],
    coming: false
  },
  {
    id: 'salong', num: '03',
    navn: 'Salong',
    desc: 'Frisør, negler, hudpleie – finn lønnsomheten før du signerer leiekontrakten.',
    tags: ['Leie', 'Bemanning'],
    coming: true
  },
  {
    id: 'korttid', num: '04',
    navn: 'Korttidsutleie',
    desc: 'Airbnb og korttidsutleie – sammenlign mot langtidsleie og finn beste strategi.',
    tags: ['Airbnb', 'Sesong'],
    coming: true
  }
];

export default function App() {
  const [side, setSide] = useState('hjem');
  const [aktivBransje, setAktivBransje] = useState(null);

  const aapneBransje = (bransje) => {
    if (bransje.coming) return;
    setAktivBransje(bransje);
    setSide('kalkulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (side === 'kalkulator' && aktivBransje) {
    return (
      <div className="app">
        <style>{styles}</style>
        <nav className="nav">
          <div className="nav-logo" onClick={() => setSide('hjem')}>Startup<em>Smart</em></div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => setSide('hjem')}>Hjem</span>
            <span className="nav-link" onClick={() => { setSide('hjem'); setTimeout(() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Bransjer</span>
          </div>
          <button className="nav-cta" onClick={() => setSide('hjem')}>Alle bransjer</button>
        </nav>
        <div className="kalkulator-view">
          <button className="kalkulator-back" onClick={() => setSide('hjem')}>← Tilbake</button>
          <div className="kalkulator-header">
            <div className="kalkulator-header-tag">Kalkulator</div>
            <div className="kalkulator-header-title">{aktivBransje.navn}</div>
          </div>
          {aktivBransje.id === 'eiendom' && <EiendomKalkulator />}
          {aktivBransje.id === 'bil' && <BilKalkulator />}
        </div>
        <footer>
          <div className="footer-logo">Startup<em>Smart</em></div>
          <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</div>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{styles}</style>

      <nav className="nav">
        <div className="nav-logo">Startup<em>Smart</em></div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Bransjer</span>
          <span className="nav-link">Om oss</span>
        </div>
        <button className="nav-cta" onClick={() => aapneBransje(bransjer[0])}>Kom i gang</button>
      </nav>

      <section className="hero">
        <div className="hero-accent"></div>
        <div className="hero-tag">Gratis beslutningsverktøy</div>
        <h1 className="hero-title">Finn ut om ideen din<br /><em>faktisk</em> er lønnsom</h1>
        <p className="hero-sub">StartupSmart gir deg tallene du trenger før du investerer tid og penger i din neste bedrift.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => aapneBransje(bransjer[0])}>Start beregning</button>
          <button className="btn-secondary" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Se alle bransjer</button>
        </div>
      </section>

      <div className="stats">
        {[
          { num: '3', lbl: 'Bransjer tilgjengelig' },
          { num: '0 kr', lbl: 'Kostnad' },
          { num: '100%', lbl: 'Konfidensielt' }
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="bransjer-full" id="bransjer">
        <div className="bransjer">
          <div className="section-tag">Velg bransje</div>
          <div className="section-title">Hva vil du starte?</div>
          <div className="cards">
            {bransjer.slice(0, 3).map(b => (
              <div key={b.id} className={`card ${b.coming ? 'coming' : ''}`} onClick={() => aapneBransje(b)}>
                {b.coming && <div className="coming-pill">Kommer snart</div>}
                {!b.coming && <div className="card-num">{b.num}</div>}
                <div className="card-title">{b.navn}</div>
                <div className="card-desc">{b.desc}</div>
                <div className="card-tags">{b.tags.map(t => <span key={t} className="card-tag">{t}</span>)}</div>
                {!b.coming && <div className="card-arrow">↗</div>}
              </div>
            ))}
          </div>
          <div className="cards-row2">
            <div className={`card coming`}>
              <div className="coming-pill">Kommer snart</div>
              <div className="card-title">{bransjer[3].navn}</div>
              <div className="card-desc">{bransjer[3].desc}</div>
              <div className="card-tags">{bransjer[3].tags.map(t => <span key={t} className="card-tag">{t}</span>)}</div>
            </div>
            <div className="more-card">
              <div className="more-card-text">Flere bransjer kommer snart — franchise, konsulent, nettbutikk og mer</div>
              <div style={{ marginLeft: 'auto', fontSize: '20px', color: 'var(--cream-dark)' }}>→</div>
            </div>
          </div>
        </div>
      </div>

      <section className="hvorfor">
        <div className="hvorfor-inner">
          <div>
            <h2 className="hvorfor-title">Hvorfor <em>StartupSmart?</em></h2>
            <p className="hvorfor-sub">De fleste starter bedrift uten et realistisk bilde av hva det faktisk koster. Vi gir deg tallene – ærlig og tydelig.</p>
          </div>
          <div className="hvorfor-items">
            {[
              { tittel: 'Helt konfidensielt', desc: 'Tallene du legger inn forblir hos deg. Vi lagrer ingenting.' },
              { tittel: 'Oppdatert informasjon', desc: 'Gjeldende skatteregler, renter og lovkrav.' },
              { tittel: 'Konkrete anbefalinger', desc: 'Ikke bare tall – men hva som lønner seg for deg.' },
              { tittel: 'Langsiktig perspektiv', desc: 'Se porteføljen vokse over 10 år.' }
            ].map((p, i) => (
              <div className="hvorfor-punkt" key={i}>
                <div className="hvorfor-dot"></div>
                <div>
                  <div className="hvorfor-tekst-title">{p.tittel}</div>
                  <div className="hvorfor-tekst-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">Startup<em>Smart</em></div>
        <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</div>
      </footer>
    </div>
  );
}