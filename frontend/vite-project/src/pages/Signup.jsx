
import React, { useState } from "react";
import { signupContent } from "../data/content";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../services/api";
import { login } from "../slices/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra frontend check
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    try {
      setLoading(true);
      // automatically detect user's time zone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Backend expects "name", not "fullName"
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        timezone
      };

      // Send signup request
      const response = await api.post(
        "/auth/signup",
        signupData
      );

      // Backend response:
      // {
      //   message,
      //   token,
      //   user
      // }

      const { token, user } = response.data;

      // Store JWT + user in Redux and localStorage
      dispatch(
        login({
          token,
          user,
        })
      );

      toast.success("Account created successfully!");

      // Redirect after successful signup
      navigate("/reviewcode");
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#0A0F1C] text-gray-600 dark:text-[#9CA3AF] font-sans flex items-center justify-center p-4 sm:p-6 lg:p-10 antialiased transition-colors">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#0E1526] border border-gray-200 dark:border-[#1F2937] rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 bg-slate-100/70 dark:bg-[#0A0F1C]/60 p-6 sm:p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#1F2937] relative overflow-hidden">

          {/* Brand Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F3F4F6] tracking-tight">
              {signupContent.brand.name}
            </h1>

            <p className="text-[10px] font-mono tracking-widest text-blue-600 dark:text-[#60A5FA] uppercase font-semibold">
              {signupContent.brand.tagline}
            </p>
          </div>

          {/* Testimonial */}
          <div className="my-10 lg:my-0 space-y-6">
            <div className="text-blue-600 dark:text-[#60A5FA] text-4xl font-serif leading-none select-none">
              “
            </div>

            <blockquote className="text-lg sm:text-xl text-gray-900 dark:text-[#F3F4F6] font-medium italic leading-relaxed">
              {signupContent.testimonial.quote}
            </blockquote>

            <div className="pt-2">
              <div className="font-semibold text-gray-900 dark:text-[#F3F4F6] text-base">
                {signupContent.testimonial.author}
              </div>

              <div className="text-[11px] font-mono tracking-wider text-gray-500 dark:text-[#9CA3AF] mt-0.5">
                {signupContent.testimonial.role}
              </div>
            </div>
          </div>

          {/* Environment Indicator */}
          <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-[#1F2937]/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#34D399]"></span>

            <span className="text-xs font-mono text-gray-500 dark:text-[#4B5563]">
              {signupContent.testimonial.environmentTag}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white dark:bg-[#0E1526]">

          <div className="space-y-8">

            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#F3F4F6] tracking-tight">
                {signupContent.form.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9CA3AF]">
                {signupContent.form.subtitle}
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-[11px] font-mono font-medium text-gray-900 dark:text-[#F3F4F6] uppercase tracking-wider"
                >
                  {signupContent.form.fields.fullName.label}
                </label>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={
                      signupContent.form.fields.fullName.placeholder
                    }
                    required
                    className="w-full bg-white dark:bg-[#131B2E] border border-gray-300 dark:border-[#1F2937] text-gray-900 dark:text-[#F3F4F6] placeholder-gray-400 dark:placeholder-[#4B5563] text-sm rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#60A5FA] transition-colors"
                  />

                  <div className="absolute right-3.5 text-gray-400 dark:text-[#9CA3AF] pointer-events-none">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-mono font-medium text-gray-900 dark:text-[#F3F4F6] uppercase tracking-wider"
                >
                  {signupContent.form.fields.email.label}
                </label>

                <div className="relative flex items-center">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={
                      signupContent.form.fields.email.placeholder
                    }
                    required
                    className="w-full bg-white dark:bg-[#131B2E] border border-gray-300 dark:border-[#1F2937] text-gray-900 dark:text-[#F3F4F6] placeholder-gray-400 dark:placeholder-[#4B5563] text-sm rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#60A5FA] transition-colors"
                  />

                  <div className="absolute right-3.5 text-gray-400 dark:text-[#9CA3AF] pointer-events-none">
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
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-mono font-medium text-gray-900 dark:text-[#F3F4F6] uppercase tracking-wider"
                >
                  {signupContent.form.fields.password.label}
                </label>

                <div className="relative flex items-center">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      signupContent.form.fields.password.placeholder
                    }
                    required
                    className="w-full bg-white dark:bg-[#131B2E] border border-gray-300 dark:border-[#1F2937] text-gray-900 dark:text-[#F3F4F6] placeholder-gray-400 dark:placeholder-[#4B5563] text-sm rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#60A5FA] transition-colors"
                  />

                  <div className="absolute right-3.5 text-gray-400 dark:text-[#9CA3AF] pointer-events-none">
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
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 dark:bg-[#131B2E] dark:border-[#1F2937] dark:text-[#60A5FA] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />

                <label
                  htmlFor="agreeTerms"
                  className="text-xs text-gray-500 dark:text-[#9CA3AF] leading-relaxed cursor-pointer"
                >
                  {signupContent.form.terms.prefix}{" "}

                  <a
                    href="#terms"
                    className="text-emerald-600 dark:text-[#34D399] hover:underline font-medium"
                  >
                    {signupContent.form.terms.serviceLinkText}
                  </a>{" "}

                  {signupContent.form.terms.middle}{" "}

                  <a
                    href="#privacy"
                    className="text-emerald-600 dark:text-[#34D399] hover:underline font-medium"
                  >
                    {signupContent.form.terms.privacyLinkText}
                  </a>{" "}

                  {signupContent.form.terms.suffix}
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#A5C5FF] dark:hover:bg-[#82AFFF] dark:text-[#0A0F1C] font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-blue-500/10 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {loading
                    ? "Creating account..."
                    : signupContent.form.submitButtonText}
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

            {/* Login Navigation */}
            <div className="pt-2">
              <Link
                to="/login"
                className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 dark:bg-[#131B2E] dark:hover:bg-[#1A243B] dark:border-[#1F2937] dark:text-[#F3F4F6] text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-[#9CA3AF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>

                <span>{signupContent.form.loginLinkText}</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-[#1F2937]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-gray-400 dark:text-[#4B5563]">

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#34D399]"></span>

              <span>
                {signupContent.footer.systemStatus}
              </span>
            </div>

            <div className="flex gap-4">
              {signupContent.footer.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="hover:text-gray-600 dark:hover:text-[#9CA3AF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
