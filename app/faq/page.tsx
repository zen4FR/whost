'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function FAQPage() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      en: {
        question: "How do I book a puja or priest?",
        answer: "Simply go to our Booking page, select your desired service, fill in the details (date, time, location), and confirm your booking. You'll receive a confirmation within 2 hours."
      },
      ne: {
        question: "पूजा वा पुरोहित कसरी बुक गर्ने?",
        answer: "हाम्रो बुकिङ पृष्ठमा जानुहोस्, आफ्नो इच्छित सेवा चयन गर्नुहोस्, विवरणहरू भर्नुहोस्, र आफ्नो बुकिङ पुष्टि गर्नुहोस्। तपाईंले २ घण्टा भित्र पुष्टि प्राप्त गर्नुहुनेछ।"
      }
    },
    {
      en: {
        question: "Are your priests verified?",
        answer: "Yes! All our priests undergo strict background verification, have years of experience, and are trained in authentic Vedic rituals."
      },
      ne: {
        question: "तपाईंका पुरोहितहरू प्रमाणित छन्?",
        answer: "हो! हाम्रा सबै पुरोहितहरू कडा पृष्ठभूमि प्रमाणीकरणबाट गुज्रन्छन्, वर्षौंको अनुभव छ, र प्रामाणिक वैदिक अनुष्ठानहरूमा प्रशिक्षित छन्।"
      }
    },
    {
      en: {
        question: "What is included in the puja samagri?",
        answer: "Each puja package includes all essential items like incense, flowers, fruits, ghee, camphor, coconut, betel nuts, and specific ritual items based on the ceremony."
      },
      ne: {
        question: "पूजा सामग्रीमा के के समावेश छ?",
        answer: "प्रत्येक पूजा प्याकेजमा धूप, फूल, फलफूल, घ्यू, कपूर, नरिवल, सुपारी, र समारोहको आधारमा विशिष्ट अनुष्ठान सामग्रीहरू समावेश छन्।"
      }
    },
    {
      en: {
        question: "Can I book online puja from outside Nepal?",
        answer: "Absolutely! Our online puja services are available worldwide. You can participate live via video call from anywhere."
      },
      ne: {
        question: "के म नेपाल बाहिरबाट अनलाइन पूजा बुक गर्न सक्छु?",
        answer: "पक्कै पनि! हाम्रो अनलाइन पूजा सेवाहरू विश्वभर उपलब्ध छन्। तपाईं कहींबाट पनि भिडियो कल मार्फत प्रत्यक्ष सहभागी हुन सक्नुहुन्छ।"
      }
    },
    {
      en: {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 3-5 days in advance. For special occasions like Vivaha or Upanayana, book 2-3 weeks ahead."
      },
      ne: {
        question: "कति अग्रिम बुक गर्नुपर्छ?",
        answer: "हामी कम्तीमा ३-५ दिन अग्रिम बुक गर्न सिफारिस गर्छौं। विवाह वा उपनयन जस्ता विशेष अवसरहरूको लागि, २-३ हप्ता अगाडि बुक गर्नुहोस्।"
      }
    },
    {
      en: {
        question: "What is your cancellation policy?",
        answer: "Free cancellation up to 24 hours before the event. 50% refund for cancellations within 24 hours. No refund for no-shows."
      },
      ne: {
        question: "तपाईंको रद्द नीति के हो?",
        answer: "घटना भन्दा २४ घण्टा अघि सम्म नि:शुल्क रद्द। २४ घण्टा भित्र रद्दको लागि ५०% रिफन्ड। उपस्थित नभएकोमा कुनै रिफन्ड छैन।"
      }
    },
    {
      en: {
        question: "Do you provide prasad delivery?",
        answer: "Yes! For online pujas, we deliver prasad to your doorstep within Kathmandu Valley. For other locations, digital prasad (blessings) is sent via email."
      },
      ne: {
        question: "के तपाईं प्रसाद डेलिभरी प्रदान गर्नुहुन्छ?",
        answer: "हो! अनलाइन पूजाको लागि, हामी काठमाडौं उपत्यकाभित्र प्रसाद तपाईंको घरमै डेलिभरी गर्छौं। अन्य स्थानहरूको लागि, डिजिटल प्रसाद इमेल मार्फत पठाइन्छ।"
      }
    },
    {
      en: {
        question: "What payment methods do you accept?",
        answer: "We accept Esewa, Khalti, ConnectIPS, bank transfers, and cash on delivery (for Kathmandu Valley)."
      },
      ne: {
        question: "तपाईं कुन भुक्तानी विधिहरू स्वीकार गर्नुहुन्छ?",
        answer: "हामी इसेवा, खल्ती, कनेक्टआईपीएस, बैंक ट्रान्सफर, र क्यास अन डेलिभरी (काठमाडौं उपत्यकाको लागि) स्वीकार गर्छौं।"
      }
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>❓</span>
        <h1 style={styles.title}>
          {lang === 'en' ? 'Frequently Asked Questions' : 'बारम्बार सोधिने प्रश्नहरू'}
        </h1>
        <p style={styles.subtitle}>
          {lang === 'en' 
            ? 'Find answers to common questions about our services' 
            : 'हाम्रा सेवाहरूको बारेमा सामान्य प्रश्नहरूको जवाफ पाउनुहोस्'}
        </p>
      </div>

      <div style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <button
              onClick={() => toggleFAQ(index)}
              style={styles.questionButton}
            >
              <span style={styles.questionIcon}>
                {openIndex === index ? '▼' : '▶'}
              </span>
              <span style={styles.questionText}>
                {lang === 'en' ? faq.en.question : faq.ne.question}
              </span>
            </button>
            {openIndex === index && (
              <div style={styles.answerContainer}>
                <p style={styles.answerText}>
                  {lang === 'en' ? faq.en.answer : faq.ne.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still have questions section */}
      <div style={styles.contactSection}>
        <h2 style={styles.contactTitle}>
          {lang === 'en' ? 'Still have questions?' : 'अझै प्रश्नहरू छन्?'}
        </h2>
        <p style={styles.contactSubtitle}>
          {lang === 'en' 
            ? "Can't find what you're looking for? Contact our support team" 
            : 'तपाईंले खोजेको भेट्टाउन सक्नुभएन? हाम्रो सहायता टोलीलाई सम्पर्क गर्नुहोस्'}
        </p>
        <div style={styles.contactButtons}>
          <a href="https://wa.me/9779764397693" style={styles.whatsappButton}>
            💬 {lang === 'en' ? 'WhatsApp Us' : 'WhatsApp गर्नुहोस्'}
          </a>
          <a href="mailto:support@purohitbaaje.com" style={styles.emailButton}>
            📧 {lang === 'en' ? 'Email Support' : 'इमेल समर्थन'}
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
  faqContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqItem: {
    background: 'white',
    borderRadius: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  questionButton: {
    width: '100%',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'white',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'all 0.3s ease',
  },
  questionIcon: {
    fontSize: '14px',
    color: '#ff9933',
    transition: 'transform 0.3s ease',
  },
  questionText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a0f00',
    flex: 1,
  },
  answerContainer: {
    padding: '0 24px 24px 56px',
    borderTop: '1px solid #f0e6d8',
    background: '#fefaf5',
  },
  answerText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555',
    margin: 0,
  },
  contactSection: {
    maxWidth: '600px',
    margin: '60px auto 0',
    textAlign: 'center' as const,
    padding: '40px',
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  contactTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '12px',
  },
  contactSubtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px',
  },
  contactButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  whatsappButton: {
    padding: '12px 28px',
    background: '#25d366',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '40px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  emailButton: {
    padding: '12px 28px',
    background: '#1a0f00',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '40px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
};

// Add hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .faq-item:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .question-button:hover {
      background: #fff8f0;
    }
    .whatsapp-button:hover, .email-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(style);
}