interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano (Italian)', flag: '🇮🇹' },
  { code: 'pt', name: 'Português (Portuguese)', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский (Russian)', flag: '🇷🇺' },
  { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
  { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文(简体) (Chinese Simplified)', flag: '🇨🇳' },
  { code: 'zh-TW', name: '中文(繁體) (Chinese Traditional)', flag: '🇹🇼' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย (Thai)', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt (Vietnamese)', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia (Indonesian)', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu (Malay)', flag: '🇲🇾' },
  { code: 'tr', name: 'Türkçe (Turkish)', flag: '🇹🇷' },
  { code: 'pl', name: 'Polski (Polish)', flag: '🇵🇱' },
  { code: 'nl', name: 'Nederlands (Dutch)', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska (Swedish)', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk (Norwegian)', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk (Danish)', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi (Finnish)', flag: '🇫🇮' },
  { code: 'el', name: 'Ελληνικά (Greek)', flag: '🇬🇷' },
  { code: 'he', name: 'עברית (Hebrew)', flag: '🇮🇱' },
  { code: 'uk', name: 'Українська (Ukrainian)', flag: '🇺🇦' },
  { code: 'cs', name: 'Čeština (Czech)', flag: '🇨🇿' },
  { code: 'hu', name: 'Magyar (Hungarian)', flag: '🇭🇺' },
  { code: 'ro', name: 'Română (Romanian)', flag: '🇷🇴' },
  { code: 'bg', name: 'Български (Bulgarian)', flag: '🇧🇬' },
  { code: 'hr', name: 'Hrvatski (Croatian)', flag: '🇭🇷' },
  { code: 'sk', name: 'Slovenčina (Slovak)', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina (Slovenian)', flag: '🇸🇮' },
  { code: 'et', name: 'Eesti (Estonian)', flag: '🇪🇪' },
  { code: 'lv', name: 'Latviešu (Latvian)', flag: '🇱🇻' },
  { code: 'lt', name: 'Lietuvių (Lithuanian)', flag: '🇱🇹' },
  { code: 'mt', name: 'Malti (Maltese)', flag: '🇲🇹' },
  { code: 'sw', name: 'Kiswahili (Swahili)', flag: '🇹🇿' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'fa', name: 'فارسی (Persian)', flag: '🇮🇷' },
  { code: 'ur', name: 'اردو (Urdu)', flag: '🇵🇰' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'si', name: 'සිංහල (Sinhala)', flag: '🇱🇰' },
  { code: 'ne', name: 'नेपाली (Nepali)', flag: '🇳🇵' }
];

class TranslationService {
  private isInitialized = false;

  initializeGoogleTranslate() {
    if (this.isInitialized) return;

    // Check if the Google Translate element already exists
    let translateElement = document.getElementById('google_translate_element');
    if (!translateElement) {
      translateElement = document.createElement('div');
      translateElement.id = 'google_translate_element';
      translateElement.style.display = 'none';
      document.body.appendChild(translateElement);
    }

    // Define the callback function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).googleTranslateElementInit = () => {
      try {
        // Initialize Google Translate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: languages.map(lang => lang.code).join(','),
          autoDisplay: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');

        this.isInitialized = true;
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };

    // Create the Google Translate script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    
    // Add script to document
    document.head.appendChild(script);

    // Add CSS to hide Google Translate branding
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      .goog-te-gadget { font-size: 0px !important; }
      .goog-te-gadget .goog-te-combo { margin: 0 !important; }
      .goog-logo-link { display: none !important; }
      .goog-te-banner { display: none !important; }
      body { top: 0px !important; }
    `;
    document.head.appendChild(style);
  }

  changeLanguage(languageCode: string): boolean {
    if (!this.isInitialized) return false;

    try {
      // Find the Google Translate select element
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      
      if (selectElement) {
        // Set the value and trigger change event
        selectElement.value = languageCode;
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
        return true;
      } else {
        // Retry after a delay
        setTimeout(() => this.changeLanguage(languageCode), 500);
        return false;
      }
    } catch (error) {
      console.error('Error changing language:', error);
      return false;
    }
  }

  getLanguageByCode(code: string): Language | undefined {
    return languages.find(lang => lang.code === code);
  }
}

export const translationService = new TranslationService();