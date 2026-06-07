import { useState } from 'react';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

function VerifyIdentityScreen({ onNavigate }) {
  const [selectedId, setSelectedId] = useState(null);

  const idTypes = [
    {
      id: 'drivers',
      label: "Driver's Licence",
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 9h4M14 12h4M14 15h2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'passport',
      label: 'Passport',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="2" width="16" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 16h8M8 19h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'national',
      label: 'National ID',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="10" r="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8h6M12 12h6M6 16h12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'residence',
      label: 'Residence Permit/Visa',
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M12 18v-6M9 15h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="screen verify-identity-screen">
      <BackButton onClick={() => onNavigate('createProfile')} />
      <div className="screen-content">
        <h2 className="verify-identity-title">Verify your identity</h2>
        <p className="verify-identity-subtitle">Select your ID type</p>
        <div className="id-type-list">
          {idTypes.map((idType) => (
            <button
              key={idType.id}
              className={`id-type-card ${selectedId === idType.id ? 'selected' : ''}`}
              onClick={() => setSelectedId(idType.id)}
            >
              <div className="id-type-card-left">
                <div className="id-type-card-icon">{idType.icon}</div>
                <span className="id-type-card-label">{idType.label}</span>
              </div>
              <div className="id-type-card-check">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>
        <div className="verify-identity-buttons">
          <Button
            variant="primary"
            onClick={() => onNavigate('uploadDocuments', selectedId)}
            disabled={!selectedId}
          >
            Continue
          </Button>
          <div className="or-divider">
            <span>OR</span>
          </div>
          <Button
            variant="secondary"
            onClick={() => onNavigate('unverifiedHomeFeed')}
          >
            Proceed Unverified
          </Button>
          <a className="unverified-terms-link" href="#" onClick={(e) => { e.preventDefault(); onNavigate('unverifiedTerms'); }}>
            Terms of proceeding unverified
          </a>
        </div>
      </div>
    </div>
  );
}

export default VerifyIdentityScreen;