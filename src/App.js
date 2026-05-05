import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import EiendomKalkulator from './EiendomKalkulator';
import BilKalkulator from './BilKalkulator';
import SalongKalkulator from './SalongKalkulator';
import './App.css';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@200;300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --brg: #1f4e2e;
    --brg-light: #2a6640;
    --brg-pale: #e8f0ea;
    --cream: #f5f0e8;
    --cream-dark: #ede7d9;
    --gold: #c9a84c;
    --dark: #0f1a12;
    --dark2: #080e09;
    --text: #1a2e1e;
    --muted: #5a6e5e;
  }
  .app { font-family: 'Inter', sans-serif; background: var(--cream); min-height: 100vh; color: var(--text); }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: var(--dark); padding: 16px 48px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2e1e; }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); letter-spacing: 0.02em; cursor: pointer; }
  .nav-logo em { font-style: italic; color: var(--gold); }
  .nav-links { display: flex; gap: 28px; }
  .nav-link { font-size: 11px; color: #6a8a6e; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: color 0.2s; }
  .nav-link:hover { color: var(--cream); }
  .nav-cta { background: var(--brg); color: var(--cream); border: none; padding: 9px 20px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .nav-cta:hover { background: var(--brg-light); }

  .hero { position: relative; height: 100vh; min-height: 600px; overflow: hidden; display: flex; align-items: center; }
  .hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80') center/cover no-repeat; transition: transform 0.1s ease-out; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,26,18,0.95) 0%, rgba(15,26,18,0.75) 50%, rgba(15,26,18,0.45) 100%); }
  .hero-content { position: relative; z-index: 2; padding: 0 80px; max-width: 680px; }
  .hero-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(40px, 6vw, 68px); line-height: 1.05; color: var(--cream); margin-bottom: 20px; }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 16px; color: #9aaa9e; line-height: 1.7; max-width: 480px; margin-bottom: 44px; font-weight: 300; }
  .hero-btns { display: flex; gap: 12px; }
  .btn-primary { background: var(--brg); color: var(--cream); border: none; padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
  .btn-primary:hover { background: var(--brg-light); transform: translateY(-2px); }
  .btn-secondary { background: transparent; color: var(--cream); border: 1px solid rgba(255,255,255,0.2); padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
  .btn-secondary:hover { border-color: var(--brg); transform: translateY(-2px); }
  .hero-stats { position: absolute; bottom: 0; right: 0; display: flex; z-index: 2; }
  .hero-stat { background: rgba(15,26,18,0.88); backdrop-filter: blur(12px); padding: 24px 36px; border-left: 1px solid rgba(31,78,46,0.3); text-align: center; }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--cream); display: block; }
  .hero-stat-lbl { font-size: 9px; color: #3a5a3e; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; display: block; }
  .hero-scroll { position: absolute; bottom: 32px; left: 80px; z-index: 2; display: flex; align-items: center; gap: 10px; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #3a5a3e; animation: bounce 2s ease-in-out infinite; }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

  .bransjer-section { padding: 100px 80px; background: var(--cream); }
  .section-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--brg); margin-bottom: 12px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 38px; color: var(--dark); margin-bottom: 48px; }
  .bransje-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
  .bransje-card { background: white; overflow: hidden; cursor: pointer; transition: transform 0.4s, box-shadow 0.4s; }
  .bransje-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(15,26,18,0.15); }
  .bransje-card.coming { opacity: 0.6; cursor: default; }
  .bransje-card.coming:hover { transform: none; box-shadow: none; }
  .bransje-img-wrap { position: relative; height: 220px; overflow: hidden; }
  .bransje-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.82); transition: transform 0.6s, filter 0.4s; }
  .bransje-card:hover .bransje-img { transform: scale(1.05); filter: brightness(1); }
  .bransje-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,26,18,0.5) 0%, transparent 60%); }
  .coming-pill { position: absolute; top: 16px; right: 16px; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(15,26,18,0.8); color: var(--cream); padding: 4px 10px; }
  .bransje-body { padding: 28px; }
  .bransje-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 12px; }
  .bransje-name { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
  .bransje-arrow { color: var(--brg); transition: transform 0.3s; }
  .bransje-card:hover .bransje-arrow { transform: translate(3px,-3px); }
  .bransje-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .bransje-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .bransje-tag { font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; background: var(--brg-pale); color: var(--brg); }
  .bransje-more { background: white; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--cream-dark); }
  .bransje-more-text { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--muted); font-style: italic; }

  .hvorfor-section { background: var(--dark); padding: 100px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .hvorfor-img-wrap { position: relative; height: 480px; }
  .hvorfor-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); display: block; }
  .hvorfor-img-frame { position: absolute; inset: 0; border: 1.5px solid var(--brg); transform: translate(14px, 14px); pointer-events: none; }
  .hvorfor-content { }
  .hvorfor-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
  .hvorfor-title { font-family: 'Playfair Display', serif; font-size: 36px; color: var(--cream); margin-bottom: 32px; line-height: 1.2; }
  .hvorfor-title em { font-style: italic; color: var(--gold); }
  .hvorfor-items { display: flex; flex-direction: column; gap: 24px; }
  .hvorfor-item { display: flex; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .hvorfor-item:last-child { border-bottom: none; padding-bottom: 0; }
  .hvorfor-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
  .hvorfor-item-title { font-size: 14px; font-weight: 500; color: var(--cream); margin-bottom: 4px; }
  .hvorfor-item-desc { font-size: 13px; color: #4a6a4e; line-height: 1.6; }

  .om-oss-hero { background: var(--dark); padding: 120px 80px 80px; position: relative; }
  .om-oss-hero-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gold); }
  .om-oss-inner { max-width: 800px; }
  .om-oss-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .om-oss-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 56px); line-height: 1.1; color: var(--cream); }
  .om-oss-body { max-width: 800px; margin: 0 auto; padding: 64px 80px; }
  .om-oss-tekst { font-size: 16px; color: var(--muted); line-height: 1.9; margin-bottom: 24px; font-weight: 300; }
  .om-oss-sitat { font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; color: var(--text); border-left: 3px solid var(--gold); padding: 16px 24px; margin: 40px 0; line-height: 1.6; }
  .om-oss-verdier { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--cream-dark); margin: 48px 0; }
  .om-oss-verdi { background: white; padding: 28px; }
  .om-oss-verdi-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 12px; }
  .om-oss-verdi-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--dark); margin-bottom: 8px; }
  .om-oss-verdi-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .om-oss-kontakt { background: var(--brg); padding: 48px 80px; }
  .om-oss-kontakt-inner { max-width: 800px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
  .om-oss-kontakt-title { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--cream); margin-bottom: 8px; }
  .om-oss-kontakt-desc { font-size: 14px; color: #9fc9a8; line-height: 1.6; }
  .om-oss-kontakt-epost { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--gold); text-decoration: none; display: block; margin-top: 8px; }

  .kalkulator-view { padding: 100px 80px 80px; max-width: 980px; margin: 0 auto; }
  .kalkulator-back { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); cursor: pointer; margin-bottom: 32px; background: none; border: none; font-family: 'Inter', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s; }
  .kalkulator-back:hover { color: var(--text); }
  .kalkulator-hero { position: relative; height: 240px; overflow: hidden; margin-bottom: 40px; }
  .kalkulator-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.5); }
  .kalkulator-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(15,26,18,0.9) 0%, rgba(15,26,18,0.4) 100%); }
  .kalkulator-hero-content { position: relative; z-index: 2; padding: 0 48px; height: 100%; display: flex; flex-direction: column; justify-content: center; }
  .kalkulator-hero-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--gold); margin-bottom: 10px; }
  .kalkulator-hero-title { font-family: 'Playfair Display', serif; font-size: 44px; color: var(--cream); }

  footer { border-top: 1px solid #1a2e1e; padding: 28px 80px; display: flex; justify-content: space-between; align-items: center; background: var(--dark2); }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 15px; color: var(--cream); }
  .footer-logo em { color: var(--gold); font-style: italic; }
  .footer-disclaimer { font-size: 11px; color: #2a3a2e; max-width: 400px; text-align: right; }
`;

const bransjer = [
  {
    id: 'eiendom', num: '01', navn: 'Eiendomsutleie',
    desc: 'Sammenlign privat kjøp vs AS, BRRR-strategi og porteføljevekst over tid.',
    tags: ['Utleie', 'BRRR', 'AS vs privat'],
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    coming: false
  },
  {
    id: 'bil', num: '02', navn: 'Bilutleie',
    desc: 'Fra enkeltbil til flåte, finn break-even og avkastning på kapitalen.',
    tags: ['Flåte', 'ROI', 'Break-even'],
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    coming: false
  },
  {
    id: 'salong', num: '03', navn: 'Salong',
    desc: 'Frisør, negler, hudpleie, finn lønnsomheten før du signerer leiekontrakten.',
    tags: ['Frisør', 'Negler', 'Break-even'],
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
    coming: false
  },
  {
    id: 'korttid', num: '04', navn: 'Korttidsutleie',
    desc: 'Airbnb og korttidsutleie, sammenlign mot langtidsleie og finn beste strategi.',
    tags: ['Airbnb', 'Sesong'],
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
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

  const gaaHjem = () => {
    setSide('hjem');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (side === 'om-oss') {
    return (
      <div className="app">
        <style>{styles}</style>
        <nav className="nav">
          <div className="nav-logo" onClick={gaaHjem}>Startup<em>Smart</em></div>
          <div className="nav-links">
            <span className="nav-link" onClick={gaaHjem}>Hjem</span>
            <span className="nav-link" onClick={() => { gaaHjem(); setTimeout(() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' }), 300); }}>Bransjer</span>
            <span className="nav-link" style={{ color: 'var(--cream)' }}>Om oss</span>
          </div>
          <button className="nav-cta" onClick={() => aapneBransje(bransjer[0])}>Kom i gang</button>
        </nav>
        <div className="om-oss-hero">
          <div className="om-oss-hero-accent"></div>
          <div className="om-oss-inner">
            <div className="om-oss-tag">Om oss</div>
            <h1 className="om-oss-title">Bygget av en gründer<br />for gründere</h1>
          </div>
        </div>
        <div className="om-oss-body">
          <p className="om-oss-tekst">StartupSmart ble til fordi vi selv opplevde hvor vanskelig det er å finne ærlige, konkrete tall når man vurderer en ny bedriftsidé. Informasjonen finnes, men den er spredt, utdatert og sjelden tilpasset din situasjon.</p>
          <p className="om-oss-tekst">Vi tror at alle som vurderer å starte noe nytt fortjener de samme kvalitetstallene som profesjonelle investorer og revisorer bruker, uten å måtte betale for en konsultasjon først.</p>
          <p className="om-oss-tekst">StartupSmart er gratis, konfidensielt og alltid oppdatert med gjeldende norske regler og satser.</p>
          <div className="om-oss-sitat">Dette er ikke finansiell rådgivning, men det er et godt sted å starte.</div>
          <div className="om-oss-verdier">
            {[
              { num: '01', tittel: 'Ærlig', desc: 'Vi viser deg de reelle tallene, ikke de optimistiske.' },
              { num: '02', tittel: 'Konfidensielt', desc: 'Tallene du legger inn forblir hos deg. Vi lagrer ingenting.' },
              { num: '03', tittel: 'Oppdatert', desc: 'Vi holder kalkulatorene oppdaterte med gjeldende regler.' }
            ].map((v, i) => (
              <div className="om-oss-verdi" key={i}>
                <div className="om-oss-verdi-num">{v.num}</div>
                <div className="om-oss-verdi-title">{v.tittel}</div>
                <div className="om-oss-verdi-desc">{v.desc}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => aapneBransje(bransjer[0])}>Start beregning</button>
        </div>
        <div className="om-oss-kontakt">
          <div className="om-oss-kontakt-inner">
            <div>
              <div className="om-oss-kontakt-title">Mangler din bransje?</div>
              <div className="om-oss-kontakt-desc">Ta kontakt hvis du ønsker en kalkulator for en bransje som ikke er her ennå.</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9fc9a8', marginBottom: '8px' }}>Send oss en e-post</div>
              <a href="mailto:kontakt@startupsmart.no" className="om-oss-kontakt-epost">kontakt@startupsmart.no</a>
            </div>
          </div>
        </div>
        <footer>
          <div className="footer-logo">Startup<em>Smart</em></div>
          <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning.</div>
        </footer>
      </div>
    );
  }

  if (side === 'kalkulator' && aktivBransje) {
    return (
      <div className="app">
        <style>{styles}</style>
        <nav className="nav">
          <div className="nav-logo" onClick={gaaHjem}>Startup<em>Smart</em></div>
          <div className="nav-links">
            <span className="nav-link" onClick={gaaHjem}>Hjem</span>
            <span className="nav-link" onClick={() => setSide('om-oss')}>Om oss</span>
          </div>
          <button className="nav-cta" onClick={gaaHjem}>Alle bransjer</button>
        </nav>
        <div className="kalkulator-view">
          <button className="kalkulator-back" onClick={gaaHjem}>← Tilbake</button>
          <div className="kalkulator-hero">
            <div className="kalkulator-hero-bg" style={{ backgroundImage: `url('${aktivBransje.kalkulatorImg}')` }}></div>
            <div className="kalkulator-hero-overlay"></div>
            <div className="kalkulator-hero-content">
              <div className="kalkulator-hero-tag">Kalkulator</div>
              <div className="kalkulator-hero-title">{aktivBransje.navn}</div>
            </div>
          </div>
          {aktivBransje.id === 'eiendom' && <EiendomKalkulator />}
          {aktivBransje.id === 'bil' && <BilKalkulator />}
          {aktivBransje.id === 'salong' && <SalongKalkulator />}
        </div>
        <footer>
          <div className="footer-logo">Startup<em>Smart</em></div>
          <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning.</div>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={gaaHjem}>Startup<em>Smart</em></div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Bransjer</span>
          <span className="nav-link" onClick={() => setSide('om-oss')}>Om oss</span>
        </div>
        <button className="nav-cta" onClick={() => aapneBransje(bransjer[0])}>Kom i gang</button>
      </nav>

      <section className="hero">
        <div className="hero-bg" id="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-tag">Gratis beslutningsverktøy</div>
          <h1 className="hero-title">Finn ut om ideen din<br /><em>faktisk</em> er lønnsom</h1>
          <p className="hero-sub">StartupSmart gir deg tallene du trenger før du investerer tid og penger i din neste bedrift.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => aapneBransje(bransjer[0])}>Start beregning</button>
            <button className="btn-secondary" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Se alle bransjer</button>
          </div>
        </div>
        <div className="hero-scroll">↓ Scroll</div>
        <div className="hero-stats">
          {[{ num: '3', lbl: 'Bransjer' }, { num: '0 kr', lbl: 'Kostnad' }, { num: '100%', lbl: 'Konfidensielt' }].map((s, i) => (
            <div className="hero-stat" key={i}>
              <span className="hero-stat-num">{s.num}</span>
              <span className="hero-stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bransjer-section" id="bransjer">
        <div className="section-tag">Velg bransje</div>
        <div className="section-title">Hva vil du starte?</div>
        <div className="bransje-grid">
          {bransjer.slice(0, 3).map(b => (
            <div key={b.id} className={`bransje-card ${b.coming ? 'coming' : ''}`} onClick={() => aapneBransje(b)}>
              <div className="bransje-img-wrap">
                <img className="bransje-img" src={b.img} alt={b.navn} />
                <div className="bransje-img-overlay"></div>
                {b.coming && <div className="coming-pill">Kommer snart</div>}
              </div>
              <div className="bransje-body">
                <div className="bransje-num">{b.num}</div>
                <div className="bransje-name">{b.navn}{!b.coming && <span className="bransje-arrow">↗</span>}</div>
                <div className="bransje-desc">{b.desc}</div>
                <div className="bransje-tags">{b.tags.map(t => <span key={t} className="bransje-tag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bransje-more">
          <div className="bransje-more-text">Korttidsutleie, franchise, konsulent og mer kommer snart</div>
          <span style={{ color: 'var(--cream-dark)', fontSize: '20px' }}>→</span>
        </div>
      </section>

      <section className="hvorfor-section">
        <div className="hvorfor-img-wrap">
          <img className="hvorfor-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Gründer" />
          <div className="hvorfor-img-frame"></div>
        </div>
        <div className="hvorfor-content">
          <div className="hvorfor-tag">Hvorfor StartupSmart</div>
          <h2 className="hvorfor-title">Bygget av en gründer,<br />for <em>gründere</em></h2>
          <div className="hvorfor-items">
            {[
              { tittel: 'Helt konfidensielt', desc: 'Tallene du legger inn forblir hos deg. Vi lagrer ingenting.' },
              { tittel: 'Oppdatert informasjon', desc: 'Gjeldende skatteregler, renter og lovkrav.' },
              { tittel: 'Konkrete anbefalinger', desc: 'Ikke bare tall, men hva som lønner seg for deg.' },
              { tittel: 'Langsiktig perspektiv', desc: 'Se porteføljen vokse over 10 år.' },
              { tittel: 'Ta kontakt', desc: 'Mangler din bransje? Send oss en e-post på kontakt@startupsmart.no' }
            ].map((p, i) => (
              <div className="hvorfor-item" key={i}>
                <div className="hvorfor-dot"></div>
                <div>
                  <div className="hvorfor-item-title">{p.tittel}</div>
                  <div className="hvorfor-item-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">Startup<em>Smart</em></div>
        <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører.</div>
      </footer>
      <Analytics />
    </div>
  );
}