import React, { useState, useCallback, useRef } from 'react';

const S = {
  app: { minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)', color: '#fff', fontFamily: 'system-ui, sans-serif' },
  header: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontSize: '1.5rem', fontWeight: 700, color: '#ff4444' },
  nav: { display: 'flex', gap: '1rem' },
  navBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' },
  navBtnActive: { background: 'rgba(255,255,255,0.1)', color: '#fff' },
  main: { padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' },
  card: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' },
  input: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' },
  btn: { padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 },
  btnPrimary: { background: '#ff4444', color: '#fff' },
  btnSecondary: { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' },
  label: { display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' },
  title: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' },
  subtitle: { color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' },
  badge: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
};

// LoginScreen is defined OUTSIDE App so it never re-mounts on state changes
const LoginScreen = React.memo(function LoginScreen({ onLogin }) {
  const emailRef = useRef('');
  const passRef = useRef('');
  const [emailVal, setEmailVal] = useState('');
  const [passVal, setPassVal] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(() => {
    if (!emailVal || !passVal) { setError('Please fill in all fields'); return; }
    if (passVal.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError('');
    const users = JSON.parse(localStorage.getItem('care911_users') || '{}');
    if (isSignup) {
      if (users[emailVal]) { setError('Account already exists'); return; }
      users[emailVal] = { password: passVal, name: emailVal.split('@')[0], role: 'patient', createdAt: new Date().toISOString() };
      localStorage.setItem('care911_users', JSON.stringify(users));
    } else {
      if (!users[emailVal] || users[emailVal].password !== passVal) { setError('Invalid email or password'); return; }
    }
    const userData = isSignup
      ? { email: emailVal, name: emailVal.split('@')[0], role: 'patient' }
      : { email: emailVal, ...users[emailVal] };
    localStorage.setItem('care911_session', JSON.stringify(userData));
    onLogin(userData);
  }, [emailVal, passVal, isSignup, onLogin]);

  return (
    <div style={{ ...S.app, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ ...S.card, width: '100%', maxWidth: '400px', margin: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚨</div>
          <h1 style={{ ...S.title, textAlign: 'center' }}>Care911</h1>
          <p style={{ ...S.subtitle, textAlign: 'center' }}>Emergency Medical Assistant</p>
        </div>
        {error && <div style={{ background: 'rgba(255,68,68,0.2)', border: '1px solid #ff4444', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', color: '#ff8888', fontSize: '0.9rem' }}>{error}</div>}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="login-email" style={S.label}>Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={emailVal}
            onChange={e => setEmailVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('login-pass').focus()}
            style={{ ...S.input, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="login-pass" style={S.label}>Password</label>
          <input
            id="login-pass"
            name="password"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            placeholder="••••••••"
            value={passVal}
            onChange={e => setPassVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ ...S.input, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
          />
        </div>
        <button onClick={handleSubmit} style={{ ...S.btn, ...S.btnPrimary, width: '100%', marginBottom: '1rem' }}>
          {isSignup ? 'Create Account' : 'Sign In'}
        </button>
        <button onClick={() => { setIsSignup(p => !p); setError(''); }} style={{ ...S.btn, ...S.btnSecondary, width: '100%' }}>
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
});

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('care911_session') || 'null'); } catch { return null; }
  });
  const [tab, setTab] = useState('triage');
  const [triageInput, setTriageInput] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [triageLoading, setTriageLoading] = useState(false);
  const [insuranceResult, setInsuranceResult] = useState(null);
  const [insuranceLoading, setInsuranceLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('care911_history') || '[]'); } catch { return []; }
  });

  const handleLogin = useCallback((userData) => setUser(userData), []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('care911_session');
    setUser(null);
  }, []);

  const runTriage = useCallback(async () => {
    if (!triageInput.trim()) return;
    setTriageLoading(true);
    setTriageResult(null);
    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_KEY;
      if (!apiKey) { setTriageResult({ error: 'API key not configured. Add REACT_APP_ANTHROPIC_KEY in Vercel settings.' }); return; }
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022', max_tokens: 800,
          messages: [{ role: 'user', content: `You are an emergency medical triage assistant. Analyze these symptoms and provide: 1) Urgency level (CRITICAL/HIGH/MEDIUM/LOW), 2) Possible conditions, 3) Immediate steps, 4) Whether to call 911. Symptoms: ${triageInput}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || 'No response';
      const entry = { type: 'triage', input: triageInput, result: text, date: new Date().toISOString() };
      const newHistory = [entry, ...history.slice(0, 19)];
      setHistory(newHistory);
      localStorage.setItem('care911_history', JSON.stringify(newHistory));
      setTriageResult({ text });
    } catch (err) {
      setTriageResult({ error: 'Failed to connect. Check your API key and internet connection.' });
    } finally {
      setTriageLoading(false);
    }
  }, [triageInput, history]);

  const runInsuranceScan = useCallback(async () => {
    if (!imageFile) return;
    setInsuranceLoading(true);
    setInsuranceResult(null);
    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_KEY;
      if (!apiKey) { setInsuranceResult({ error: 'API key not configured.' }); return; }
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const mediaType = imageFile.type || 'image/jpeg';
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022', max_tokens: 600,
            messages: [{ role: 'user', content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
              { type: 'text', text: 'Extract all insurance information from this card: member name, member ID, group number, insurance company, plan name, phone numbers, copay info, deductible. Format clearly.' }
            ]}]
          })
        });
        const data = await res.json();
        const text = data.content?.[0]?.text || 'Could not extract info';
        setInsuranceResult({ text });
        setInsuranceLoading(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      setInsuranceResult({ error: 'Failed to scan card.' });
      setInsuranceLoading(false);
    }
  }, [imageFile]);

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.logo}>🚨 Care911</div>
        <nav style={S.nav}>
          {['triage','insurance','history'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ ...S.navBtn, ...(tab === t ? S.navBtnActive : {}) }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} style={{ ...S.navBtn, color: 'rgba(255,100,100,0.8)' }}>Logout</button>
      </header>

      <main style={S.main}>
        {tab === 'triage' && (
          <div>
            <h2 style={S.title}>AI Symptom Triage</h2>
            <p style={S.subtitle}>Describe your symptoms for an emergency assessment</p>
            <div style={{ ...S.card }}>
              <label style={S.label}>Describe symptoms</label>
              <textarea
                id="triage-input"
                value={triageInput}
                onChange={e => setTriageInput(e.target.value)}
                placeholder="e.g. Chest pain, shortness of breath, left arm numbness for 10 minutes..."
                rows={4}
                style={{ ...S.input, resize: 'vertical', background: 'rgba(255,255,255,0.08)' }}
              />
              <button onClick={runTriage} disabled={triageLoading || !triageInput.trim()} style={{ ...S.btn, ...S.btnPrimary, marginTop: '1rem', opacity: (triageLoading || !triageInput.trim()) ? 0.5 : 1 }}>
                {triageLoading ? 'Analyzing...' : 'Analyze Symptoms'}
              </button>
            </div>
            {triageResult && (
              <div style={{ ...S.card, borderColor: triageResult.error ? '#ff4444' : 'rgba(255,255,255,0.2)' }}>
                {triageResult.error
                  ? <p style={{ color: '#ff8888' }}>{triageResult.error}</p>
                  : <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit', lineHeight: 1.6 }}>{triageResult.text}</pre>
                }
              </div>
            )}
          </div>
        )}

        {tab === 'insurance' && (
          <div>
            <h2 style={S.title}>Insurance Card Scanner</h2>
            <p style={S.subtitle}>Upload a photo of your insurance card to extract key info</p>
            <div style={S.card}>
              <label htmlFor="insurance-file" style={S.label}>Upload insurance card image</label>
              <input
                id="insurance-file"
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                style={{ ...S.input, padding: '0.5rem', background: 'rgba(255,255,255,0.05)' }}
              />
              {imageFile && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Selected: {imageFile.name}</p>}
              <button onClick={runInsuranceScan} disabled={insuranceLoading || !imageFile} style={{ ...S.btn, ...S.btnPrimary, marginTop: '1rem', opacity: (insuranceLoading || !imageFile) ? 0.5 : 1 }}>
                {insuranceLoading ? 'Scanning...' : 'Scan Card'}
              </button>
            </div>
            {insuranceResult && (
              <div style={S.card}>
                {insuranceResult.error
                  ? <p style={{ color: '#ff8888' }}>{insuranceResult.error}</p>
                  : <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit', lineHeight: 1.6 }}>{insuranceResult.text}</pre>
                }
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div>
            <h2 style={S.title}>Assessment History</h2>
            <p style={S.subtitle}>Your past triage assessments</p>
            {history.length === 0
              ? <div style={S.card}><p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>No history yet. Run a triage assessment first.</p></div>
              : history.map((h, i) => (
                <div key={i} style={S.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{new Date(h.date).toLocaleString()}</span>
                  </div>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{h.input}</p>
                  <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{h.result}</pre>
                </div>
              ))
            }
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
