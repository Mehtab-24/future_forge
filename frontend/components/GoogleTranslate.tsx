"use client";
import { useEffect } from "react";
import { Globe } from "lucide-react";

// Declare global types for Google Translate
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Function to aggressively remove Google banner
    const removeBanner = () => {
      // Remove banner frames
      const bannerElements = document.querySelectorAll(
        ".goog-te-banner-frame, iframe.goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame"
      );
      bannerElements.forEach((el) => {
        el.remove();
      });

      // Reset body position
      document.body.style.top = "0px";
      document.body.style.position = "static";

      // Remove any dynamically added top margin
      const htmlElement = document.documentElement;
      htmlElement.style.marginTop = "0px";
    };

    // Function to continuously monitor and remove banner
    const monitorAndRemove = () => {
      removeBanner();

      // Set up mutation observer
      const observer = new MutationObserver(() => {
        removeBanner();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Also set up interval as backup
      const intervalId = setInterval(removeBanner, 100);

      return () => {
        observer.disconnect();
        clearInterval(intervalId);
      };
    };

    // Initialize Google Translate when component mounts
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) {
        return; // Script already loaded
      }

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    };

    // Initialize function that Google Translate will call
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,hi,zh,ja,ar,pt,ru,ko,it",
            layout: 0, // HORIZONTAL layout
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Start monitoring after element is created
        setTimeout(() => {
          monitorAndRemove();
        }, 100);
      }
    };

    addGoogleTranslateScript();

    // Start monitoring immediately as well
    const cleanup = monitorAndRemove();

    // Cleanup function
    return () => {
      delete window.googleTranslateElementInit;
      cleanup();
    };
  }, []);

  return (
    <>
      <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur rounded-xl px-4 py-2 border border-slate-600/30 hover:border-cyan-500/30 transition-all duration-200 min-w-[180px]">
        <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span className="text-sm text-slate-300 font-medium">Translate:</span>
        <div id="google_translate_element" className="flex-1"></div>
      </div>

      {/* Enhanced CSS with maximum priority */}
      <style jsx global>{`
        /* NUCLEAR OPTION - HIDE EVERYTHING GOOGLE BANNER RELATED */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        div[id*="goog-gt-tt"],
        div[class*="goog-te-banner"],
        div[class*="goog-te-balloon"],
        .goog-te-banner,
        .goog-te-banner * {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0px !important;
          max-height: 0px !important;
          overflow: hidden !important;
          position: absolute !important;
          top: -10000px !important;
          left: -10000px !important;
          z-index: -9999 !important;
          pointer-events: none !important;
        }

        /* Reset body and html modifications */
        body,
        html {
          top: 0px !important;
          margin-top: 0px !important;
          position: static !important;
        }

        body.goog-te-hl {
          top: 0px !important;
        }

        /* Style the dropdown */
        .goog-te-combo {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
          border: 1px solid #475569 !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
          font-size: 12px !important;
          font-family: inherit !important;
          min-width: 110px !important;
          width: 110px !important;
          cursor: pointer !important;
        }

        .goog-te-combo:hover {
          border-color: #06b6d4 !important;
          background-color: #334155 !important;
        }

        .goog-te-combo:focus {
          border-color: #06b6d4 !important;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2) !important;
          outline: none !important;
        }

        .goog-te-combo option {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
          font-size: 12px !important;
        }

        /* Clean up the gadget */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0px !important;
          color: transparent !important;
          line-height: 0 !important;
        }

        .goog-te-gadget > span > a,
        .goog-te-gadget > span > span,
        .goog-te-gadget span:first-child,
        .goog-te-gadget .goog-te-combo + span,
        .goog-logo-link {
          display: none !important;
        }

        .goog-te-gadget .goog-te-combo {
          color: #e2e8f0 !important;
          font-size: 12px !important;
          margin: 0px !important;
        }
      `}</style>
    </>
  );
}
