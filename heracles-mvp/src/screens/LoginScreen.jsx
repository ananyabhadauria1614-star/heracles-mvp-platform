import { useState } from 'react';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';

const API_URL = '/api';

function LoginScreen({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      localStorage.setItem('heracles_user_id', data.user_id);
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('verificationStatus', data.verification_status);

      onNavigate('verifyIdentity');
    } catch (err) {
      setError('Cannot connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen login-screen">
      <BackButton onClick={() => onNavigate('welcome')} />
      <div className="screen-content">
        <h2 className="login-title">Welcome back</h2>
        <div className="login-form">
          <Input
            label="Email or Username"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span className="error-text">{error}</span>}
          <div className="login-forgot">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('forgotPassword'); }}>
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="mt-auto">
          <Button variant="primary" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </Button>
          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('createProfile'); }}>
                Sign up
              </a>
            </p>
          </div>
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#9ca3af' }}>
            🔒 Your data is safely stored in Supabase
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;