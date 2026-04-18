'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const { user, userRole, signOut, loading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);  
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/booking', label: 'Puja Booking' },
  ];

  if (userRole === 'priest') {
    navLinks.push({ href: '/priest/dashboard', label: 'Dashboard' });
  }

  if (userRole === 'admin') {
    navLinks.push({ href: '/admin', label: 'Admin' });
  }

  // Show loading state while auth is initializing
  if (!isClient || loading) {
    return (
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <div style={styles.logo}>
            <img src="/images/logo/1.png" alt="Purohit Baaje" style={styles.logoIcon} />
            <span style={styles.logoText}>Purohit Baaje</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      style={{
        ...styles.navbar,
        ...(scrolled ? styles.navbarScrolled : {}),
      }}
    >
      <div style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <div style={styles.logo}>
            <img src="/images/logo/1.png" alt="Purohit Baaje" style={styles.logoIcon} />
            <span style={styles.logoText}>Purohit Baaje</span>
          </div>
        </Link>

        <div className="desktop-nav" style={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="actions-desktop" style={styles.actions}>
          <LanguageSwitcher />
          
          {!user ? (
            <Link href="/login">
              <button style={styles.signInButton}>
                Sign In
              </button>
            </Link>
          ) : (
            <div style={styles.userMenu}>
              <Link href="/profile">
                <div style={styles.userInfo}>
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      style={styles.userAvatar}
                    />
                  ) : (
                    <div style={styles.userAvatarPlaceholder}>
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <span style={styles.userName}>
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>
              </Link>
              <button onClick={handleSignOut} style={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button"
          style={styles.mobileMenuButton}
        >
          <div style={styles.hamburgerIcon}>
            <span style={styles.hamburgerLine} />
            <span style={styles.hamburgerLine} />
            <span style={styles.hamburgerLine} />
          </div>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div style={styles.mobileMenuDivider} />
          {!user ? (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button style={styles.mobileSignInButton}>
                Sign In
              </button>
            </Link>
          ) : (
            <>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <div style={styles.mobileUserInfo}>
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      style={styles.mobileUserAvatar}
                    />
                  ) : (
                    <div style={styles.mobileUserAvatarPlaceholder}>
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={styles.mobileUserName}>
                      {user.displayName || 'User'}
                    </div>
                    <div style={styles.mobileUserEmail}>{user.email}</div>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                style={styles.mobileSignOutButton}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 183, 77, 0.92)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    borderBottom: '1px solid rgba(232, 137, 26, 0.3)',
  },
  navbarScrolled: {
    boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
    background: 'rgba(249, 214, 161, 0.95)',
    backdropFilter: 'blur(10px)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    objectFit: 'contain' as const,
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Georgia, serif',
    letterSpacing: '-0.3px',
  },
  desktopNav: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    fontFamily: 'system-ui, sans-serif',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  signInButton: {
    padding: '8px 20px',
    background: '#1a0f00',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'system-ui, sans-serif',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  userAvatarPlaceholder: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#1a0f00',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
  },
  userName: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500',
  },
  signOutButton: {
    padding: '6px 16px',
    background: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'system-ui, sans-serif',
  },
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
  },
  hamburgerIcon: {
    width: '24px',
    height: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: '2px',
    background: '#ffffff',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    position: 'absolute' as const,
    top: '72px',
    left: 0,
    right: 0,
    background: 'rgba(255, 183, 77, 0.96)',
    backdropFilter: 'blur(10px)',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    borderBottom: '1px solid rgba(232, 137, 26, 0.3)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  mobileNavLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '12px 0',
    fontFamily: 'system-ui, sans-serif',
  },
  mobileMenuDivider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '8px 0',
  },
  mobileSignInButton: {
    width: '100%',
    padding: '12px',
    background: '#1a0f00',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  mobileUserInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
  },
  mobileUserAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  mobileUserAvatarPlaceholder: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#1a0f00',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '600',
  },
  mobileUserName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
  },
  mobileUserEmail: {
    fontSize: '12px',
    color: '#ffe0b3',
    marginTop: '4px',
  },
  mobileSignOutButton: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

// CSS for responsive design
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @media (max-width: 768px) {
      .desktop-nav {
        display: none !important;
      }
      .actions-desktop {
        display: none !important;
      }
      .mobile-menu-button {
        display: block !important;
      }
    }
    @media (min-width: 769px) {
      .desktop-nav {
        display: flex !important;
      }
      .actions-desktop {
        display: flex !important;
      }
      .mobile-menu-button {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}