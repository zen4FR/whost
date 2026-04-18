'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: '',
    serviceId: '',
    priestName: '',
    eventDate: '',
    eventTime: '',
    location: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Complete services list from your data
  const services = [
    { id: 1, name: "Aasthachiranjibi Puja", nameNe: "आस्थाचिरञ्जीवी पूजा", category: "Spiritual", price: 2100 },
    { id: 2, name: "Annaprashana", nameNe: "अन्नप्राशन संस्कार", category: "Infant", price: 1500 },
    { id: 3, name: "Antyeshti", nameNe: "अन्त्येष्टि संस्कार", category: "Death", price: 3100 },
    { id: 4, name: "Asthi Visarjan", nameNe: "अस्थि विसर्जन", category: "Post-Cremation", price: 1800 },
    { id: 5, name: "Bhoomi Pujan", nameNe: "भूमि पूजन", category: "Ritual", price: 2100 },
    { id: 6, name: "Bishnu Sahastranam", nameNe: "विष्णु सहस्रनाम", category: "Spiritual", price: 1800 },
    { id: 7, name: "Chandi Path", nameNe: "चण्डी पाठ", category: "Spiritual", price: 2200 },
    { id: 8, name: "Chudakarana", nameNe: "चूड़ाकरण संस्कार", category: "Child", price: 1500 },
    { id: 9, name: "Durga Saptashati", nameNe: "दुर्गा सप्तशती पाठ", category: "Festival", price: 3100 },
    { id: 10, name: "Garbhadharan", nameNe: "गर्भाधारण संस्कार", category: "Pregnancy", price: 1500 },
    { id: 11, name: "Grahapravesh", nameNe: "गृह प्रवेश", category: "Ritual", price: 2200 },
    { id: 12, name: "Griha Shanti", nameNe: "गृह शान्ति पूजा", category: "Peace at Home", price: 3000 },
    { id: 13, name: "Havan/Yagya", nameNe: "हवन / यज्ञ", category: "Devotional", price: 3000 },
    { id: 14, name: "Jatakarma", nameNe: "जातकर्म संस्कार", category: "Birth", price: 2100 },
    { id: 15, name: "Karnavedha", nameNe: "कर्णवेध संस्कार", category: "Child", price: 1000 },
    { id: 16, name: "Keshanta", nameNe: "केशान्त संस्कार", category: "Teen", price: 1300 },
    { id: 17, name: "Kuldevta Puja", nameNe: "कुलदेवता पूजा", category: "Ancestral", price: 2500 },
    { id: 18, name: "Lakshmi Puja", nameNe: "लक्ष्मी पूजा", category: "Wealth/Festival", price: 1700 },
    { id: 19, name: "Mahamrityunjaya Jaap", nameNe: "महामृत्युंजय जाप", category: "Health & Longevity", price: 3000 },
    { id: 20, name: "Mundan", nameNe: "मुण्डन संस्कार", category: "Child", price: 1500 },
    { id: 21, name: "Naam Jaap", nameNe: "नाम जाप", category: "Spiritual", price: 1000 },
    { id: 22, name: "Namakarana", nameNe: "नामकरण संस्कार", category: "Birth", price: 1500 },
    { id: 23, name: "Narayan Bali", nameNe: "नारायण बली", category: "Post-Death", price: 3500 },
    { id: 24, name: "Navagraha Shanti", nameNe: "नवग्रह शान्ति पूजा", category: "Astrology Remedy", price: 2500 },
    { id: 25, name: "Nishkramana", nameNe: "निष्क्रमण संस्कार", category: "Infant", price: 1200 },
    { id: 26, name: "Pitra Dosh Nivaran", nameNe: "पितृ दोष निवारण", category: "Astrology Remedy", price: 1500 },
    { id: 27, name: "Pumsavana", nameNe: "पुंसवन संस्कार", category: "Pregnancy", price: 1500 },
    { id: 28, name: "Rudri Path", nameNe: "रुद्री पाठ", category: "Spiritual", price: 1800 },
    { id: 29, name: "Samavartana", nameNe: "समावर्तन संस्कार", category: "Youth", price: 1500 },
    { id: 30, name: "Sannyasa", nameNe: "संन्यास संस्कार", category: "Spiritual", price: 2000 },
    { id: 31, name: "Satyanarayan Puja", nameNe: "सत्यनारायण पूजा", category: "Devotional", price: 2100 },
    { id: 32, name: "Shraddha", nameNe: "श्राद्ध कर्म", category: "Post-Death", price: 2100 },
    { id: 33, name: "Simantonnayana", nameNe: "सीमन्तोन्नयन संस्कार", category: "Pregnancy", price: 2000 },
    { id: 34, name: "Tarpan", nameNe: "तर्पण", category: "Ancestral", price: 1100 },
    { id: 35, name: "Tripindi Shraddha", nameNe: "त्रिपिंडी श्राद्ध", category: "Ancestral", price: 3000 },
    { id: 36, name: "Upanayana", nameNe: "उपनयन संस्कार", category: "Adolescence", price: 3500 },
    { id: 37, name: "Vanaprastha", nameNe: "वानप्रस्थ संस्कार", category: "Retirement", price: 1800 },
    { id: 38, name: "Vedarambha", nameNe: "वेदारम्भ संस्कार", category: "Adolescence", price: 2100 },
    { id: 39, name: "Vivaha", nameNe: "विवाह संस्कार", category: "Adult", price: 5000 }
  ];

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  const calculatePrice = (serviceName: string) => {
    const service = services.find(s => s.name === serviceName);
    return service?.price || 2500;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      alert('Please sign in to book a puja');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedService = services.find(s => s.name === formData.service);
      
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'User',
        serviceId: selectedService?.id || 0,
        service: formData.service,
        serviceCategory: selectedService?.category || '',
        price: calculatePrice(formData.service),
        priestName: formData.priestName || 'Not assigned',
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        location: formData.location,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
      console.log('✅ Booking saved with ID:', docRef.id);
      
      alert('✅ Booking successful! You can view it in your dashboard.');
      router.push('/profile');
    } catch (error: any) {
      console.error('❌ Error saving booking:', error);
      setError(error.message || 'Error creating booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.icon}>🪔</span>
          <h1 style={styles.title}>Book a Puja</h1>
          <p style={styles.subtitle}>Fill in the details to schedule your sacred ceremony</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <p style={styles.errorText}>❌ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Select Service *</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              style={styles.select}
              required
            >
              <option value="">Choose a service</option>
              {Object.entries(groupedServices).map(([category, categoryServices]) => (
                <optgroup key={category} label={`📌 ${category}`}>
                  {categoryServices.map(service => (
                    <option key={service.id} value={service.name}>
                      {service.name} - NPR {service.price.toLocaleString()}+
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {formData.service && (
            <div style={styles.priceDisplay}>
              <span style={styles.priceLabel}>Service Price:</span>
              <span style={styles.priceValue}>NPR {calculatePrice(formData.service).toLocaleString()}+</span>
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Preferred Priest (Optional)</label>
            <input
              type="text"
              value={formData.priestName}
              onChange={(e) => setFormData({ ...formData, priestName: e.target.value })}
              style={styles.input}
              placeholder="Leave blank to assign automatically"
            />
          </div>

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Event Date *</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                style={styles.input}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Event Time *</label>
              <input
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={styles.input}
              placeholder="Kathmandu, Lalitpur, Bhaktapur..."
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={styles.input}
              placeholder="98XXXXXXXX"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Special Requests</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              style={styles.textarea}
              rows={3}
              placeholder="Any specific requirements or instructions..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              ...(isSubmitting ? styles.submitDisabled : {})
            }}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf6ec 0%, #ffe6cc 100%)',
    padding: '40px 20px',
    paddingTop: '100px',
  },
  card: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  icon: {
    fontSize: '48px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginTop: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
  },
  errorBox: {
    background: '#ffebee',
    border: '1px solid #f44336',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
  },
  errorText: {
    color: '#f44336',
    margin: 0,
    fontSize: '14px',
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
  row: {
    display: 'flex',
    gap: '16px',
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
  },
  select: {
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: 'white',
  },
  textarea: {
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    resize: 'vertical' as const,
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
    marginTop: '8px',
  },
  submitDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  priceDisplay: {
    background: '#fff8f0',
    padding: '12px 16px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ffe0b3',
  },
  priceLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a0f00',
  },
  priceValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff9933',
  },
};