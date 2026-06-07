import Button from '../components/Button';

function VerificationSubmittedScreen({ onNavigate }) {
  return (
    <div className="screen verification-submitted-screen">
      <div className="screen-content">
        <div className="submitted-icon">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--green)" strokeWidth="2" />
            <path d="M20 32l8 8 16-16" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="submitted-title">Pending Approval</h2>
        <p className="submitted-desc">
          Your identity documents have been submitted and are under review.
          You will be notified once verification is complete.
        </p>
        <div className="submitted-continue">
          <Button variant="primary" onClick={() => onNavigate('homeFeed')}>
            Go to Home Feed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationSubmittedScreen;
