import { useState, useEffect } from 'react';

const styles = `
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(8,14,9,0.97);
    border-top: 1px solid rgba(201,168,76,0.2);
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    backdrop-filter: blur(12px);
    animation: slideOppCookie 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes slideOppCookie {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .cookie-tekst {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #6a9a6e;
    line-height: 1.6;
    max-width: 680px;
  }
  .cookie-tekst a {
    color: #c9a84c;
    text-decoration: none;
    border-bottom: 1px solid rgba(201,168,76,0.3);
    transition: border-color 0.2s;
  }
  .cookie-tekst a:hover { border-color: #c9a84c; }
  .cookie-knapper {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }
  .cookie-ok {
    background: #c9a84c;
    color: #0f1a12;
    border: none;
    padding: 10px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .cookie-ok:hover { background: #d4b558; }
  .cookie-les-mer {
    background: transparent;
    color: #4a6a4e;
    border: 1px solid rgba(31,78,46,0.4);
    padding: 10px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .cookie-les-mer:hover { color: #c9a84c; border-color: rgba(201,168,76,0.4); }

  @media (max-width: 768px) {
    .cookie-banner {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      gap: 16px;
    }
    .cookie-knapper { width: 100%; }
    .cookie-ok { flex: 1; text-align: center; }
    .cookie-les-mer { flex: 1; text-align: center; }
  }
`;

export default function CookieBanner({ onVisPersonvern }) {
  const [synlig, setSynlig] = useState(false);

  useEffect(() => {
    try {
      const akseptert = localStorage.getItem('addon_cookie_aksept');
      if (!akseptert) setSynlig(true);
    } catch (e) {
      setSynlig(true);
    }
  }, []);

  const aksepter = () => {
    try { localStorage.setItem('addon_cookie_aksept', '1'); } catch (e) {}
    setSynlig(false);
  };

  if (!synlig) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="cookie-banner" role="region" aria-label="Informasjonskapsler">
        <div className="cookie-tekst">
          Vi bruker nødvendige informasjonskapsler for innlogging (Supabase) og betaling (Stripe).
          Ingen reklamecookies. Les mer i vår{' '}
          <a href="#" onClick={e => { e.preventDefault(); onVisPersonvern(); }}>personvernerklæring</a>.
        </div>
        <div className="cookie-knapper">
          <button className="cookie-les-mer" onClick={() => { onVisPersonvern(); aksepter(); }}>Les mer</button>
          <button className="cookie-ok" onClick={aksepter}>Forstått</button>
        </div>
      </div>
    </>
  );
}