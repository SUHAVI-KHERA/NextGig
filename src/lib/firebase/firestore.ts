import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { FreelancerProfile } from "@/lib/types";
import { freelancers } from "@/lib/data";

const freelancersCollection = collection(db, "freelancers");

// For this demo, we'll use a fixed user ID.
const USER_ID = "1";

/**
 * Seeds the initial freelancer data into Firestore if it doesn't exist.
 */
async function seedInitialData() {
    console.log("Checking if initial data exists...");
    const userDocRef = doc(db, "freelancers", USER_ID);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        console.log("No initial data found, seeding now...");
        try {
            // In a real app, you might want to add all freelancers, but for this demo, just one is fine.
            const userProfile = freelancers.find(f => f.id === USER_ID);
            if (userProfile) {
                await setDoc(doc(db, "freelancers", userProfile.id), userProfile);
                console.log("Initial data seeded successfully.");
            }
        } catch (error) {
            console.error("Error seeding data: ", error);
        }
    } else {
        console.log("Initial data already exists.");
    }
}


/**
 * Retrieves the user's profile from Firestore.
 * If the profile doesn't exist, it seeds the initial data.
 * @returns The freelancer profile.
 */
export async function getUserProfile(): Promise<FreelancerProfile> {
  await seedInitialData(); // Ensure data is seeded
  const userDocRef = doc(db, "freelancers", USER_ID);
  
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as FreelancerProfile;
    } else {
      // This case should ideally not be hit if seeding works correctly
      console.log("No such document! Returning default.");
      return freelancers[0]; 
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // Return static data as a fallback
    return freelancers[0];
  }
}

/**
 * Updates the user's profile in Firestore.
 * @param data The data to update.
 */
export async function updateUserProfileInDb(data: Partial<FreelancerProfile>) {
  const userDocRef = doc(db, "freelancers", USER_ID);
  try {
    await updateDoc(userDocRef, data);
    console.log("Profile updated successfully in Firestore.");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile in Firestore:", error);
    return { success: false };
  }
}
