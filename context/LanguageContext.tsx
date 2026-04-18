"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Lang = "en" | "ne";

interface LangContextType { 
  lang: Lang; 
  setLang: (l: Lang) => void; 
  t: (key: string) => string; 
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.services": "Services", 
    "nav.astrology": "Astrology", 
    "nav.booking": "Booking", 
    "nav.booknow": "Book Now",
    "home": "Home",
    "services": "Services",
    "book_puja": "Book Puja",
    "astrology": "Astrology",
    "dashboard": "Dashboard",
    "admin": "Admin",
    "sign_in": "Sign In",
    "sign_out": "Sign Out",
    
    // Hero Section
    "hero.badge": "Nepal #1 Spiritual Platform",
    "hero.title1": "Sacred Puja and", 
    "hero.title2": "Priest Services", 
    "hero.title3": "At Your Doorstep",
    "hero.subtitle": "Book experienced priests, schedule sacred rituals, and get astrological guidance from home.",
    "hero.cta1": "Book a Puja Now", 
    "hero.cta2": "Explore Services",
    "hero.stat1": "Pujas Completed", 
    "hero.stat2": "Expert Priests", 
    "hero.stat3": "Average Rating",
    
    // Services Section
    "services.badge": "What We Offer", 
    "services.title": "Our Sacred Services",
    "services.subtitle": "Everything you need for your spiritual journey, delivered with devotion.",
    "services.learnmore": "Learn More",
    
    // CTA Section
    "cta.title1": "Begin Your", 
    "cta.title2": "Spiritual Journey", 
    "cta.title3": "Today",
    "cta.subtitle": "Join thousands of families who trust Purohit Baaje for their sacred ceremonies.",
    "cta.book": "Book Your Puja Now", 
    "cta.whatsapp": "WhatsApp Us",
    "cta.badge1": "Verified Priests", 
    "cta.badge2": "Instant Booking", 
    "cta.badge3": "100% Authentic",
    
    // Booking
    "booking.title": "Book a Service", 
    "booking.submit": "Confirm Booking",
    "booking.success": "Booking Confirmed!", 
    "booking.successMsg": "We will contact you within 2 hours.",
    "booking.another": "Book Another",
    
    // Login
    "login_error": "Login failed. Please try again.",
    "welcome_back": "Welcome Back",
    "user": "User",
    "priest": "Priest",
    "book_pujas": "Book pujas & hire priests",
    "offer_services": "Offer your services & earn",
    "continue_with_google": "Continue with Google",
    "as_priest": "as Priest",
    "signing_in": "Signing in...",
    "login_info": "By continuing, you agree to our Terms of Service and Privacy Policy",
    "need_help": "Need help? WhatsApp us at",
    "loading": "Loading...",
  },
  ne: {
    // Navbar
    "nav.services": "सेवाहरू", 
    "nav.astrology": "ज्योतिष", 
    "nav.booking": "बुकिङ", 
    "nav.booknow": "अहिले बुक गर्नुस्",
    "home": "गृह पृष्ठ",
    "services": "सेवाहरू",
    "book_puja": "पूजा बुक गर्नुहोस्",
    "astrology": "ज्योतिष",
    "dashboard": "ड्यासबोर्ड",
    "admin": "प्रशासक",
    "sign_in": "साइन इन",
    "sign_out": "साइन आउट",
    
    // Hero Section
    "hero.badge": "नेपालको #१ आध्यात्मिक प्लेटफर्म",
    "hero.title1": "पवित्र पूजा र", 
    "hero.title2": "पुरोहित सेवा", 
    "hero.title3": "तपाईंको घरमै",
    "hero.subtitle": "अनुभवी पुरोहित बुक गर्नुस् र वैदिक ज्योतिष मार्गदर्शन पाउनुस्।",
    "hero.cta1": "अहिले पूजा बुक गर्नुस्", 
    "hero.cta2": "सेवाहरू हेर्नुस्",
    "hero.stat1": "पूजाहरू सम्पन्न", 
    "hero.stat2": "विशेषज्ञ पुरोहित", 
    "hero.stat3": "औसत मूल्याङ्कन",
    
    // Services Section
    "services.badge": "हाम्रा सेवाहरू", 
    "services.title": "हाम्रा पवित्र सेवाहरू",
    "services.subtitle": "तपाईंको आध्यात्मिक यात्राका लागि सबै कुरा, भक्ति र सेवाभावले।",
    "services.learnmore": "थप जान्नुस्",
    
    // CTA Section
    "cta.title1": "सुरु गर्नुस्", 
    "cta.title2": "आध्यात्मिक यात्रा", 
    "cta.title3": "आज नै",
    "cta.subtitle": "हजारौं परिवारहरू पुरोहित बाजेमा विश्वास गर्छन्।",
    "cta.book": "अहिले पूजा बुक गर्नुस्", 
    "cta.whatsapp": "WhatsApp गर्नुस्",
    "cta.badge1": "प्रमाणित पुरोहित", 
    "cta.badge2": "तत्काल बुकिङ", 
    "cta.badge3": "१००% प्रामाणिक",
    
    // Booking
    "booking.title": "सेवा बुक गर्नुस्", 
    "booking.submit": "बुकिङ पुष्टि गर्नुस्",
    "booking.success": "बुकिङ पुष्टि भयो!", 
    "booking.successMsg": "हामी २ घण्टामा सम्पर्क गर्नेछौं।",
    "booking.another": "अर्को बुक गर्नुस्",
    
    // Login
    "login_error": "लगइन असफल भयो। कृपया पुन: प्रयास गर्नुहोस्।",
    "welcome_back": "फेरि स्वागत छ",
    "user": "प्रयोगकर्ता",
    "priest": "पुजारी",
    "book_pujas": "पूजा बुक गर्नुहोस् र पुजारी भाडामा लिनुहोस्",
    "offer_services": "आफ्नो सेवा प्रदान गर्नुहोस् र कमाउनुहोस्",
    "continue_with_google": "Google बाट जारी राख्नुहोस्",
    "as_priest": "पुजारीको रूपमा",
    "signing_in": "साइन इन हुँदै...",
    "login_info": "जारी राख्दा, तपाईं हाम्रो सेवा सर्तहरू र गोपनीयता नीतिसँग सहमत हुनुहुन्छ",
    "need_help": "सहायता चाहियो? हामीलाई WhatsApp मा सम्पर्क गर्नुहोस्",
    "loading": "लोड हुँदै...",
  },
};

const LangContext = createContext<LangContextType>({ 
  lang: "en", 
  setLang: () => {}, 
  t: (k) => k 
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Lang;
    if (savedLang && (savedLang === "en" || savedLang === "ne")) {
      setLang(savedLang);
    }
  }, []);

  const t = (key: string): string => {
    return translations[lang]?.[key] || key;
  };

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("language", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { 
  return useContext(LangContext); 
}