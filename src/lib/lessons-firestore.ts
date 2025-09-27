
import { collection, doc, getDocs, setDoc, deleteDoc, orderBy, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Lesson } from './types';

const LESSONS_COLLECTION = 'lessons';

/**
 * Retrieves lessons from Firestore, optionally filtered by category.
 * @param category - Optional category to filter lessons by.
 * @returns A promise that resolves to an array of lessons.
 */
export async function getAllLessons(category?: Lesson['category']): Promise<Lesson[]> {
  try {
    const lessonsCollectionRef = collection(db, LESSONS_COLLECTION);
    
    let q;
    if (category) {
      q = query(lessonsCollectionRef, where('category', '==', category));
    } else {
      q = query(lessonsCollectionRef);
    }

    const querySnapshot = await getDocs(q);
    const lessonsList: Lesson[] = [];
    querySnapshot.forEach((doc) => {
      lessonsList.push(doc.data() as Lesson);
    });
    return lessonsList;
  } catch (error) {
    console.error("Error getting all lessons: ", error);
    return [];
  }
}

/**
 * Adds a new lesson document to Firestore.
 * @param lessonData - The lesson data to be saved. The lessonId is used as the document ID.
 * @returns A promise that resolves when the operation is complete.
 */
export async function addLesson(lessonData: Lesson): Promise<void> {
  if (!lessonData.id) {
    throw new Error("Lesson ID is required to add a lesson.");
  }
  try {
    const lessonDocRef = doc(db, LESSONS_COLLECTION, lessonData.id);
    await setDoc(lessonDocRef, lessonData);
  } catch (error)
 {
    console.error("Error adding lesson: ", error);
    throw error;
  }
}


/**
 * Updates a lesson document in Firestore.
 * @param lessonData - The lesson data to be updated. The lessonId is used as the document ID.
 * @returns A promise that resolves when the operation is complete.
 */
export async function updateLesson(lessonData: Lesson): Promise<void> {
    if (!lessonData.id) {
        throw new Error("Lesson ID is required to update a lesson.");
    }
    try {
        const lessonDocRef = doc(db, LESSONS_COLLECTION, lessonData.id);
        await setDoc(lessonDocRef, lessonData, { merge: true });
    } catch (error) {
        console.error("Error updating lesson: ", error);
        throw error;
    }
}


/**
 * Deletes a lesson document from Firestore.
 * @param lessonId - The ID of the lesson to be deleted.
 * @returns A promise that resolves when the operation is complete.
 */
export async function deleteLesson(lessonId: string): Promise<void> {
    if (!lessonId) {
        throw new Error("Lesson ID is required to delete a lesson.");
    }
    try {
        const lessonDocRef = doc(db, LESSONS_COLLECTION, lessonId);
        await deleteDoc(lessonDocRef);
    } catch (error) {
        console.error("Error deleting lesson: ", error);
        throw error;
    }
}
