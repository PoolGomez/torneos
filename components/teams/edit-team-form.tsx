import { Team } from "@/lib/schemas";
import z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
// import { useEffect } from "react";

const teamFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional()
});

type TeamEditFormData = z.infer<typeof teamFormSchema>;

interface TeamEditFormProps {
  team?: Team;
  onSubmit: (data: TeamEditFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EditTeamForm ({ team, onSubmit, onCancel, isLoading }: TeamEditFormProps){
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm<TeamEditFormData>({
    //     resolver: zodResolver(teamFormSchema),
    //     defaultValues: {
    //     name: team?.name || '',
    //     description: team?.description || '',
    //     },
    // });

     const form = useForm<z.infer<typeof teamFormSchema>>({
            resolver: zodResolver(teamFormSchema),
            defaultValues: {
                name: team?.name,
                description: team?.description,
            },
      })

      const {isValid} = form.formState;

    //   useEffect(() => {
    //       if (team) {
    //         reset({
    //           name: team.name,
    //           description: team.description || '',
    //         });
    //       }
    //     }, [team, reset]);

    return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Editar Equipo</CardTitle>
        <CardDescription>
          Modifica los datos del equipo
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
            <Button type="submit" className="flex-1" disabled={isLoading || !isValid}>
              {isLoading ? 'Guardando...' : 'Guardar' }
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