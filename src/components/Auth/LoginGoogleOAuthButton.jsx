import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const LoginGoogleOAuthButton = ({ onSuccess, onError }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return (
      <div className="text-red-600 text-sm text-center my-2">
        Google Client ID is missing. Please check your .env file and restart the app.
      </div>
    );
  }
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={(err) => {
        console.error("Google OAuth error", err);
        if (onError) onError(err);
      }}
      useOneTap={false}
      width="100%"
      text="signin_with"
      shape="rectangular"
      theme="filled_blue"
    />
  );
};

export default LoginGoogleOAuthButton;
