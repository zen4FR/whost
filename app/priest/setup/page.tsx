"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const SPECIALIZATIONS = [
  "Satyanarayan Puja", "Griha Pravesh", "Bratabandha",
  "Vivah", "Nwaran", "Pasni", "Shraddha",
  "Graha Shanti", "Saraswati Puja", "Laxmi Puja",
  "Dashain Puja", "Tihar Puja", "General Puja",
];

const LOCATIONS = [
  "Kathmandu", "Lalitpur", "Bhaktapur",
  "Kirtipur", "Budhanilkantha", "Balaju",
  "Baneshwor", "Koteshwor", "Thankot",
];

const LANGUAGES = ["Nepali", "English", "Newari", "Hindi"];

export default function PriestSetupPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name:            "",
    bio:             "",
    phone:           "",
    experience:      "",
    location:        "",
    specializations: [] as string[],
    languages:       [] as string[],
    isAvailable:     true,
  });

  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  useEffect(() => {
    if (!loading) {
      if (!user) { router.push("/login"); return; }
      if (userProfile?.role !== "priest") { router.push("/"); return; }
      if (form.name === "" && user.displayName) {
        setForm((prev) => ({ ...prev, name: user.displayName || "" }));
      }
    }
  }, [user, userProfile, loading]);

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.location || form.specializations.length === 0) {
      setError("Please fill all required fields and select at least one specialization.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await setDoc(doc(db, "priests", user!.uid), {
        uid:             user!.uid,
        name:            form.name,
        bio:             form.bio,
        phone:           form.phone,
        experience:      Number(form.experience) || 0,
        location:        form.location,
        specializations: form.specializations,
        languages:       form.languages,
        isAvailable:     form.isAvailable,
        profilePhoto:    user!.photoURL || "",
        email:           user!.email || "",
        isApproved:      false,
        createdAt:       serverTimestamp(),
        updatedAt:       serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => router.push("/priest/dashboard"), 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a0f00", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#ff9933", fontSize: "48px" }}>ॐ</div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "#fdf6ec", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "64px" }}>🎉</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#1a0f00" }}>Profile Created!</h2>
        <p style={{ color: "rgba(26,15,0,0.6)" }}>Redirecting to your dashboard...</p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "10px",
    border: "1px solid rgba(255,153,51,0.3)", fontSize: "14px",
    outline: "none", background: "white", boxSizing: "border-box" as const,
    color: "#1a0f00",
  };

  const labelStyle = {
    display: "block" as const, fontSize: "13px",
    fontWeight: 600 as const, color: "#1a0f00", marginBottom: "6px",
  };

  return (
    <div style={{ background: "#fdf6ec", minHeight: "100vh", paddingTop: "100px", paddingBottom: "60px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛕</div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#1a0f00", marginBottom: "8px" }}>
            Setup Your Priest Profile
          </h1>
          <p style={{ color: "rgba(26,15,0,0.6)", fontSize: "15px" }}>
            Complete your profile to start receiving bookings
          </p>
        </div>

        {/* Form Card */}
        <div style={{ background: "white", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(255,153,51,0.1)" }}>

          {/* Profile Photo Preview */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" style={{ width: "80px", height: "80px", borderRadius: "50%", border: "3px solid #ff9933", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#ff9933", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto", color: "#1a0f00", fontWeight: 700 }}>
                {form.name?.[0] || "P"}
              </div>
            )}
            <p style={{ fontSize: "12px", color: "rgba(26,15,0,0.4)", marginTop: "8px" }}>
              Profile photo from Google account
            </p>
          </div>

          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Full Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={inputStyle} />
          </div>

          {/* Bio */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Bio / Description</label>
            <textarea
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell clients about yourself, your experience and your approach..."
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Phone + Experience */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+977 98XXXXXXXX" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Years of Experience</label>
              <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 10" type="number" style={inputStyle} />
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Service Location *</label>
            <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={inputStyle}>
              <option value="">Select your primary location</option>
              {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Specializations */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Specializations * (select all that apply)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SPECIALIZATIONS.map(spec => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setForm({ ...form, specializations: toggleItem(form.specializations, spec) })}
                  style={{
                    padding: "6px 14px", borderRadius: "999px", fontSize: "13px",
                    border: form.specializations.includes(spec) ? "1px solid #ff9933" : "1px solid rgba(255,153,51,0.3)",
                    background: form.specializations.includes(spec) ? "#ff9933" : "transparent",
                    color: form.specializations.includes(spec) ? "#1a0f00" : "rgba(26,15,0,0.6)",
                    cursor: "pointer", fontWeight: form.specializations.includes(spec) ? 600 : 400,
                    transition: "all 0.2s",
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Languages Spoken</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setForm({ ...form, languages: toggleItem(form.languages, lang) })}
                  style={{
                    padding: "6px 14px", borderRadius: "999px", fontSize: "13px",
                    border: form.languages.includes(lang) ? "1px solid #e8b923" : "1px solid rgba(232,185,35,0.3)",
                    background: form.languages.includes(lang) ? "#e8b923" : "transparent",
                    color: form.languages.includes(lang) ? "#1a0f00" : "rgba(26,15,0,0.6)",
                    cursor: "pointer", fontWeight: form.languages.includes(lang) ? 600 : 400,
                    transition: "all 0.2s",
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div style={{ marginBottom: "32px", padding: "16px 20px", borderRadius: "12px", background: "#fdf6ec", border: "1px solid rgba(255,153,51,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a0f00" }}>Availability Status</div>
              <div style={{ fontSize: "12px", color: "rgba(26,15,0,0.5)" }}>Toggle when you are available for bookings</div>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, isAvailable: !form.isAvailable })}
              style={{
                width: "52px", height: "28px", borderRadius: "999px", border: "none",
                background: form.isAvailable ? "#ff9933" : "rgba(26,15,0,0.2)",
                cursor: "pointer", position: "relative", transition: "all 0.3s",
              }}
            >
              <div style={{
                position: "absolute", top: "3px",
                left: form.isAvailable ? "27px" : "3px",
                width: "22px", height: "22px", borderRadius: "50%",
                background: "white", transition: "all 0.3s",
              }} />
            </button>
          </div>

          {error && (
            <div style={{ background: "rgba(255,0,0,0.05)", border: "1px solid rgba(255,0,0,0.2)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "red", fontSize: "13px" }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              width: "100%", padding: "14px", borderRadius: "999px",
              background: saving ? "rgba(255,153,51,0.5)" : "linear-gradient(135deg, #ff9933, #e8b923)",
              color: "#1a0f00", fontWeight: 700, fontSize: "15px",
              border: "none", cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving Profile..." : "Complete Setup & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}