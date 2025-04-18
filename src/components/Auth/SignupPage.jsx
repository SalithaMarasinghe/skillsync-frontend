import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm your password"),
});

const SignupPage = ({ onSignup, onGoogleAuth }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSignup(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              name="firstName"
              type="text"
              className="w-full border rounded px-3 py-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder="First name"
              autoComplete="given-name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="w-full border rounded px-3 py-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              placeholder="Last name"
              autoComplete="family-name"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="your@email.com"
              autoComplete="email"
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
              autoComplete="new-password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full border rounded px-3 py-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold mt-2"
          >
            Sign Up
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
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
