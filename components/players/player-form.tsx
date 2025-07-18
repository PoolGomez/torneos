// 'use client';

// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// import { Player } from '@/lib/schemas';

// import { User, Camera } from 'lucide-react';
// import { CameraCapture } from '../ui/camera-capture';
// import { PlayerService } from '@/lib/services/player.services';

// const playerFormSchema = z.object({
//   name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
//   position: z.string().min(2, 'La posición es requerida'),
//   age: z.number().min(16, 'La edad mínima es 16 años').max(50, 'La edad máxima es 50 años'),
//   email: z.string().email('Email inválido').optional().or(z.literal('')),
//   phone: z.string().optional(),
// });

// type PlayerFormData = z.infer<typeof playerFormSchema>;

// interface PlayerFormProps {
//   player?: Player;
//   teamId: string;
//   onSubmit: (data: PlayerFormData & { photoUrl?: string }) => void;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// export function PlayerForm({ player, teamId, onSubmit, onCancel, isLoading }: PlayerFormProps) {
//   const [photoUrl, setPhotoUrl] = useState<string | undefined>(player?.photoUrl);
//   const [showCamera, setShowCamera] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm<PlayerFormData>({
//     resolver: zodResolver(playerFormSchema),
//     defaultValues: {
//       name: player?.name || '',
//       position: player?.position || '',
//       age: player?.age || 18,
//       email: player?.email || '',
//       phone: player?.phone || '',
//     },
//   });

//   useEffect(() => {
//     if (player) {
//       reset({
//         name: player.name,
//         position: player.position,
//         age: player.age,
//         email: player.email || '',
//         phone: player.phone || '',
//       });
//       setPhotoUrl(player.photoUrl);
//     }
//   }, [player, reset]);

//   const handlePhotoCapture = async (file: File) => {
//     try {
//       setUploading(true);
//       const tempPlayerId = player?.id || Date.now().toString();

//     //   const url = await PlayerService.uploadPlayerPhoto(file, tempPlayerId);

//     //   setPhotoUrl(url);
//       setPhotoUrl("url_imagen_test");
//       setShowCamera(false);
//     } catch (error) {
//       console.error('Error uploading photo:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFormSubmit = (data: PlayerFormData) => {
//     onSubmit({ ...data, photoUrl });
//   };

//   if (showCamera) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <CameraCapture
//           onCapture={handlePhotoCapture}
//           onCancel={() => setShowCamera(false)}
//         />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>{player ? 'Editar Jugador' : 'Agregar Jugador'}</CardTitle>
//         <CardDescription>
//           {player ? 'Modifica los datos del jugador' : 'Agrega un nuevo jugador al equipo'}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
//           <div className="flex justify-center mb-4">
//             <div className="relative">
//               <Avatar className="h-24 w-24">
//                 <AvatarImage src={photoUrl} alt="Player photo" />
//                 <AvatarFallback>
//                   <User className="h-12 w-12" />
//                 </AvatarFallback>
//               </Avatar>
//               <Button
//                 type="button"
//                 size="sm"
//                 variant="outline"
//                 className="absolute -bottom-2 -right-2 rounded-full"
//                 onClick={() => setShowCamera(true)}
//                 disabled={uploading}
//               >
//                 <Camera className="h-3 w-3" />
//               </Button>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="name">Nombre Completo</Label>
//             <Input
//               id="name"
//               type="text"
//               placeholder="Ej: Juan Pérez"
//               {...register('name')}
//             />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="position">Posición</Label>
//             <Input
//               id="position"
//               type="text"
//               placeholder="Ej: Delantero"
//               {...register('position')}
//             />
//             {errors.position && (
//               <p className="text-sm text-red-500">{errors.position.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="age">Edad</Label>
//             <Input
//               id="age"
//               type="number"
//               min="16"
//               max="50"
//               {...register('age', { valueAsNumber: true })}
//             />
//             {errors.age && (
//               <p className="text-sm text-red-500">{errors.age.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email (Opcional)</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="jugador@email.com"
//               {...register('email')}
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Teléfono (Opcional)</Label>
//             <Input
//               id="phone"
//               type="tel"
//               placeholder="+1234567890"
//               {...register('phone')}
//             />
//             {errors.phone && (
//               <p className="text-sm text-red-500">{errors.phone.message}</p>
//             )}
//           </div>

//           <div className="flex gap-2">
//             <Button type="submit" className="flex-1" disabled={isLoading || uploading}>
//               {isLoading ? 'Guardando...' : player ? 'Actualizar' : 'Agregar'}
//             </Button>
//             <Button type="button" variant="outline" onClick={onCancel}>
//               Cancelar
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }