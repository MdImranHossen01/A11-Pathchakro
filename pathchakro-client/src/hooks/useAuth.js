import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosSecure from '../api/axios.config';

const useAuth = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
  const updateUserProfile = async (displayName, photoURL, bio = '') => {
    setLoading(true);
    try {
      // Update the user profile in Firebase
      if (auth.user && auth.handleUpdateProfile) {
        await auth.handleUpdateProfile(displayName, photoURL);
        
        // Create an updated user object with the new values
        const updatedUser = {
          ...auth.user,
          displayName: displayName,
          photoURL: photoURL
        };
        
        // Update the user state in the context
        if (auth.setUser) {
          auth.setUser(updatedUser);
        }
        
        // Save profile data to MongoDB
        const profileData = {
          displayName,
          photoURL,
          bio
        };
        
        const response = await axiosSecure.put('/api/users/profile', profileData);
        
        if (response.data.success) {
          toast.success('Profile updated successfully!');
        } else {
          throw new Error('Failed to update profile in database');
        }
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch user profile from MongoDB
  const fetchUserProfile = async () => {
    try {
      const response = await axiosSecure.get('/api/users/profile');
      return response.data;
    } catch (error) {
      // If the user profile doesn't exist yet, return a default profile
      if (error.response && error.response.status === 404) {
        return { bio: '' };
      }
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  
  return { 
    ...auth, 
    updateUserProfile, 
    loading,
    fetchUserProfile
  };
};

export default useAuth;