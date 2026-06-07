import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const avatarMap = {
  alex_chen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  sarah_m: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  mike_t: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  emma_w: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  james_k: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
};

function getAvatarUrl(username) {
  return avatarMap[username] || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&size=100`;
}

const iconMap = {
  follow: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  like: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  comment: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  share: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
};

function ActivityScreen({ onNavigate }) {
  const notifications = [
    { id: 1, user: 'alex_chen', action: 'followed your profile', time: '2m ago', type: 'follow' },
    { id: 2, user: 'sarah_m', action: 'liked your verification status', time: '15m ago', type: 'like' },
    { id: 3, user: 'mike_t', action: 'commented on your post', time: '1h ago', type: 'comment' },
    { id: 4, user: 'emma_w', action: 'shared your story', time: '3h ago', type: 'share' },
    { id: 5, user: 'james_k', action: 'started following you', time: '5h ago', type: 'follow' },
  ];

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title="Activity" />
      <div style={{ flex: 1, padding: '8px 0' }}>
        {notifications.map((n) => (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'center',
            padding: '14px 20px',
            borderBottom: '1px solid #f3f4f6',
            transition: 'background 0.15s',
          }}>
            <img
              src={getAvatarUrl(n.user)}
              alt={n.user}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                marginRight: '14px', objectFit: 'cover',
                backgroundColor: '#f0f0f0', flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
                <strong>{n.user}</strong> {n.action}
              </p>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>{n.time}</span>
            </div>
            <div style={{ flexShrink: 0, marginLeft: '10px' }}>
              {iconMap[n.type] || null}
            </div>
          </div>
        ))}
      </div>
      <BottomNav activeTab="activity" onNavigate={onNavigate} />
    </div>
  );
}

export default ActivityScreen;