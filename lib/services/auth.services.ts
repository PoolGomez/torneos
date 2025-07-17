import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';


import { auth, db } from '@/utils/dbconfig';
import { UserSchema } from '../schemas';

export class AuthService {
  static async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
        console.log(error)
      throw new Error('Error al iniciar sesión');
    }
  }

  static async signUp(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName });
      
      await this.createUserDocument(user);
      
      return user;
    } catch (error) {
        console.log(error)
      throw new Error('Error al crear la cuenta');
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
        console.log(error)
      throw new Error('Error al cerrar sesión');
    }
  }

  static async createUserDocument(user: User) {
    const userDoc = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDoc);
    
    if (!userSnapshot.exists()) {
      const userData = UserSchema.parse({
        id: user.uid,
        email: user.email!,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
      
      await setDoc(userDoc, userData);
    }
  }
}