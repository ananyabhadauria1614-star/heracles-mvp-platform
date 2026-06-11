import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';

const API_URL = '/api';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordScreen({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => onNavigate('login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [sent, onNavigate]);

  const handleSubmit = async () => {
    setError('');

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSending(true);

    try {
      await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (_) {
      // Swallow errors — never reveal whether account exists
    }

    setSending(false);
    setSent(true);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '40px 24px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}>
        {/* Lock Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="16" r="1.5" fill="#111" />
            <path d="M12 17.5v2" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', color: '#111' }}>
          Trouble logging in?
        </h2>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '28px', lineHeight: '1.5' }}>
          Enter your email and we'll send you a link to get back into your account.
        </p>

        {/* Input */}
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {/* Success Message Card */}
        {sent && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
          }}>
            <p style={{ color: '#166534', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
              If this email matches an active account, a recovery link has been dispatched to your inbox.
            </p>
          </div>
        )}

        {/* Button */}
        {!sent && (
          <Button variant="primary" onClick={handleSubmit} disabled={sending}>
            {sending ? 'Sending…' : 'Send Login Link'}
          </Button>
        )}

        {/* Back to Login */}
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
            style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;