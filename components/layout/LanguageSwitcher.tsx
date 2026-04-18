"use client";
import { useLang } from "../../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "2px", gap: "2px" }}>
      {[{ code: "en", label: "EN" }, { code: "ne", label: "NE" }].map((l) => (
        <button key={l.code} onClick={() => setLang(l.code as "en" | "ne")} style={{
          padding: "4px 12px", borderRadius: "999px", fontSize: "12px",
          fontWeight: 500, border: "none", cursor: "pointer",
          background: lang === l.code ? "#ff9933" : "transparent",
          color: lang === l.code ? "#1a0f00" : "rgba(255,255,255,0.7)",
          transition: "all 0.3s",
        }}>
          {l.label}
        </button>
      ))}
    </div>
  );
}