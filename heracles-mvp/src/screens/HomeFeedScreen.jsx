import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

function HomeFeedScreen({ onNavigate }) {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const status = user?.user_metadata?.verification_status;
        if (status === 'verified') {
          onNavigate('verifiedHomeFeed');
        } else {
          onNavigate('unverifiedHomeFeed');
        }
      } catch (err) {
        console.error('Auth check failed:', err.message);
        onNavigate('unverifiedHomeFeed');
      } finally {
        setChecking(false);
      }
    };
    checkVerification();
  }, [onNavigate]);

  if (checking) {
    return (
      <div className="screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p>Loading your feed…</p>
      </div>
    );
  }

  return null;
}

export default HomeFeedScreen;