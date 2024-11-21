// Used perplexity AI for reference
// app/components/profile.js
'use client';
import React, { useState, useEffect } from 'react';
import { updateProfile, sendPasswordResetEmail as firebaseSendPasswordResetEmail, updateEmail } from 'firebase/auth'; // Firebase Auth functions
import { useRouter } from 'next/navigation'; // Next.js router for navigation
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'; // Firestore functions
import { useUserAuth } from '../Lib/auth-context'; // Custom authentication context
import { db } from '../Lib/firebase'; // Firestore instance
import Image from 'next/image'; // Import the Next.js Image component
import { auth } from '../Lib/firebase';

const Profile = () => {
  const router = useRouter(); // Initialize router for navigation
  const { user, authLoading } = useUserAuth(); // Get user and loading state from custom auth context
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
  const [imageError, setImageError] = useState(false); // State to handle image loading errors

  // Fetch user data when the component mounts or user/authLoading state changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setEmail(user.email || '');
          setNewEmail(user.email || '');
          setDisplayName(user.displayName || user.email.split('@')[0]);
          setNewDisplayName(user.displayName || user.email.split('@')[0]);

          // Fetch user document from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
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
              role: 'user',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else if (!authLoading) {
        router.push('/SignIn'); // Redirect to SignIn if user is not authenticated
      }
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchUserData();
  }, [user, authLoading, router]);

  const handleEditProfile = async () => {
    try {
      if (user) {
        if (newDisplayName && newDisplayName !== displayName) {
          await updateProfile(user, { displayName: newDisplayName });
        }

        if (newEmail && newEmail !== email) {
          await updateEmail(user, newEmail);
        }

        await updateDoc(doc(db, 'users', user.uid), {
          displayName: newDisplayName || displayName,
          email: newEmail || email,
          address: newAddress || address,
          phoneNumber: newPhoneNumber || phoneNumber,
        });

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

  const handleChangePassword = async () => {
    try {
      if (user) {
        // Ensure the auth object is being imported and used correctly
        await firebaseSendPasswordResetEmail(auth, user.email);
        alert('Password reset email sent!');
      } else {
        alert('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      alert('Failed to send password reset email: ' + error.message);
    }
  };  

  if (loading || authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <Image
              src={imageError ? '/default-avatar.png' : user.photoURL || '/default-avatar.png'} // Use user's Google profile picture or fallback to default
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full mx-auto border-4 border-orange-500"
              onError={() => setImageError(true)} // Handle fallback on image load error
            />
            <h2 className="text-2xl font-bold text-orange-500 mt-2">{displayName}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            {editing ? (
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
              <>
                <p><strong>Address:</strong> {address || 'Not provided'}</p>
                <p><strong>Phone:</strong> {phoneNumber || 'Not provided'}</p>
                <button
                  onClick={handleChangePassword}
                  className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 mt-2 w-full"
                >
                  Change Password
                </button>
                <button
                  onClick={() => router.push('/Main')}
                  className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 mt-4 w-full"
                >
                  Return to Main Page
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 mt-4 w-full"
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
