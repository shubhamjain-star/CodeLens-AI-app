import { languages } from "../../data/languages";

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div className="relative inline-flex items-center">
      {/* Chevron Arrow positioned on the LEFT side */}
      <div className="pointer-events-none absolute left-3 z-10 flex items-center text-blue-600 dark:text-blue-500">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>

      {/* Styled Dropdown Select Box */}
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm font-semibold text-gray-900 shadow-sm outline-none transition-all duration-200 hover:border-blue-500 hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer dark:border-blue-600 dark:bg-gray-900/90 dark:text-white dark:shadow-md dark:hover:border-blue-500 dark:hover:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
      >
        {languages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
            className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white py-1"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;