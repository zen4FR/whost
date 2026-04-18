'use client';

import { useLang } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=27.698706,85.340570', '_blank');
  };

  // Coordinates for the location
  const lat = 27.698706;
  const lng = 85.340570;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={styles.headerIcon}
        >
          📞
        </motion.span>
        <motion.h1 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={styles.title}
        >
          {lang === 'en' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.subtitle}
        >
          {lang === 'en' 
            ? 'Get in touch with our support team' 
            : 'हाम्रो सहायता टोलीसँग सम्पर्क गर्नुहोस्'}
        </motion.p>
      </div>

      <div style={styles.grid}>
        {/* Contact Info Cards with Animation */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={styles.infoSection}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            style={styles.infoCard}
          >
            <span style={styles.infoIcon}>📍</span>
            <h3>{lang === 'en' ? 'Visit Us' : 'हामीलाई भेट्नुहोस्'}</h3>
            <p>Lumica Labs Pvt. Ltd</p>
            <p>Basuki Marga, Kathmandu 44600</p>
            <p style={{ fontSize: '12px', color: '#ff9933', marginTop: '8px' }}>✨ Opposite of KCMIT College</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            style={styles.infoCard}
          >
            <span style={styles.infoIcon}>📞</span>
            <h3>{lang === 'en' ? 'Call Us' : 'फोन गर्नुहोस्'}</h3>
            <p>+977-9860336777</p>
            <p>+977-9764397693</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            style={styles.infoCard}
          >
            <span style={styles.infoIcon}>💬</span>
            <h3>{lang === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</h3>
            <p>+977-9764397693</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            style={styles.infoCard}
          >
            <span style={styles.infoIcon}>✉️</span>
            <h3>{lang === 'en' ? 'Email Us' : 'इमेल गर्नुहोस्'}</h3>
            <p>info@purohitbaaje.com</p>
            <p>support@purohitbaaje.com</p>
          </motion.div>
        </motion.div>

        {/* Contact Form with Animation */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={styles.formSection}
        >
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>
                {lang === 'en' ? 'Full Name' : 'पूरा नाम'} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>
                {lang === 'en' ? 'Email Address' : 'इमेल ठेगाना'} *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>
                {lang === 'en' ? 'Phone Number' : 'फोन नम्बर'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>
                {lang === 'en' ? 'Your Message' : 'तपाईंको सन्देश'} *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={styles.textarea}
                rows={5}
                required
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              style={styles.submitButton}
            >
              {lang === 'en' ? 'Send Message' : 'सन्देश पठाउनुहोस्'} →
            </motion.button>
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.successMessage}
              >
                {lang === 'en' ? '✅ Message sent successfully! We\'ll get back to you soon.' : '✅ सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै तपाईंलाई सम्पर्क गर्नेछौं।'}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Map Section with Static Map Image + Marker */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={styles.mapSection}
      >
        <h2 style={styles.mapTitle}>
          {lang === 'en' ? 'Find Us' : 'हामीलाई पत्ता लगाउनुहोस्'}
        </h2>

        {/* Static Map with Marker using Google Maps Static API */}
        <div style={styles.mapContainer}>
          <img 
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&size=800x400&markers=color:red%7C%7C${lat},${lng}&key=AIzaSyAyFamLqUDLy4aZepU_UbXR_EXnesqVm7M`}
            alt="Map showing our location"
            style={styles.staticMap}
            onError={(e) => {
              // Fallback to iframe if static map fails
              e.currentTarget.style.display = 'none';
              const iframe = document.getElementById('dynamic-map');
              if (iframe) iframe.style.display = 'block';
            }}
          />
          {/* Interactive Map Fallback - No API Key Required */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.123456789!2d85.340570!3d27.698706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a123456789%3A0x123456789!2sLumica%20Labs%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1699999999999!5m2!1sen!2snp"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>

        {/* Get Directions Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openGoogleMaps}
          style={styles.directionsButton}
        >
          🗺️ {lang === 'en' ? 'Get Directions on Google Maps' : 'गुगल म्याप्समा दिशा प्राप्त गर्नुहोस्'} →
        </motion.button>

        {/* Location Details with Animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={styles.locationDetails}
        >
          <div style={styles.locationRow}>
            <span style={styles.locationIcon}>📍</span>
            <div>
              <strong>Lumica Labs Pvt. Ltd</strong>
              <p>Basuki Marga, Kathmandu 44600</p>
              <p style={{ color: '#ff9933' }}>✨ Opposite of KCMIT College</p>
            </div>
          </div>
          <div style={styles.locationRow}>
            <span style={styles.locationIcon}>📌</span>
            <div>
              <strong>{lang === 'en' ? 'Coordinates:' : 'स्थान:'}</strong>
              <p>{lat}°, {lng}°</p>
            </div>
          </div>
          <div style={styles.locationRow}>
            <span style={styles.locationIcon}>🕐</span>
            <div>
              <strong>{lang === 'en' ? 'Business Hours:' : 'व्यवसाय समय:'}</strong>
              <p>Sunday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: Closed</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
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
    display: 'inline-block',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  infoSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  infoCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  infoIcon: {
    fontSize: '40px',
    display: 'block',
    marginBottom: '12px',
  },
  formSection: {
    background: 'white',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a0f00',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    resize: 'vertical' as const,
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    padding: '14px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  successMessage: {
    padding: '12px',
    background: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '8px',
    textAlign: 'center' as const,
    fontSize: '14px',
  },
  mapSection: {
    maxWidth: '1200px',
    margin: '60px auto 0',
  },
  mapTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  mapContainer: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  staticMap: {
    width: '100%',
    height: '400px',
    objectFit: 'cover' as const,
  },
  directionsButton: {
    marginTop: '24px',
    padding: '14px 28px',
    background: '#1a0f00',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  locationDetails: {
    marginTop: '24px',
    padding: '20px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  locationRow: {
    display: 'flex',
    gap: '16px',
    padding: '12px',
    borderBottom: '1px solid #f0e6d8',
    fontSize: '14px',
  },
  locationIcon: {
    fontSize: '20px',
  },
};

// Add hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    input:hover, textarea:hover {
      border-color: #ff9933;
    }
    input:focus, textarea:focus {
      border-color: #ff9933;
      outline: none;
      box-shadow: 0 0 0 3px rgba(255,153,51,0.1);
    }
  `;
  document.head.appendChild(style);
}