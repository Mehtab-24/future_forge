interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文(简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: '中文(繁體)', flag: '🇹🇼' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' }
];

class TranslationService {
  private isInitialized = false;

  initializeGoogleTranslate() {
    if (this.isInitialized) return;

    // Create the Google Translate script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    
    // Define the callback function
    (window as any).googleTranslateElementInit = () => {
      try {
        // Create the translate element
        const translateElement = document.createElement('div');
        translateElement.id = 'google_translate_element';
        document.body.appendChild(translateElement);

        // Initialize Google Translate
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: languages.map(lang => lang.code).join(','),
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');

        this.isInitialized = true;
        
        // Hide the Google Translate widget
        setTimeout(() => {
          const widget = document.getElementById('google_translate_element');
          if (widget) widget.style.display = 'none';
        }, 100);
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };

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

  changeLanguage(languageCode: string) {
    if (!this.isInitialized) return;

    try {
      // Find the Google Translate select element
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      
      if (selectElement) {
        // Set the value and trigger change event
        selectElement.value = languageCode;
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      } else {
        // Retry after a delay
        setTimeout(() => this.changeLanguage(languageCode), 500);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }

  getLanguageByCode(code: string): Language | undefined {
    return languages.find(lang => lang.code === code);
  }
}

export const translationService = new TranslationService();