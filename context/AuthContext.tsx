'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/firebase/config';
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  userRole: 'user' | 'priest' | 'admin' | null;
  loading: boolean;
  signInWithGoogle: (role: 'user' | 'priest') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'priest' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔥 AuthProvider mounted');
    
    if (!auth) {
      console.error('❌ Auth not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('📧 Auth state changed:', firebaseUser?.email || 'No user');
      setUser(firebaseUser);
      
      if (!firebaseUser) {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          console.log('👤 Fetching role for user:', user.uid);
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            console.log('✅ User role found:', role);
            setUserRole(role);
          } else {
            console.log('📝 No user document found');
            setUserRole(null);
          }
        } catch (error) {
          console.error('❌ Error fetching user role:', error);
          setUserRole(null);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user !== undefined) {
      fetchUserRole();
    }
  }, [user]);

  const signInWithGoogle = async (role: 'user' | 'priest') => {
    console.log('🚀 Starting Google sign in with role:', role);
    
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('✅ Sign in successful:', user.email);
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        console.log('📝 Creating new user document with role:', role);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          photoURL: user.photoURL || '',
          role: role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setUserRole(role);
      } else {
        const existingRole = userDoc.data().role;
        console.log('✅ Existing user found with role:', existingRole);
        
        if (existingRole !== role && existingRole !== 'admin') {
          alert(`You are already registered as a ${existingRole}. Please sign in as ${existingRole} or contact support.`);
        }
        setUserRole(existingRole);
      }
    } catch (error: any) {
      console.error('❌ Google sign in error:', error);
      alert(`Sign in failed: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserRole(null);
      console.log('✅ Sign out successful');
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}