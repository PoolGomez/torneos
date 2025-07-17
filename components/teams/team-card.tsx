'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Team } from '@/lib/schemas';

import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TeamService } from '@/lib/services/team.services';

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
  onView: (team: Team) => void;
  onRefresh: () => void;
}

export function TeamCard({ team, onEdit, onView, onRefresh }: TeamCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este equipo?')) {
      return;
    }

    try {
      setIsLoading(true);
      await TeamService.deleteTeam(team.id!);
      toast.success('Equipo eliminado exitosamente');
      onRefresh();
    } catch (error) {
        console.log(error)
      toast.error('Error al eliminar el equipo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{team.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(team)}>
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
        {team.description && (
          <p className="text-sm text-gray-600 mb-4">{team.description}</p>
        )}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Ver Jugadores
          </Badge>
          <Button onClick={() => onView(team)} size="sm">
            Ver Equipo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}