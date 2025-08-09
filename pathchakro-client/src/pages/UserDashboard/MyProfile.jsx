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
  const [isEditing, setIsEditing] = useState(false);
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
      
      setIsEditing(false);
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
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">My Profile</h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Manage your account information and track your learning progress
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary h-24"></div>
              
              <div className="px-6 pb-6 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="relative">
                    <img 
                      src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md">
                        <FaPen className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || 'User'}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={isEditing ? handleCancel : handleEditClick}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      isEditing 
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    disabled={loading}
                  >
                    {isEditing ? (
                      <>
                        <FaTimes className="inline mr-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <FaEdit className="inline mr-2" /> Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaPlus className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Assignments Created</p>
                    <p className="text-xl font-bold text-gray-800">{stats.assignmentsCreated}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaTasks className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Assignments Submitted</p>
                    <p className="text-xl font-bold text-gray-800">{stats.assignmentsSubmitted}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FaClock className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Grading</p>
                    <p className="text-xl font-bold text-gray-800">{stats.pendingGrading}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaTrophy className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-xl font-bold text-gray-800">{stats.averageScore}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-3">
                  <FaUserCircle className="text-primary text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
              </div>
              
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2 text-gray-500" /> Display Name
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          ref={displayNameRef}
                          defaultValue={user?.displayName || ''}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            errors.displayName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your name"
                        />
                        {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
                      </>
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-100 rounded-lg">
                        {user?.displayName || 'Not provided'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2 text-gray-500" /> Email Address
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-100 rounded-lg">
                      {user?.email}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaImage className="inline mr-2 text-gray-500" /> Profile Photo URL
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      ref={photoURLRef}
                      defaultValue={user?.photoURL || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="https://example.com/photo.jpg"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-100 rounded-lg break-all">
                      {user?.photoURL || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPen className="inline mr-2 text-gray-500" /> Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      ref={bioRef}
                      defaultValue={profileData.bio || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-32"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-100 rounded-lg min-h-[120px]">
                      {profileData.bio || 'No bio provided yet. Click "Edit Profile" to add one.'}
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-4">
                    <button 
                      type="submit" 
                      className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex-1 flex items-center justify-center"
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
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors flex-1 flex items-center justify-center"
                      disabled={loading}
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-3">
                  <FaClock className="text-primary text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <FaPlus className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Created assignment "Math Homework 5"</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <FaTasks className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Submitted assignment "Physics Lab Report"</p>
                    <p className="text-sm text-gray-600">5 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                    <FaTrophy className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Received grade: 92% on "History Essay"</p>
                    <p className="text-sm text-gray-600">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;