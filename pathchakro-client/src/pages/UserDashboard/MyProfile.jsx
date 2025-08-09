import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { 
  FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaCalendarAlt, 
  FaChartBar, FaPlus, FaTasks, FaTrophy, FaClock, FaGraduationCap,
  FaUserCircle, FaImage, FaPen, FaCheck, FaTimesCircle
} from 'react-icons/fa';

const MyProfile = () => {
  const { user, updateUserProfile, loading, fetchUserProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: ''
  });
  const [stats, setStats] = useState({
    assignmentsCreated: 0,
    assignmentsSubmitted: 0,
    pendingGrading: 0,
    averageScore: 0
  });
  const [errors, setErrors] = useState({});
  
  // Create refs for form inputs
  const displayNameRef = useRef();
  const photoURLRef = useRef();
  const bioRef = useRef();
  
  // Fetch user profile data from MongoDB
  useEffect(() => {
    const getProfileData = async () => {
      if (user) {
        const data = await fetchUserProfile();
        if (data) {
          setProfileData({
            bio: data.bio || ''
          });
        }
      }
    };
    getProfileData();
  }, [user, fetchUserProfile]);

  useEffect(() => {
    // Fetch user statistics from the backend
    const fetchStats = async () => {
      try {
        // This would be an API call to your backend
        // For now, we'll use mock data
        setStats({
          assignmentsCreated: 5,
          assignmentsSubmitted: 12,
          pendingGrading: 3,
          averageScore: 85
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };
    fetchStats();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!displayNameRef.current.value.trim()) {
      newErrors.displayName = "Name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await updateUserProfile(
        displayNameRef.current.value, 
        photoURLRef.current.value, 
        bioRef.current.value
      );
      
      // Update local profile data
      setProfileData({
        bio: bioRef.current.value
      });
      
      setIsModalOpen(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      // Error is already handled in updateUserProfile
    }
  };

  const handleCancel = () => {
    // Reset form to current values
    if (displayNameRef.current) displayNameRef.current.value = user?.displayName || '';
    if (photoURLRef.current) photoURLRef.current.value = user?.photoURL || '';
    if (bioRef.current) bioRef.current.value = profileData.bio || '';
    
    setErrors({});
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    // Set form values to current values
    if (displayNameRef.current) displayNameRef.current.value = user?.displayName || '';
    if (photoURLRef.current) photoURLRef.current.value = user?.photoURL || '';
    if (bioRef.current) bioRef.current.value = profileData.bio || '';
    
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary dark:text-primary mb-2">My Profile</h1>
          <p className="text-lg text-base-content/70 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your account information and track your learning progress
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary h-24"></div>
            
            <div className="px-6 pb-6 relative">
              <div className="flex justify-center -mt-12 mb-4">
                <div className="relative">
                  <img 
                    src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.displayName || 'User'}</h2>
                <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
              </div>
              
              <div className="flex justify-center mb-8">
                <button 
                  onClick={handleEditClick}
                  className="px-6 py-2 rounded-full font-medium transition-all duration-300 bg-primary text-white hover:bg-primary/90"
                  disabled={loading}
                >
                  <FaEdit className="inline mr-2" /> Edit Profile
                </button>
              </div>
              
              {/* Stats Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Your Statistics</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="bg-blue-100 dark:bg-blue-800/30 p-3 rounded-full inline-block mb-2">
                      <FaPlus className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Assignments Created</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.assignmentsCreated}</p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full inline-block mb-2">
                      <FaTasks className="text-green-600 dark:text-green-400 text-xl" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Assignments Submitted</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.assignmentsSubmitted}</p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                    <div className="bg-yellow-100 dark:bg-yellow-800/30 p-3 rounded-full inline-block mb-2">
                      <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Pending Grading</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.pendingGrading}</p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="bg-purple-100 dark:bg-purple-800/30 p-3 rounded-full inline-block mb-2">
                      <FaTrophy className="text-purple-600 dark:text-purple-400 text-xl" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Average Score</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.averageScore}%</p>
                  </div>
                </div>
              </div>
              
              {/* Profile Information */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-600/30 p-3 rounded-full mr-4">
                      <FaUser className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Display Name</p>
                      <p className="font-medium text-gray-800 dark:text-white">{user?.displayName || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-600/30 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
                      <p className="font-medium text-gray-800 dark:text-white">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-600/30 p-3 rounded-full mr-4 mt-1">
                      <FaImage className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Profile Photo URL</p>
                      <p className="font-medium text-gray-800 dark:text-white break-all">{user?.photoURL || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-600/30 p-3 rounded-full mr-4 mt-1">
                      <FaPen className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bio</p>
                      <p className="font-medium text-gray-800 dark:text-white">{profileData.bio || 'No bio provided yet. Click "Edit Profile" to add one.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Profile</h3>
                <button 
                  onClick={handleCancel}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    ref={displayNameRef}
                    defaultValue={user?.displayName || ''}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
                      errors.displayName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.displayName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.displayName}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Photo URL
                  </label>
                  <input
                    type="text"
                    ref={photoURLRef}
                    defaultValue={user?.photoURL || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    ref={bioRef}
                    defaultValue={profileData.bio || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-32 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="submit" 
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2" /> Save Changes
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;