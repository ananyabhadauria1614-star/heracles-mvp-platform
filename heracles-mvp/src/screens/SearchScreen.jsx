import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const API_URL = '/api';

function SearchScreen({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('heracles_user_id') || '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8';
        const res = await fetch(`${API_URL}/posts/feed/${userId}`);
        const data = await res.json();
        if (data.success) {
          const uniqueCreators = [];
          const seen = new Set();
          for (const post of (data.posts || [])) {
            if (!seen.has(post.username) && post.username) {
              seen.add(post.username);
              uniqueCreators.push({
                id: post.user_id || post.id,
                username: post.username,
                avatar: post.image_url && !post.image_url.includes('ui-avatars')
                  ? post.image_url
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(post.username)}&background=random&size=100`
              });
            }
          }
          setCreators(uniqueCreators);
          setFilteredCreators(uniqueCreators);
        }
      } catch (err) {
        console.error("Explore fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCreators(creators);
    } else {
      const filtered = creators.filter(c =>
        c.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCreators(filtered);
    }
  };

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title="Explore" />
      <div style={{ flex: 1, padding: '16px 0' }}>
        {/* Search Box */}
        <div style={{ padding: '0 16px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search creators or hashtags..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: '100%', height: '44px', backgroundColor: '#f1f2f6',
              borderRadius: '10px', border: 'none', padding: '0 16px',
              fontSize: '15px', color: '#000', boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <span style={{ color: '#888', fontSize: '14px' }}>Loading creators…</span>
          </div>
        ) : filteredCreators.length === 0 ? (
          <div style={{ marginTop: '100px', textAlign: 'center' }}>
            <span style={{ color: '#888', fontSize: '14px' }}>
              {searchQuery ? `No creators found matching "${searchQuery}"` : 'No creators yet. Be the first to post!'}
            </span>
          </div>
        ) : (
          filteredCreators.map((creator) => (
            <div key={creator.id} style={{
              display: 'flex', alignItems: 'center',
              padding: '12px 16px', borderBottom: '0.5px solid #f1f2f6',
            }}>
              <img
                src={creator.avatar}
                alt={creator.username}
                style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  marginRight: '12px', backgroundColor: '#eee',
                  objectFit: 'cover', flexShrink: 0,
                }}
              />
              <div>
                <span style={{ fontWeight: '600', fontSize: '15px', color: '#000' }}>@{creator.username}</span>
                <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0 0' }}>Verified Community Member</p>
              </div>
              <button
                onClick={() => alert(`Following ${creator.username}`)}
                style={{
                  marginLeft: 'auto', backgroundColor: '#000', color: '#fff',
                  padding: '6px 16px', borderRadius: '6px', border: 'none',
                  fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                }}
              >
                Follow
              </button>
            </div>
          ))
        )}
      </div>
      <BottomNav activeTab="search" onNavigate={onNavigate} />
    </div>
  );
}

export default SearchScreen;