import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Login({ onLogin }) {
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [melding, setMelding] = useState('');
  const [laster, setLaster] = useState(false);
  const [erNyBruker, setErNyBruker] = useState(false);

  async function handleSubmit() {
    setLaster(true);
    setMelding('');

    if (erNyBruker) {
      const { error } = await supabase.auth.signUp({ email: epost, password: passord });
      if (error) setMelding(error.message);
      else setMelding('Sjekk e-posten din for å bekrefte kontoen!');
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email: epost, password: passord });
      if (error) setMelding('Feil e-post eller passord');
      else onLogin(data.user);
    }
    setLaster(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 32 }}>
      <h2>{erNyBruker ? 'Opprett konto' : 'Logg inn'}</h2>
      <input
        type="email"
        placeholder="E-post"
        value={epost}
        onChange={e => setEpost(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
      />
      <input
        type="password"
        placeholder="Passord"
        value={passord}
        onChange={e => setPassord(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
      />
      {melding && <p style={{ color: 'red' }}>{melding}</p>}
      <button onClick={handleSubmit} disabled={laster} style={{ width: '100%', padding: 10 }}>
        {laster ? 'Venter...' : erNyBruker ? 'Registrer' : 'Logg inn'}
      </button>
      <p style={{ marginTop: 16, cursor: 'pointer', color: 'blue' }} onClick={() => setErNyBruker(!erNyBruker)}>
        {erNyBruker ? 'Har du konto? Logg inn' : 'Ny bruker? Opprett konto'}
      </p>
    </div>
  );
}