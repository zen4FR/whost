'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, storage } from '@/firebase/config';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function PriestDashboard() {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const [priestData, setPriestData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [workData, setWorkData] = useState({
    title: '',
    description: '',
    date: '',
    image: null as File | null,
    imagePreview: ''
  });
  const [completedWorks, setCompletedWorks] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalEarnings: 0
  });

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (userRole !== 'priest') {
        router.push('/');
      } else {
        loadPriestData();
        loadBookings();
        loadCompletedWorks();
      }
    }
  }, [user, userRole, loading]);

  const loadPriestData = async () => {
    if (!user) return;
    try {
      const priestDoc = await getDoc(doc(db, 'priests', user.uid));
      if (priestDoc.exists()) {
        const data = priestDoc.data();
        setPriestData(data);
        setIsAvailable(data.isAvailable || true);
      } else {
        router.push('/priest/setup');
      }
    } catch (error) {
      console.error('Error loading priest data:', error);
    }
  };

  const loadBookings = async () => {
    if (!user) return;
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('priestId', '==', user.uid), orderBy('eventDate', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const priestBookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBookings(priestBookings);
      
      // Calculate stats
      const completed = priestBookings.filter(b => b.status === 'completed');
      const pending = priestBookings.filter(b => b.status === 'pending');
      const earnings = completed.reduce((sum, b) => sum + (b.amount || 0), 0);
      
      setStats({
        totalBookings: priestBookings.length,
        completedBookings: completed.length,
        pendingBookings: pending.length,
        totalEarnings: earnings
      });
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const loadCompletedWorks = async () => {
    if (!user) return;
    try {
      const worksRef = collection(db, 'priestWorks');
      const q = query(worksRef, where('priestId', '==', user.uid), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const works = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setCompletedWorks(works);
    } catch (error) {
      console.error('Error loading works:', error);
    }
  };

  const toggleAvailability = async () => {
    if (!user) return;
    try {
      const newStatus = !isAvailable;
      await updateDoc(doc(db, 'priests', user.uid), {
        isAvailable: newStatus,
        updatedAt: new Date().toISOString()
      });
      setIsAvailable(newStatus);
      alert(newStatus ? 'You are now available for bookings' : 'You are now marked as busy');
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Error updating status');
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: status,
        updatedAt: new Date().toISOString()
      });
      alert(`Booking marked as ${status}`);
      loadBookings(); // Reload bookings
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking status');
    }
  };

  const handleWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setUploading(true);
    try {
      let imageUrl = '';
      
      if (workData.image) {
        const imageRef = ref(storage, `priestWorks/${user.uid}/${Date.now()}_${workData.image.name}`);
        await uploadBytes(imageRef, workData.image);
        imageUrl = await getDownloadURL(imageRef);
      }
      
      const workToSave = {
        priestId: user.uid,
        priestName: priestData?.name || user.displayName,
        title: workData.title,
        description: workData.description,
        date: workData.date,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        likes: 0
      };
      
      await addDoc(collection(db, 'priestWorks'), workToSave);
      alert('Work added successfully!');
      setShowWorkForm(false);
      setWorkData({ title: '', description: '', date: '', image: null, imagePreview: '' });
      loadCompletedWorks();
    } catch (error) {
      console.error('Error saving work:', error);
      alert('Error saving work');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWorkData({
        ...workData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return { text: '⏳ Pending', style: styles.statusPending };
      case 'confirmed':
        return { text: '✅ Confirmed', style: styles.statusConfirmed };
      case 'completed':
        return { text: '🎉 Completed', style: styles.statusCompleted };
      case 'cancelled':
        return { text: '❌ Cancelled', style: styles.statusCancelled };
      default:
        return { text: status || 'Pending', style: styles.statusPending };
    }
  };

  if (loading || loadingData) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🕉️</span>
        <h1 style={styles.headerTitle}>Priest Dashboard</h1>
        <p style={styles.headerSubtitle}>Welcome back, {priestData?.name || user?.displayName?.split(' ')[0]}!</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📅</div>
          <div style={styles.statNumber}>{stats.totalBookings}</div>
          <div style={styles.statLabel}>Total Bookings</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statNumber}>{stats.completedBookings}</div>
          <div style={styles.statLabel}>Completed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div style={styles.statNumber}>{stats.pendingBookings}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statNumber}>NPR {stats.totalEarnings.toLocaleString()}</div>
          <div style={styles.statLabel}>Total Earnings</div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div style={styles.availabilityCard}>
        <div style={styles.availabilityInfo}>
          <span style={styles.availabilityIcon}>{isAvailable ? '🟢' : '🔴'}</span>
          <div>
            <div style={styles.availabilityTitle}>
              {isAvailable ? 'Available for Bookings' : 'Currently Busy'}
            </div>
            <div style={styles.availabilitySubtitle}>
              {isAvailable ? 'You will receive new booking requests' : 'You will not receive new bookings'}
            </div>
          </div>
        </div>
        <button onClick={toggleAvailability} style={styles.availabilityButton}>
          {isAvailable ? 'Mark as Busy' : 'Mark as Available'}
        </button>
      </div>

      {/* Two Column Layout */}
      <div style={styles.twoColumn}>
        {/* Bookings Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>📋</span>
            <h2 style={styles.sectionTitle}>My Bookings</h2>
          </div>
          
          {bookings.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No bookings yet</p>
            </div>
          ) : (
            <div style={styles.bookingsList}>
              {bookings.map((booking) => {
                const status = getStatusBadge(booking.status);
                return (
                  <div key={booking.id} style={styles.bookingCard}>
                    <div style={styles.bookingHeader}>
                      <div style={styles.bookingService}>{booking.service}</div>
                      <span style={status.style}>{status.text}</span>
                    </div>
                    <div style={styles.bookingDetails}>
                      <div>👤 {booking.userName || booking.userEmail}</div>
                      <div>📅 {booking.eventDate}</div>
                      <div>⏰ {booking.eventTime}</div>
                      <div>📍 {booking.location}</div>
                      <div>📞 {booking.phone}</div>
                      <div>💰 NPR {booking.amount}</div>
                    </div>
                    {booking.specialRequests && (
                      <div style={styles.specialRequests}>
                        <strong>Special Requests:</strong> {booking.specialRequests}
                      </div>
                    )}
                    {booking.status === 'pending' && (
                      <div style={styles.actionButtons}>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          style={styles.confirmButton}
                        >
                          ✅ Confirm Booking
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          style={styles.rejectButton}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                    {booking.status === 'confirmed' && (
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        style={styles.completeButton}
                      >
                        🎉 Mark as Completed
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Completed Work Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🏆</span>
            <h2 style={styles.sectionTitle}>My Completed Work</h2>
            <button onClick={() => setShowWorkForm(!showWorkForm)} style={styles.addButton}>
              + Add Work
            </button>
          </div>

          {/* Add Work Form */}
          {showWorkForm && (
            <form onSubmit={handleWorkSubmit} style={styles.workForm}>
              <input
                type="text"
                placeholder="Title (e.g., Satyanarayan Puja at Sharma Ji's Home)"
                value={workData.title}
                onChange={(e) => setWorkData({ ...workData, title: e.target.value })}
                style={styles.workInput}
                required
              />
              <textarea
                placeholder="Description of the ceremony..."
                value={workData.description}
                onChange={(e) => setWorkData({ ...workData, description: e.target.value })}
                style={styles.workTextarea}
                rows={3}
                required
              />
              <input
                type="date"
                value={workData.date}
                onChange={(e) => setWorkData({ ...workData, date: e.target.value })}
                style={styles.workInput}
                required
              />
              <div style={styles.imageUpload}>
                {workData.imagePreview && (
                  <img src={workData.imagePreview} alt="Preview" style={styles.imagePreview} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                  id="workImage"
                />
                <label htmlFor="workImage" style={styles.uploadLabel}>
                  📸 Upload Photo
                </label>
              </div>
              <div style={styles.formButtons}>
                <button type="submit" disabled={uploading} style={styles.submitWorkButton}>
                  {uploading ? 'Uploading...' : 'Add to Portfolio'}
                </button>
                <button type="button" onClick={() => setShowWorkForm(false)} style={styles.cancelWorkButton}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Completed Works Gallery */}
          {completedWorks.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No completed work added yet</p>
            </div>
          ) : (
            <div style={styles.worksGrid}>
              {completedWorks.map((work) => (
                <div key={work.id} style={styles.workCard}>
                  {work.imageUrl && (
                    <img src={work.imageUrl} alt={work.title} style={styles.workImage} />
                  )}
                  <div style={styles.workContent}>
                    <div style={styles.workTitle}>{work.title}</div>
                    <div style={styles.workDate}>📅 {work.date}</div>
                    <div style={styles.workDescription}>{work.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add missing import
import { addDoc } from 'firebase/firestore';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf6ec 0%, #ffe6cc 100%)',
    padding: '40px 20px',
    paddingTop: '100px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  headerIcon: {
    fontSize: '48px',
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginTop: '8px',
  },
  headerSubtitle: {
    fontSize: '16px',
    color: '#666',
    marginTop: '8px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto 30px',
  },
  statCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  statIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff9933',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
  },
  availabilityCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px 24px',
    maxWidth: '1200px',
    margin: '0 auto 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  availabilityInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  availabilityIcon: {
    fontSize: '32px',
  },
  availabilityTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a0f00',
  },
  availabilitySubtitle: {
    fontSize: '13px',
    color: '#666',
    marginTop: '4px',
  },
  availabilityButton: {
    padding: '10px 24px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  section: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    borderBottom: '2px solid #f0e6d8',
    paddingBottom: '12px',
  },
  sectionIcon: {
    fontSize: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a0f00',
    flex: 1,
  },
  addButton: {
    padding: '6px 16px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  bookingsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxHeight: '600px',
    overflowY: 'auto' as const,
  },
  bookingCard: {
    padding: '16px',
    background: '#f9f9f9',
    borderRadius: '12px',
    border: '1px solid #f0e6d8',
  },
  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  bookingService: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a0f00',
  },
  bookingDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
    marginBottom: '12px',
  },
  specialRequests: {
    padding: '10px',
    background: '#fff8f0',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#666',
    marginBottom: '12px',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  confirmButton: {
    flex: 1,
    padding: '8px',
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  rejectButton: {
    flex: 1,
    padding: '8px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  completeButton: {
    width: '100%',
    padding: '8px',
    background: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  statusPending: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    background: '#fff3e0',
    color: '#ff9800',
  },
  statusConfirmed: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    background: '#e3f2fd',
    color: '#2196f3',
  },
  statusCompleted: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    background: '#e8f5e9',
    color: '#4caf50',
  },
  statusCancelled: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    background: '#ffebee',
    color: '#f44336',
  },
  workForm: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  workInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '12px',
  },
  workTextarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    marginBottom: '12px',
    resize: 'vertical' as const,
  },
  imageUpload: {
    marginBottom: '12px',
  },
  imagePreview: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
    marginBottom: '12px',
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    display: 'inline-block',
    padding: '8px 16px',
    background: '#f0f0f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  formButtons: {
    display: 'flex',
    gap: '12px',
  },
  submitWorkButton: {
    flex: 1,
    padding: '10px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelWorkButton: {
    flex: 1,
    padding: '10px',
    background: '#f0f0f0',
    color: '#666',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  worksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
    maxHeight: '600px',
    overflowY: 'auto' as const,
  },
  workCard: {
    background: '#f9f9f9',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #f0e6d8',
  },
  workImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover' as const,
  },
  workContent: {
    padding: '12px',
  },
  workTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1a0f00',
    marginBottom: '6px',
  },
  workDate: {
    fontSize: '11px',
    color: '#999',
    marginBottom: '8px',
  },
  workDescription: {
    fontSize: '12px',
    color: '#666',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px',
    color: '#666',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff9933',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '100px auto',
  },
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
  document.head.appendChild(style);
}