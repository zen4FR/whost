"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "../../context/LanguageContext";

export default function CTASection() {
  const { t } = useLang();
  
  return (
    <section style={{ background: "linear-gradient(135deg, #1a0f00 0%, #3d2200 50%, #1a0f00 100%)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
        {/* Removed the empty motion.div that was causing the cut */}
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7, delay: 0.2 }} 
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "16px" }}
        >
          {t("cta.title1")}{" "}
          <span style={{ background: "linear-gradient(135deg, #ff9933, #e8b923)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t("cta.title2")}
          </span>{" "}
          {t("cta.title3")}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7, delay: 0.3 }} 
          style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 40px" }}
        >
          {t("cta.subtitle")}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7, delay: 0.4 }} 
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}
        >
          <Link href="/booking" style={{ background: "linear-gradient(135deg, #ff9933, #e8b923)", color: "#1a0f00", fontWeight: 700, fontSize: "15px", padding: "16px 40px", borderRadius: "999px", textDecoration: "none", display: "inline-block" }}>
            {t("cta.book")}
          </Link>
          <a href="https://wa.me/9779764397693" style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.4)", color: "#25d366", fontWeight: 600, fontSize: "15px", padding: "16px 40px", borderRadius: "999px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            💬 {t("cta.whatsapp")}
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7, delay: 0.6 }} 
          style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}
        >
          {["cta.badge1", "cta.badge2", "cta.badge3"].map((key) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#ff9933", fontSize: "16px" }}>✓</span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{t(key)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}