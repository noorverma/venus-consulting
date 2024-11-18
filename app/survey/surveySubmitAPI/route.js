// used perlexity AI for reference
// /app/survey/surveySubmitAPI/route.js
import { NextResponse } from 'next/server'; // Import Next.js response utilities for API routes
import { db, auth } from '@/app/Lib/firebase'; // Import Firestore and authentication instances from the Firebase setup
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions for document operations

// Define the POST function to handle survey submissions
export async function POST(req) {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get('authorization');
    
    // Check if the authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 }); // Return unauthorized response if not valid
    }

    // Extract the ID token from the authorization header
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token and decode it to get the user ID
    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid; // Get the user ID from the decoded token

    // Parse the request body to get survey responses
    const { responses } = await req.json();

    // Reference to the surveyResponses document in Firestore
    const surveyDocRef = doc(db, 'surveyResponses', userId);
    
    // Save the survey responses to Firestore with the current timestamp
    await setDoc(surveyDocRef, {
      responses,
      completedAt: new Date(),
    });

    // Reference to the userPoints document in Firestore to update points
    const userPointsRef = doc(db, 'userPoints', userId);
    const userPointsDoc = await getDoc(userPointsRef); // Check if points document exists

    if (!userPointsDoc.exists()) { // If the user does not have points yet
      // Initialize the userPoints document with 10 points
      await setDoc(userPointsRef, { points: 10 });
    }

    // Add 100 points for completing the survey, either updating or initializing
    await updateDoc(userPointsRef, {
      points: (userPointsDoc.exists() ? userPointsDoc.data().points : 10) + 100
    });

    // Fetch updated points to include in the response
    const updatedUserPointsDoc = await getDoc(userPointsRef);
    const updatedPoints = updatedUserPointsDoc.data().points; // Get the updated points value

    // Return a success response with the updated points
    return NextResponse.json({ success: true, message: 'Survey submitted and points updated', points: updatedPoints });
  } catch (error) {
    console.error('Error submitting survey:', error); // Log any errors that occur
    return NextResponse.json({ success: false, message: 'Error submitting survey' }, { status: 500 }); // Return a server error response
  }
}
