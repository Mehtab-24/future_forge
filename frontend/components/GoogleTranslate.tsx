'use client';

import { useState, useEffect } from 'react';
import { translationService, languages } from '../lib/translation';
import { ChevronDown, Check } from 'lucide-react';

export default function GoogleTranslate() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Initialize Google Translate
    translationService.initializeGoogleTranslate();
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      // Apply saved language after a delay
      setTimeout(() => {
        translationService.changeLanguage(savedLanguage);
      }, 1000);
    }
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    
    if (languageCode === 'en') {
      // For English, reload to get original content
      window.location.reload();
    } else {
      // For other languages, trigger translation
      translationService.changeLanguage(languageCode);
    }
    
    setIsDropdownOpen(false);
  };

  const getCurrentLanguage = () => {
    return translationService.getLanguageByCode(selectedLanguage) || 
           { code: 'en', name: 'English', flag: '🇺🇸' };
  };

  const currentLang = getCurrentLanguage();

  return (
    <div className="relative">
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden"></div>
      
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors duration-200"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium">{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left hover:bg-slate-700 transition-colors duration-150 ${
                  selectedLanguage === language.code ? 'bg-slate-700 text-cyan-400' : 'text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-4 h-4 text-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
