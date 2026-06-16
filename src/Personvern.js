const styles = `
  .pv-wrap { font-family: 'Inter', sans-serif; color: #1a2e1e; max-width: 720px; margin: 0 auto; padding: 120px 40px 80px; }
  .pv-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a84c; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
  .pv-tag::before { content: ''; display: inline-block; width: 24px; height: 1px; background: #c9a84c; }
  .pv-tittel { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 48px); color: #0f1a12; margin-bottom: 12px; line-height: 1.1; }
  .pv-dato { font-size: 12px; color: #5a6e5e; margin-bottom: 48px; }
  .pv-seksjon { margin-bottom: 40px; }
  .pv-seksjon-tittel { font-family: 'Playfair Display', serif; font-size: 20px; color: #0f1a12; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #ede7d9; }
  .pv-tekst { font-size: 14px; color: #5a6e5e; line-height: 1.9; margin-bottom: 12px; }
  .pv-liste { list-style: none; margin: 12px 0; padding: 0; }
  .pv-liste li { font-size: 14px; color: #5a6e5e; line-height: 1.7; padding: 6px 0; border-bottom: 1px solid #ede7d9; display: flex; gap: 12px; }
  .pv-liste li::before { content: '→'; color: #1f4e2e; flex-shrink: 0; }
  .pv-liste li:last-child { border-bottom: none; }
  .pv-boks { background: #f5f0e8; border-left: 3px solid #1f4e2e; padding: 16px 20px; margin: 16px 0; font-size: 13px; color: #5a6e5e; line-height: 1.7; }
  .pv-epost { color: #1f4e2e; font-weight: 500; }
  @media (max-width: 768px) {
    .pv-wrap { padding: 100px 20px 60px; }
  }
`;

export default function Personvern({ onTilbake }) {
  return (
    <div className="pv-wrap">
      <style>{styles}</style>
      <button
        onClick={onTilbake}
        style={{ background: 'none', border: 'none', color: '#5a6e5e', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
      >
        ← Tilbake
      </button>

      <div className="pv-tag">Juridisk</div>
      <h1 className="pv-tittel">Personvernerklæring</h1>
      <div className="pv-dato">Sist oppdatert: juni 2026</div>

      <div className="pv-seksjon">
        <div className="pv-seksjon-tittel">Hvem vi er</div>
        <div className="pv-tekst">
          Invest Tools by ADDON er et norsk verktøy for investeringsanalyse, drevet av ADDON Invest AS, Flintvegen 5, 7509 Stjørdal.
          Du kan kontakte oss på <span className="pv-epost">kontakt@addoninvest.no</span>.
        </div>
      </div>

      <div className="pv-seksjon">
        <div className="pv-seksjon-tittel">Hvilke data vi samler inn</div>
        <div className="pv-tekst">Vi samler inn så lite data som mulig. Her er hva vi faktisk lagrer:</div>
        <ul className="pv-liste">
          <li><span>E-postadresse og kryptert passord ved opprettelse av konto (lagret i Supabase)</span></li>
          <li><span>Abonnementsstatus (Gratis, Basis eller Pro) knyttet til e-postadressen din</span></li>
          <li><span>Betalingsinformasjon håndteres eksklusivt av Stripe. Vi lagrer aldri kortdetaljer.</span></li>
        </ul>
        <div className="pv-boks">
          Tallene du legger inn i kalkulatorene lagres kun lokalt i nettleseren din. Vi har ikke tilgang til disse.
        </div>
      </div>

      <div className="pv-seksjon">
        <div className="pv-seksjon-tittel">Informasjonskapsler (cookies)</div>
        <div className="pv-tekst">Vi bruker kun nødvendige informasjonskapsler. Vi bruker ikke reklamecookies eller sporingsverktøy.</div>
        <ul className="pv-liste">
          <li><span><strong>Supabase Auth</strong> – Sesjonstoken for å holde deg innlogget. Nødvendig for tjenesten.</span></li>
          <li><span><strong>Stripe</strong> – Nødvendig for sikker betalingsgjennomføring. Settes kun under kjøp.</span></li>
          <li><span><strong>Vercel Analytics</strong> – Anonymisert sidevisningsdata uten personidentifisering.</span></li>
        </ul>
      </div>

      <div className="pv-seksjon">
        <div className="pv-seksjon-tittel">Tredjeparter</div>
        <ul className="pv-liste">
          <li><span><strong>Supabase</strong> (supabase.com) – Database for brukerkontoer og abonnementsstatus. Data lagres i EU.</span></li>
          <li><span><strong>Stripe</strong> (stripe.com) – Betalingsbehandler. Underlagt PCI DSS-standard.</span></li>
          <li><span><strong>Vercel</strong> (vercel.com) – Hosting av nettsiden.</span></li>
          <li><span><strong>Anthropic Claude</strong> – AI-assistenter behandler kun tallene du oppgir i øyeblikket. Ingenting lagres.</span></li>
        </ul>
      </div>

      <div className="pv-seksjon">
        <div className="pv-seksjon-tittel">Dine rettigheter</div>
        <div className="pv-tekst">Under GDPR har du rett til å:</div>
        <ul className="pv-liste">
          <li><span>Be om innsyn i hvilke data vi har lagret om deg</span></li>
          <li><span>Be om sletting av kontoen og tilhørende data</span></li>
          <li><span>Be om retting av feilaktige opplysninger</span></li>
          <li><span>Trekke tilbake samtykke når som helst</span></li>
        </ul>
        <div className="pv-boks">
          Send e-post til <span className="pv-epost">kontakt@addoninvest.no</span>. Vi svarer innen 30 dager.
        </div>
      </div>

      <div className="pv-seksjon">
        <div className="pv-seksjon-tittel">Kontakt og klager</div>
        <div className="pv-tekst">
          Spørsmål om personvern rettes til <span className="pv-epost">kontakt@addoninvest.no</span>.
          Du har også rett til å klage til Datatilsynet (datatilsynet.no).
        </div>
      </div>
    </div>
  );
}