import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase.config';
import axiosSecure from '../api/axios.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  // Initialize Firebase auth persistence
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set persistence to LOCAL so user stays logged in after page reload
        await auth.setPersistence('local');
        console.log("Auth persistence set to LOCAL");
      } catch (error) {
        console.error("Error setting auth persistence:", error);
      }
    };
    
    initializeAuth();
  }, []);
  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  
  const handleUpdateProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('token');
    return signOut(auth);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Get ID token to verify user is still authenticated
          const token = await currentUser.getIdToken(true); // Force refresh
          console.log("Got Firebase token");
          
          // Send token to backend to get a new JWT
          const userInfo = { email: currentUser.email };
          const response = await axiosSecure.post('/api/auth/login', userInfo);
          
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log("Backend token stored");
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Don't log out the user on token refresh failure
          // Keep the user logged in with Firebase auth
        }
      } else {
        localStorage.removeItem('token');
        console.log("User logged out, token removed");
      }
      
      setLoading(false);
      setInitialized(true);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  const authInfo = {
    user,
    loading,
    initialized,
    createUser,
    signIn,
    googleLogin,
    logOut,
    handleUpdateProfile,
    setUser,
  };
  
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;