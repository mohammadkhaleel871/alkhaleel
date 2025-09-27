
import { auth } from '@/lib/firebase';
import type { User } from 'firebase/auth';

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      user => {
        unsubscribe();
        resolve(user);
      },
      error => {
        reject(error);
      }
    );
  });
}
