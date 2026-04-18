'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function UserDashboard() {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (userRole === 'priest') {
        router.push('/priest/dashboard');
      } else {
        loadUserData();
        loadBookings();
      }
    }
  }, [user, userRole, loading]);

  const loadUserData = async () => {
    if (!user) return;
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserData({
        name: data.name || user.displayName || '',
        phone: data.phone || '',
        address: data.address || '',
      });
    } else {
      setUserData({
        name: user.displayName || '',
        phone: '',
        address: '',
      });
    }
  };

  const loadBookings = async () => {
    if (!user) return;
    
    setLoadingBookings(true);
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const userBookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        updatedAt: new Date().toISOString(),
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving profile');
    } finally {
      setSaving(false);
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
        return { text: status, style: styles.statusPending };
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>👤</span>
        <h1 style={styles.headerTitle}>My Dashboard</h1>
        <p style={styles.headerSubtitle}>Welcome back, {user?.displayName?.split(' ')[0]}!</p>
      </div>

      <div style={styles.grid}>
        {/* Profile Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>📋</span>
            <h2 style={styles.cardTitle}>Profile Information</h2>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} style={styles.editButton}>
                ✏️ Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{ ...styles.input, background: '#f5f5f5' }}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  style={styles.input}
                  placeholder="98XXXXXXXX"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  style={styles.input}
                  placeholder="Kathmandu, Nepal"
                />
              </div>
              <div style={styles.buttonGroup}>
                <button onClick={handleSave} disabled={saving} style={styles.saveButton}>
                  {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
                <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.profileInfo}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Name:</span>
                <span style={styles.infoValue}>{userData.name || 'Not set'}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Email:</span>
                <span style={styles.infoValue}>{user?.email}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Phone:</span>
                <span style={styles.infoValue}>{userData.phone || 'Not set'}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Address:</span>
                <span style={styles.infoValue}>{userData.address || 'Not set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>📊</span>
            <h2 style={styles.cardTitle}>Quick Stats</h2>
          </div>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{bookings.length}</div>
              <div style={styles.statLabel}>Total Bookings</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{completedCount}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{pendingCount}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div style={{ ...styles.card, gridColumn: '1 / -1' }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>📅</span>
            <h2 style={styles.cardTitle}>My Bookings</h2>
            <Link href="/booking" style={styles.newBookingButton}>
              + New Booking
            </Link>
          </div>

          {loadingBookings ? (
            <div style={styles.loadingState}>Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No bookings yet. Book your first puja!</p>
              <Link href="/booking" style={styles.emptyStateButton}>
                Book Now →
              </Link>
            </div>
          ) : (
            <div style={styles.bookingsList}>
              {bookings.map((booking) => {
                const status = getStatusBadge(booking.status);
                return (
                  <div key={booking.id} style={styles.bookingItem}>
                    <div style={styles.bookingInfo}>
                      <div style={styles.bookingService}>{booking.service}</div>
                      <div style={styles.bookingDetails}>
                        <span>📅 {booking.eventDate}</span>
                        <span>🕉️ {booking.priestName || 'Not assigned'}</span>
                        <span>💰 NPR {booking.amount}</span>
                      </div>
                    </div>
                    <div style={styles.bookingStatus}>
                      <span style={status.style}>{status.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    borderBottom: '2px solid #f0e6d8',
    paddingBottom: '12px',
  },
  cardIcon: {
    fontSize: '24px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a0f00',
    margin: 0,
    flex: 1,
  },
  editButton: {
    padding: '6px 12px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    padding: '8px 0',
    borderBottom: '1px solid #f0e6d8',
  },
  infoLabel: {
    width: '100px',
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    flex: 1,
    color: '#1a0f00',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a0f00',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  saveButton: {
    flex: 1,
    padding: '10px',
    background: '#ff9933',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    padding: '10px',
    background: '#f0f0f0',
    color: '#666',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    textAlign: 'center' as const,
  },
  statItem: {
    padding: '16px',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ff9933',
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px',
  },
  newBookingButton: {
    padding: '6px 12px',
    background: '#ff9933',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '13px',
  },
  bookingsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  bookingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: '#f9f9f9',
    borderRadius: '12px',
    border: '1px solid #f0e6d8',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a0f00',
    marginBottom: '8px',
  },
  bookingDetails: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: '#666',
  },
  bookingStatus: {
    marginLeft: '16px',
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
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px',
    color: '#666',
  },
  emptyStateButton: {
    display: 'inline-block',
    marginTop: '16px',
    padding: '10px 20px',
    background: '#ff9933',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
  },
  loadingState: {
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