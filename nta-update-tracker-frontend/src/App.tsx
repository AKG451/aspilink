import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:3000';

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 40px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  fontFamily: 'Inter, Arial, sans-serif',
};

const navLinksStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  fontWeight: 500,
  fontSize: '18px',
};

const searchStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '16px',
  marginRight: '24px',
};

const bellStyle: React.CSSProperties = {
  fontSize: '22px',
  marginLeft: '12px',
  position: 'relative',
};

const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  background: '#e53935',
  color: '#fff',
  borderRadius: '50%',
  padding: '2px 7px',
  fontSize: '12px',
  fontWeight: 700,
};

const heroStyle: React.CSSProperties = {
  background: '#2563eb',
  color: '#fff',
  textAlign: 'center',
  padding: '70px 20px 50px 20px',
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '32px',
};

const jeeBtnStyle: React.CSSProperties = {
  background: '#fff',
  color: '#2563eb',
  border: 'none',
  borderRadius: '8px',
  padding: '16px 32px',
  fontWeight: 600,
  fontSize: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const neetBtnStyle: React.CSSProperties = {
  background: '#10b981',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '16px 32px',
  fontWeight: 600,
  fontSize: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const sectionStyle: React.CSSProperties = {
  background: '#fff',
  padding: '40px 0',
  textAlign: 'center',
};

const updateCardStyle: React.CSSProperties = {
  background: '#f8fafc',
  borderRadius: '10px',
  margin: '20px auto',
  maxWidth: '700px',
  padding: '24px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  textAlign: 'left',
};

function App() {
  const [updates, setUpdates] = useState<string[]>([]);
  const [summaries, setSummaries] = useState<string[]>([]);
  const [jeeEmail, setJeeEmail] = useState('');
  const [neetEmail, setNeetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [notificationCount] = useState(3);

  useEffect(() => {
    axios.get(`${API_BASE}/updates`)
      .then(res => {
        const data = res.data as { updates: string[]; summaries: string[] };
        setUpdates(data.updates || []);
        setSummaries(data.summaries || []);
      })
      .catch(() => setMessage('Failed to fetch updates.'));
  }, []);

  const handleSubscribe = async (type: 'jee' | 'neet') => {
    const email = type === 'jee' ? jeeEmail : neetEmail;
    try {
      await axios.post(`${API_BASE}/subscribe`, { email, type });
      setMessage(`Subscription successful for ${type.toUpperCase()}!`);
      if (type === 'jee') setJeeEmail('');
      else setNeetEmail('');
    } catch {
      setMessage('Subscription failed.');
    }
  };

  const filteredUpdates = updates
    .map((update, idx) => ({
      update,
      summary: summaries[idx] || '',
    }))
    .filter(
      ({ update, summary }) =>
        update.toLowerCase().includes(search.toLowerCase()) ||
        summary.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', background: '#f3f4f6', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={navStyle}>
        <div style={{ fontWeight: 700, fontSize: '2rem', color: '#2563eb' }}>AspirantLink</div>
        <div style={navLinksStyle}>
          <span style={{ color: '#111', fontWeight: 700 }}>Home</span>
          <span>JEE Updates</span>
          <span>NEET Updates</span>
          <span>Articles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            style={searchStyle}
            type="text"
            placeholder="Search updates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span style={bellStyle}>
            <span role="img" aria-label="bell">🔔</span>
            <span style={badgeStyle}>{notificationCount}</span>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroStyle}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '18px' }}>
          Your Gateway to NTA Success
        </h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '32px' }}>
          Get instant notifications about JEE and NEET updates with AI-powered explanations
        </p>
        <div style={buttonRowStyle}>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubscribe('jee');
            }}
            style={{ display: 'inline' }}
          >
            <input
              type="email"
              placeholder="Your email for JEE"
              value={jeeEmail}
              required
              onChange={e => setJeeEmail(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginRight: '10px', fontSize: '16px' }}
            />
            <button type="submit" style={jeeBtnStyle}>
              <span role="img" aria-label="rocket">🚀</span>
              Subscribe for JEE Updates
            </button>
          </form>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubscribe('neet');
            }}
            style={{ display: 'inline' }}
          >
            <input
              type="email"
              placeholder="Your email for NEET"
              value={neetEmail}
              required
              onChange={e => setNeetEmail(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginRight: '10px', fontSize: '16px' }}
            />
            <button type="submit" style={neetBtnStyle}>
              <span role="img" aria-label="heart">💚</span>
              Subscribe for NEET Updates
            </button>
          </form>
        </div>
        {message && <p style={{ marginTop: '24px', fontWeight: 600 }}>{message}</p>}
      </section>

      {/* Updates Section */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>Latest NTA Updates</h2>
        <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '30px' }}>
          Stay informed with the most recent announcements and changes from NTA
        </p>
        {filteredUpdates.length === 0 && (
          <div style={{ color: '#e53935', fontWeight: 600, marginTop: '30px' }}>
            No updates found.
          </div>
        )}
        {filteredUpdates.map(({ update, summary }, idx) => (
          <div key={idx} style={updateCardStyle}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>Update:</div>
            <div style={{ marginBottom: '12px', color: '#2563eb', fontWeight: 500 }}>{update}</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>AI Summary:</div>
            <div style={{ color: '#374151' }}>{summary}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
