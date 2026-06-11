import React, { useState } from 'react';

export default function CreateProfileScreen({ onNavigate }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = '/api';

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("Selected file:", e.target.files[0].name);
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSharePost = async () => {
    setError('');

    if (!fullName || !username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      console.log(`Connecting to backend server at ${API_URL}/auth/signup...`);
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          username: username,
          email: email,
          password: password,
          verification_status: 'unverified',
        }),
      });

      const result = await response.json();
      console.log("Backend Server Response:", result);

      if (!result.success) {
        setError(result.error || 'Registration failed. Please try again.');
        return;
      }

      // Store user info in localStorage
      localStorage.setItem('heracles_user_id', result.user || '');
      localStorage.setItem('username', username);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('verificationStatus', 'unverified');

      // Upload profile picture if selected (separate request)
      if (profilePic) {
        const formData = new FormData();
        formData.append('user_id', result.user || '');
        formData.append('username', username);
        formData.append('caption', fullName);
        formData.append('file', profilePic);
        try {
          await fetch(`${API_URL}/posts/create`, { method: 'POST', body: formData });
        } catch (_) {
          // Non-critical — registration already succeeded
        }
      }

      if (typeof onNavigate === 'function') {
        onNavigate('homeFeed');
      }
    } catch (err) {
      console.error("Failed to establish network route connection to server:", err);
      setError('Cannot connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <form onSubmit={(e) => { e.preventDefault(); handleSharePost(); }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>Create your account</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <label style={{
            width: '100px', height: '100px', borderRadius: '50%', border: '1px dashed #ccc',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backgroundColor: '#f9f9f9', fontSize: '12px', color: '#888'
          }}>
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>+</span>
            {profilePic ? 'Photo added' : 'Add photo'}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', display: 'block', marginBottom: '5px' }}>FULL NAME</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', display: 'block', marginBottom: '5px' }}>USERNAME</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', display: 'block', marginBottom: '5px' }}>EMAIL</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', display: 'block', marginBottom: '5px' }}>PASSWORD</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '15px', backgroundColor: '#111', color: '#fff',
          border: 'none', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
        }}>
          {loading ? 'Processing...' : 'Continue'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Already have an account?{' '}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
          style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}
        >
          Log In
        </a>
      </p>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#9ca3af' }}>
        Your data is safely stored in Supabase
      </p>
    </div>
  );
}
