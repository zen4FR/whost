import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ChatbotWidget from "../components/chatbot/ChatbotWidget";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "Purohit Baaje - Book Puja & Priest Services",
  description: "Nepal's trusted platform for puja booking, priest services, astrology, and spiritual products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#fdf6ec", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <ChatbotWidget />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}