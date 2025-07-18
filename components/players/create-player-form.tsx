'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { Player } from '@/lib/schemas';

import { User, Camera } from 'lucide-react';
import { CameraCapture } from '../ui/camera-capture';
import { PlayerService } from '@/lib/services/player.services';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';
import { toast } from 'sonner';
import "@uploadthing/react/styles.css";

const playerFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
//   position: z.string().min(2, 'La posición es requerida'),
  photoUrl: z.string().optional(),
  teamId: z.string()
//   age: z.number().min(16, 'La edad mínima es 16 años').max(50, 'La edad máxima es 50 años'),
//   email: z.string().email('Email inválido').optional().or(z.literal('')),
//   phone: z.string().optional(),
});

type PlayerCreateFormData = z.infer<typeof playerFormSchema>;

interface PlayerFormProps {
//   player?: Player;
  teamId: string;
  onSubmit: (data: PlayerCreateFormData & { photoUrl?: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreatePlayerForm({ 
    // player, 
    teamId, onSubmit, onCancel, isLoading }: PlayerFormProps) {
  // const [photoUrl, setPhotoUrl] = useState<string | undefined>(
  //   player?.photoUrl
  //   );
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [showCamera, setShowCamera] = useState(false);
  const [uploading, setUploading] = useState(false);

const [photoUploaded,setPhotoUploaded] = useState(false);
    // const [imageUrl, setImageUrl] = useState("")

   const form = useForm<z.infer<typeof playerFormSchema>>({
          resolver: zodResolver(playerFormSchema),
          defaultValues: {
              name: "",
              photoUrl: "",
              teamId
          },
    })
  

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

//       setPhotoUrl("url_imagen_test");
//       setShowCamera(false);
//     } catch (error) {
//       console.error('Error uploading photo:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

  const handleFormSubmit = (data: PlayerCreateFormData) => {
    onSubmit({ ...data, photoUrl });
  };

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

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Agregar Jugador</CardTitle>
        <CardDescription>
          Agrega un nuevo jugador al equipo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          

          <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                        {photoUploaded && photoUrl ? (
                          <div className='flex flex-col text-center items-center justify-center'>
                            <p className="text-sm">Imagen Cargada!</p>
                            <Image src={photoUrl} width={250} height={250} alt='image'/>
          
                    


                            </div>
                        ):(
                        <UploadButton 
                            className="flex items-center justify-center w-full h-[250px] bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3" 
                            {...field}
                            endpoint="profileImage"
                            onClientUploadComplete={(res)=>{
                                form.setValue("photoUrl", res?.[0].url)
                                // toast({
                                //     title:"Photo uploaded!"
                                // })
                                toast("Imagen Cargada!")
                                setPhotoUploaded(true)
                                setPhotoUrl(res?.[0].url);

                            }}
                            onUploadError={(error: Error) => {
                                console.log(error)
                                // toast({
                                //     title:"Error uploading photo"
                                // })
                                toast("Error uploading photo")
                            }}
                        />

                        )}
                        
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
          />

          <div className="space-y-2">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                        <Input placeholder="Nombre completo..." type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </div>

          

          

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isLoading || uploading}>
              {isLoading ? 'Agregando...' : 'Agregar'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
        </Form>
      </CardContent>
    </Card>
  );
}