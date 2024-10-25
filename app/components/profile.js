// Used perplexity AI for reference
// app/components/profile.js
'use client';
import React, { useState, useEffect } from 'react';
import { updateProfile, sendPasswordResetEmail as firebaseSendPasswordResetEmail, updateEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '../Lib/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { useUserAuth } from '../Lib/auth-context'; 

const Profile = () => {
  const router = useRouter();
  const { user, authLoading } = useUserAuth(); 
  const [profilePicture, setProfilePicture] = useState('/default-avatar.png');
  const [displayName, setDisplayName] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
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
            const userData = userDoc.data();
            setAddress(userData.address || '');
            setPhoneNumber(userData.phoneNumber || '');
          } else {
            // Create a new user document if it doesn't exist
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
        router.push('/SignIn');
      }
      setLoading(false);
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

        await updateDoc(doc(db, "users", user.uid), {
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
        await firebaseSendPasswordResetEmail(auth, user.email);
        alert('Password reset email sent!');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Failed to send password reset email.');
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
