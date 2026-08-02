import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import homeimg from '../assets/homeimg.png';
import { Link } from "react-router-dom";
import { 
  heroContent, 
  featuresContent 
} from '../data/content';

export default function Home(){
  return (
    <div className="w-full bg-white dark:bg-[#0A0F1C] text-gray-950 dark:text-gray-100 transition-colors duration-300">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Live Engine Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              {heroContent.badge}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-950 dark:text-white">
              {heroContent.titlePrefix}
              <span className="italic font-serif text-blue-500 dark:text-blue-400 font-normal">
                {heroContent.titleHighlight}
              </span>
              {heroContent.titleSuffix}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-400 max-w-xl leading-relaxed font-medium dark:font-normal">
              {heroContent.description}
            </p>

            {/* Action Area */}
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-blue-400 hover:bg-blue-500 text-[#0A0F1C] font-semibold text-base transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                {heroContent.ctaText}
                <FontAwesomeIcon icon={heroContent.ctaIcon} className="w-4 h-4" />
              </Link>
            </div>

            {/* Integrations Placeholder Footer */}
            <div className="pt-8 border-t border-gray-300 dark:border-gray-800/80">
              <p className="text-xs font-bold tracking-widest text-gray-700 dark:text-gray-500 uppercase mb-3">
                {heroContent.integrationsText}
              </p>
              <div className="flex items-center gap-6 text-gray-700 dark:text-gray-500 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-gray-600 dark:bg-gray-600"></span>
                  GitHub Actions
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-600"></span>
                  GitLab CI
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-gray-600 dark:bg-gray-600 rotate-45"></span>
                  Bitbucket
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Code Preview Image Placeholder */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-2xl border-2 border-black dark:border-gray-800 bg-gray-50 dark:bg-[#0E1526] p-2 shadow-xl hover:shadow-2xl hover:shadow-black/15 transition-all duration-300 relative overflow-hidden group">
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-xl bg-gray-200 dark:bg-[#131B2E] border border-gray-400 dark:border-gray-800 flex flex-col items-center justify-center relative overflow-hidden">
                <img src={homeimg} alt="AI code reviewer" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-300 dark:border-gray-800/60 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 relative">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight whitespace-pre-line leading-tight text-gray-950 dark:text-white">
              {featuresContent.heading}
            </h2>
            <p className="text-base text-gray-800 dark:text-gray-400 leading-relaxed font-medium dark:font-normal">
              {featuresContent.description}
            </p>
          </div>

          {/* Vertical Label */}
          <div className="hidden md:block absolute right-0 top-0 text-xs font-mono tracking-widest text-gray-600 dark:text-gray-600 uppercase transform rotate-90 origin-top-right">
            {featuresContent.verticalTag}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuresContent.cards.map((card) => (
            <div
              key={card.id}
              className={`p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-[#0E1526] border-t-2 ${card.accentColor} border-x border-b border-black dark:border-gray-800/80 hover:shadow-xl hover:shadow-black/10 dark:hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="space-y-5">
                {/* Card Icon Header */}
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800/50 flex items-center justify-center text-gray-900 dark:text-gray-200 border border-black/20 dark:border-gray-700/40">
                  <FontAwesomeIcon icon={card.icon} className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl font-bold text-gray-950 dark:text-gray-100">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-800 dark:text-gray-400 leading-relaxed font-medium dark:font-normal">
                  {card.description}
                </p>
              </div>

              {/* Card Bottom Tag */}
              <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-800/60">
                <span className="text-[10px] font-mono font-bold tracking-wider text-gray-600 dark:text-gray-500 uppercase">
                  {card.badgeText}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}