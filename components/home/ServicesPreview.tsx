'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import servicesData from '@/data/services.json';

export default function ServicesPreview() {
  const { lang, t } = useLang();
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(servicesData.slice(0, 4));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.icon}>🪔</span>
          <h2 style={styles.title}>
            {lang === 'en' ? 'What We Offer' : 'हाम्रो सेवाहरू'}
          </h2>
          <p style={styles.subtitle}>
            {lang === 'en' 
              ? 'Our Sacred Services - Everything you need for your spiritual journey' 
              : 'हाम्रा पवित्र सेवाहरू - तपाईंको आध्यात्मिक यात्राको लागि चाहिने सबै कुरा'}
          </p>
        </div>
        <Link href="/services" style={styles.viewAllButton}>
          {lang === 'en' ? 'View All Services →' : 'सबै सेवाहरू हेर्नुहोस् →'}
        </Link>
      </div>

      <div style={styles.grid}>
        {services.map((service: any) => (
          <Link href={`/services/${service.slug}`} key={service.slug} style={styles.cardLink}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>{service.icon}</div>
              <h3 style={styles.cardTitle}>
                {lang === 'en' ? service.title : service.titleNe}
              </h3>
              <p style={styles.cardDesc}>
                {lang === 'en' ? service.shortDesc : service.shortDescNe}
              </p>
              <div style={styles.priceRow}>
                <span style={styles.price}>
                  {lang === 'en' 
                    ? `From NPR ${service.priceMin?.toLocaleString()}` 
                    : `रु ${service.priceMin?.toLocaleString()} बाट`}
                </span>
                <span style={styles.duration}>
                  {lang === 'en' ? service.duration : service.durationNe}
                </span>
              </div>
              <div style={styles.learnMore}>
                {lang === 'en' ? 'Learn More →' : 'थप जान्नुहोस् →'}
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap' as const,
    gap: '20px',
  },
  headerLeft: {
    flex: 1,
  },
  icon: {
    fontSize: '40px',
    display: 'block',
    marginBottom: '10px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  viewAllButton: {
    padding: '12px 24px',
    background: '#ff9933',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '40px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    whiteSpace: 'nowrap' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  cardLink: {
    textDecoration: 'none',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  cardIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a0f00',
    marginBottom: '12px',
    fontFamily: 'Georgia, serif',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '16px',
    flex: 1,
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #f0e6d8',
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
    display: 'inline-block',
    color: '#ff9933',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
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