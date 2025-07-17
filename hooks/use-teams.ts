'use client';

import { useState, useEffect } from 'react';
import { Team } from '@/lib/schemas';

import { useAuth } from './use-auth';
import { TeamService } from '@/lib/services/team.services';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTeams = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userTeams = await TeamService.getTeamsByUser(user.uid);
      setTeams(userTeams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [user]);

  return { teams, loading, refetch: fetchTeams };
}