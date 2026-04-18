'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

// Complete 39 product kits data
const productKits = [
  { id: 1, name: "Aasthachiranjibi Puja Kit", nameNe: "आस्थाचिरञ्जीवी पूजा किट", price: 500, image: "/images/services/4.jpg" },
  { id: 2, name: "Annaprashana Kit", nameNe: "अन्नप्राशन किट", price: 400, image: "/images/services/4.jpg" },
  { id: 3, name: "Antyeshti Kit", nameNe: "अन्त्येष्टि किट", price: 800, image: "/images/services/4.jpg" },
  { id: 4, name: "Asthi Visarjan Kit", nameNe: "अस्थि विसर्जन किट", price: 350, image: "/images/services/4.jpg" },
  { id: 5, name: "Bhoomi Pujan Kit", nameNe: "भूमि पूजन किट", price: 600, image: "/images/services/4.jpg" },
  { id: 6, name: "Bishnu Sahastranam Kit", nameNe: "विष्णु सहस्रनाम किट", price: 450, image: "/images/services/4.jpg" },
  { id: 7, name: "Chandi Path Kit", nameNe: "चण्डी पाठ किट", price: 550, image: "/images/services/4.jpg" },
  { id: 8, name: "Chudakarana Kit", nameNe: "चूड़ाकरण किट", price: 400, image: "/images/services/4.jpg" },
  { id: 9, name: "Durga Saptashati Kit", nameNe: "दुर्गा सप्तशती किट", price: 700, image: "/images/services/4.jpg" },
  { id: 10, name: "Garbhadharan Kit", nameNe: "गर्भाधारण किट", price: 450, image: "/images/services/4.jpg" },
  { id: 11, name: "Grahapravesh Kit", nameNe: "गृह प्रवेश किट", price: 550, image: "/images/services/4.jpg" },
  { id: 12, name: "Griha Shanti Kit", nameNe: "गृह शान्ति किट", price: 650, image: "/images/services/4.jpg" },
  { id: 13, name: "Havan/Yagya Kit", nameNe: "हवन/यज्ञ किट", price: 1200, image: "/images/services/4.jpg" },
  { id: 14, name: "Jatakarma Kit", nameNe: "जातकर्म किट", price: 500, image: "/images/services/4.jpg" },
  { id: 15, name: "Karnavedha Kit", nameNe: "कर्णवेध किट", price: 300, image: "/images/services/4.jpg" },
  { id: 16, name: "Keshanta Kit", nameNe: "केशान्त किट", price: 400, image: "/images/services/4.jpg" },
  { id: 17, name: "Kuldevta Puja Kit", nameNe: "कुलदेवता पूजा किट", price: 600, image: "/images/services/4.jpg" },
  { id: 18, name: "Lakshmi Puja Kit", nameNe: "लक्ष्मी पूजा किट", price: 500, image: "/images/services/4.jpg" },
  { id: 19, name: "Mahamrityunjaya Jaap Kit", nameNe: "महामृत्युंजय जाप किट", price: 800, image: "/images/services/4.jpg" },
  { id: 20, name: "Mundan Kit", nameNe: "मुण्डन किट", price: 400, image: "/images/services/4.jpg" },
  { id: 21, name: "Naam Jaap Kit", nameNe: "नाम जाप किट", price: 300, image: "/images/services/4.jpg" },
  { id: 22, name: "Namakarana Kit", nameNe: "नामकरण किट", price: 450, image: "/images/services/4.jpg" },
  { id: 23, name: "Narayan Bali Kit", nameNe: "नारायण बली किट", price: 900, image: "/images/services/4.jpg" },
  { id: 24, name: "Navagraha Shanti Kit", nameNe: "नवग्रह शान्ति किट", price: 750, image: "/images/services/4.jpg" },
  { id: 25, name: "Nishkramana Kit", nameNe: "निष्क्रमण किट", price: 350, image: "/images/services/4.jpg" },
  { id: 26, name: "Pitra Dosh Nivaran Kit", nameNe: "पितृ दोष निवारण किट", price: 500, image: "/images/services/4.jpg" },
  { id: 27, name: "Pumsavana Kit", nameNe: "पुंसवन किट", price: 450, image: "/images/services/4.jpg" },
  { id: 28, name: "Rudri Path Kit", nameNe: "रुद्री पाठ किट", price: 550, image: "/images/services/4.jpg" },
  { id: 29, name: "Samavartana Kit", nameNe: "समावर्तन किट", price: 500, image: "/images/services/4.jpg" },
  { id: 30, name: "Sannyasa Kit", nameNe: "संन्यास किट", price: 600, image: "/images/services/4.jpg" },
  { id: 31, name: "Satyanarayan Puja Kit", nameNe: "सत्यनारायण पूजा किट", price: 550, image: "/images/services/4.jpg" },
  { id: 32, name: "Shraddha Kit", nameNe: "श्राद्ध किट", price: 600, image: "/images/services/4.jpg" },
  { id: 33, name: "Simantonnayana Kit", nameNe: "सीमन्तोन्नयन किट", price: 500, image: "/images/services/4.jpg" },
  { id: 34, name: "Tarpan Kit", nameNe: "तर्पण किट", price: 350, image: "/images/services/4.jpg" },
  { id: 35, name: "Tripindi Shraddha Kit", nameNe: "त्रिपिंडी श्राद्ध किट", price: 800, image: "/images/services/4.jpg" },
  { id: 36, name: "Upanayana Kit", nameNe: "उपनयन किट", price: 700, image: "/images/services/4.jpg" },
  { id: 37, name: "Vanaprastha Kit", nameNe: "वानप्रस्थ किट", price: 500, image: "/images/services/4.jpg" },
  { id: 38, name: "Vedarambha Kit", nameNe: "वेदारम्भ किट", price: 550, image: "/images/services/4.jpg" },
  { id: 39, name: "Vivaha Kit", nameNe: "विवाह किट", price: 1500, image: "/images/services/4.jpg" }
];

