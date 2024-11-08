// used perplexity AI for reference
// /app/survey/userPointsAPI/route.js
import { NextResponse } from 'next/server'; // Import Next.js response utilities for API routes
import { db } from '@/app/Lib/firebase'; // Import Firestore instance from Firebase setup
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions for document operations

// Define the POST function to handle updating user points
export async function POST(req) {
  try {
    // Parse the request body to get the action, amount, and userId
    const { action, amount, userId } = await req.json();

    // Check if userId and action are provided in the request
    if (!userId || !action) {
      return NextResponse.json(
        { success: false, message: 'User ID and action are required' },
        { status: 400 } // Return a bad request response if parameters are missing
      );
    }

    // Reference to the userPoints document in Firestore
    const userPointsRef = doc(db, 'userPoints', userId);
    const userPointsDoc = await getDoc(userPointsRef); // Get current points document if it exists

    let newPoints; // Variable to hold the updated points value
    if (userPointsDoc.exists()) { // If the user already has points
      newPoints = userPointsDoc.data().points + (amount || 10); // Add specified amount or default to 10
      await updateDoc(userPointsRef, { points: newPoints }); // Update points in Firestore
    } else {
      newPoints = amount || 10; // Initialize new points value if document doesn't exist
      await setDoc(userPointsRef, { points: newPoints }); // Create new points document in Firestore
    }

    // Return a success response with the updated points
    return NextResponse.json({
      success: true,
      message: 'User points updated successfully',
      points: newPoints,
    });
  } catch (error) {
    console.error('Error updating user points:', error); // Log any errors that occur
    return NextResponse.json(
      { success: false, message: 'Error updating user points' },
      { status: 500 } // Return a server error response
    );
  }
}
