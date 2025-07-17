import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ownerId: z.string(),
});

export const PlayerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  position: z.string().min(2, 'La posición es requerida'),
  age: z.number().min(16, 'La edad mínima es 16 años').max(50, 'La edad máxima es 50 años'),
  email: z.string().email('Email inválido').optional(),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
  teamId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  createdAt: z.date().optional(),
});

export type Team = z.infer<typeof TeamSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type User = z.infer<typeof UserSchema>;