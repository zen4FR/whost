import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1a0f00", color: "white", paddingTop: "1px" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #ff9933, transparent)" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <img src="/images/logo/1.png" alt="Purohit Baaje" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "serif", fontSize: "20px", fontWeight: "bold" }}>Purohit Baaje</div>
              <div style={{ fontSize: "12px", color: "#e8b923" }}>Purohit Baaje Nepal</div>
            </div>
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "280px" }}>
            Nepal's trusted digital platform for sacred puja bookings and spiritual guidance.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "serif", color: "#e8b923", marginBottom: "16px" }}>Services</h4>
          {["Puja Booking", "Priest Hire", "Products"].map((s) => (
            <div key={s} style={{ marginBottom: "8px" }}>
              <Link href="/services" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "14px" }}>{s}</Link>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: "serif", color: "#e8b923", marginBottom: "16px" }}>Support</h4>
          <div style={{ marginBottom: "8px" }}>
            <Link href="/faq" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "14px" }}>FAQ</Link>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Link href="/contact" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "14px" }}>Contact</Link>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Link href="/how-it-works" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "14px" }}>How It Works</Link>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", padding: "16px", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
        {new Date().getFullYear()} Purohit Baaje - Har Har Mahadev
      </div>
    </footer>
  );
}