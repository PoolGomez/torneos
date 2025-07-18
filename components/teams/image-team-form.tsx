import { Team } from "@/lib/schemas";
import z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
// import { useEffect } from "react";

const imageTeamFormSchema = z.object({
  profileImage: z.string()
//   .optional()
});

type TeamEditFormData = z.infer<typeof imageTeamFormSchema>;

interface TeamEditFormProps {
  team?: Team;
  onSubmit: (imageUrl: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ImageTeamForm ({ team, 
    onSubmit, 
    onCancel, isLoading }: TeamEditFormProps){

    const [photoUploaded,setPhotoUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState("")

     const form = useForm<z.infer<typeof imageTeamFormSchema>>({
            resolver: zodResolver(imageTeamFormSchema),
            defaultValues: {
                profileImage: team?.profileImage
            },
      })

    return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Editar Equipo</CardTitle>
        <CardDescription>
          Modifica la imagen del equipo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} >
        <form 
        // onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4">
         
          <div className="space-y-2">
            <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                        {photoUploaded && imageUrl ? (
                          <div className='flex flex-col text-center items-center justify-center'>
                            <p className="text-sm">Imagen Cargada!</p>
                            <Image src={imageUrl} width={150} height={100} alt='image'/>
                            </div>
                        ):(
                        // <UploadButton 
                        //     className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3" 
                        //     {...field}
                        //     endpoint="profileImage"
                        //     onClientUploadComplete={(res)=>{
                        //         form.setValue("profileImage", res?.[0].url)
                        //         // toast({
                        //         //     title:"Photo uploaded!"
                        //         // })
                        //         toast("Photo uploaded!")
                        //         setPhotoUploaded(true)
                        //         setImageUrl(res?.[0].url);
                        //     }}
                        //     onUploadError={(error: Error) => {
                        //         console.log(error)
                        //         // toast({
                        //         //     title:"Error uploading photo"
                        //         // })
                        //         toast("Error uploading photo")
                        //     }}
                        // />

                        <UploadDropzone
                            {...field}
                          endpoint="profileImage"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            form.setValue("profileImage", res?.[0].url)
                            toast("Photo uploaded!")
                            setPhotoUploaded(true)
                            setImageUrl(res?.[0].url);

                            onSubmit(res?.[0].url)
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                             console.log(error)
                            toast("Error uploading photo")
                          }}

                          // className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                        />
                        )}
                        
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
          />
           
          </div>

          <div className="flex gap-2">
            {/* <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar' }
            </Button> */}
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