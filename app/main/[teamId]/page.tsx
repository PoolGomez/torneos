'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Player } from '@/lib/schemas';
import { Plus, ArrowLeft, Users } from 'lucide-react';
import { toast } from 'sonner';
import { PlayerService } from '@/lib/services/player.services';
import { usePlayers } from '@/hooks/use-players';
// import { PlayerForm } from '@/components/players/player-form';
import { PlayerCard } from '@/components/players/player-card';
import { CreatePlayerForm } from '@/components/players/create-player-form';

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;
  
  const { players, loading, refetch } = usePlayers(teamId);
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePlayer = async (data: Omit<Player, 'id' | 'createdAt' | 'updatedAt' | 'teamId'>) => {
    try {
      setIsSubmitting(true);
      await PlayerService.createPlayer({
        ...data,
        teamId,
      });
      toast.success('Jugador agregado exitosamente');
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error('Error al agregar el jugador');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePlayer = async (data: Omit<Player, 'id' | 'createdAt' | 'updatedAt' | 'teamId'>) => {
    if (!editingPlayer) return;

    try {
      setIsSubmitting(true);
      await PlayerService.updatePlayer(editingPlayer.id!, data);
      toast.success('Jugador actualizado exitosamente');
      setEditingPlayer(undefined);
      refetch();
    } catch (error) {
      toast.error('Error al actualizar el jugador');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPlayer(undefined);
  };

  const showTeamId = () => {
      console.log(teamId)
    }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Button onClick={showTeamId} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
           mostrar id team
          </Button>
          <p className="text-gray-600">Cargando jugadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.push('/main')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {/* Volver */}
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Jugadores</h1>
            {/* <p className="text-gray-600 mt-2">Gestiona los jugadores de tu equipo</p> */}
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Agregar Jugador
          </Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* <PlayerForm
              player={editingPlayer}
              teamId={teamId}
              onSubmit={editingPlayer ? handleUpdatePlayer : handleCreatePlayer}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            /> */}
            <CreatePlayerForm
              // player={editingPlayer}
              teamId={teamId}
              onSubmit={editingPlayer ? handleUpdatePlayer : handleCreatePlayer}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {players.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay jugadores</h3>
            <p className="text-gray-500 mb-4">Agrega jugadores a tu equipo</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Jugador
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onEdit={handleEditPlayer}
                onRefresh={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}