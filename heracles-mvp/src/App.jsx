import { useState } from 'react';
import './App.css';

import WelcomeScreen from './screens/WelcomeScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerifyIdentityScreen from './screens/VerifyIdentityScreen';
import UploadDocumentsScreen from './screens/UploadDocumentsScreen';
import VerificationFailureScreen from './screens/VerificationFailureScreen';
import VerificationSubmittedScreen from './screens/VerificationSubmitted';
import HomeFeedScreen from './screens/HomeFeedScreen';
import VerifiedHomeFeed from './screens/VerifiedHomeFeed';
import UnverifiedHomeFeed from './screens/UnverifiedHomeFeed';
import UnverifiedTermsScreen from './screens/UnverifiedTerms';
import SearchScreen from './screens/SearchScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ActivityScreen from './screens/ActivityScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedIdType, setSelectedIdType] = useState(null);

  const navigate = (screen, payload) => {
    if (screen === 'uploadDocuments' && payload) {
      setSelectedIdType(payload);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigate} />;
      case 'createProfile':
        return <CreateProfileScreen onNavigate={navigate} />;
      case 'login':
        return <LoginScreen onNavigate={navigate} />;
      case 'forgotPassword':
        return <ForgotPasswordScreen onNavigate={navigate} />;
      case 'verifyIdentity':
        return <VerifyIdentityScreen onNavigate={navigate} />;
      case 'uploadDocuments':
        return <UploadDocumentsScreen onNavigate={navigate} idType={selectedIdType} />;
      case 'verificationFailure':
        return <VerificationFailureScreen onNavigate={navigate} />;
      case 'verificationSubmitted':
        return <VerificationSubmittedScreen onNavigate={navigate} />;
      case 'homeFeed':
        return <HomeFeedScreen onNavigate={navigate} />;
      case 'verifiedHomeFeed':
        return <VerifiedHomeFeed onNavigate={navigate} />;
      case 'unverifiedHomeFeed':
        return <UnverifiedHomeFeed onNavigate={navigate} />;
      case 'unverifiedTerms':
        return <UnverifiedTermsScreen onNavigate={navigate} />;
      case 'search':
        return <SearchScreen onNavigate={navigate} />;
      case 'createPost':
        return <CreatePostScreen onNavigate={navigate} />;
      case 'activity':
        return <ActivityScreen onNavigate={navigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigate} />;
      default:
        return <WelcomeScreen onNavigate={navigate} />;
    }
  };

  return renderScreen();
}

export default App;
