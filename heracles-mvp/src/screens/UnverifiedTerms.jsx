import BackButton from '../components/BackButton';
import Button from '../components/Button';

function UnverifiedTermsScreen({ onNavigate }) {
  const handleAccept = () => {
    sessionStorage.setItem('acceptedUnverifiedTerms', 'true');
    onNavigate('unverifiedHomeFeed');
  };

  return (
    <div className="screen unverified-terms-screen">
      <BackButton onClick={() => onNavigate('verifyIdentity')} />
      <div className="screen-content">
        <h2 className="unverified-terms-title">Proceed Unverified</h2>
        <p className="unverified-terms-subtitle">
          By proceeding unverified, you acknowledge that certain visibility, interaction, and trust features may be restricted under Heracles safety policies.
        </p>
        <div className="terms-info-card">
          <ul className="terms-bullet-list">
            <li>Verified users will not see your posts</li>
            <li>You will only access the public community</li>
            <li>Trust and visibility features will be limited</li>
            <li>Unverified content remains separated from the verified community</li>
            <li>You can verify your identity later at any time</li>
            <li>You will not see verified users' posts and cannot interact with verified users' content</li>
          </ul>
        </div>
        <div className="unverified-terms-buttons">
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('verifyIdentity')}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnverifiedTermsScreen;