import React, { useState } from 'react';

export default function CreateProfileScreen({ onNavigate }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("Selected file:", e.target.files[0].name);
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSharePost = async () => {
    const imageFile = profilePic;

    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('heracles_user_id') || '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8');
    formData.append('username', username || 'anonymous');
    formData.append('caption', fullName || '');
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try {
      // Store user info in localStorage for profile screen and other components
      localStorage.setItem('username', username || 'anonymous');
      localStorage.setItem('fullName', fullName || '');

      console.log("Connecting to backend server at http://localhost:8000/posts/create...");
      const response = await fetch('http://localhost:8000/posts/create', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log("Backend Server Response:", result);

      if (response.ok) {
        // Save profile image URL globally for ProfileScreen and other components
        const postImage = result?.post?.[0]?.image_url || result?.data?.[0]?.image_url;
        if (postImage) {
          localStorage.setItem('profileImage', postImage);
        }
        if (typeof onNavigate === 'function') {
          onNavigate('homeFeed');
        }
      } else {
        alert("Backend error creating post.");
      }
    } catch (err) {
      console.error("Failed to establish network route connection to server:", err);
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
    </div>
  );
}