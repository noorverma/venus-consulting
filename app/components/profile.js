// Used perplexity AI for reference
// app/components/profile.js
'use client';
import React, { useState, useEffect } from 'react';
import { updateProfile, sendPasswordResetEmail as firebaseSendPasswordResetEmail, updateEmail } from 'firebase/auth'; // Import functions for updating profile, resetting password, and updating email from Firebase Auth
import { useRouter } from 'next/navigation'; // Import Next.js router for navigation
import { auth, db } from '../Lib/firebase'; // Import initialized Firebase auth and Firestore instances
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions for reading and updating documents
import { useUserAuth } from '../Lib/auth-context'; // Import custom authentication context

// Profile component to display and update user profile information
const Profile = () => {
  const router = useRouter(); // Initialize router for navigation
  const { user, authLoading } = useUserAuth(); // Get user and loading state from custom auth context
  const [profilePicture, setProfilePicture] = useState('/default-avatar.png'); // State for user's profile picture
  const [displayName, setDisplayName] = useState(''); // State for user's display name
  const [newDisplayName, setNewDisplayName] = useState(''); // State for updated display name input
  const [email, setEmail] = useState(''); // State for user's email
  const [newEmail, setNewEmail] = useState(''); // State for updated email input
  const [editing, setEditing] = useState(false); // State to toggle editing mode
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [address, setAddress] = useState(''); // State for user's address
  const [newAddress, setNewAddress] = useState(''); // State for updated address input
  const [phoneNumber, setPhoneNumber] = useState(''); // State for user's phone number
  const [newPhoneNumber, setNewPhoneNumber] = useState(''); // State for updated phone number input

  // useEffect hook to fetch user data when the component mounts or user/authLoading state changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Set initial email and display name
          setEmail(user.email || '');
          setNewEmail(user.email || '');
          const finalProfilePicture = user.photoURL || '/default-avatar.png';
          setProfilePicture(finalProfilePicture);
          setDisplayName(user.displayName || user.email.split('@')[0]);
          setNewDisplayName(user.displayName || user.email.split('@')[0]);

          // Fetch user document from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // If user document exists, set address and phone number from the document
            const userData = userDoc.data();
            setAddress(userData.address || '');
            setPhoneNumber(userData.phoneNumber || '');
          } else {
            // If user document does not exist, create a new one
            await setDoc(userDocRef, {
              email: user.email,
              displayName: user.displayName || user.email.split('@')[0],
              address: '',
              phoneNumber: '',
              role: "user",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else if (!authLoading) {
        // If user is not authenticated and not in loading state, redirect to SignIn page
        router.push('/SignIn');
      }
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchUserData();
  }, [user, authLoading, router]);

  // Function to handle editing and saving profile updates
  const handleEditProfile = async () => {
    try {
      if (user) {
        if (newDisplayName && newDisplayName !== displayName) {
          // Update display name in Firebase Auth
          await updateProfile(user, { displayName: newDisplayName });
        }

        if (newEmail && newEmail !== email) {
          // Update email in Firebase Auth
          await updateEmail(user, newEmail);
        }

        // Update user document in Firestore with new details
        await updateDoc(doc(db, "users", user.uid), {
          displayName: newDisplayName || displayName,
          email: newEmail || email,
          address: newAddress || address,
          phoneNumber: newPhoneNumber || phoneNumber,
        });

        // Update local state with new details
        setDisplayName(newDisplayName || displayName);
        setEmail(newEmail || email);
        setAddress(newAddress || address);
        setPhoneNumber(newPhoneNumber || phoneNumber);

        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  // Function to handle password reset
  const handleChangePassword = async () => {
    try {
      if (user) {
        // Send password reset email
        await firebaseSendPasswordResetEmail(auth, user.email);
        alert('Password reset email sent!');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Failed to send password reset email.');
    }
  };

  // Display loading message if data is still being loaded
  if (loading || authLoading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, return null (render nothing)
  if (!user) {
    return null;
  }

  // Render profile information
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <img
              src={profilePicture}
              alt="Profile"
              onError={() => setProfilePicture('/default-avatar.png')}
              className="w-32 h-32 rounded-full mx-auto border-4 border-orange-500"
            />
            <h2 className="text-2xl font-bold text-orange-500 mt-2">{displayName}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            {editing ? (
              // Render input fields for editing profile information
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter new display name"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Enter new email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter new address"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Enter new phone number"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <button
                  className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 w-full"
                  onClick={handleEditProfile}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 ml-2 w-full"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Render profile information and buttons for editing, changing password, and navigation
              <>
                <p><strong>Address:</strong> {address || 'Not provided'}</p>
                <p><strong>Phone:</strong> {phoneNumber || 'Not provided'}</p>
                <button 
                  onClick={handleChangePassword}
                  className='bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 mt-2 w-full'
                >
                  Change Password
                </button>

                <button 
                  onClick={() => router.push('/Main')}
                  className='bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 mt-4 w-full'
                >
                   Return to Main Page
                 </button>

                 <button 
                   onClick={() => setEditing(true)} 
                   className='bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 mt-4 w-full'
                 >
                   Edit Profile
                 </button>
               </>
             )}
           </div>
         </div>
       </div>
     </div>
   );
};

export default Profile;
