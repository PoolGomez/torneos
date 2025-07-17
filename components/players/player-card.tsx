'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2, MoreHorizontal, User, Mail, Phone } from 'lucide-react';
import { Player } from '@/lib/schemas';

import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlayerService } from '@/lib/services/player.services';

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
    <Card className="hover:shadow-lg transition-shadow duration-300">
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
            <p className="text-sm text-gray-600">{player.position}</p>
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
    </Card>
  );
}