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
  html { scroll-behavior: smooth; }
  :root {
    --brg: #1f4e2e; --brg-light: #2a6640; --brg-pale: #e8f0ea;
    --cream: #f5f0e8; --cream-dark: #ede7d9;
    --gold: #c9a84c; --dark: #0f1a12; --dark2: #080e09;
    --text: #1a2e1e; --muted: #5a6e5e;
  }
  body { cursor: none; }
  .app { font-family: 'Inter', sans-serif; background: var(--cream); min-height: 100vh; color: var(--text); }

  /* Custom cursor */
  .cursor { position: fixed; pointer-events: none; z-index: 9999; mix-blend-mode: difference; }
  .cursor-dot { width: 8px; height: 8px; background: var(--gold); border-radius: 50%; position: fixed; transform: translate(-50%, -50%); transition: transform 0.1s, width 0.3s, height 0.3s, opacity 0.3s; }
  .cursor-ring { width: 40px; height: 40px; border: 1px solid rgba(201,168,76,0.6); border-radius: 50%; position: fixed; transform: translate(-50%, -50%); transition: width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.3s; pointer-events: none; }
  .cursor-glow { width: 200px; height: 200px; background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%); border-radius: 50%; position: fixed; transform: translate(-50%, -50%); pointer-events: none; transition: opacity 0.3s; }
  body:has(a:hover) .cursor-ring, body:has(button:hover) .cursor-ring, body:has(.bransje-card:hover) .cursor-ring { width: 60px; height: 60px; border-color: var(--gold); }

  /* Side overgang */
  .side-innhold { animation: slideOpp 0.5s cubic-bezier(0.4,0,0.2,1); }
  @keyframes slideOpp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

  /* Scroll reveal */
  .reveal { opacity: 0; transform: translateY(50px); transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1); }
  .reveal.synlig { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-60px); transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1); }
  .reveal-left.synlig { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(60px); transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1); }
  .reveal-right.synlig { opacity: 1; transform: translateX(0); }
  .reveal-scale { opacity: 0; transform: scale(0.85); transition: opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1); }
  .reveal-scale.synlig { opacity: 1; transform: scale(1); }
  .reveal-delay-1 { transition-delay: 0.08s; }
  .reveal-delay-2 { transition-delay: 0.16s; }
  .reveal-delay-3 { transition-delay: 0.24s; }
  .reveal-delay-4 { transition-delay: 0.32s; }
  .reveal-delay-5 { transition-delay: 0.4s; }
  .reveal-delay-6 { transition-delay: 0.48s; }

  /* Navbar */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(15,26,18,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 18px 48px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(31,78,46,0.25); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
  .nav.scrolled { padding: 12px 48px; background: rgba(8,14,9,0.97); border-bottom-color: rgba(201,168,76,0.15); }
  .nav-logo { display: flex; align-items: center; gap: 14px; cursor: none; }
  .nav-logo-icon { position: relative; width: 36px; height: 36px; }
  .nav-logo-d { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); opacity: 0.12; position: absolute; top: -4px; left: 2px; line-height: 1; pointer-events: none; transition: opacity 0.4s, transform 0.4s; }
  .nav-logo:hover .nav-logo-d { opacity: 0.3; transform: translate(3px, 3px); }
  .nav-logo-a { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); position: absolute; top: -4px; left: 0; line-height: 1; transition: transform 0.4s; }
  .nav-logo:hover .nav-logo-a { transform: translate(-1px, -1px); }
  .nav-logo-text { display: flex; flex-direction: column; gap: 2px; }
  .nav-logo-name { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: var(--cream); letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; }
  .nav-logo-sub { font-family: 'Inter', sans-serif; font-size: 7px; color: #3a6a46; letter-spacing: 0.16em; text-transform: uppercase; line-height: 1; }
  .nav-logo-by { font-family: 'Inter', sans-serif; font-size: 6px; color: #2a3a2e; letter-spacing: 0.12em; text-transform: uppercase; line-height: 1; margin-top: 1px; }
  .nav-links { display: flex; gap: 28px; }
  .nav-link { font-size: 11px; color: #6a8a6e; letter-spacing: 0.08em; text-transform: uppercase; cursor: none; transition: color 0.3s; position: relative; padding-bottom: 4px; overflow: hidden; }
  .nav-link::before { content: attr(data-text); position: absolute; top: 100%; left: 0; color: var(--gold); transition: top 0.3s cubic-bezier(0.4,0,0.2,1); white-space: nowrap; }
  .nav-link:hover { color: transparent; }
  .nav-link:hover::before { top: 0; }
  .nav-cta { background: transparent; color: var(--cream); border: 1px solid rgba(201,168,76,0.4); padding: 9px 20px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; cursor: none; transition: all 0.4s; position: relative; overflow: hidden; }
  .nav-cta::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); z-index: 0; }
  .nav-cta:hover::before { transform: scaleX(1); }
  .nav-cta:hover { color: var(--dark); border-color: var(--gold); }
  .nav-cta span { position: relative; z-index: 1; }

  /* Hero */
  .hero { position: relative; height: 100vh; min-height: 600px; overflow: hidden; display: flex; align-items: center; }
  .hero-bg { position: absolute; inset: -20%; background: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80') center/cover no-repeat; will-change: transform; }
  .hero-grain { position: absolute; inset: 0; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 256px; pointer-events: none; animation: grain 0.8s steps(1) infinite; z-index: 3; }
  @keyframes grain { 0% { background-position: 0 0; } 10% { background-position: -5% -10%; } 20% { background-position: -15% 5%; } 30% { background-position: 7% -25%; } 40% { background-position: -5% 25%; } 50% { background-position: -15% 10%; } 60% { background-position: 15% 0%; } 70% { background-position: 0% 15%; } 80% { background-position: 3% 35%; } 90% { background-position: -10% 10%; } 100% { background-position: 0 0; } }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,26,18,0.97) 0%, rgba(15,26,18,0.8) 50%, rgba(15,26,18,0.55) 100%); z-index: 1; }
  .hero-particles { position: absolute; inset: 0; z-index: 2; pointer-events: none; overflow: hidden; }
  .hero-content { position: relative; z-index: 4; padding: 0 80px; max-width: 720px; }
  .hero-tag { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; opacity: 0; animation: fadeUp 1s 0.2s cubic-bezier(0.4,0,0.2,1) forwards; display: flex; align-items: center; gap: 12px; }
  .hero-tag::before { content: ''; display: inline-block; width: 32px; height: 1px; background: var(--gold); }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 72px); line-height: 1.02; color: var(--cream); margin-bottom: 24px; opacity: 0; animation: fadeUp 1s 0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
  .hero-title em { font-style: italic; color: var(--gold); position: relative; }
  .hero-title em::after { content: ''; position: absolute; bottom: 4px; left: 0; right: 0; height: 1px; background: var(--gold); opacity: 0.4; }
  .hero-sub { font-size: 16px; color: rgba(245,240,232,0.55); line-height: 1.8; max-width: 480px; margin-bottom: 48px; font-weight: 300; opacity: 0; animation: fadeUp 1s 0.6s cubic-bezier(0.4,0,0.2,1) forwards; }
  .hero-btns { display: flex; gap: 14px; opacity: 0; animation: fadeUp 1s 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .btn-primary { background: var(--gold); color: var(--dark); border: none; padding: 15px 36px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; cursor: none; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; font-weight: 500; }
  .btn-primary::after { content: ''; position: absolute; inset: 0; background: white; opacity: 0; transition: opacity 0.3s; }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(201,168,76,0.3); }
  .btn-primary:hover::after { opacity: 0.1; }
  .btn-primary:active { transform: translateY(-1px); }
  .btn-secondary { background: transparent; color: var(--cream); border: 1px solid rgba(245,240,232,0.2); padding: 15px 36px; font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; cursor: none; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
  .btn-secondary:hover { border-color: rgba(201,168,76,0.6); color: var(--gold); transform: translateY(-3px); }
  .hero-stats { position: absolute; bottom: 0; right: 0; display: flex; z-index: 4; opacity: 0; animation: fadeUp 1s 1s cubic-bezier(0.4,0,0.2,1) forwards; }
  .hero-stat { background: rgba(8,14,9,0.85); backdrop-filter: blur(16px); padding: 28px 40px; border-left: 1px solid rgba(31,78,46,0.3); text-align: center; transition: all 0.4s; position: relative; overflow: hidden; }
  .hero-stat::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.4s; }
  .hero-stat:hover::before { transform: scaleX(1); }
  .hero-stat:hover { background: rgba(31,78,46,0.4); }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 36px; color: var(--cream); display: block; }
  .hero-stat-lbl { font-size: 9px; color: #3a5a3e; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 6px; display: block; }
  .hero-scroll { position: absolute; bottom: 40px; left: 80px; z-index: 4; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; animation: fadeUp 1s 1.2s forwards; }
  .hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollLine 2s ease-in-out infinite; }
  @keyframes scrollLine { 0%,100% { transform: scaleY(1); opacity: 1; } 50% { transform: scaleY(0.5); opacity: 0.4; } }
  .hero-scroll-text { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #3a5a3e; writing-mode: vertical-rl; }

  /* Bransjer */
  .bransjer-section { padding: 140px 80px; background: var(--cream); position: relative; }
  .bransjer-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, var(--gold), transparent); opacity: 0.3; }
  .section-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--brg); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
  .section-tag::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--brg); }
  .section-title { font-family: 'Playfair Display', serif; font-size: 44px; color: var(--dark); margin-bottom: 56px; }
  .bransje-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
  .bransje-card { background: white; overflow: hidden; cursor: none; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s cubic-bezier(0.4,0,0.2,1); transform-style: preserve-3d; will-change: transform; }
  .bransje-card:hover { transform: translateY(-12px) rotateX(2deg); box-shadow: 0 40px 80px rgba(15,26,18,0.2), 0 0 0 1px rgba(201,168,76,0.1); }
  .bransje-card:active { transform: translateY(-6px) scale(0.99); }
  .bransje-card.coming { opacity: 0.45; cursor: not-allowed; }
  .bransje-card.coming:hover { transform: none; box-shadow: none; }
  .bransje-img-wrap { position: relative; height: 240px; overflow: hidden; }
  .bransje-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.7) saturate(0.85); transition: transform 1s cubic-bezier(0.4,0,0.2,1), filter 0.6s; }
  .bransje-card:hover .bransje-img { transform: scale(1.1); filter: brightness(0.95) saturate(1.15); }
  .bransje-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,26,18,0.7) 0%, transparent 55%); transition: opacity 0.5s; }
  .bransje-card:hover .bransje-img-overlay { opacity: 0.5; }
  .bransje-num-overlay { position: absolute; top: 20px; left: 20px; font-family: 'Playfair Display', serif; font-size: 11px; color: rgba(201,168,76,0.8); letter-spacing: 0.1em; }
  .coming-pill { position: absolute; top: 16px; right: 16px; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(15,26,18,0.85); color: var(--cream); padding: 5px 12px; backdrop-filter: blur(8px); }
  .bransje-body { padding: 28px 28px 24px; position: relative; }
  .bransje-body::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, var(--gold), transparent); transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
  .bransje-card:hover .bransje-body::before { transform: scaleX(1); }
  .bransje-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 10px; }
  .bransje-name { font-family: 'Playfair Display', serif; font-size: 21px; color: var(--dark); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
  .bransje-arrow { color: var(--brg); transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), color 0.3s; font-size: 18px; }
  .bransje-card:hover .bransje-arrow { transform: translate(6px,-6px) rotate(0deg); color: var(--gold); }
  .bransje-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 18px; }
  .bransje-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .bransje-tag { font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; background: var(--brg-pale); color: var(--brg); transition: all 0.3s; }
  .bransje-card:hover .bransje-tag { background: #c8deca; }
  .bransje-more { background: white; padding: 22px 28px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--cream-dark); }
  .bransje-more-text { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--muted); font-style: italic; }

  /* Hvorfor */
  .hvorfor-section { background: var(--dark); padding: 140px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; position: relative; overflow: hidden; }
  .hvorfor-section::before { content: ''; position: absolute; bottom: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(31,78,46,0.12) 0%, transparent 70%); pointer-events: none; }
  .hvorfor-img-wrap { position: relative; height: 520px; }
  .hvorfor-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6) saturate(0.9); display: block; transition: filter 0.6s, transform 0.6s; }
  .hvorfor-img-wrap:hover .hvorfor-img { filter: brightness(0.75) saturate(1.1); transform: scale(1.02); }
  .hvorfor-img-frame { position: absolute; inset: 0; border: 1px solid rgba(201,168,76,0.3); transform: translate(16px, 16px); pointer-events: none; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.5s; }
  .hvorfor-img-frame2 { position: absolute; inset: 0; border: 1px solid rgba(31,78,46,0.4); transform: translate(32px, 32px); pointer-events: none; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.05s; }
  .hvorfor-img-wrap:hover .hvorfor-img-frame { transform: translate(22px, 22px); border-color: rgba(201,168,76,0.6); }
  .hvorfor-img-wrap:hover .hvorfor-img-frame2 { transform: translate(40px, 40px); }
  .hvorfor-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
  .hvorfor-tag::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--gold); }
  .hvorfor-title { font-family: 'Playfair Display', serif; font-size: 40px; color: var(--cream); margin-bottom: 40px; line-height: 1.15; }
  .hvorfor-title em { font-style: italic; color: var(--gold); }
  .hvorfor-items { display: flex; flex-direction: column; gap: 0; }
  .hvorfor-item { display: flex; gap: 18px; padding: 20px 0 20px 0; border-bottom: 1px solid rgba(255,255,255,0.05); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor: default; position: relative; overflow: hidden; }
  .hvorfor-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--gold); transform: scaleY(0); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
  .hvorfor-item:hover::before { transform: scaleY(1); }
  .hvorfor-item:last-child { border-bottom: none; }
  .hvorfor-item:hover { padding-left: 16px; border-bottom-color: rgba(201,168,76,0.15); }
  .hvorfor-dot { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; margin-top: 8px; flex-shrink: 0; transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s; }
  .hvorfor-item:hover .hvorfor-dot { transform: scale(2); box-shadow: 0 0 12px rgba(201,168,76,0.6); }
  .hvorfor-item-title { font-size: 14px; font-weight: 500; color: var(--cream); margin-bottom: 4px; transition: color 0.3s; }
  .hvorfor-item:hover .hvorfor-item-title { color: var(--gold); }
  .hvorfor-item-desc { font-size: 13px; color: rgba(90,110,94,0.9); line-height: 1.65; }

  /* Om oss */
  .om-oss-hero { background: var(--dark); padding: 140px 80px 100px; position: relative; overflow: hidden; }
  .om-oss-hero::before { content: ''; position: absolute; top: -100px; right: -100px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%); pointer-events: none; }
  .om-oss-hero-accent { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--brg-light) 70%, transparent 100%); background-size: 200% 100%; animation: shimmer 4s linear infinite; }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .om-oss-inner { max-width: 800px; }
  .om-oss-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
  .om-oss-tag::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--gold); }
  .om-oss-title { font-family: 'Playfair Display', serif; font-size: clamp(34px, 5vw, 60px); line-height: 1.08; color: var(--cream); }
  .om-oss-body { max-width: 800px; margin: 0 auto; padding: 80px 80px; }
  .om-oss-tekst { font-size: 16px; color: var(--muted); line-height: 1.95; margin-bottom: 28px; font-weight: 300; }
  .om-oss-sitat { font-family: 'Playfair Display', serif; font-size: 22px; font-style: italic; color: var(--text); border-left: 2px solid var(--gold); padding: 20px 32px; margin: 48px 0; line-height: 1.65; background: rgba(201,168,76,0.03); }
  .om-oss-verdier { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--cream-dark); margin: 56px 0; }
  .om-oss-verdi { background: white; padding: 32px; transition: all 0.4s; position: relative; overflow: hidden; }
  .om-oss-verdi::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
  .om-oss-verdi:hover::before { transform: scaleX(1); }
  .om-oss-verdi:hover { background: #fdfcf8; }
  .om-oss-verdi-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 14px; }
  .om-oss-verdi-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--dark); margin-bottom: 10px; }
  .om-oss-verdi-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }
  .om-oss-kontakt { background: var(--brg); padding: 56px 80px; position: relative; overflow: hidden; }
  .om-oss-kontakt::before { content: ''; position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%); }
  .om-oss-kontakt-inner { max-width: 800px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
  .om-oss-kontakt-title { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--cream); margin-bottom: 10px; }
  .om-oss-kontakt-desc { font-size: 14px; color: rgba(159,201,168,0.8); line-height: 1.7; }
  .om-oss-kontakt-epost { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--gold); text-decoration: none; display: block; margin-top: 10px; transition: all 0.3s; }
  .om-oss-kontakt-epost:hover { letter-spacing: 0.04em; }

  /* Kalkulator */
  .kalkulator-view { padding: 100px 80px 80px; max-width: 980px; margin: 0 auto; }
  .kalkulator-back { display: flex; align-items: center; gap: 10px; font-size: 11px; color: var(--muted); cursor: none; margin-bottom: 36px; background: none; border: none; font-family: 'Inter', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s; }
  .kalkulator-back:hover { color: var(--text); gap: 16px; }
  .kalkulator-hero { position: relative; height: 280px; overflow: hidden; margin-bottom: 48px; }
  .kalkulator-hero-bg { position: absolute; inset: -10%; background-size: cover; background-position: center; filter: brightness(0.45); transition: filter 0.6s, transform 0.6s; }
  .kalkulator-hero:hover .kalkulator-hero-bg { filter: brightness(0.55); transform: scale(1.02); }
  .kalkulator-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(15,26,18,0.95) 0%, rgba(15,26,18,0.45) 100%); }
  .kalkulator-hero-content { position: relative; z-index: 2; padding: 0 56px; height: 100%; display: flex; flex-direction: column; justify-content: center; }
  .kalkulator-hero-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: var(--gold); margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
  .kalkulator-hero-tag::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--gold); }
  .kalkulator-hero-title { font-family: 'Playfair Display', serif; font-size: 48px; color: var(--cream); }

  /* Footer */
  footer { border-top: 1px solid rgba(26,46,30,0.8); padding: 32px 80px; display: flex; justify-content: space-between; align-items: center; background: var(--dark2); }
  .footer-logo { display: flex; align-items: center; gap: 12px; cursor: none; }
  .footer-logo-icon { position: relative; width: 28px; height: 28px; }
  .footer-logo-d { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: var(--gold); opacity: 0.1; position: absolute; top: -3px; left: 2px; line-height: 1; transition: opacity 0.4s; }
  .footer-logo:hover .footer-logo-d { opacity: 0.25; }
  .footer-logo-a { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: var(--gold); position: absolute; top: -3px; left: 0; line-height: 1; }
  .footer-logo-text { display: flex; flex-direction: column; gap: 2px; }
  .footer-logo-name { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500; color: var(--cream); letter-spacing: 0.18em; text-transform: uppercase; }
  .footer-logo-by { font-family: 'Inter', sans-serif; font-size: 6px; color: #2a3a2e; letter-spacing: 0.12em; text-transform: uppercase; }
  .footer-disclaimer { font-size: 11px; color: #2a3a2e; max-width: 400px; text-align: right; }

  /* Teller */
  .teller { display: inline-block; }

  /* Magnetisk knapp */
  .mag-wrap { display: inline-block; }
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

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', moveCursor);
    animateRing();
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}

function Partikler() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const partikler = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.1
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      partikler.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" style={{ width: '100%', height: '100%' }} />;
}

