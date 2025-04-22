import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid Gmail address").matches(/@gmail\.com$/, "Only Gmail accounts allowed").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = ({ onLogin, onGoogleLogin, onShowSignup }) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign In</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Gmail</label>
            <input
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="yourname@gmail.com"
              autoComplete="username"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              className="w-full border rounded px-3 py-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold mt-2"
          >
            Sign In
          </button>
        </form>
        {/* Google login button at the bottom */}
        <button
          type="button"
          className="w-full bg-red-500 text-white px-4 py-2 rounded font-semibold flex items-center justify-center gap-2 mt-4"
          onClick={onGoogleLogin}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.5 24.5C47.5 22.8 47.4 21.2 47.1 19.7H24V28.3H37.6C37 31.1 35.3 33.5 32.8 35.1V40.1H40.2C44.3 36.3 47.5 30.9 47.5 24.5Z" fill="#4285F4"/>
              <path d="M24 48C30.5 48 36 45.9 40.2 40.1L32.8 35.1C30.7 36.5 27.8 37.5 24 37.5C17.7 37.5 12.1 33.5 10.2 28.1H2.6V33.3C6.8 41.1 14.7 48 24 48Z" fill="#34A853"/>
              <path d="M10.2 28.1C9.7 26.7 9.4 25.2 9.4 23.5C9.4 21.8 9.7 20.3 10.2 18.9V13.7H2.6C0.9 16.8 0 20.1 0 23.5C0 26.9 0.9 30.2 2.6 33.3L10.2 28.1Z" fill="#FBBC05"/>
              <path d="M24 9.5C27.2 9.5 29.9 10.6 31.9 12.4L39.1 6.2C36 3.3 30.5 0 24 0C14.7 0 6.8 6.9 2.6 13.7L10.2 18.9C12.1 13.5 17.7 9.5 24 9.5Z" fill="#EA4335"/>
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Sign in with Google
        </button>
        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={onShowSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
