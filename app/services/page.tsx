'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import servicesData from '@/data/services.json';

export default function ServicesPage() {
  const { lang } = useLang();
  const [services, setServices] = useState([]);
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    setServices(servicesData);
  }, []);

  // This is CRITICAL - re-render when language changes
  useEffect(() => {
    console.log('Language changed to:', lang);
    setCurrentLang(lang);
  }, [lang]);

  console.log('Current language:', currentLang);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🪔</span>
        <h1 style={styles.title}>
          {currentLang === 'en' ? 'Our Sacred Services' : 'हाम्रा पवित्र सेवाहरू'}
        </h1>
        <p style={styles.subtitle}>
          {currentLang === 'en' 
            ? 'Discover authentic spiritual services for every occasion' 
            : 'हरेक अवसरको लागि प्रामाणिक आध्यात्मिक सेवाहरू पत्ता लगाउनुहोस्'}
        </p>
      </div>

      <div style={styles.grid}>
        {services.map((service: any) => (
          <Link href={`/services/${service.slug}`} key={service.slug} style={styles.cardLink}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>{service.icon}</div>
              <h3 style={styles.cardTitle}>
                {currentLang === 'en' ? service.title : service.titleNe}
              </h3>
              <p style={styles.cardDesc}>
                {currentLang === 'en' ? service.shortDesc : service.shortDescNe}
              </p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>
                  {currentLang === 'en' 
                    ? `From NPR ${service.priceMin?.toLocaleString()}` 
                    : `रु ${service.priceMin?.toLocaleString()} बाट`}
                </span>
                <span style={styles.duration}>
                  {currentLang === 'en' ? service.duration : service.durationNe}
                </span>
              </div>
              <div style={styles.learnMore}>
                {currentLang === 'en' ? 'Learn More →' : 'थप जान्नुहोस् →'}
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  cardIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1a0f00',
    marginBottom: '12px',
    fontFamily: 'Georgia, serif',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '20px',
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #f0e6d8',
    marginBottom: '16px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff9933',
  },
  duration: {
    fontSize: '12px',
    color: '#999',
  },
  learnMore: {
    color: '#ff9933',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
  },
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
  `;
  document.head.appendChild(style);
}