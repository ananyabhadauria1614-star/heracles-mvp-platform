import Button from '../components/Button';

function WelcomeScreen({ onNavigate }) {
  return (
    <div className="screen welcome-screen">
      <h1 className="welcome-title">Heracles</h1>
      <p className="welcome-subtitle">safer us for a safer you</p>
      <div className="welcome-buttons">
        <Button variant="primary" onClick={() => onNavigate('createProfile')}>
          Create your account
        </Button>
        <Button variant="secondary" onClick={() => onNavigate('login')}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default WelcomeScreen;