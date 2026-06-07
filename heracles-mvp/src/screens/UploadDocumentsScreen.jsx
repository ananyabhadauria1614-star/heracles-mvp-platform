import { useState, useRef } from 'react';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

function UploadDocumentsScreen({ onNavigate, idType }) {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const selfieInputRef = useRef(null);

  const handleFrontClick = () => {
    frontInputRef.current?.click();
  };

  const handleBackClick = () => {
    backInputRef.current?.click();
  };

  const handleSelfieClick = () => {
    selfieInputRef.current?.click();
  };

  const handleFrontChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFrontFile(file);
    }
  };

  const handleBackChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackFile(file);
    }
  };

  const handleSelfieChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfieFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!frontFile || !backFile || !selfieFile) {
      setError('All three files (ID Front, ID Back, and Selfie) are strictly required to proceed with verification.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const userId = localStorage.getItem('heracles_user_id') || 'current-user';

      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('document_type', idType || 'unknown');
      formData.append('front_image', frontFile);
      formData.append('back_image', backFile);
      formData.append('selfie_image', selfieFile);

      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/upload-documents`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Upload failed. Please try again.');
        return;
      }

      localStorage.setItem('verificationStatus', 'pending');
      onNavigate('verificationSubmitted');
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="screen upload-documents-screen">
      <BackButton onClick={() => onNavigate('verifyIdentity')} />
      <div className="screen-content">
        <h2 className="upload-documents-title">Upload documents</h2>
        <div className="upload-zones">
          <div className="upload-zone upload-zone-clickable" onClick={handleFrontClick}>
            {frontFile ? (
              <span className="upload-zone-label upload-zone-selected">✓ {frontFile.name}</span>
            ) : (
              <>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 8l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="upload-zone-label">Front of ID</span>
              </>
            )}
            <input
              ref={frontInputRef}
              type="file"
              accept="image/*"
              className="file-input-hidden"
              onChange={handleFrontChange}
            />
          </div>
          <div className="upload-zone upload-zone-clickable" onClick={handleBackClick}>
            {backFile ? (
              <span className="upload-zone-label upload-zone-selected">✓ {backFile.name}</span>
            ) : (
              <>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 8l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="upload-zone-label">Back of ID</span>
              </>
            )}
            <input
              ref={backInputRef}
              type="file"
              accept="image/*"
              className="file-input-hidden"
              onChange={handleBackChange}
            />
          </div>
          <div className="selfie-section">
            <button className="selfie-btn" onClick={handleSelfieClick}>
              {selfieFile ? (
                <span>✓ {selfieFile.name}</span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Take a selfie</span>
                </>
              )}
            </button>
            <input
              ref={selfieInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="file-input-hidden"
              onChange={handleSelfieChange}
            />
          </div>
        </div>
        {error && <span className="error-text">{error}</span>}
        <div className="upload-documents-buttons">
          <Button variant="primary" onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Submit for verification'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocumentsScreen;