


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slices/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faMagnifyingGlass,
  faSun,
  faMoon,
  faBars,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { brandContent, navLinks } from "../../data/content";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === "dark";

  // Apply dark mode
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  // Toggle theme
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#0A0F1C] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">

        <div className="flex items-center justify-between h-16 relative">

          {/* ================= LEFT SIDE ================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 cursor-pointer z-10"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-sm">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-5 h-5 text-blue-500"
              />
            </div>

            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#BACCEE]">
              {brandContent.name}
            </span>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center space-x-8 pointer-events-auto">

              {/* Home */}
              <Link
                to="/"
                className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                {navLinks[0].icon && (
                  <FontAwesomeIcon
                    icon={navLinks[0].icon}
                    className="w-4 h-4"
                  />
                )}

                {navLinks[0].name}
              </Link>

              {/* Review Code */}
              <Link
                to="/reviewcode"
                className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                {navLinks[1].icon && (
                  <FontAwesomeIcon
                    icon={navLinks[1].icon}
                    className="w-4 h-4"
                  />
                )}

                {navLinks[1].name}
              </Link>

              {/* Documentation */}
              <Link
                to="/documentation"
                className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                {navLinks[2].icon && (
                  <FontAwesomeIcon
                    icon={navLinks[2].icon}
                    className="w-4 h-4"
                  />
                )}

                {navLinks[2].name}
              </Link>

            </div>
          </div>

          {/* ================= DESKTOP RIGHT SIDE ================= */}
          <div className="hidden md:flex items-center space-x-4 z-10">

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors cursor-pointer"
            >
              <FontAwesomeIcon
                icon={isDarkMode ? faSun : faMoon}
                className="w-4 h-4"
              />
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              aria-label="User Profile"
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="w-4 h-4"
              />
            </Link>

          </div>

          {/* ================= MOBILE CONTROLS ================= */}
          <div className="flex md:hidden items-center space-x-3 z-10">

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={isDarkMode ? faSun : faMoon}
                className="w-4 h-4"
              />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className="w-6 h-6"
              />
            </button>

          </div>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0A0F1C] border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-4 space-y-2">

          {/* Home */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {navLinks[0].icon && (
              <FontAwesomeIcon
                icon={navLinks[0].icon}
                className="w-4 h-4 text-blue-500"
              />
            )}

            {navLinks[0].name}
          </Link>

          {/* Review Code */}
          <Link
            to="/reviewcode"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {navLinks[1].icon && (
              <FontAwesomeIcon
                icon={navLinks[1].icon}
                className="w-4 h-4 text-blue-500"
              />
            )}

            {navLinks[1].name}
          </Link>

          {/* Documentation */}
          <Link
            to="/documentation"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {navLinks[2].icon && (
              <FontAwesomeIcon
                icon={navLinks[2].icon}
                className="w-4 h-4 text-blue-500"
              />
            )}

            {navLinks[2].name}
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="w-4 h-4 text-blue-500"
            />

            Profile
          </Link>

        </div>
      )}
    </nav>
  );
}
