
import React, { useState } from "react";
import { loginContent } from "../data/content";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../services/api";
import { login } from "../slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Send login request to backend
      const response = await api.post("/auth/login", formData);

      // Backend returns:
      // {
      //   message,
      //   token,
      //   user
      // }

      const { token, user } = response.data;

      // Save user + JWT in Redux and localStorage
      dispatch(
        login({
          token,
          user,
        })
      );

      toast.success("Login successful!");

      // Redirect after successful login
      navigate("/reviewcode");
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#0A0F1C] text-gray-600 dark:text-[#9CA3AF] font-sans flex flex-col justify-between p-4 sm:p-6 md:p-8 antialiased transition-colors">

      {/* Top Header */}
      <header className="text-center pt-6 sm:pt-10 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[#F3F4F6] tracking-tight">
          {loginContent.header.title}
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9CA3AF]">
          {loginContent.header.subtitle}
        </p>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md mx-auto my-auto py-6">
        <div className="bg-white dark:bg-[#0E1526] border border-gray-200 dark:border-[#1F2937] rounded-xl shadow-xl dark:shadow-2xl p-6 sm:p-8 space-y-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label
                  htmlFor="email"
                  className="font-medium text-gray-900 dark:text-[#F3F4F6] uppercase tracking-wider"
                >
                  {loginContent.form.emailLabel}
                </label>

                <span className="text-[10px] text-blue-600 dark:text-[#60A5FA] tracking-widest font-mono uppercase font-semibold">
                  {loginContent.form.emailTag}
                </span>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400 dark:text-[#9CA3AF] pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={loginContent.form.emailPlaceholder}
                  required
                  className="w-full bg-white dark:bg-[#131B2E] border border-gray-300 dark:border-[#1F2937] text-gray-900 dark:text-[#F3F4F6] placeholder-gray-400 dark:placeholder-[#4B5563] text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 dark:focus:border-[#60A5FA] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label
                  htmlFor="password"
                  className="font-medium text-gray-900 dark:text-[#F3F4F6] uppercase tracking-wider"
                >
                  {loginContent.form.passwordLabel}
                </label>

                <a
                  href="#forgot"
                  className="text-xs text-gray-500 hover:text-blue-600 dark:text-[#9CA3AF] dark:hover:text-[#60A5FA] transition-colors"
                >
                  {loginContent.form.forgotText}
                </a>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400 dark:text-[#9CA3AF] pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={loginContent.form.passwordPlaceholder}
                  required
                  className="w-full bg-white dark:bg-[#131B2E] border border-gray-300 dark:border-[#1F2937] text-gray-900 dark:text-[#F3F4F6] placeholder-gray-400 dark:placeholder-[#4B5563] text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 dark:focus:border-[#60A5FA] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#A5C5FF] dark:hover:bg-[#82AFFF] dark:text-[#0A0F1C] font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-blue-500/10 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>
                {loading ? "Logging in..." : loginContent.form.submitButtonText}
              </span>

              {!loading && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          </form>

          {/* Secondary Auth Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-[#1F2937]"></div>
            </div>

            <span className="relative bg-white dark:bg-[#0E1526] px-3 text-[11px] font-mono text-gray-400 dark:text-[#4B5563] uppercase tracking-wider">
              {loginContent.dividerText}
            </span>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <button
              type="button"
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 dark:bg-[#131B2E] dark:hover:bg-[#1A243B] dark:border-[#1F2937] dark:text-[#F3F4F6] text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg
                className="w-4 h-4 fill-current text-gray-800 dark:text-[#F3F4F6]"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>

              {loginContent.oauth[0].label}
            </button>

            <button
              type="button"
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 dark:bg-[#131B2E] dark:hover:bg-[#1A243B] dark:border-[#1F2937] dark:text-[#F3F4F6] text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>

              {loginContent.oauth[1].label}
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500 dark:text-[#9CA3AF] mt-6">
          {loginContent.footerLink.prompt}{" "}

          <Link
            to="/signup"
            className="text-emerald-600 dark:text-[#34D399] font-medium hover:underline transition-all"
          >
            {loginContent.footerLink.text}
          </Link>
        </p>
      </main>

      {/* System Status Footer */}
      <footer className="text-center sm:flex sm:justify-between sm:items-center text-[10px] font-mono text-gray-400 dark:text-[#4B5563] border-t border-gray-200 dark:border-[#1F2937]/50 pt-4 max-w-4xl mx-auto w-full space-y-1 sm:space-y-0">
        <div>{loginContent.systemStatus.deployment}</div>
        <div>{loginContent.systemStatus.security}</div>
      </footer>
    </div>
  );
}
