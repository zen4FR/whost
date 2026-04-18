'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function HowItWorksPage() {
  const { lang } = useLang();
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    console.log('Language changed to:', lang);
    setCurrentLang(lang);
  }, [lang]);

  const steps = [
    {
      en: { number: '01', title: 'Choose Your Service', description: 'Browse our services and select the puja or ritual you need. From Online Puja to Priest Booking, we have everything.' },
      ne: { number: '०१', title: 'आफ्नो सेवा छान्नुहोस्', description: 'हाम्रा सेवाहरू ब्राउज गर्नुहोस् र तपाईंलाई चाहिने पूजा वा अनुष्ठान चयन गर्नुहोस्।' }
    },
    {
      en: { number: '02', title: 'Book & Schedule', description: 'Fill in your details, select date and time, and confirm your booking. Get instant confirmation via email and WhatsApp.' },
      ne: { number: '०२', title: 'बुक गर्नुहोस् र समय तालिका बनाउनुहोस्', description: 'आफ्नो विवरण भर्नुहोस्, मिति र समय चयन गर्नुहोस्, र आफ्नो बुकिङ पुष्टि गर्नुहोस्।' }
    },
    {
      en: { number: '03', title: 'Priest Assignment', description: 'We assign a verified, experienced priest based on your ritual requirements and location.' },
      ne: { number: '०३', title: 'पुरोहित नियुक्ति', description: 'हामी तपाईंको अनुष्ठान आवश्यकता र स्थानको आधारमा एक प्रमाणित, अनुभवी पुरोहित नियुक्त गर्छौं।' }
    },
    {
      en: { number: '04', title: 'Perform the Ritual', description: 'The priest performs the ceremony at your preferred time and location (or online via video call).' },
      ne: { number: '०४', title: 'अनुष्ठान सम्पन्न गर्नुहोस्', description: 'पुरोहितले तपाईंको रुचाइएको समय र स्थानमा समारोह सम्पन्न गर्दछ।' }
    },
    {
      en: { number: '05', title: 'Receive Blessings', description: 'Get prasad delivered to your doorstep (Kathmandu Valley) and receive digital blessings via email.' },
      ne: { number: '०५', title: 'आशीर्वाद प्राप्त गर्नुहोस्', description: 'प्रसाद तपाईंको घरमै डेलिभरी प्राप्त गर्नुहोस् र इमेल मार्फत डिजिटल आशीर्वाद प्राप्त गर्नुहोस्।' }
    }
  ];

  const features = [
    { en: 'Verified Priests', ne: 'प्रमाणित पुरोहित' },
    { en: '100% Authentic Rituals', ne: '१००% प्रामाणिक अनुष्ठान' },
    { en: 'Prasad Delivery', ne: 'प्रसाद डेलिभरी' },
    { en: '24/7 Support', ne: '२४/७ समर्थन' },
    { en: 'Secure Booking', ne: 'सुरक्षित बुकिङ' },
    { en: 'Digital Certificate', ne: 'डिजिटल प्रमाणपत्र' }
  ];

  const isEnglish = currentLang === 'en';

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🕉️</span>
        <h1 style={styles.title}>
          {isEnglish ? 'How It Works' : 'यसरी काम गर्छ'}
        </h1>
        <p style={styles.subtitle}>
          {isEnglish 
            ? 'Simple steps to book your spiritual ceremony' 
            : 'तपाईंको आध्यात्मिक समारोह बुक गर्ने सरल चरणहरू'}
        </p>
      </div>

      {/* Steps Section */}
      <div style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} style={styles.stepCard}>
            <div style={styles.stepNumber}>
              {isEnglish ? step.en.number : step.ne.number}
            </div>
            <h3 style={styles.stepTitle}>
              {isEnglish ? step.en.title : step.ne.title}
            </h3>
            <p style={styles.stepDescription}>
              {isEnglish ? step.en.description : step.ne.description}
            </p>
            {index < steps.length - 1 && (
              <div style={styles.stepArrow}>↓</div>
            )}
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>
          {isEnglish ? 'Why Choose Purohit Baaje?' : 'पुरोहित बाजे किन छान्ने?'}
        </h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <span style={styles.featureCheck}>✓</span>
              <span>{isEnglish ? feature.en : feature.ne}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>
          {isEnglish ? 'Ready to Begin?' : 'सुरु गर्न तयार हुनुहुन्छ?'}
        </h2>
        <p style={styles.ctaText}>
          {isEnglish 
            ? 'Book your first puja today and experience the divine blessings' 
            : 'आज आफ्नो पहिलो पूजा बुक गर्नुहोस् र दिव्य आशीर्वाद अनुभव गर्नुहोस्'}
        </p>
        <div style={styles.ctaButtons}>
          <a href="/booking" style={styles.primaryButton}>
            {isEnglish ? 'Book Now →' : 'अहिले बुक गर्नुहोस् →'}
          </a>
          <a href="/services" style={styles.secondaryButton}>
            {isEnglish ? 'Browse Services' : 'सेवाहरू हेर्नुहोस्'}
          </a>
        </div>
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
  stepsContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  stepCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    position: 'relative' as const,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease',
  },
  stepNumber: {
    position: 'absolute' as const,
    top: '-15px',
    left: '30px',
    background: '#ff9933',
    color: 'white',
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(255,153,51,0.3)',
  },
  stepTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1a0f00',
    marginTop: '15px',
    marginBottom: '10px',
    fontFamily: 'Georgia, serif',
  },
  stepDescription: {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.6',
  },
  stepArrow: {
    textAlign: 'center' as const,
    fontSize: '24px',
    color: '#ff9933',
    marginTop: '20px',
  },
  featuresSection: {
    maxWidth: '900px',
    margin: '60px auto 0',
    textAlign: 'center' as const,
  },
  featuresTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '30px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  featureCard: {
    background: 'white',
    padding: '16px 20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a0f00',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  featureCheck: {
    width: '24px',
    height: '24px',
    background: '#ff9933',
    color: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  ctaSection: {
    maxWidth: '600px',
    margin: '60px auto 0',
    textAlign: 'center' as const,
    padding: '48px',
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  ctaTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '16px',
  },
  ctaText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  primaryButton: {
    padding: '12px 32px',
    background: '#ff9933',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '40px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    padding: '12px 32px',
    background: 'transparent',
    color: '#ff9933',
    textDecoration: 'none',
    borderRadius: '40px',
    fontSize: '15px',
    fontWeight: '600',
    border: '2px solid #ff9933',
    transition: 'all 0.3s ease',
  },
};

// Add hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .step-card:hover {
      transform: translateY(-5px);
    }
    .primary-button:hover, .secondary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255,153,51,0.3);
    }
  `;
  document.head.appendChild(style);
}   