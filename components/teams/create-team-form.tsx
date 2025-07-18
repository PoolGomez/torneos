'use client';

// import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Team } from '@/lib/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
// import { UploadButton, UploadDropzone } from '@/utils/uploadthing';
// import { toast } from 'sonner';
// import Image from 'next/image';
import "@uploadthing/react/styles.css";

const teamFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
  // profileImage: z.string().optional()
});

type TeamCreateFormData = z.infer<typeof teamFormSchema>;

interface TeamCreateFormProps {
  // team?: Team;
  onSubmit: (data: TeamCreateFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreateTeamForm({ 
  // team, 
  onSubmit, onCancel, isLoading }: TeamCreateFormProps) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<TeamCreateFormData>({
  //   resolver: zodResolver(teamFormSchema),
  //   defaultValues: {
  //     name: team?.name || '',
  //     description: team?.description || '',
  //   },
  // });

  // const [photoUploaded,setPhotoUploaded] = useState(false);
  // const [imageUrl, setImageUrl] = useState("")

  const form = useForm<z.infer<typeof teamFormSchema>>({
        resolver: zodResolver(teamFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
  })

  // const {isValid} = form.formState;

  // useEffect(() => {
  //   if (team) {
  //     reset({
  //       name: team.name,
  //       description: team.description || '',
  //     });
  //   }
  // }, [team, reset]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crear Equipo</CardTitle>
        <CardDescription>
          Crea un nuevo equipo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre del Equipo</FormLabel>
                    <FormControl>
                        <Input placeholder="Nombre del equipo..." type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </div>

          <div className="space-y-2">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Descripción(Opcional)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Descripción..."  {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            {/* <Label htmlFor="description">Descripción (Opcional)</Label>
            <Textarea
              id="description"
              placeholder="Describe tu equipo..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )} */}
          </div>

          




          <div className="flex gap-2">
            <Button type="submit" className="flex-1" 
            disabled={isLoading}
            >
              {isLoading ? 'Creando...' : 'Crear'}
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