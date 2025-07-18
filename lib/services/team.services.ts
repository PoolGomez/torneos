import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

import { Team, TeamSchema } from '../schemas';
import { db } from '@/utils/dbconfig';

export class TeamService {
  static async createTeam(teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt' | 'profileImage'>) {
    try {
      console.log("teamData:",teamData)
      const validatedData = TeamSchema.parse({
        ...teamData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      const docRef = await addDoc(collection(db, 'teams'), validatedData);
      return docRef.id;
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el equipo');
    }
  }

  static async getTeamsByUser(userId: string) {
    try {
      const q = query(
        collection(db, 'teams'),
        where('ownerId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      // const querySnapshot = await getDocs(collection(db, "teams"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Team[];
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener los equipos');
    }
  }

  static async updateImageTeam(teamId: string, imageUrl: string) {
    try {
      const teamDoc = doc(db, 'teams', teamId);
      await updateDoc(teamDoc, {
        profileImage: imageUrl,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error('Error al actualizar el equipo');
    }
  }

  static async updateTeam(teamId: string, updates: Partial<Team>) {
    try {
      const teamDoc = doc(db, 'teams', teamId);
      await updateDoc(teamDoc, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error('Error al actualizar el equipo');
    }
  }

  static async deleteTeam(teamId: string) {
    try {
      await deleteDoc(doc(db, 'teams', teamId));
    } catch (error) {
      throw new Error('Error al eliminar el equipo');
    }
  }
}