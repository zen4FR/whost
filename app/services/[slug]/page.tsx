'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import servicesData from '@/data/services.json';
import { useLang } from '@/context/LanguageContext';

// Kit items data for all 39 pujas
const kitItemsData: { [key: string]: { en: string[], ne: string[] } } = {
  "Aasthachiranjibi Puja Kit": { 
    en: ["Ghee", "Camphor", "Incense sticks", "Flowers", "Fruits", "Betel nuts", "Sandalwood paste", "Red cloth", "Coconut", "Puja thali"],
    ne: ["घ्यू", "कपूर", "धूप", "फूल", "फलफूल", "सुपारी", "चन्दन", "रातो कपडा", "नरिवल", "पूजा थाली"]
  },
  "Annaprashana Kit": { 
    en: ["Silver spoon", "Silver bowl", "Rice", "Ghee", "Honey", "Curd", "Flowers", "Incense", "Coconut"],
    ne: ["चाँदीको चम्चा", "चाँदीको कचौरा", "चामल", "घ्यू", "मह", "दही", "फूल", "धूप", "नरिवल"]
  },
  "Antyeshti Kit": { 
    en: ["Ghee", "Camphor", "Sandalwood", "Incense", "Cotton cloth", "Flowers", "Rice", "Copper coin", "Ganga jal"],
    ne: ["घ्यू", "कपूर", "चन्दन", "धूप", "कपासको कपडा", "फूल", "चामल", "तामाको सिक्का", "गंगा जल"]
  },
  "Asthi Visarjan Kit": { 
    en: ["Ganga jal", "Flowers", "Rice", "Sesame seeds", "Barley", "Copper coin", "Incense", "Camphor"],
    ne: ["गंगा जल", "फूल", "चामल", "तिल", "जौ", "तामाको सिक्का", "धूप", "कपूर"]
  },
  "Bhoomi Pujan Kit": { 
    en: ["Ghee", "Camphor", "Incense", "Flowers", "Coconut", "Betel nuts", "Sandalwood", "Rice", "Turmeric", "Vermilion"],
    ne: ["घ्यू", "कपूर", "धूप", "फूल", "नरिवल", "सुपारी", "चन्दन", "चामल", "बेसार", "सिन्दूर"]
  },
  "Bishnu Sahastranam Kit": { 
    en: ["Tulsi leaves", "Flowers", "Incense", "Ghee lamp", "Sandalwood paste", "Fruits", "Coconut", "Puja thali"],
    ne: ["तुलसी पात", "फूल", "धूप", "घ्यू बत्ती", "चन्दन", "फलफूल", "नरिवल", "पूजा थाली"]
  },
  "Chandi Path Kit": { 
    en: ["Red cloth", "Vermilion", "Flowers", "Incense", "Ghee lamp", "Coconut", "Fruits", "Sindoor", "Kumkum"],
    ne: ["रातो कपडा", "सिन्दूर", "फूल", "धूप", "घ्यू बत्ती", "नरिवल", "फलफूल", "सिन्दूर", "कुमकुम"]
  },
  "Chudakarana Kit": { 
    en: ["Barber's tools", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "New clothes"],
    ne: ["नाईको औजार", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "नयाँ कपडा"]
  },
  "Durga Saptashati Kit": { 
    en: ["Red cloth", "Vermilion", "Flowers", "Incense", "Ghee lamp", "Coconut", "Fruits", "Kumkum", "Sindoor", "Betel nuts"],
    ne: ["रातो कपडा", "सिन्दूर", "फूल", "धूप", "घ्यू बत्ती", "नरिवल", "फलफूल", "कुमकुम", "सिन्दूर", "सुपारी"]
  },
  "Garbhadharan Kit": { 
    en: ["Ghee", "Rice", "Curd", "Honey", "Flowers", "Fruits", "Coconut", "Pomegranate", "Milk"],
    ne: ["घ्यू", "चामल", "दही", "मह", "फूल", "फलफूल", "नरिवल", "अनार", "दूध"]
  },
  "Grahapravesh Kit": { 
    en: ["Ghee lamp", "Incense", "Flowers", "Coconut", "Betel nuts", "Rice", "Turmeric", "Vermilion", "Milk", "Curd"],
    ne: ["घ्यू बत्ती", "धूप", "फूल", "नरिवल", "सुपारी", "चामल", "बेसार", "सिन्दूर", "दूध", "दही"]
  },
  "Griha Shanti Kit": { 
    en: ["Ghee", "Camphor", "Incense", "Flowers", "Coconut", "Betel nuts", "Sandalwood", "Rice", "Navagraha idols"],
    ne: ["घ्यू", "कपूर", "धूप", "फूल", "नरिवल", "सुपारी", "चन्दन", "चामल", "नवग्रह मूर्तिहरू"]
  },
  "Havan/Yagya Kit": { 
    en: ["Havan kund", "Ghee", "Camphor", "Havan samagri", "Sandalwood", "Rice", "Barley", "Sesame seeds", "Incense"],
    ne: ["हवन कुण्ड", "घ्यू", "कपूर", "हवन सामग्री", "चन्दन", "चामल", "जौ", "तिल", "धूप"]
  },
  "Jatakarma Kit": { 
    en: ["Ghee", "Honey", "Gold ring", "Silver coin", "Flowers", "Rice", "Coconut", "Newborn clothes"],
    ne: ["घ्यू", "मह", "सुनको औंठी", "चाँदीको सिक्का", "फूल", "चामल", "नरिवल", "नवजात कपडा"]
  },
  "Karnavedha Kit": { 
    en: ["Gold/Silver needle", "Cotton thread", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut"],
    ne: ["सुन/चाँदीको सुई", "कपासको धागो", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल"]
  },
  "Keshanta Kit": { 
    en: ["Barber's tools", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "New clothes", "Sandalwood"],
    ne: ["नाईको औजार", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "नयाँ कपडा", "चन्दन"]
  },
  "Kuldevta Puja Kit": { 
    en: ["Flowers", "Incense", "Ghee lamp", "Coconut", "Fruits", "Betel nuts", "Sandalwood", "Rice", "Family deity photo"],
    ne: ["फूल", "धूप", "घ्यू बत्ती", "नरिवल", "फलफूल", "सुपारी", "चन्दन", "चामल", "कुलदेवता फोटो"]
  },
  "Lakshmi Puja Kit": { 
    en: ["Lakshmi idol/photo", "Red cloth", "Vermilion", "Flowers", "Incense", "Ghee lamp", "Coconut", "Fruits", "Coins", "Rice"],
    ne: ["लक्ष्मी मूर्ति/फोटो", "रातो कपडा", "सिन्दूर", "फूल", "धूप", "घ्यू बत्ती", "नरिवल", "फलफूल", "सिक्का", "चामल"]
  },
  "Mahamrityunjaya Jaap Kit": { 
    en: ["Rudraksha mala", "Ghee", "Camphor", "Incense", "Flowers", "Coconut", "Milk", "Ganga jal", "Sandalwood"],
    ne: ["रुद्राक्ष माला", "घ्यू", "कपूर", "धूप", "फूल", "नरिवल", "दूध", "गंगा जल", "चन्दन"]
  },
  "Mundan Kit": { 
    en: ["Barber's tools", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "New clothes", "Towel"],
    ne: ["नाईको औजार", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "नयाँ कपडा", "तौलिया"]
  },
  "Naam Jaap Kit": { 
    en: ["Tulsi mala", "Sandalwood paste", "Incense", "Flowers", "Fruits", "Ghee lamp", "Puja thali"],
    ne: ["तुलसी माला", "चन्दन", "धूप", "फूल", "फलफूल", "घ्यू बत्ती", "पूजा थाली"]
  },
  "Namakarana Kit": { 
    en: ["Palm leaf", "Pen", "Ink", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "New clothes"],
    ne: ["ताडपत्र", "कलम", "मसी", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "नयाँ कपडा"]
  },
  "Narayan Bali Kit": { 
    en: ["Ghee", "Camphor", "Incense", "Flowers", "Coconut", "Sesame seeds", "Barley", "Copper coin", "Ganga jal"],
    ne: ["घ्यू", "कपूर", "धूप", "फूल", "नरिवल", "तिल", "जौ", "तामाको सिक्का", "गंगा जल"]
  },
  "Navagraha Shanti Kit": { 
    en: ["9 colored cloths", "9 types of grains", "Navagraha idols", "Ghee", "Camphor", "Incense", "Flowers", "Coconut"],
    ne: ["९ रंगका कपडा", "९ प्रकारका अन्न", "नवग्रह मूर्तिहरू", "घ्यू", "कपूर", "धूप", "फूल", "नरिवल"]
  },
  "Nishkramana Kit": { 
    en: ["Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "Baby clothes", "Incense"],
    ne: ["फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "बच्चा कपडा", "धूप"]
  },
  "Pitra Dosh Nivaran Kit": { 
    en: ["Sesame seeds", "Barley", "Ganga jal", "Flowers", "Rice", "Copper coin", "Incense", "Camphor", "Black cloth"],
    ne: ["तिल", "जौ", "गंगा जल", "फूल", "चामल", "तामाको सिक्का", "धूप", "कपूर", "कालो कपडा"]
  },
  "Pumsavana Kit": { 
    en: ["Barley seeds", "Curd", "Honey", "Ghee", "Flowers", "Fruits", "Coconut", "Milk", "Pomegranate"],
    ne: ["जौको बीउ", "दही", "मह", "घ्यू", "फूल", "फलफूल", "नरिवल", "दूध", "अनार"]
  },
  "Rudri Path Kit": { 
    en: ["Rudraksha mala", "Bilva leaves", "Ghee", "Camphor", "Incense", "Flowers", "Coconut", "Milk", "Sandalwood"],
    ne: ["रुद्राक्ष माला", "बिल्व पात", "घ्यू", "कपूर", "धूप", "फूल", "नरिवल", "दूध", "चन्दन"]
  },
  "Samavartana Kit": { 
    en: ["New clothes", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "Sandalwood", "Books"],
    ne: ["नयाँ कपडा", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "चन्दन", "पुस्तकहरू"]
  },
  "Sannyasa Kit": { 
    en: ["Orange cloth", "Sandalwood paste", "Rudraksha mala", "Kamandalu", "Flowers", "Incense", "Coconut", "Ganga jal"],
    ne: ["भगवा कपडा", "चन्दन", "रुद्राक्ष माला", "कमण्डलु", "फूल", "धूप", "नरिवल", "गंगा जल"]
  },
  "Satyanarayan Puja Kit": { 
    en: ["Satyanarayan photo", "Flowers", "Incense", "Ghee lamp", "Coconut", "Fruits", "Betel nuts", "Rice", "Sandalwood"],
    ne: ["सत्यनारायण फोटो", "फूल", "धूप", "घ्यू बत्ती", "नरिवल", "फलफूल", "सुपारी", "चामल", "चन्दन"]
  },
  "Shraddha Kit": { 
    en: ["Sesame seeds", "Barley", "Ganga jal", "Flowers", "Rice", "Copper coin", "Incense", "Camphor", "Pinda materials"],
    ne: ["तिल", "जौ", "गंगा जल", "फूल", "चामल", "तामाको सिक्का", "धूप", "कपूर", "पिण्ड सामग्री"]
  },
  "Simantonnayana Kit": { 
    en: ["Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "Milk", "Fruits", "Sindoor", "Bangles"],
    ne: ["फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "दूध", "फलफूल", "सिन्दूर", "चुरा"]
  },
  "Tarpan Kit": { 
    en: ["Sesame seeds", "Barley", "Ganga jal", "Flowers", "Rice", "Copper coin", "Black sesame seeds"],
    ne: ["तिल", "जौ", "गंगा जल", "फूल", "चामल", "तामाको सिक्का", "कालो तिल"]
  },
  "Tripindi Shraddha Kit": { 
    en: ["Sesame seeds", "Barley", "Ganga jal", "Flowers", "Rice", "Copper coins", "Incense", "Camphor", "Pinda materials", "Black cloth"],
    ne: ["तिल", "जौ", "गंगा जल", "फूल", "चामल", "तामाको सिक्का", "धूप", "कपूर", "पिण्ड सामग्री", "कालो कपडा"]
  },
  "Upanayana Kit": { 
    en: ["Sacred thread", "Deerskin", "Danda", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "New clothes"],
    ne: ["जनै", "मृग छाला", "दण्ड", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "नयाँ कपडा"]
  },
  "Vanaprastha Kit": { 
    en: ["Orange/brown cloth", "Sandalwood paste", "Rudraksha", "Kamandalu", "Flowers", "Incense", "Coconut", "Ganga jal"],
    ne: ["भगवा/खैरो कपडा", "चन्दन", "रुद्राक्ष", "कमण्डलु", "फूल", "धूप", "नरिवल", "गंगा जल"]
  },
  "Vedarambha Kit": { 
    en: ["Books", "Pen", "Ink", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "Sandalwood"],
    ne: ["पुस्तकहरू", "कलम", "मसी", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "चन्दन"]
  },
  "Vivaha Kit": { 
    en: ["Wedding attires", "Sindoor", "Mangalsutra", "Flowers", "Rice", "Curd", "Honey", "Ghee", "Coconut", "Betel nuts", "Fruits", "Incense", "Ghee lamp", "Puja thali", "Garlands"],
    ne: ["विवाह पोशाक", "सिन्दूर", "मंगलसूत्र", "फूल", "चामल", "दही", "मह", "घ्यू", "नरिवल", "सुपारी", "फलफूल", "धूप", "घ्यू बत्ती", "पूजा थाली", "माला"]
  }
};

const getKitPrice = (kitName: string) => {
  const prices: { [key: string]: number } = {
    "Aasthachiranjibi Puja Kit": 500, "Annaprashana Kit": 400, "Antyeshti Kit": 800, "Asthi Visarjan Kit": 350,
    "Bhoomi Pujan Kit": 600, "Bishnu Sahastranam Kit": 450, "Chandi Path Kit": 550, "Chudakarana Kit": 400,
    "Durga Saptashati Kit": 700, "Garbhadharan Kit": 450, "Grahapravesh Kit": 550, "Griha Shanti Kit": 650,
    "Havan/Yagya Kit": 1200, "Jatakarma Kit": 500, "Karnavedha Kit": 300, "Keshanta Kit": 400,
    "Kuldevta Puja Kit": 600, "Lakshmi Puja Kit": 500, "Mahamrityunjaya Jaap Kit": 800, "Mundan Kit": 400,
    "Naam Jaap Kit": 300, "Namakarana Kit": 450, "Narayan Bali Kit": 900, "Navagraha Shanti Kit": 750,
    "Nishkramana Kit": 350, "Pitra Dosh Nivaran Kit": 500, "Pumsavana Kit": 450, "Rudri Path Kit": 550,
    "Samavartana Kit": 500, "Sannyasa Kit": 600, "Satyanarayan Puja Kit": 550, "Shraddha Kit": 600,
    "Simantonnayana Kit": 500, "Tarpan Kit": 350, "Tripindi Shraddha Kit": 800, "Upanayana Kit": 700,
    "Vanaprastha Kit": 500, "Vedarambha Kit": 550, "Vivaha Kit": 1500
  };
  return prices[kitName] || 500;
};

const copyKitToClipboard = (kitName: string, language: string) => {
  const kitItems = kitItemsData[kitName];
  if (!kitItems) return;
  
  const items = language === 'en' ? kitItems.en : kitItems.ne;
  const kitText = `📦 ${kitName}\n\n${language === 'en' ? 'Required Items:' : 'आवश्यक सामग्रीहरू:'}\n${items.map(item => `✓ ${item}`).join('\n')}\n\n💰 ${language === 'en' ? 'Price:' : 'मूल्य:'} NPR ${getKitPrice(kitName)}+\n\n📝 ${language === 'en' ? 'To book this kit, please mention in special requests.' : 'यो किट बुक गर्न, कृपया विशेष अनुरोधमा उल्लेख गर्नुहोस्।'}`;
  
  navigator.clipboard.writeText(kitText);
  alert(`✅ ${kitName}\n\n${language === 'en' ? 'Kit details copied! Paste this in the "Special Requests" field when booking.' : 'किट विवरण कपी गरियो! बुकिङ गर्दा कृपया "विशेष अनुरोध" फिल्डमा पेस्ट गर्नुहोस्।'}`);
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLang();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const slug = params?.slug as string;
    if (slug) {
      const foundService = servicesData.find(s => s.slug === slug);
      setService(foundService);
      setLoading(false);
    }
  }, [params]);

  const handleBookNow = () => {
    router.push(`/booking?service=${service?.slug}`);
  };

  const mainImage = service?.image || '';
  const isProductsPage = service?.slug === 'products';

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading sacred wisdom...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <span style={styles.errorIcon}>🕉️</span>
          <h1>Service Not Found</h1>
          <p>The sacred service you're looking for doesn't exist.</p>
          <Link href="/services" style={styles.backButton}>← Back to Services</Link>
        </div>
      </div>
    );
  }

  const t = (en: string, ne: string) => language === 'en' ? en : ne;

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroIcon}>{service.icon}</span>
          <h1 style={styles.heroTitle}>{t(service.title, service.titleNe)}</h1>
          <p style={styles.heroSubtitle}>{t(service.shortDesc, service.shortDescNe)}</p>
          <div style={styles.heroButtons}>
            <button onClick={handleBookNow} style={styles.primaryButton}>
              Book Now →
            </button>
            <Link href="#details" style={styles.secondaryButton}>
              Learn More ↓
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        <div style={styles.contentGrid}>
          {/* Left Column - Main Info */}
          <div style={styles.mainContent}>
            {/* Price Card */}
            <div style={styles.priceCard}>
              <div style={styles.priceHeader}>
                <span style={styles.priceIcon}>💰</span>
                <div>
                  <div style={styles.priceLabel}>Starting from</div>
                  <div style={styles.priceValue}>NPR {service.price?.toLocaleString()}+</div>
                </div>
              </div>
              <div style={styles.priceDivider}></div>
              <div style={styles.priceFeatures}>
                <div style={styles.priceFeature}>
                  <span>⏱️</span>
                  <span>{t(service.duration, service.durationNe)}</span>
                </div>
                <div style={styles.priceFeature}>
                  <span>📍</span>
                  <span>Kathmandu Valley</span>
                </div>
                <div style={styles.priceFeature}>
                  <span>✅</span>
                  <span>Free cancellation</span>
                </div>
              </div>
              <button onClick={handleBookNow} style={styles.bookNowButton}>
                Book This Service →
              </button>
            </div>

            {/* Description */}
            <div id="details" style={styles.section}>
              <h2 style={styles.sectionTitle}>About this Service</h2>
              <p style={styles.description}>{t(service.longDesc, service.longDescNe)}</p>
            </div>

            {/* What's Included */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>What's Included</h2>
              <div style={styles.includesGrid}>
                {service.includes?.map((item: string, idx: number) => (
                  <div key={idx} style={styles.includeItem}>
                    <span style={styles.checkIcon}>✓</span>
                    <span>{t(item, service.includesNe?.[idx] || item)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rituals - CLICKABLE for Products page */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                {isProductsPage 
                  ? (language === 'en' ? '📦 Available Puja Kits (Click to Copy)' : '📦 उपलब्ध पूजा किटहरू (कपी गर्न क्लिक गर्नुहोस्)')
                  : (language === 'en' ? 'Rituals & Services Offered' : 'अनुष्ठान र सेवाहरू')
                }
              </h2>
              <div style={styles.ritualsGrid}>
                {service.rituals?.map((ritual: string, idx: number) => (
                  <div 
                    key={idx} 
                    style={{
                      ...styles.ritualItem,
                      ...(isProductsPage ? styles.clickableRitual : {}),
                      cursor: isProductsPage ? 'pointer' : 'default'
                    }}
                    onClick={() => {
                      if (isProductsPage) {
                        copyKitToClipboard(ritual, language);
                      }
                    }}
                  >
                    <span style={styles.ritualIcon}>{isProductsPage ? '📦' : '🕉️'}</span>
                    <span style={{ flex: 1 }}>{t(ritual, service.ritualsNe?.[idx] || ritual)}</span>
                    {isProductsPage && <span style={styles.copyIcon}>📋</span>}
                  </div>
                ))}
              </div>
              {isProductsPage && (
                <p style={styles.copyHint}>
                  💡 {language === 'en' 
                    ? 'Click on any kit above to copy its details → Paste in the "Special Requests" field when booking' 
                    : 'माथिको कुनै पनि किटमा क्लिक गर्नुहोस् यसको विवरण कपी गर्न → बुकिङ गर्दा "विशेष अनुरोध" फिल्डमा पेस्ट गर्नुहोस्'}
                </p>
              )}
            </div>

            {/* Benefits */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Benefits</h2>
              <div style={styles.benefitsList}>
                {service.benefits?.map((benefit: string, idx: number) => (
                  <div key={idx} style={styles.benefitItem}>
                    <span style={styles.benefitIcon}>✨</span>
                    <span>{t(benefit, service.benefitsNe?.[idx] || benefit)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.sideContent}>
            <div style={styles.gallerySection}>
              <div style={styles.mainImageContainer}>
                {mainImage && (
                  <img 
                    src={mainImage} 
                    alt={service.title}
                    style={styles.mainImage}
                    onClick={() => setIsImageModalOpen(true)}
                  />
                )}
                <button 
                  onClick={() => setIsImageModalOpen(true)}
                  style={styles.expandButton}
                >
                  🔍
                </button>
              </div>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Quick Information</h3>
              <div style={styles.infoList}>
                <div style={styles.infoRow}>
                  <span>📅 Best Time</span>
                  <span>All year round</span>
                </div>
                <div style={styles.infoRow}>
                  <span>👥 Language</span>
                  <span>Sanskrit, Nepali, English</span>
                </div>
                <div style={styles.infoRow}>
                  <span>🎁 Includes</span>
                  <span>Prasad, Certificate</span>
                </div>
                <div style={styles.infoRow}>
                  <span>📞 Support</span>
                  <span>24/7 WhatsApp</span>
                </div>
              </div>
            </div>

            <div style={styles.testimonialCard}>
              <span style={styles.testimonialIcon}>💬</span>
              <p style={styles.testimonialText}>
                "Very professional service. The priest was punctual and performed the rituals beautifully. Highly recommended!"
              </p>
              <div style={styles.testimonialAuthor}>- Ram Sharma, Kathmandu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div style={styles.modal} onClick={() => setIsImageModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setIsImageModalOpen(false)}>✕</button>
            <img src={mainImage} alt={service.title} style={styles.modalImage} />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to begin your spiritual journey?</h2>
          <p style={styles.ctaText}>Book your {t(service.title, service.titleNe)} today and experience divine blessings.</p>
          <button onClick={handleBookNow} style={styles.ctaButton}>
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#fdf6ec',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fdf6ec 0%, #ffe6cc 100%)',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff9933',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  hero: {
    position: 'relative' as const,
    height: '60vh',
    minHeight: '500px',
    backgroundImage: 'url(https://images.unsplash.com/photo-1564296787288-965670228331?q=80&w=1740&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' as const,
  },
  heroOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
  },
  heroContent: {
    position: 'relative' as const,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    color: 'white',
    padding: '0 20px',
  },
  heroIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    animation: 'float 3s ease-in-out infinite',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    marginBottom: '16px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  heroSubtitle: {
    fontSize: '18px',
    maxWidth: '600px',
    marginBottom: '32px',
    opacity: 0.95,
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
  },
  primaryButton: {
    padding: '12px 32px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  secondaryButton: {
    padding: '12px 32px',
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '-60px auto 0',
    padding: '0 20px 60px',
    position: 'relative' as const,
    zIndex: 10,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '40px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '40px',
  },
  sideContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px',
  },
  priceCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    position: 'sticky' as const,
    top: '100px',
  },
  priceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  priceIcon: {
    fontSize: '40px',
  },
  priceLabel: {
    fontSize: '14px',
    color: '#666',
  },
  priceValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ff9933',
  },
  priceDivider: {
    height: '1px',
    background: '#f0e6d8',
    margin: '16px 0',
  },
  priceFeatures: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginBottom: '24px',
  },
  priceFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#666',
  },
  bookNowButton: {
    width: '100%',
    padding: '14px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  section: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#444',
  },
  includesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  },
  includeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: '#f9f9f9',
    borderRadius: '12px',
    fontSize: '14px',
  },
  checkIcon: {
    width: '24px',
    height: '24px',
    background: '#4caf50',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  ritualsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '12px',
  },
  ritualItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: '#fff8f0',
    borderRadius: '10px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  clickableRitual: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  ritualIcon: {
    fontSize: '18px',
  },
  copyIcon: {
    fontSize: '16px',
    color: '#ff9933',
    marginLeft: '8px',
  },
  copyHint: {
    marginTop: '16px',
    padding: '12px',
    background: '#e8f5e9',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#2e7d32',
    textAlign: 'center' as const,
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: '#f0f8ff',
    borderRadius: '12px',
  },
  benefitIcon: {
    fontSize: '20px',
  },
  gallerySection: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  mainImageContainer: {
    position: 'relative' as const,
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  mainImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease',
  },
  expandButton: {
    position: 'absolute' as const,
    bottom: '12px',
    right: '12px',
    background: 'rgba(0,0,0,0.6)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  infoCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1a0f00',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    padding: '8px 0',
    borderBottom: '1px solid #f0e6d8',
  },
  testimonialCard: {
    background: 'linear-gradient(135deg, #fff8f0 0%, #ffe6cc 100%)',
    borderRadius: '20px',
    padding: '24px',
    textAlign: 'center' as const,
  },
  testimonialIcon: {
    fontSize: '40px',
    display: 'block',
    marginBottom: '16px',
  },
  testimonialText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '12px',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: '12px',
    color: '#ff9933',
    fontWeight: 'bold',
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #1a0f00 0%, #3d2200 100%)',
    padding: '60px 20px',
    textAlign: 'center' as const,
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '32px',
    color: 'white',
    fontFamily: 'Georgia, serif',
    marginBottom: '16px',
  },
  ctaText: {
    fontSize: '16px',
    color: '#ffe0b3',
    marginBottom: '32px',
  },
  ctaButton: {
    padding: '14px 40px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  errorCard: {
    maxWidth: '500px',
    margin: '100px auto',
    background: 'white',
    borderRadius: '24px',
    padding: '48px',
    textAlign: 'center' as const,
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  errorIcon: {
    fontSize: '64px',
    display: 'block',
    marginBottom: '20px',
  },
  backButton: {
    display: 'inline-block',
    marginTop: '24px',
    padding: '12px 24px',
    background: '#ff9933',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
  },
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.95)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  modalContent: {
    position: 'relative' as const,
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  modalClose: {
    position: 'absolute' as const,
    top: '-40px',
    right: '-40px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    borderRadius: '8px',
  },
};

// Add animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255,153,51,0.3);
    }
    .clickable-ritual:hover {
      background: #ffe0b3;
      transform: translateX(5px);
    }
  `;
  document.head.appendChild(style);
}