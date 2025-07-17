'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/lib/schemas';
import { PlayerService } from '@/lib/services/player.services';


export function usePlayers(teamId: string) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    if (!teamId) return;
    
    try {
      setLoading(true);
      const teamPlayers = await PlayerService.getPlayersByTeam(teamId);
      setPlayers(teamPlayers);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  return { players, loading, refetch: fetchPlayers };
}