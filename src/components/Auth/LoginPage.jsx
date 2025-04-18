import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid Gmail address").matches(/@gmail\.com$/, "Only Gmail accounts allowed").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = ({ onLogin, onGoogleAuth, onShowSignup }) => {
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
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-xs">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <button
          onClick={onGoogleAuth}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.21 3.6l6.85-6.85C35.69 2.72 30.27 0 24 0 14.82 0 6.76 5.82 2.88 14.09l7.98 6.2C12.4 13.3 17.73 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.09 24.58c0-1.56-.14-3.09-.41-4.58H24v9.16h12.42c-.54 2.91-2.17 5.37-4.63 7.05l7.2 5.61C43.73 37.03 46.09 31.31 46.09 24.58z"/>
              <path fill="#FBBC05" d="M10.86 28.29A14.43 14.43 0 019.5 24c0-1.49.26-2.94.73-4.29l-7.98-6.2A23.93 23.93 0 000 24c0 3.96.96 7.7 2.65 10.99l8.21-6.7z"/>
              <path fill="#EA4335" d="M24 48c6.27 0 11.53-2.07 15.37-5.62l-7.2-5.61c-2 1.35-4.57 2.16-8.17 2.16-6.27 0-11.6-3.8-13.14-9.09l-8.21 6.7C6.76 42.18 14.82 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </g>
          </svg>
          Sign in with Google
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">Don't have an account?</span>
          <button
            type="button"
            className="ml-2 text-blue-600 font-semibold hover:underline"
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
