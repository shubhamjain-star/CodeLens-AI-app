import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { brandContent, footerSections } from '../../data/content';

export default function Footer(){
  return (
    <footer className="w-full bg-white dark:bg-[#0A0F1C] border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Branding & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-sm">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#BACCEE]">
                {brandContent.name}
              </span>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              {brandContent.tagline}
            </p>
          </div>

          {/* Link Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-gray-100 uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} {brandContent.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

