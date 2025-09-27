import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you have initialized Firestore in firebase.ts
import type { StudentProgress } from './types';

const USERS_COLLECTION = 'users';
const PROGRESS_COLLECTION = 'progress';

/**
 * Retrieves all student progress data for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of student progress objects.
 */
export async function getStudentProgress(userId: string): Promise<StudentProgress[]> {
  try {
    const progressCollectionRef = collection(db, USERS_COLLECTION, userId, PROGRESS_COLLECTION);
    const querySnapshot = await getDocs(progressCollectionRef);
    const progressList: StudentProgress[] = [];
    querySnapshot.forEach((doc) => {
      progressList.push(doc.data() as StudentProgress);
    });
    return progressList;
  } catch (error) {
    console.error("Error getting student progress: ", error);
    return [];
  }
}

/**
 * Updates or creates a student's progress for a specific lesson.
 * It uses setDoc with merge: true, so it will create the document if it doesn't exist,
 * or update it if it does.
 * @param userId - The ID of the user.
 * @param progressData - The progress data to be saved. The lessonId is used as the document ID.
 * @returns A promise that resolves when the operation is complete.
 */
export async function updateStudentProgress(userId: string, progressData: Partial<StudentProgress>): Promise<void> {
  if (!progressData.lessonId) {
    throw new Error("lessonId is required to update student progress.");
  }
  try {
    const progressDocRef = doc(db, USERS_COLLECTION, userId, PROGRESS_COLLECTION, progressData.lessonId);
    await setDoc(progressDocRef, progressData, { merge: true });
  } catch (error) {
    console.error("Error updating student progress: ", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
