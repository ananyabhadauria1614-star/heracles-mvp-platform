import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';

function ProfileScreen({ onNavigate }) {
  const [verificationStatus] = useState(
    () => localStorage.getItem('verificationStatus') || 'unverified'
  );
  const [username] = useState(
    () => localStorage.getItem('username') || localStorage.getItem('fullName') || 'daisy'
  );
  const [profileImage] = useState(
    () => localStorage.getItem('profileImage') || ''
  );

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (_) {}
    localStorage.clear();
    onNavigate('login');
  };

  const getBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return { text: '✓ Verified Member', color: '#10b981' };
      case 'pending':
        return { text: '◴ Verification Pending', color: '#f59e0b' };
      case 'failed':
        return { text: '✕ Verification Failed', color: '#ef4444' };
      default:
        return { text: '⚠ Unverified Member', color: '#9ca3af' };
    }
  };

  const badge = getBadge();

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title="Profile" />
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Avatar */}
        <div style={{
          width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
          overflow: 'hidden',
        }}>
          {profileImage ? (
            <img src={profileImage} alt={username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Username */}
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: '#111' }}>{username}</h3>

        {/* Dynamic Verification Badge */}
        <p style={{ fontSize: '13px', color: badge.color, fontWeight: '600', marginBottom: '24px' }}>
          {badge.text}
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '32px', marginBottom: '32px', textAlign: 'center',
        }}>
          <div>
            <p style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#111' }}>128</p>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Followers</span>
          </div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#111' }}>84</p>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Following</span>
          </div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#111' }}>12</p>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Posts</span>
          </div>
        </div>

        {/* Sign Out */}
        <div style={{ marginTop: 'auto', width: '100%', maxWidth: '380px' }}>
          <Button variant="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <BottomNav activeTab="profile" onNavigate={onNavigate} />
    </div>
  );
}

export default ProfileScreen;