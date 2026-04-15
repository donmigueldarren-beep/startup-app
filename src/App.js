import { useState } from 'react';
import EiendomKalkulator from './EiendomKalkulator';
import BilKalkulator from './BilKalkulator';
import './App.css';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .app { font-family: 'DM Sans', sans-serif; background: #f7f5f0; min-height: 100vh; color: #1a1a1a; }

  .nav { 
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 48px; background: rgba(247,245,240,0.92);
    backdrop-filter: blur(12px); border-bottom: 1px solid #e8e4df;
  }
  .nav-logo { font-family: 'DM Serif Display', serif; font-size: 20px; letter-spacing: -0.02em; }
  .nav-logo span { font-style: italic; color: #888; }
  .nav-links { display: flex; gap: 32px; }
  .nav-link { font-size: 13px; color: #888; cursor: pointer; text-decoration: none; transition: color 0.2s; }
  .nav-link:hover { color: #1a1a1a; }
  .nav-cta { background: #1a1a1a; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.2s; }
  .nav-cta:hover { opacity: 0.8; }

  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    padding: 120px 48px 80px; position: relative; overflow: hidden;
  }
  .hero-tag { display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #888; border: 1px solid #ddd; padding: 6px 16px; border-radius: 20px; margin-bottom: 32px; }
  .hero-title { font-family: 'DM Serif Display', serif; font-size: clamp(48px, 8vw, 96px); line-height: 1.0; letter-spacing: -0.03em; margin-bottom: 24px; max-width: 900px; }
  .hero-title em { font-style: italic; color: #888; }
  .hero-sub { font-size: 18px; color: #666; line-height: 1.6; max-width: 520px; margin-bottom: 48px; font-weight: 300; }
  .hero-actions { display: flex; gap: 16px; align-items: center; }
  .btn-primary { background: #1a1a1a; color: #fff; border: none; padding: 16px 32px; border-radius: 10px; font-size: 15px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; font-weight: 500; }
  .btn-primary:hover { background: #333; transform: translateY(-1px); }
  .btn-secondary { background: transparent; color: #666; border: 1px solid #ddd; padding: 16px 32px; border-radius: 10px; font-size: 15px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
  .btn-secondary:hover { border-color: #999; color: #1a1a1a; }

  .hero-bg { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; overflow: hidden; }
  .hero-circle { position: absolute; border-radius: 50%; }
  .hero-circle-1 { width: 600px; height: 600px; top: -200px; right: -200px; background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%); }
  .hero-circle-2 { width: 400px; height: 400px; bottom: -100px; left: -100px; background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%); }

  .stats { display: flex; gap: 1px; background: #e8e4df; border-top: 1px solid #e8e4df; border-bottom: 1px solid #e8e4df; }
  .stat { flex: 1; background: #f7f5f0; padding: 32px 48px; }
  .stat-num { font-family: 'DM Serif Display', serif; font-size: 36px; margin-bottom: 4px; }
  .stat-lbl { font-size: 13px; color: #888; }

  .bransjer { padding: 80px 48px; max-width: 1200px; margin: 0 auto; }
  .bransjer-header { margin-bottom: 48px; }
  .bransjer-tag { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-bottom: 16px; }
  .bransjer-title { font-family: 'DM Serif Display', serif; font-size: 40px; letter-spacing: -0.02em; }
  .bransjer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  
  .bransje-kort {
    background: #fff; border: 1px solid #e8e4df; border-radius: 16px;
    padding: 32px; cursor: pointer; transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .bransje-kort:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: #ccc; }
  .bransje-kort.coming { opacity: 0.5; cursor: default; }
  .bransje-kort.coming:hover { transform: none; box-shadow: none; }
  .bransje-ikon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 20px; }
  .bransje-navn { font-family: 'DM Serif Display', serif; font-size: 22px; margin-bottom: 8px; }
  .bransje-desc { font-size: 13px; color: #888; line-height: 1.6; margin-bottom: 20px; }
  .bransje-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .bransje-tag { font-size: 11px; padding: 4px 10px; border-radius: 20px; background: #f7f5f0; color: #666; }
  .bransje-arrow { position: absolute; bottom: 32px; right: 32px; font-size: 18px; color: #ccc; transition: all 0.2s; }
  .bransje-kort:not(.coming):hover .bransje-arrow { color: #1a1a1a; transform: translate(2px, -2px); }
  .coming-badge { position: absolute; top: 20px; right: 20px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; background: #f7f5f0; color: #aaa; padding: 4px 10px; border-radius: 20px; border: 1px solid #e8e4df; }

  .hvorfor { background: #1a1a1a; color: #fff; padding: 80px 48px; }
  .hvorfor-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .hvorfor-title { font-family: 'DM Serif Display', serif; font-size: 40px; letter-spacing: -0.02em; margin-bottom: 24px; }
  .hvorfor-title em { font-style: italic; color: #888; }
  .hvorfor-sub { font-size: 15px; color: #888; line-height: 1.7; font-weight: 300; }
  .hvorfor-punkter { display: flex; flex-direction: column; gap: 24px; }
  .hvorfor-punkt { display: flex; gap: 16px; align-items: flex-start; }
  .hvorfor-ikon { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .hvorfor-tekst-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .hvorfor-tekst-desc { font-size: 13px; color: #888; line-height: 1.6; }

  .kalkulator-view { padding: 100px 48px 80px; max-width: 900px; margin: 0 auto; }
  .kalkulator-back { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #888; cursor: pointer; margin-bottom: 32px; transition: color 0.2s; background: none; border: none; font-family: 'DM Sans', sans-serif; }
  .kalkulator-back:hover { color: #1a1a1a; }
  .kalkulator-header { margin-bottom: 32px; }
  .kalkulator-header-tag { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-bottom: 12px; }
  .kalkulator-header-title { font-family: 'DM Serif Display', serif; font-size: 40px; letter-spacing: -0.02em; }

  footer { border-top: 1px solid #e8e4df; padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'DM Serif Display', serif; font-size: 16px; }
  .footer-logo span { font-style: italic; color: #888; }
  .footer-disclaimer { font-size: 11px; color: #bbb; max-width: 400px; text-align: right; }
`;

const bransjer = [
  {
    id: 'eiendom',
    ikon: '🏠',
    ikonBg: '#f0fdf4',
    navn: 'Eiendomsutleie',
    desc: 'Sammenlign privat kjøp vs AS, BRRR-strategi og fremtidig porteføljevekst.',
    tags: ['Utleie', 'BRRR', 'Refinansiering', 'Holdingselskap'],
    coming: false
  },
  {
    id: 'bil',
    ikon: '🚗',
    ikonBg: '#eff6ff',
    navn: 'Bilutleie',
    desc: 'Kalkulator for bilutleiebusiness – fra enkeltbil til flåte.',
    tags: ['Flåte', 'Avskrivning', 'Forsikring'],
    coming: false
  },
  {
    id: 'salong',
    ikon: '✂️',
    ikonBg: '#fdf4ff',
    navn: 'Salong',
    desc: 'Frisør, negler, hudpleie – finn ut hva du trenger for å gå i pluss.',
    tags: ['Leie', 'Bemanning', 'Break-even'],
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
          <div className="nav-logo">Startup<span>Smart</span></div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => setSide('hjem')}>Hjem</span>
            <span className="nav-link">Om oss</span>
          </div>
          <button className="nav-cta" onClick={() => setSide('hjem')}>Alle bransjer</button>
        </nav>
        <div className="kalkulator-view">
          <button className="kalkulator-back" onClick={() => setSide('hjem')}>
            ← Tilbake til alle bransjer
          </button>
          <div className="kalkulator-header">
            <div className="kalkulator-header-tag">Kalkulator</div>
            <div className="kalkulator-header-title">{aktivBransje.navn}</div>
          </div>
          {aktivBransje.id === 'eiendom' && <EiendomKalkulator />}
          {aktivBransje.id === 'bil' && <BilKalkulator />}
        </div>
        <footer>
          <div className="footer-logo">Startup<span>Smart</span></div>
          <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</div>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{styles}</style>

      <nav className="nav">
        <div className="nav-logo">Startup<span>Smart</span></div>
        <div className="nav-links">
          <span className="nav-link">Bransjer</span>
          <span className="nav-link">Om oss</span>
        </div>
        <button className="nav-cta" onClick={() => aapneBransje(bransjer[0])}>Kom i gang</button>
      </nav>

      <section className="hero">
        <div className="hero-bg">
          <div className="hero-circle hero-circle-1"></div>
          <div className="hero-circle hero-circle-2"></div>
        </div>
        <div className="hero-tag">Gratis beslutningsverktøy for gründere</div>
        <h1 className="hero-title">
          Finn ut om ideen din<br /><em>faktisk</em> er lønnsom
        </h1>
        <p className="hero-sub">
          StartupSmart hjelper deg å ta smarte beslutninger før du investerer tid og penger i din neste bedrift.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => aapneBransje(bransjer[0])}>
            Start beregning →
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('bransjer').scrollIntoView({ behavior: 'smooth' })}>
            Se alle bransjer
          </button>
        </div>
      </section>

      <div className="stats">
        {[
          { num: '3', lbl: 'Bransjer (snart flere)' },
          { num: '0 kr', lbl: 'Kostnad – helt gratis' },
          { num: '100%', lbl: 'Konfidensielt' }
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <section className="bransjer" id="bransjer">
        <div className="bransjer-header">
          <div className="bransjer-tag">Velg bransje</div>
          <h2 className="bransjer-title">Hva vil du starte?</h2>
        </div>
        <div className="bransjer-grid">
          {bransjer.map(b => (
            <div key={b.id} className={`bransje-kort ${b.coming ? 'coming' : ''}`} onClick={() => aapneBransje(b)}>
              {b.coming && <div className="coming-badge">Kommer snart</div>}
              <div className="bransje-ikon" style={{ background: b.ikonBg }}>{b.ikon}</div>
              <div className="bransje-navn">{b.navn}</div>
              <div className="bransje-desc">{b.desc}</div>
              <div className="bransje-tags">
                {b.tags.map(t => <span key={t} className="bransje-tag">{t}</span>)}
              </div>
              {!b.coming && <div className="bransje-arrow">↗</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="hvorfor">
        <div className="hvorfor-inner">
          <div>
            <h2 className="hvorfor-title">Hvorfor <em>StartupSmart?</em></h2>
            <p className="hvorfor-sub">
              De fleste starter bedrift uten å ha et realistisk bilde av hva det faktisk koster og krever. Vi gir deg tallene – ærlig og tydelig.
            </p>
          </div>
          <div className="hvorfor-punkter">
            {[
              { ikon: '🔒', tittel: 'Helt konfidensielt', desc: 'Tallene du legger inn forblir hos deg. Vi lagrer ingenting.' },
              { ikon: '⚡', tittel: 'Oppdatert informasjon', desc: 'Kalkulatorene tar hensyn til gjeldende skatteregler, renter og krav.' },
              { ikon: '🎯', tittel: 'Konkrete anbefalinger', desc: 'Du får ikke bare tall – du får en vurdering av hva som lønner seg for deg.' },
              { ikon: '📈', tittel: 'Langsiktig perspektiv', desc: 'Se ikke bare år 1 – se hvordan porteføljen vokser over 10 år.' }
            ].map((p, i) => (
              <div className="hvorfor-punkt" key={i}>
                <div className="hvorfor-ikon">{p.ikon}</div>
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
        <div className="footer-logo">Startup<span>Smart</span></div>
        <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører før du tar beslutninger.</div>
      </footer>
    </div>
  );
}