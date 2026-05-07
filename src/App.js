import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import EiendomPrivat from './EiendomPrivat';
import EiendomAS from './EiendomAS';
import EiendomSammenlign from './EiendomSammenlign';
import BilKalkulator from './BilKalkulator';
import SalongKalkulator from './SalongKalkulator';
import './App.css';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@200;300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --brg: #1f4e2e; --brg-light: #2a6640; --brg-pale: #e8f0ea;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --dark2: #080e09;
    --text: #1a2e1e; --muted: #5a6e5e;
  }
  .app { font-family: 'Inter', sans-serif; background: var(--cream); min-height: 100vh; color: var(--text); }

  .side-innhold { animation: slideOpp 0.4s cubic-bezier(0.4,0,0.2,1); }
  @keyframes slideOpp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

  /* Scroll animasjoner */
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
  .reveal.synlig { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
  .reveal-left.synlig { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
  .reveal-right.synlig { opacity: 1; transform: translateX(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }

  /* Navbar */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(15,26,18,0.92); backdrop-filter: blur(16px); padding: 16px 48px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(31,78,46,0.3); transition: all 0.3s; }
  .nav.scrolled { padding: 12px 48px; background: rgba(8,14,9,0.97); border-bottom-color: rgba(201,168,76,0.2); }
  .nav-logo { display: flex; align-items: center; gap: 14px; cursor: pointer; }
  .nav-logo-icon { position: relative; width: 36px; height: 36px; }
  .nav-logo-d { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); opacity: 0.12; position: absolute; top: -4px; left: 2px; line-height: 1; pointer-events: none; transition: opacity 0.3s; }
  .nav-logo:hover .nav-logo-d { opacity: 0.25; }
  .nav-logo-a { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); position: absolute; top: -4px; left: 0; line-height: 1; }
  .nav-logo-text { display: flex; flex-direction: column; gap: 2px; }
  .nav-logo-name { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: var(--cream); letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; }
  .nav-logo-sub { font-family: 'Inter', sans-serif; font-size: 7px; color: #3a6a46; letter-spacing: 0.16em; text-transform: uppercase; line-height: 1; }
  .nav-logo-by { font-family: 'Inter', sans-serif; font-size: 6px; color: #2a3a2e; letter-spacing: 0.12em; text-transform: uppercase; line-height: 1; margin-top: 1px; }
  .nav-links { display: flex; gap: 28px; }
  .nav-link { font-size: 11px; color: #6a8a6e; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: color 0.2s; position: relative; padding-bottom: 4px; }
  .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-link:hover { color: var(--cream); }
  .nav-link:hover::after { width: 100%; }
  .nav-cta { background: var(--brg); color: var(--cream); border: none; padding: 9px 20px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
  .nav-cta::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.3s; z-index: 0; }
  .nav-cta:hover::before { transform: translateX(0); }
  .nav-cta:hover { color: var(--dark); }
  .nav-cta span { position: relative; z-index: 1; }

  /* Hero */
  .hero { position: relative; height: 100vh; min-height: 600px; overflow: hidden; display: flex; align-items: center; }
  .hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80') center/cover no-repeat; will-change: transform; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,26,18,0.97) 0%, rgba(15,26,18,0.78) 50%, rgba(15,26,18,0.5) 100%); }
  .hero-content { position: relative; z-index: 2; padding: 0 80px; max-width: 680px; }
  .hero-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; opacity: 0; animation: fadeUp 0.8s 0.2s forwards; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(40px, 6vw, 68px); line-height: 1.05; color: var(--cream); margin-bottom: 20px; opacity: 0; animation: fadeUp 0.8s 0.4s forwards; }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 16px; color: #9aaa9e; line-height: 1.7; max-width: 480px; margin-bottom: 44px; font-weight: 300; opacity: 0; animation: fadeUp 0.8s 0.6s forwards; }
  .hero-btns { display: flex; gap: 12px; opacity: 0; animation: fadeUp 0.8s 0.8s forwards; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .btn-primary { background: var(--brg); color: var(--cream); border: none; padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
  .btn-primary::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); z-index: 0; }
  .btn-primary:hover::before { transform: translateX(0); }
  .btn-primary:hover { color: var(--dark); transform: translateY(-2px); }
  .btn-primary span { position: relative; z-index: 1; }
  .btn-secondary { background: transparent; color: var(--cream); border: 1px solid rgba(255,255,255,0.25); padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
  .hero-stats { position: absolute; bottom: 0; right: 0; display: flex; z-index: 2; opacity: 0; animation: fadeUp 0.8s 1s forwards; }
  .hero-stat { background: rgba(15,26,18,0.88); backdrop-filter: blur(12px); padding: 24px 36px; border-left: 1px solid rgba(31,78,46,0.3); text-align: center; transition: background 0.3s; }
  .hero-stat:hover { background: rgba(31,78,46,0.6); }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--cream); display: block; }
  .hero-stat-lbl { font-size: 9px; color: #3a5a3e; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; display: block; }
  .hero-scroll { position: absolute; bottom: 32px; left: 80px; z-index: 2; display: flex; align-items: center; gap: 10px; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #3a5a3e; animation: bounce 2s ease-in-out infinite; opacity: 0; animation: bounce 2s 1.2s ease-in-out infinite, fadeUp 0.8s 1.2s forwards; }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

  /* Bransjer */
  .bransjer-section { padding: 120px 80px; background: var(--cream); }
  .section-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--brg); margin-bottom: 12px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 38px; color: var(--dark); margin-bottom: 48px; }
  .bransje-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
  .bransje-card { background: white; overflow: hidden; cursor: pointer; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1); }
  .bransje-card:hover { transform: translateY(-10px); box-shadow: 0 32px 64px rgba(15,26,18,0.18); }
  .bransje-card:active { transform: translateY(-5px) scale(0.99); }
  .bransje-card.coming { opacity: 0.5; cursor: default; }
  .bransje-card.coming:hover { transform: none; box-shadow: none; }
  .bransje-img-wrap { position: relative; height: 220px; overflow: hidden; }
  .bransje-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.75) saturate(0.9); transition: transform 0.8s cubic-bezier(0.4,0,0.2,1), filter 0.5s; }
  .bransje-card:hover .bransje-img { transform: scale(1.08); filter: brightness(1) saturate(1.1); }
  .bransje-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,26,18,0.6) 0%, transparent 60%); transition: opacity 0.4s; }
  .bransje-card:hover .bransje-img-overlay { opacity: 0.4; }
  .coming-pill { position: absolute; top: 16px; right: 16px; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(15,26,18,0.8); color: var(--cream); padding: 4px 10px; }
  .bransje-body { padding: 28px; border-top: 2px solid transparent; transition: border-color 0.3s; }
  .bransje-card:hover .bransje-body { border-top-color: var(--gold); }
  .bransje-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 12px; }
  .bransje-name { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--dark); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
  .bransje-arrow { color: var(--brg); transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
  .bransje-card:hover .bransje-arrow { transform: translate(5px,-5px) scale(1.2); }
  .bransje-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .bransje-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .bransje-tag { font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; background: var(--brg-pale); color: var(--brg); transition: background 0.2s; }
  .bransje-card:hover .bransje-tag { background: #d4e8d8; }
  .bransje-more { background: white; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--cream-dark); }
  .bransje-more-text { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--muted); font-style: italic; }

  /* Hvorfor */
  .hvorfor-section { background: var(--dark); padding: 120px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .hvorfor-img-wrap { position: relative; height: 480px; }
  .hvorfor-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65); display: block; transition: filter 0.5s; }
  .hvorfor-img-wrap:hover .hvorfor-img { filter: brightness(0.8); }
  .hvorfor-img-frame { position: absolute; inset: 0; border: 1.5px solid var(--brg); transform: translate(14px, 14px); pointer-events: none; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
  .hvorfor-img-wrap:hover .hvorfor-img-frame { transform: translate(20px, 20px); }
  .hvorfor-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
  .hvorfor-title { font-family: 'Playfair Display', serif; font-size: 36px; color: var(--cream); margin-bottom: 32px; line-height: 1.2; }
  .hvorfor-title em { font-style: italic; color: var(--gold); }
  .hvorfor-items { display: flex; flex-direction: column; gap: 0; }
  .hvorfor-item { display: flex; gap: 16px; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06); transition: all 0.3s; cursor: default; }
  .hvorfor-item:last-child { border-bottom: none; }
  .hvorfor-item:hover { padding-left: 8px; border-bottom-color: rgba(201,168,76,0.2); }
  .hvorfor-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; margin-top: 7px; flex-shrink: 0; transition: transform 0.3s; }
  .hvorfor-item:hover .hvorfor-dot { transform: scale(1.5); }
  .hvorfor-item-title { font-size: 14px; font-weight: 500; color: var(--cream); margin-bottom: 4px; }
  .hvorfor-item-desc { font-size: 13px; color: #4a6a4e; line-height: 1.6; }

  /* Om oss */
  .om-oss-hero { background: var(--dark); padding: 120px 80px 80px; position: relative; overflow: hidden; }
  .om-oss-hero::before { content: ''; position: absolute; top: -50%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(31,78,46,0.15) 0%, transparent 70%); pointer-events: none; }
  .om-oss-hero-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right, var(--gold), var(--brg), var(--gold)); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .om-oss-inner { max-width: 800px; }
  .om-oss-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .om-oss-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 56px); line-height: 1.1; color: var(--cream); }
  .om-oss-body { max-width: 800px; margin: 0 auto; padding: 64px 80px; }
  .om-oss-tekst { font-size: 16px; color: var(--muted); line-height: 1.9; margin-bottom: 24px; font-weight: 300; }
  .om-oss-sitat { font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; color: var(--text); border-left: 3px solid var(--gold); padding: 16px 24px; margin: 40px 0; line-height: 1.6; }
  .om-oss-verdier { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--cream-dark); margin: 48px 0; }
  .om-oss-verdi { background: white; padding: 28px; transition: background 0.3s; }
  .om-oss-verdi:hover { background: var(--brg-pale); }
  .om-oss-verdi-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 12px; }
  .om-oss-verdi-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--dark); margin-bottom: 8px; }
  .om-oss-verdi-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .om-oss-kontakt { background: var(--brg); padding: 48px 80px; }
  .om-oss-kontakt-inner { max-width: 800px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
  .om-oss-kontakt-title { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--cream); margin-bottom: 8px; }
  .om-oss-kontakt-desc { font-size: 14px; color: #9fc9a8; line-height: 1.6; }
  .om-oss-kontakt-epost { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--gold); text-decoration: none; display: block; margin-top: 8px; transition: letter-spacing 0.3s; }
  .om-oss-kontakt-epost:hover { letter-spacing: 0.04em; }

  /* Kalkulator */
  .kalkulator-view { padding: 100px 80px 80px; max-width: 980px; margin: 0 auto; }
  .kalkulator-back { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); cursor: pointer; margin-bottom: 32px; background: none; border: none; font-family: 'Inter', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; transition: all 0.2s; }
  .kalkulator-back:hover { color: var(--text); gap: 12px; }
  .kalkulator-hero { position: relative; height: 240px; overflow: hidden; margin-bottom: 40px; }
  .kalkulator-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.5); transition: filter 0.5s; }
  .kalkulator-hero:hover .kalkulator-hero-bg { filter: brightness(0.6); }
  .kalkulator-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(15,26,18,0.92) 0%, rgba(15,26,18,0.4) 100%); }
  .kalkulator-hero-content { position: relative; z-index: 2; padding: 0 48px; height: 100%; display: flex; flex-direction: column; justify-content: center; }
  .kalkulator-hero-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--gold); margin-bottom: 10px; }
  .kalkulator-hero-title { font-family: 'Playfair Display', serif; font-size: 44px; color: var(--cream); }

  /* Footer */
  footer { border-top: 1px solid #1a2e1e; padding: 28px 80px; display: flex; justify-content: space-between; align-items: center; background: var(--dark2); }
  .footer-logo { display: flex; align-items: center; gap: 12px; }
  .footer-logo-icon { position: relative; width: 28px; height: 28px; }
  .footer-logo-d { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: var(--gold); opacity: 0.1; position: absolute; top: -3px; left: 2px; line-height: 1; }
  .footer-logo-a { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: var(--gold); position: absolute; top: -3px; left: 0; line-height: 1; }
  .footer-logo-text { display: flex; flex-direction: column; gap: 2px; }
  .footer-logo-name { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500; color: var(--cream); letter-spacing: 0.18em; text-transform: uppercase; }
  .footer-logo-by { font-family: 'Inter', sans-serif; font-size: 6px; color: #2a3a2e; letter-spacing: 0.12em; text-transform: uppercase; }
  .footer-disclaimer { font-size: 11px; color: #2a3a2e; max-width: 400px; text-align: right; }

  /* Teller animasjon */
  .teller { display: inline-block; }
`;

const NavLogo = ({ onClick }) => (
  <div className="nav-logo" onClick={onClick}>
    <div className="nav-logo-icon">
      <span className="nav-logo-d">D</span>
      <span className="nav-logo-a">A</span>
    </div>
    <div className="nav-logo-text">
      <span className="nav-logo-name">Invest Tools</span>
      <span className="nav-logo-sub">Professional Investment Analysis</span>
      <span className="nav-logo-by">by ADDON</span>
    </div>
  </div>
);

const FooterLogo = () => (
  <div className="footer-logo">
    <div className="footer-logo-icon">
      <span className="footer-logo-d">D</span>
      <span className="footer-logo-a">A</span>
    </div>
    <div className="footer-logo-text">
      <span className="footer-logo-name">Invest Tools</span>
      <span className="footer-logo-by">by ADDON</span>
    </div>
  </div>
);

function Teller({ slutt, suffix = '', prefix = '' }) {
  const [verdi, setVerdi] = useState(0);
  const ref = useRef(null);
  const startet = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startet.current) {
        startet.current = true;
        const varighet = 1800;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / varighet, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVerdi(Math.round(eased * slutt));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [slutt]);

  return <span ref={ref} className="teller">{prefix}{verdi}{suffix}</span>;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('synlig');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
}

function useParallax() {
  useEffect(() => {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
}

function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const handleScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
}

const bransjer = [
  {
    id: 'eiendom-privat', num: '01', navn: 'Eiendom privat',
    desc: 'Kjøp utleiebolig i eget navn. Lavere terskel, enklere oppstart.',
    tags: ['Utleie', 'Boliglån', 'Kontantstrøm'],
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    coming: false
  },
  {
    id: 'eiendom-as', num: '02', navn: 'Eiendom via AS',
    desc: 'Kjøp via aksjeselskap. Bedre for portefølje og reinvestering av overskudd.',
    tags: ['AS', 'Næringslån', 'Portefølje'],
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    coming: false
  },
  {
    id: 'eiendom-sammenlign', num: '03', navn: 'Privat vs AS',
    desc: 'Sammenlign begge alternativene side om side med dine egne tall.',
    tags: ['Sammenligning', 'AS vs privat', 'Analyse'],
    img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80',
    coming: false
  },
  {
    id: 'bil', num: '04', navn: 'Bilutleie',
    desc: 'Fra enkeltbil til flåte, finn break-even og avkastning på kapitalen.',
    tags: ['Flåte', 'ROI', 'Break-even'],
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80',
    coming: false
  },
  {
    id: 'salong', num: '05', navn: 'Salong',
    desc: 'Frisør, negler, hudpleie, finn lønnsomheten før du signerer leiekontrakten.',
    tags: ['Frisør', 'Negler', 'Break-even'],
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    kalkulatorImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
    coming: false
  },
  {
    id: 'korttid', num: '06', navn: 'Korttidsutleie',
    desc: 'Airbnb og korttidsutleie, sammenlign mot langtidsleie og finn beste strategi.',
    tags: ['Airbnb', 'Sesong'],
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    coming: true
  }
];

function getSideFromUrl() {
  const path = window.location.pathname;
  if (path === '/om-oss') return 'om-oss';
  if (path.startsWith('/kalkulator/')) return 'kalkulator';
  return 'hjem';
}

function getBransjeFromUrl() {
  const path = window.location.pathname;
  if (path.startsWith('/kalkulator/')) {
    const id = path.replace('/kalkulator/', '');
    return bransjer.find(b => b.id === id) || null;
  }
  return null;
}

export default function App() {
  const [side, setSide] = useState(getSideFromUrl);
  const [aktivBransje, setAktivBransje] = useState(getBransjeFromUrl);
  const [animKey, setAnimKey] = useState(0);

  useScrollReveal();
  useParallax();
  useNavScroll();

  useEffect(() => {
    const handlePop = () => {
      setSide(getSideFromUrl());
      setAktivBransje(getBransjeFromUrl());
      setAnimKey(k => k + 1);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const aapneBransje = (bransje) => {
    if (bransje.coming) return;
    setAktivBransje(bransje);
    setSide('kalkulator');
    setAnimKey(k => k + 1);
    window.history.pushState({}, '', `/kalkulator/${bransje.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gaaHjem = () => {
    setSide('hjem');
    setAktivBransje(null);
    setAnimKey(k => k + 1);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gaaOmOss = () => {
    setSide('om-oss');
    setAnimKey(k => k + 1);
    window.history.pushState({}, '', '/om-oss');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (side === 'om-oss') {
    return (
      <div className="app">
        <style>{styles}</style>
        <nav className="nav">
          <NavLogo onClick={gaaHjem} />
          <div className="nav-links">
            <span className="nav-link" onClick={gaaHjem}>Hjem</span>
            <span className="nav-link" onClick={() => { gaaHjem(); setTimeout(() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' }), 300); }}>Bransjer</span>
            <span className="nav-link" style={{ color: 'var(--cream)' }}>Om oss</span>
          </div>
          <button className="nav-cta" onClick={() => aapneBransje(bransjer[0])}><span>Kom i gang</span></button>
        </nav>
        <div className="side-innhold" key={animKey}>
          <div className="om-oss-hero">
            <div className="om-oss-hero-accent"></div>
            <div className="om-oss-inner">
              <div className="om-oss-tag reveal">Om oss</div>
              <h1 className="om-oss-title reveal reveal-delay-1">Bygget av en gründer<br />for gründere</h1>
            </div>
          </div>
          <div className="om-oss-body">
            <p className="om-oss-tekst reveal">Invest Tools ble til fordi vi selv opplevde hvor vanskelig det er å finne ærlige, konkrete tall når man vurderer en ny bedriftsidé. Informasjonen finnes, men den er spredt, utdatert og sjelden tilpasset din situasjon.</p>
            <p className="om-oss-tekst reveal">Vi tror at alle som vurderer å starte noe nytt fortjener de samme kvalitetstallene som profesjonelle investorer og revisorer bruker, uten å måtte betale for en konsultasjon først.</p>
            <p className="om-oss-tekst reveal">Invest Tools er gratis, konfidensielt og alltid oppdatert med gjeldende norske regler og satser.</p>
            <div className="om-oss-sitat reveal">Dette er ikke finansiell rådgivning, men det er et godt sted å starte.</div>
            <div className="om-oss-verdier">
              {[
                { num: '01', tittel: 'Ærlig', desc: 'Vi viser deg de reelle tallene, ikke de optimistiske.' },
                { num: '02', tittel: 'Konfidensielt', desc: 'Tallene du legger inn forblir hos deg. Vi lagrer ingenting.' },
                { num: '03', tittel: 'Oppdatert', desc: 'Vi holder kalkulatorene oppdaterte med gjeldende regler.' }
              ].map((v, i) => (
                <div className={`om-oss-verdi reveal reveal-delay-${i + 1}`} key={i}>
                  <div className="om-oss-verdi-num">{v.num}</div>
                  <div className="om-oss-verdi-title">{v.tittel}</div>
                  <div className="om-oss-verdi-desc">{v.desc}</div>
                </div>
              ))}
            </div>
            <button className="btn-primary reveal" onClick={() => aapneBransje(bransjer[0])}><span>Start beregning</span></button>
          </div>
          <div className="om-oss-kontakt">
            <div className="om-oss-kontakt-inner">
              <div>
                <div className="om-oss-kontakt-title">Mangler din bransje?</div>
                <div className="om-oss-kontakt-desc">Ta kontakt hvis du ønsker en kalkulator for en bransje som ikke er her ennå.</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9fc9a8', marginBottom: '8px' }}>Send oss en e-post</div>
                <a href="mailto:kontakt@addoninvest.no" className="om-oss-kontakt-epost">kontakt@addoninvest.no</a>
              </div>
            </div>
          </div>
          <footer>
            <FooterLogo />
            <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning.</div>
          </footer>
        </div>
      </div>
    );
  }

  if (side === 'kalkulator' && aktivBransje) {
    return (
      <div className="app">
        <style>{styles}</style>
        <nav className="nav">
          <NavLogo onClick={gaaHjem} />
          <div className="nav-links">
            <span className="nav-link" onClick={gaaHjem}>Hjem</span>
            <span className="nav-link" onClick={gaaOmOss}>Om oss</span>
          </div>
          <button className="nav-cta" onClick={gaaHjem}><span>Alle bransjer</span></button>
        </nav>
        <div className="side-innhold" key={animKey}>
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
            {aktivBransje.id === 'eiendom-privat' && <EiendomPrivat />}
            {aktivBransje.id === 'eiendom-as' && <EiendomAS />}
            {aktivBransje.id === 'eiendom-sammenlign' && <EiendomSammenlign />}
            {aktivBransje.id === 'bil' && <BilKalkulator />}
            {aktivBransje.id === 'salong' && <SalongKalkulator />}
          </div>
          <footer>
            <FooterLogo />
            <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning.</div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{styles}</style>
      <nav className="nav">
        <NavLogo onClick={gaaHjem} />
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Bransjer</span>
          <span className="nav-link" onClick={gaaOmOss}>Om oss</span>
        </div>
        <button className="nav-cta" onClick={() => aapneBransje(bransjer[0])}><span>Kom i gang</span></button>
      </nav>

      <div className="side-innhold" key={animKey}>
        <section className="hero">
          <div className="hero-bg" id="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-tag">Gratis beslutningsverktøy</div>
            <h1 className="hero-title">Finn ut om ideen din<br /><em>faktisk</em> er lønnsom</h1>
            <p className="hero-sub">Invest Tools gir deg tallene du trenger før du investerer tid og penger i din neste bedrift.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => aapneBransje(bransjer[0])}><span>Start beregning</span></button>
              <button className="btn-secondary" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Se alle bransjer</button>
            </div>
          </div>
          <div className="hero-scroll">↓ Scroll</div>
          <div className="hero-stats">
            {[
              { slutt: 5, suffix: '', lbl: 'Bransjer' },
              { slutt: 0, suffix: ' kr', lbl: 'Kostnad' },
              { slutt: 100, suffix: '%', lbl: 'Konfidensielt' }
            ].map((s, i) => (
              <div className="hero-stat" key={i}>
                <span className="hero-stat-num"><Teller slutt={s.slutt} suffix={s.suffix} /></span>
                <span className="hero-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bransjer-section" id="bransjer">
          <div className="section-tag reveal">Velg bransje</div>
          <div className="section-title reveal">Hva vil du starte?</div>
          <div className="bransje-grid">
            {bransjer.map((b, i) => (
              <div key={b.id} className={`bransje-card ${b.coming ? 'coming' : ''} reveal reveal-delay-${(i % 3) + 1}`} onClick={() => aapneBransje(b)}>
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
          <div className="bransje-more reveal">
            <div className="bransje-more-text">Korttidsutleie, franchise, konsulent og mer kommer snart</div>
            <span style={{ color: 'var(--cream-dark)', fontSize: '20px' }}>→</span>
          </div>
        </section>

        <section className="hvorfor-section">
          <div className="hvorfor-img-wrap reveal-left">
            <img className="hvorfor-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Investor med finansdata" />
            <div className="hvorfor-img-frame"></div>
          </div>
          <div className="hvorfor-content reveal-right">
            <div className="hvorfor-tag">Hvorfor Invest Tools</div>
            <h2 className="hvorfor-title">Bygget av en gründer,<br />for <em>gründere</em></h2>
            <div className="hvorfor-items">
              {[
                { tittel: 'Helt konfidensielt', desc: 'Tallene du legger inn forblir hos deg. Vi lagrer ingenting.' },
                { tittel: 'Oppdatert informasjon', desc: 'Gjeldende skatteregler, renter og lovkrav.' },
                { tittel: 'Konkrete anbefalinger', desc: 'Ikke bare tall, men hva som lønner seg for deg.' },
                { tittel: 'Langsiktig perspektiv', desc: 'Se porteføljen vokse over 10 år.' },
                { tittel: 'Ta kontakt', desc: 'Mangler din bransje? Send oss en e-post på kontakt@addoninvest.no' }
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
          <FooterLogo />
          <div className="footer-disclaimer">Alle beregninger er estimater og ikke finansiell rådgivning. Konsulter en regnskapsfører.</div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}