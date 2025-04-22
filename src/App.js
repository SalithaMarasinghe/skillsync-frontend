import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [showSignup, setShowSignup] = useState(false); // Default to false
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Session management: fetch user profile from backend if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4043/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Session expired or user not found");
          return res.json();
        })
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("token");
        });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    // Listen for profile updates from ProfileSection
    const handleProfileUpdated = (e) => {
      setUser(e.detail);
    };
    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, []);

  // Update session on login/signup
  const afterAuth = (token) => {
    localStorage.setItem("token", token);
    return fetch("http://localhost:4043/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      });
  };

  const handleLogin = async (values) => {
    try {
      const res = await fetch("http://localhost:4043/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      afterAuth(data.token);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleSignup = async (values) => {
    try {
      const res = await fetch("http://localhost:4043/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 409) {
        alert("Email already exists. Please use a different email.");
        return;
      }
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      afterAuth(data.token);
      setShowSignup(false);
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  // Google OAuth signup handler (popup window)
  const handleGoogleSignup = async () => {
    const clientId = "715372036340-e4j5nagbqers9ocutat52l568cqt05vu.apps.googleusercontent.com";
    const redirectUri = window.location.origin + "/google-oauth-callback.html";
    const scope = "email profile openid";
    const state = Math.random().toString(36).substring(2);
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}&state=${state}`;
    window.open(
      oauthUrl,
      "GoogleSignUp",
      "width=500,height=600,left=200,top=100,status=no,scrollbars=yes,resizable=yes"
    );
    // Listen for message from popup
    window.addEventListener("message", async (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === "google-oauth-token" && event.data.token) {
        try {
          const res = await fetch("http://localhost:4043/api/auth/google-signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: event.data.token })
          });
          if (!res.ok) throw new Error("Google signup failed");
          const data = await res.json();
          await afterAuth(data.token); // Await authentication before redirect
          setShowSignup(false);
          navigate("/");
        } catch (err) {
          alert("Google signup failed: " + err.message);
        }
      }
    }, { once: true });
  };

  // Google OAuth login handler (popup window)
  const handleGoogleLogin = async () => {
    const clientId = "715372036340-e4j5nagbqers9ocutat52l568cqt05vu.apps.googleusercontent.com";
    const redirectUri = window.location.origin + "/google-oauth-callback.html";
    const scope = "email profile openid";
    const state = Math.random().toString(36).substring(2);
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}&state=${state}`;
    window.open(
      oauthUrl,
      "GoogleLogin",
      "width=500,height=600,left=200,top=100,status=no,scrollbars=yes,resizable=yes"
    );
    window.addEventListener("message", async (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === "google-oauth-token" && event.data.token) {
        try {
          const res = await fetch("http://localhost:4043/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: event.data.token })
          });
          if (!res.ok) throw new Error("Google login failed");
          const data = await res.json();
          await afterAuth(data.token);
          setShowSignup(false);
          navigate("/");
        } catch (err) {
          alert("Google login failed: " + err.message);
        }
      }
    }, { once: true });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setShowSignup(false);
  };

  // Show signup page if not authenticated and showSignup is true
  if (!isAuthenticated && showSignup) {
    return <SignupPage onSignup={handleSignup} onGoogleSignup={handleGoogleSignup} onLogin={() => setShowSignup(false)} />;
  }
  // Show login page if not authenticated and showSignup is false
  if (!isAuthenticated && !showSignup) {
    return <LoginPage onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} onShowSignup={() => setShowSignup(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side: Navigation area */}
      <div className="w-1/4 p-5">
        <Navigation user={user} setCurrentSection={setCurrentSection} currentSection={currentSection} onLogout={handleLogout} />
      </div>

      {/* Center: Content area */}
      <div className="flex-1 p-5 overflow-y-auto h-screen">
        {/* Render the relevant content based on the currentSection state */}
        {currentSection === "home" && <HomeSection />}
        {currentSection === "learning-plans" && <LearningPlans />}
        {currentSection === "learning-progress" && <LearningProgress />}
        {currentSection === "profile" ? (
          <ProfileSection user={user} />
        ) : (
          currentSection === "notifications" && <NotificationSection />
        )}
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
