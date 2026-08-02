import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { logout, updateProfile } from "../slices/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

        setProfile(response.data.user);

        // Update Redux + localStorage
        dispatch(updateProfile(response.data.user));
      } catch (error) {
        console.error("Error fetching profile:", error);
        console.error("Profile error:", error);
        console.error("Status:", error.response?.status);
        console.error("Response:", error.response?.data);

        // If token is invalid or expired
        dispatch(logout());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, token, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0F1C] text-gray-900 dark:text-white">
        <p className="text-gray-600 dark:text-gray-400">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1C] text-gray-900 dark:text-white px-4 sm:px-6 py-10 sm:py-14">

      <div className="w-full max-w-2xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            My Profile
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 sm:p-7 bg-white dark:bg-[#111827]">

          {/* Name */}
          <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Name
            </p>

            <p className="mt-1 text-base sm:text-lg font-medium break-words">
              {profile?.name || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div className="py-5 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Email
            </p>

            <p className="mt-1 text-base sm:text-lg font-medium break-all">
              {profile?.email || "N/A"}
            </p>
          </div>

          {/* Reviews Today */}
          <div className="py-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reviews Today
            </p>

            <div className="flex items-center gap-2 mt-1">
              <p className="text-base sm:text-lg font-medium">
                {profile?.reviewsToday ?? 0}
              </p>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                / 5
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-medium transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}