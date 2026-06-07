import { useState, useRef } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function CreatePostScreen({ onNavigate }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleShare = async () => {
    if (!file) {
      setError('Please select an image to share.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      let userId = localStorage.getItem('heracles_user_id') || '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8';
      // Extract clean UUID if localStorage contains a full user object string
      const uuidMatch = userId.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
      if (uuidMatch) userId = uuidMatch[1];
      const username = localStorage.getItem('username') || 'Guest';

      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('username', username);
      formData.append('caption', caption);
      formData.append('file', file);

      const res = await fetch(`${API_URL}/posts/create`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.status !== 'success') {
        setError(data.message || 'Failed to create post. Please try again.');
        return;
      }

      onNavigate('homeFeed');
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title="Create Post" />
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
        {/* Image Picker */}
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%', minHeight: '200px', border: '2px dashed #d1d5db', borderRadius: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#f9fafb', marginBottom: '20px', cursor: 'pointer', overflow: 'hidden',
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
          ) : (
            <>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 8l-5-5-5 5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v12" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>Tap to upload image</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        {/* Caption Text Area */}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            width: '100%', minHeight: '120px', padding: '14px', borderRadius: '10px',
            border: '1px solid #e5e7eb', fontSize: '14px', fontFamily: 'inherit',
            resize: 'vertical', boxSizing: 'border-box', marginBottom: '20px',
          }}
        />

        {error && (
          <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <Button variant="primary" onClick={handleShare} disabled={uploading}>
          {uploading ? 'Sharing…' : 'Share Post'}
        </Button>
      </div>
      <BottomNav activeTab="create" onNavigate={onNavigate} />
    </div>
  );
}

export default CreatePostScreen;