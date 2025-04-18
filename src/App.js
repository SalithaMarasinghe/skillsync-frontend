import { useState } from "react";
import "./App.css";
import LearningPlans from "./components/LearningPlansSection/LearningPlan";
import Navigation from "./components/Navigation/Navigation"; // Make sure Navigation is properly imported
import HomeSection from "./components/HomeSection/HomeSection"; // Correct HomeSection import
import ProfileSection from "./components/ProfileSection/ProfileSection";
import NotificationSection from "./components/NotificationSection/NotificationSection";
import MessageSection from "./components/MessageSection/MessageSection";
import ExploreSection from "./components/ExploreSection/ExploreSection";
import LearningProgress from "./components/LearningProgressSection/LearningProgress";
import AIChatbotSection from "./components/AIChatbotSection/AIChatbotSection";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";

function App() {
  // Track the current section to dynamically change the view
  const [currentSection, setCurrentSection] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  const handleLogin = (values) => {
    // For demo: accept any gmail/password
    setIsAuthenticated(true);
  };

  const handleSignup = (values) => {
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  const handleGoogleAuth = () => {
    // For demo: just authenticate
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  if (!isAuthenticated) {
    if (showSignup) {
      return <SignupPage onSignup={handleSignup} onGoogleAuth={handleGoogleAuth} />;
    }
    return <LoginPage onLogin={handleLogin} onGoogleAuth={handleGoogleAuth} onShowSignup={() => setShowSignup(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side: Navigation area */}
      <div className="w-1/4 p-5">
        <Navigation setCurrentSection={setCurrentSection} currentSection={currentSection} onLogout={() => setIsAuthenticated(false)} />
      </div>

      {/* Center: Content area */}
      <div className="flex-1 p-5 overflow-y-auto h-screen">
        {/* Render the relevant content based on the currentSection state */}
        {currentSection === "home" && <HomeSection />}
        {currentSection === "learning-plans" && <LearningPlans />}
        {currentSection === "learning-progress" && <LearningProgress />}
        {currentSection === "profile" && <ProfileSection />}
        {currentSection === "notifications" && <NotificationSection />}
        {currentSection === "messages" && <MessageSection />}
        {currentSection === "explore" && <ExploreSection />}
      </div>

      {/* Right side: AI Chatbot only */}
      <div className="w-1/4 p-5 flex flex-col h-screen">
        <AIChatbotSection className="flex-1" />
      </div>
    </div>
  );
}

export default App;
