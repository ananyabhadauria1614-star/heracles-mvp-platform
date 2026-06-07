import BackButton from '../components/BackButton';
import Button from '../components/Button';

function VerificationFailureScreen({ onNavigate }) {
  return (
    <div className="screen verification-failure-screen">
      <BackButton onClick={() => onNavigate('uploadDocuments')} />
      <div className="screen-content">
        <div className="verification-failure-pill">
          <span className="verification-failure-pill-dot"></span>
          <span>Not Verified</span>
        </div>
        <h2 className="verification-failure-title">Verification unsuccessful</h2>
        <p className="verification-failure-desc">
          We couldn't verify your documents. This may be due to poor image quality or incorrect information. Please try again.
        </p>
        <div className="verification-failure-buttons">
          <Button variant="secondary" onClick={() => onNavigate('verifyIdentity')}>
            Back
          </Button>
          <Button variant="primary" onClick={() => onNavigate('verifyIdentity')}>
            Retry Verification
          </Button>
        </div>
        <div className="verification-failure-skip">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('unverifiedHomeFeed'); }}>
            Continue without verification
          </a>
        </div>
      </div>
    </div>
  );
}

export default VerificationFailureScreen;