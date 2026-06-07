function BottomNav({ activeTab = 'home', onNavigate }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate && onNavigate('homeFeed')}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-item-label">Home</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => onNavigate && onNavigate('search')}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-item-label">Search</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'create' ? 'active' : ''}`}
        onClick={() => onNavigate && onNavigate('createPost')}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8v8M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-item-label">Create</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
        onClick={() => onNavigate && onNavigate('activity')}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-item-label">Activity</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onNavigate && onNavigate('profile')}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-item-label">Profile</span>
      </button>
    </nav>
  );
}

export default BottomNav;