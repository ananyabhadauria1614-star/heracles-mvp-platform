import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import { supabase } from '../utils/supabaseClient';

const API_URL = '/api';

function UnverifiedHomeFeed({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(
    () => localStorage.getItem('verificationStatus') || 'unverified'
  );
  const userId = localStorage.getItem('heracles_user_id') || '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8';
  const pollRef = useRef(null);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/feed/${userId}`);
        const data = await response.json();
        if (data.success) {
          const raw = data.posts || [];
          const cleanPosts = raw.filter(post => {
            return post.image_url && post.image_url.trim() !== "" && !post.image_url.includes('ui-avatars.com');
          });
          setPosts(cleanPosts);
        }
      } catch (err) {
        console.error('Failed to load posts:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Polling: check status every 3s when pending
  useEffect(() => {
    if (verificationStatus === 'pending' && userId) {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/auth/status/${userId}`);
          const data = await res.json();
          const newStatus = data.status || 'unverified';

          // Only transition to terminal states — never regress from pending
          if (newStatus === 'verified' || newStatus === 'failed') {
            clearInterval(pollRef.current);
            pollRef.current = null;
            setVerificationStatus(newStatus);
            localStorage.setItem('verificationStatus', newStatus);

            if (newStatus === 'verified') {
              onNavigate('verifiedHomeFeed');
            }
          }
        } catch (err) {
          console.error('Status poll error:', err.message);
        }
      }, 3000);
    }

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, [verificationStatus, userId, onNavigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Sign out error:', err.message);
    }
    localStorage.clear();
    onNavigate('welcome');
  };

  const logoutIcon = (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const stories = [
    { name: 'Your story', hasStory: false },
    { name: 'alex_chen', hasStory: true, verified: true },
    { name: 'user_2847', hasStory: true, verified: false },
    { name: 'sarah_m', hasStory: true, verified: true },
    { name: 'guest_user', hasStory: false, verified: false },
    { name: 'mike_t', hasStory: true, verified: true },
  ];

  // ── Banner Icon Renderers ────────────────────────────────────────────────

  const blueShieldIcon = (
    <div className="verification-cta-icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const orangeClockIcon = (
    <div className="verification-cta-icon" style={{ color: '#f59e0b' }}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const redWarningIcon = (
    <div className="verification-cta-icon" style={{ color: '#ef4444' }}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    </div>
  );

  // ── Banner Content ───────────────────────────────────────────────────────

  const renderBanner = () => {
    // Scenario C: verified — hide banner entirely
    if (verificationStatus === 'verified') {
      return null;
    }

    // Scenario D: failed
    if (verificationStatus === 'failed') {
      return (
        <div className="verification-cta-banner">
          {redWarningIcon}
          <div className="verification-cta-content">
            <h3 className="verification-cta-title">Verification Failed</h3>
            <p className="verification-cta-desc">
              Our text scanners could not recognize valid identification details. Please upload clear, unshaded photos.
            </p>
          </div>
          <Button variant="primary" onClick={() => onNavigate('verifyIdentity')}>
            Retry Verification
          </Button>
        </div>
      );
    }

    // Scenario B: pending
    if (verificationStatus === 'pending') {
      return (
        <div className="verification-cta-banner">
          {orangeClockIcon}
          <div className="verification-cta-content">
            <h3 className="verification-cta-title">Verification Pending</h3>
            <p className="verification-cta-desc">
              Our microservice is scanning your document layers. Your account will automatically unlock once approved.
            </p>
          </div>
        </div>
      );
    }

    // Scenario A: unverified or missing (default)
    return (
      <div className="verification-cta-banner">
        {blueShieldIcon}
        <div className="verification-cta-content">
          <h3 className="verification-cta-title">Verify your identity</h3>
          <p className="verification-cta-desc">
            Access the trusted community and connect with verified users.
          </p>
        </div>
        <Button variant="primary" onClick={() => onNavigate('verifyIdentity')}>
          Get Verified
        </Button>
      </div>
    );
  };

  return (
    <div className="screen unverified-home-screen">
      <Header
        title="Heracles"
        action={{ icon: logoutIcon, onClick: handleLogout }}
      />
      <div className="screen-content home-feed-content">
        {/* Dynamic Verification Banner */}
        {renderBanner()}

        {/* Stories Section */}
        <div className="stories-section">
          <div className="stories-scroll">
            {stories.map((story, index) => (
              <div key={index} className="story-item">
                <div className={`story-ring ${story.hasStory ? '' : 'no-story'} ${story.verified ? 'verified-ring' : ''}`}>
                  <div className="story-avatar">
                    <div className="story-avatar-placeholder"></div>
                  </div>
                </div>
                <span className="story-name">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="post-card"><p>Loading posts…</p></div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <div className="post-avatar"></div>
                <div className="post-user-info">
                  <div className="post-username">{post.username || post.author_id || 'Anonymous'}</div>
                </div>
              </div>
              {post.image_url && !post.image_url.includes('ui-avatars') && (
                <img src={post.image_url} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
              )}
              {post.caption && post.caption.trim() !== "" && post.caption !== (post.username || post.author_id || 'Anonymous') && (
                <div className="post-caption">{post.caption}</div>
              )}
            </div>
          ))
        ) : (
          <div className="post-card">
            <p>No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>
      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}

export default UnverifiedHomeFeed;