function Teller({ slutt, suffix = '', prefix = '' }) {
  const [verdi, setVerdi] = useState(0);
  const ref = useRef(null);
  const startet = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startet.current) {
        startet.current = true;
        const varighet = 2000;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / varighet, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
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

function MagnetKnapp({ children, onClick, className }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }}
    >
      {children}
    </button>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('synlig');
      });
    }, { threshold: 0.1 });

    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

function useParallax() {
  useEffect(() => {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;
    const handle = () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  });
}

function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const handle = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  });
}

function use3DTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.bransje-card:not(.coming)');
    const handlers = [];

    cards.forEach(card => {
      const move = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-12px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        card.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(15,26,18,0.2), 0 40px 80px rgba(15,26,18,0.15)`;
      };
      const leave = () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ card, move, leave });
    });

    return () => {
      handlers.forEach(({ card, move, leave }) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    };
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
  use3DTilt();

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
        <Cursor />
        <nav className="nav">
          <NavLogo onClick={gaaHjem} />
          <div className="nav-links">
            <span className="nav-link" data-text="Hjem" onClick={gaaHjem}>Hjem</span>
            <span className="nav-link" data-text="Bransjer" onClick={() => { gaaHjem(); setTimeout(() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' }), 300); }}>Bransjer</span>
            <span className="nav-link" data-text="Om oss" style={{ color: 'var(--gold)' }}>Om oss</span>
          </div>
          <MagnetKnapp className="nav-cta" onClick={() => aapneBransje(bransjer[0])}>
            <span>Kom i gang</span>
          </MagnetKnapp>
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
                <div className={`om-oss-verdi reveal-scale reveal-delay-${i + 1}`} key={i}>
                  <div className="om-oss-verdi-num">{v.num}</div>
                  <div className="om-oss-verdi-title">{v.tittel}</div>
                  <div className="om-oss-verdi-desc">{v.desc}</div>
                </div>
              ))}
            </div>
            <MagnetKnapp className="btn-primary reveal" onClick={() => aapneBransje(bransjer[0])}>
              <span>Start beregning</span>
            </MagnetKnapp>
          </div>
          <div className="om-oss-kontakt">
            <div className="om-oss-kontakt-inner">
              <div>
                <div className="om-oss-kontakt-title">Mangler din bransje?</div>
                <div className="om-oss-kontakt-desc">Ta kontakt hvis du ønsker en kalkulator for en bransje som ikke er her ennå.</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(159,201,168,0.7)', marginBottom: '10px' }}>Send oss en e-post</div>
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
        <Cursor />
        <nav className="nav">
          <NavLogo onClick={gaaHjem} />
          <div className="nav-links">
            <span className="nav-link" data-text="Hjem" onClick={gaaHjem}>Hjem</span>
            <span className="nav-link" data-text="Om oss" onClick={gaaOmOss}>Om oss</span>
          </div>
          <MagnetKnapp className="nav-cta" onClick={gaaHjem}><span>Alle bransjer</span></MagnetKnapp>
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
      <Cursor />
      <nav className="nav">
        <NavLogo onClick={gaaHjem} />
        <div className="nav-links">
          <span className="nav-link" data-text="Bransjer" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Bransjer</span>
          <span className="nav-link" data-text="Om oss" onClick={gaaOmOss}>Om oss</span>
        </div>
        <MagnetKnapp className="nav-cta" onClick={() => aapneBransje(bransjer[0])}><span>Kom i gang</span></MagnetKnapp>
      </nav>

      <div className="side-innhold" key={animKey}>
        <section className="hero">
          <div className="hero-bg" id="hero-bg"></div>
          <div className="hero-grain"></div>
          <div className="hero-overlay"></div>
          <Partikler />
          <div className="hero-content">
            <div className="hero-tag">Gratis beslutningsverktøy</div>
            <h1 className="hero-title">Finn ut om ideen din<br /><em>faktisk</em> er lønnsom</h1>
            <p className="hero-sub">Invest Tools gir deg tallene du trenger før du investerer tid og penger i din neste bedrift.</p>
            <div className="hero-btns">
              <MagnetKnapp className="btn-primary" onClick={() => aapneBransje(bransjer[0])}>
                <span>Start beregning</span>
              </MagnetKnapp>
              <button className="btn-secondary" onClick={() => document.getElementById('bransjer')?.scrollIntoView({ behavior: 'smooth' })}>Se alle bransjer</button>
            </div>
          </div>
          <div className="hero-scroll">
            <div className="hero-scroll-line"></div>
            <div className="hero-scroll-text">Scroll</div>
          </div>
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
          <div className="section-title reveal reveal-delay-1">Hva vil du starte?</div>
          <div className="bransje-grid">
            {bransjer.map((b, i) => (
              <div
                key={b.id}
                className={`bransje-card ${b.coming ? 'coming' : ''} reveal reveal-delay-${(i % 3) + 1}`}
                onClick={() => aapneBransje(b)}
              >
                <div className="bransje-img-wrap">
                  <img className="bransje-img" src={b.img} alt={b.navn} />
                  <div className="bransje-img-overlay"></div>
                  <div className="bransje-num-overlay">{b.num}</div>
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
            <img className="hvorfor-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Investor" />
            <div className="hvorfor-img-frame"></div>
            <div className="hvorfor-img-frame2"></div>
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