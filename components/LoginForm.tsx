'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { user, signInWithGoogle, userRole, loading } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('user');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      if (userRole === 'priest') {
        router.push('/priest/setup');
      } else if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, userRole, loading, router]);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithGoogle(selectedRole as 'user' | 'priest');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.omSymbol}>🕉️</div>
        <h1 style={styles.title}>Purohit Baaje</h1>
        <p style={styles.subtitle}>Welcome Back</p>

        <div style={styles.roleContainer}>
          <button
            onClick={() => setSelectedRole('user')}
            style={{
              ...styles.roleButton,
              ...(selectedRole === 'user' ? styles.roleButtonActive : {})
            }}
          >
            <span style={styles.roleIcon}>👤</span>
            <div>
              <div style={styles.roleTitle}>User</div>
              <div style={styles.roleDesc}>Book pujas & hire priests</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole('priest')}
            style={{
              ...styles.roleButton,
              ...(selectedRole === 'priest' ? styles.roleButtonActive : {})
            }}
          >
            <span style={styles.roleIcon}>🕉️</span>
            <div>
              <div style={styles.roleTitle}>Priest</div>
              <div style={styles.roleDesc}>Offer services & earn</div>
            </div>
          </button>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          style={{
            ...styles.googleButton,
            ...(isSigningIn ? styles.googleButtonDisabled : {})
          }}
        >
          <svg style={styles.googleIcon} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>{isSigningIn ? 'Signing in...' : 'Continue with Google'}</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf6ec 0%, #ffe6cc 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    background: 'white',
    borderRadius: '24px',
    padding: '48px 40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    textAlign: 'center' as const,
  },
  omSymbol: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a0f00',
    fontFamily: 'Georgia, serif',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '32px',
  },
  roleContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
  },
  roleButton: {
    flex: 1,
    padding: '20px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '16px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left' as const,
  },
  roleButtonActive: {
    borderColor: '#ff9933',
    background: '#fff8f0',
    boxShadow: '0 4px 12px rgba(255,153,51,0.1)',
  },
  roleIcon: {
    fontSize: '32px',
  },
  roleTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a0f00',
    marginBottom: '4px',
  },
  roleDesc: {
    fontSize: '12px',
    color: '#666',
  },
  googleButton: {
    width: '100%',
    padding: '14px 24px',
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    marginBottom: '24px',
  },
  googleButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff9933',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
  document.head.appendChild(style);
}