export default function ProductsPage() {
  const { lang } = useLang();
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  const isEnglish = currentLang === 'en';

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>📦</span>
        <h1 style={styles.title}>
          {isEnglish ? 'Puja Samagri Kits' : 'पूजा सामग्री किटहरू'}
        </h1>
        <p style={styles.subtitle}>
          {isEnglish 
            ? 'Complete puja kits for all 39 Vedic rituals. Delivered fresh to your doorstep.'
            : 'सबै ३९ वैदिक अनुष्ठानहरूको लागि पूर्ण पूजा किटहरू। तपाईंको घरमै ताजा डेलिभरी गरिन्छ।'}
        </p>
      </div>

      <div style={styles.grid}>
        {productKits.map((kit) => (
          <Link href={`/products/${kit.id}-${kit.name.toLowerCase().replace(/ /g, '-')}`} key={kit.id} style={styles.cardLink}>
            <div style={styles.card}>
              <div style={styles.cardImageContainer}>
                <img src={kit.image} alt={isEnglish ? kit.name : kit.nameNe} style={styles.cardImage} />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>
                  {isEnglish ? kit.name : kit.nameNe}
                </h3>
                <div style={styles.priceRow}>
                  <span style={styles.price}>NPR {kit.price.toLocaleString()}+</span>
                  <span style={styles.viewButton}>View Details →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf6ec 0%, #ffe6cc 100%)',
    padding: '100px 20px 60px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  headerIcon: {
    fontSize: '64px',
    display: 'block',
    marginBottom: '16px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  cardLink: {
    textDecoration: 'none',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  cardImageContainer: {
    height: '200px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease',
  },
  cardContent: {
    padding: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a0f00',
    marginBottom: '12px',
    fontFamily: 'Georgia, serif',
    lineHeight: '1.4',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ff9933',
  },
  viewButton: {
    fontSize: '13px',
    color: '#ff9933',
    fontWeight: '500',
  },
};

// Add hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    .card:hover .card-image {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
}