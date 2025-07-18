'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2, MoreHorizontal, User, Mail, Phone, Eye } from 'lucide-react';
import { Player } from '@/lib/schemas';

import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlayerService } from '@/lib/services/player.services';
import Image from 'next/image';

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onRefresh: () => void;
}

export function PlayerCard({ player, onEdit, onRefresh }: PlayerCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
      return;
    }

    try {
      setIsLoading(true);

    //   if (player.photoUrl) {
    //     await PlayerService.deletePlayerPhoto(player.id!);
    //   }

      await PlayerService.deletePlayer(player.id!);
      toast.success('Jugador eliminado exitosamente');
      onRefresh();
    } catch (error) {
      toast.error('Error al eliminar el jugador');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <img src={player.photoUrl || "/img/no-image.png"} alt={player.name} className="w-full h-48 object-contain" />
            <div className="p-2 text-center">
                <h2 className="pb-2 text-xl font-semibold">{player.name}</h2>
                <div className="flex justify-around">
                    <Button 
                      variant={'outline'}
                    // onClick={onView} 
                    // className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                      <Eye className='w-8 h-8' />
                        Ver
                    </Button>
                    <Button 
                      variant={'outline'}
                    // onClick={onEdit} 
                    // className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                      <Edit className='w-8 h-8' />
                        Editar
                    </Button>
                </div>
            </div>
        </div>

    
    
  );
}

{/* <div className="flex flex-col items-center justify-center text-center max-w-[32vw] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
      <div className='flex items-center justify-center shrink-0 relative  w-[32vw] h-[32vh] '>
          
          <Image className="rounded-t-sm items-center justify-center object-cover" width={150} height={150} src={player.photoUrl || "/img/no-image.png"} alt={player.name}/>
      </div>
      <div className="p-5 items-center justify-center">
          <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{player.name}</h5>
          </a>
    
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Ver Jugador
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
      </div>
  </div> */}




{/* <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={player.photoUrl} alt={player.name} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{player.name}</CardTitle>
            <p className="text-sm text-gray-600">{player.name}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(player)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} disabled={isLoading}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge variant="outline">{player.age} años</Badge>
          {player.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-3 w-3" />
              {player.email}
            </div>
          )}
          {player.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-3 w-3" />
              {player.phone}
            </div>
          )}
        </div>
      </CardContent>
    </Card> */}