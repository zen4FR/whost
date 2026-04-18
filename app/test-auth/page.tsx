'use client';

import { useState } from 'react';
import { auth, db } from '@/firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function TestAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Starting Google Sign In...');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', result.user.email);
      
      // Save user to Firestore
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          role: 'user',
          createdAt: new Date().toISOString(),
        });
        console.log('User saved to Firestore');
      }
      
      setUser(result.user);
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>Google Auth Test</h1>
      
      {error && (
        <div style={{ color: 'red', marginTop: '20px', padding: '10px', background: '#ffeeee', borderRadius: '8px' }}>
          Error: {error}
        </div>
      )}
      
      {user ? (
        <div style={{ marginTop: '20px' }}>
          <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
            <p>✅ Successfully Logged In!</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>UID:</strong> {user.uid}</p>
          </div>
          <button 
            onClick={handleSignOut}
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: loading ? '#ccc' : '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px'
          }}
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      )}
    </div>
  );
}