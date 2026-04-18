"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "../../context/LanguageContext";

export default function HeroSection() {
  const { lang, setLang, t } = useLang();
  
  return (
    <section style={{ 
      minHeight: "100vh", 
      position: "relative", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      overflow: "hidden", 
      background: "linear-gradient(135deg, #1a0f00 0%, #3d2200 40%, #1a0f00 100%)",
      padding: "100px 20px 60px"
    }}>
      
      {/* Language Switcher - BIGGER on mobile */}
      <div style={{
        position: "absolute",
        top: "80px",
        right: "16px",
        zIndex: 100,
        display: "flex",
        gap: "8px",
        background: "rgba(0,0,0,0.7)",
        padding: "8px 16px",
        borderRadius: "50px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,153,51,0.3)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
      }}>
        <button
          onClick={() => setLang("en")}
          style={{
            background: lang === "en" ? "#ff9933" : "transparent",
            color: lang === "en" ? "#1a0f00" : "white",
            border: "none",
            padding: "8px 18px",
            borderRadius: "40px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            minWidth: "60px"
          }}
        >
          English
        </button>
        <button
          onClick={() => setLang("ne")}
          style={{
            background: lang === "ne" ? "#ff9933" : "transparent",
            color: lang === "ne" ? "#1a0f00" : "white",
            border: "none",
            padding: "8px 18px",
            borderRadius: "40px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            minWidth: "60px"
          }}
        >
          नेपाली
        </button>
      </div>

      {/* Background animations */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          style={{ position: "absolute", top: "10%", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, #ff9933 0%, transparent 70%)" }} 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
          style={{ position: "absolute", bottom: "10%", right: "10%", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, #e8b923 0%, transparent 70%)" }} 
        />
      </div>

      {/* Main Content */}
      <div style={{ 
        position: "relative", 
        zIndex: 10, 
        textAlign: "center", 
        padding: "0 20px", 
        maxWidth: "900px",
        width: "100%",
        marginTop: "40px"
      }}>
        
        {/* Logo - Responsive sizing */}
        <motion.img 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }} 
          src="/images/logo/1.png" 
          alt="Purohit Baaje" 
          style={{ 
            width: "min(130px, 30vw)", 
            height: "auto", 
            objectFit: "contain", 
            display: "block", 
            margin: "0 auto 16px"
          }} 
        />

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          style={{ 
            display: "inline-block", 
            background: "rgba(255,153,51,0.15)", 
            border: "1px solid rgba(255,153,51,0.4)", 
            color: "#ff9933", 
            fontSize: "clamp(10px, 3vw, 12px)", 
            fontWeight: 600, 
            letterSpacing: "2px", 
            textTransform: "uppercase", 
            padding: "6px 16px", 
            borderRadius: "999px", 
            marginBottom: "24px" 
          }}
        >
          {t("hero.badge")}
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }} 
          style={{ 
            fontFamily: "Georgia, serif", 
            fontSize: "clamp(1.5rem, 5vw, 5rem)", 
            fontWeight: 700, 
            color: "white", 
            lineHeight: 1.2, 
            marginBottom: "16px" 
          }}
        >
          {t("hero.title1")}{" "}
          <span style={{ background: "linear-gradient(135deg, #ff9933, #e8b923)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t("hero.title2")}
          </span>
          <br />{t("hero.title3")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.8 }} 
          style={{ 
            fontSize: "clamp(13px, 3.5vw, 16px)", 
            color: "rgba(255,255,255,0.6)", 
            maxWidth: "560px", 
            margin: "0 auto 30px", 
            lineHeight: 1.6,
            padding: "0 10px"
          }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 1 }} 
          style={{ 
            display: "flex", 
            gap: "12px", 
            justifyContent: "center", 
            flexWrap: "wrap",
            padding: "0 10px"
          }}
        >
          <Link 
            href="/booking" 
            style={{ 
              background: "linear-gradient(135deg, #ff9933, #e8b923)", 
              color: "#1a0f00", 
              fontWeight: 700, 
              fontSize: "clamp(12px, 3.5vw, 15px)", 
              padding: "12px 20px", 
              borderRadius: "999px", 
              textDecoration: "none", 
              boxShadow: "0 8px 32px rgba(255,153,51,0.4)", 
              display: "inline-block",
              textAlign: "center"
            }}
          >
            {t("hero.cta1")}
          </Link>
          <Link 
            href="/services" 
            style={{ 
              background: "transparent", 
              color: "white", 
              fontWeight: 600, 
              fontSize: "clamp(12px, 3.5vw, 15px)", 
              padding: "12px 20px", 
              borderRadius: "999px", 
              textDecoration: "none", 
              border: "1px solid rgba(255,255,255,0.3)", 
              display: "inline-block",
              textAlign: "center"
            }}
          >
            {t("hero.cta2")}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 1.2 }} 
          style={{ 
            display: "flex", 
            gap: "clamp(16px, 6vw, 48px)", 
            justifyContent: "center", 
            marginTop: "40px", 
            flexWrap: "wrap" 
          }}
        >
          {[
            { number: "500+", key: "hero.stat1" },
            { number: "50+",  key: "hero.stat2" },
            { number: "4.9",  key: "hero.stat3" },
          ].map((stat) => (
            <div key={stat.key} style={{ textAlign: "center" }}>
              <div style={{ 
                fontFamily: "Georgia, serif", 
                fontSize: "clamp(1.3rem, 4vw, 2rem)", 
                fontWeight: 700, 
                background: "linear-gradient(135deg, #ff9933, #e8b923)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent" 
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: "clamp(10px, 3vw, 12px)", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                {t(stat.key)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }} 
        style={{ 
          position: "absolute", 
          bottom: "20px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: "8px" 
        }}
      >
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>SCROLL</span>
        <div style={{ width: "1px", height: "30px", background: "linear-gradient(180deg, #ff9933, transparent)" }} />
      </motion.div>
    </section>
  );
}