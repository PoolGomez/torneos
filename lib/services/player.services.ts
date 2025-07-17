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
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { Player, PlayerSchema } from '../schemas';
import { db } from '@/utils/dbconfig';

export class PlayerService {
  static async createPlayer(playerData: Omit<Player, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const validatedData = PlayerSchema.parse({
        ...playerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      const docRef = await addDoc(collection(db, 'players'), validatedData);
      return docRef.id;
    } catch (error) {
      throw new Error('Error al crear el jugador');
    }
  }

  static async getPlayersByTeam(teamId: string) {
    try {
      const q = query(
        collection(db, 'players'),
        where('teamId', '==', teamId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener los jugadores');
    }
  }

  static async updatePlayer(playerId: string, updates: Partial<Player>) {
    try {
      const playerDoc = doc(db, 'players', playerId);
      await updateDoc(playerDoc, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error('Error al actualizar el jugador');
    }
  }

  static async deletePlayer(playerId: string) {
    try {
      await deleteDoc(doc(db, 'players', playerId));
    } catch (error) {
      throw new Error('Error al eliminar el jugador');
    }
  }

//   static async uploadPlayerPhoto(file: File, playerId: string): Promise<string> {
//     try {
//       const storageRef = ref(storage, `player-photos/${playerId}`);
//       await uploadBytes(storageRef, file);
//       return await getDownloadURL(storageRef);
//     } catch (error) {
//       throw new Error('Error al subir la foto');
//     }
//   }

//   static async deletePlayerPhoto(playerId: string) {
//     try {
//       const storageRef = ref(storage, `player-photos/${playerId}`);
//       await deleteObject(storageRef);
//     } catch (error) {
//       console.error('Error al eliminar la foto:', error);
//     }
//   }
}