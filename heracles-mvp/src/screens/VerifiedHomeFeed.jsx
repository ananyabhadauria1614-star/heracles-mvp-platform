import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { supabase } from '../utils/supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function VerifiedHomeFeed({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const storyInputRef = useRef(null);

  const userId = localStorage.getItem('heracles_user_id') || '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8';
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, storiesRes] = await Promise.all([
          fetch(`${API_URL}/posts/feed/${userId}`),
          fetch(`${API_URL}/stories/active`),
        ]);
        const postsData = await postsRes.json();
        const storiesData = await storiesRes.json();
        if (postsData.success) {
          const raw = postsData.posts || [];
          const cleanPosts = raw.filter(post => {
            return post.image_url && post.image_url.trim() !== "" && !post.image_url.includes('ui-avatars.com');
          });
          setPosts(cleanPosts);
        }
        if (storiesData.success) setStories(storiesData.stories || []);
      } catch (err) {
        console.error('Failed to load feed:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStoryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('username', username);
      formData.append('media', file);
      await fetch(`${API_URL}/stories/create`, { method: 'POST', body: formData });
      // Refresh stories
      const res = await fetch(`${API_URL}/stories/active`);
      const data = await res.json();
      if (data.success) setStories(data.stories || []);
    } catch (err) {
      console.error('Story upload failed:', err.message);
    }
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleLogout = async () => {
    try { await supabase.auth.signOut(); } catch (_) {}
    onNavigate('welcome');
  };

  const logoutIcon = (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="screen verified-home-screen">
      <Header title="Heracles" action={{ icon: logoutIcon, onClick: handleLogout }} />
      <div className="screen-content home-feed-content">
        {/* Trust Banner */}
        <div className="trust-banner">
          <span className="trust-banner-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="trust-banner-text">Trusted Community</span>
        </div>

        {/* Stories Section */}
        <div className="stories-section">
          <div className="stories-scroll">
            {/* + Add Story Button */}
            <div className="story-item">
              <div className="story-ring no-story" onClick={() => storyInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                <div className="story-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
                  <span style={{ fontSize: '24px', color: '#111', fontWeight: '300' }}>+</span>
                </div>
              </div>
              <span className="story-name">Your story</span>
              <input ref={storyInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleStoryUpload} />
            </div>

            {/* Dynamic Stories */}
            {stories.map((story) => (
              <div key={story.id} className="story-item">
                <div className="story-ring">
                  <div className="story-avatar">
                    {story.media_url ? (
                      <img src={story.media_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div className="story-avatar-placeholder"></div>
                    )}
                  </div>
                </div>
                <span className="story-name">{story.username || 'User'}</span>
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
                  <div className="post-username">
                    {post.username || 'Anonymous'}
                    <span className="verified-badge">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              {post.image_url && !post.image_url.includes('ui-avatars') && (
                <img src={post.image_url} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
              )}
              {post.caption && post.caption.trim() !== "" && post.caption !== (post.username || 'Anonymous') && (
                <div className="post-caption">{post.caption}</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                    color: likedPosts[post.id] ? '#ef4444' : '#9ca3af', fontSize: '14px', padding: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={likedPosts[post.id] ? '#ef4444' : 'none'} xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      stroke={likedPosts[post.id] ? '#ef4444' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {likedPosts[post.id] ? 'Liked' : 'Like'}
                </button>
              </div>
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

export default VerifiedHomeFeed;