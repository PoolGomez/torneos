"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useTeams } from "@/hooks/use-teams";
import { Team } from "@/lib/schemas";
import { TeamService } from "@/lib/services/team.services";
import { toast } from "sonner";
import { CreateTeamForm } from "@/components/teams/create-team-form";
import { TeamCard } from "@/components/teams/team-card";
import { EditTeamForm } from "@/components/teams/edit-team-form";
import { ImageTeamForm } from "@/components/teams/image-team-form";

const MainPage = () => {
    const router = useRouter()
    const {user , loading: authLoading } = useAuth();
    // const [isLoading, setIsLoading] = useState(true);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showImageForm, setShowImageForm] = useState(false);

    const { teams, loading: teamsLoading, refetch } = useTeams();
    const [editingTeam, setEditingTeam] = useState<Team | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            } 
            // else {
            //     setIsLoading(false);
            // }
        }
    }, [authLoading, user, router]);


    if (authLoading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando equipos...</p>
            </div>
        </div>
        );
    }
    
    const handleUpdateTeam = async (data: { name: string; description?: string }) => {
        if (!editingTeam) return;

        try {
        setIsSubmitting(true);
        await TeamService.updateTeam(editingTeam.id!, data);
        toast.success('Equipo actualizado exitosamente');
        setEditingTeam(undefined);
        setShowEditForm(false)
        refetch();
        } catch (error) {
            console.log(error)
        toast.error('Error al actualizar el equipo');
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleUpdateImageTeam = async (imageUrl: string ) => {
        if (!editingTeam) return;

        try {
        setIsSubmitting(true);
        await TeamService.updateImageTeam(editingTeam.id!, imageUrl);
        toast.success('Imagen actualizada exitosamente');
        setEditingTeam(undefined);
        setShowImageForm(false)
        refetch();
        } catch (error) {
            console.log(error)
        toast.error('Error al actualizar imagen el equipo');
        } finally {
        setIsSubmitting(false);
        }
    };



    const handleCreateTeam = async (data: { name: string; description?: string }) => {
        if (!user) return;

        try {
        setIsSubmitting(true);
        await TeamService.createTeam({
            name: data.name,
            description: data.description,
            ownerId: user.uid,
        });
        toast.success('Equipo creado exitosamente');
        setShowCreateForm(false);
        refetch();
        } catch (error) {
            console.log(error)
        toast.error('Error al crear el equipo');
        } finally {
        setIsSubmitting(false);
        }
    };

     const handleCancelForm = () => {
        setShowCreateForm(false);
        setShowEditForm(false);
        setShowImageForm(false);
        setEditingTeam(undefined);
    };

    const handleEditTeam = (team: Team) => {
        setEditingTeam(team);
        setShowEditForm(true);
    };

    const handleEditImageTeam = (team: Team) => {
        setEditingTeam(team);
        setShowImageForm(true);
    };

    const handleViewTeam = (team: Team) => {
        router.push(`/main/${team.id}`);
    };

    const showUser = () => {
      console.log(user?.uid)
    }

    
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Equipos</h1>
            <p className="text-gray-600 mt-2">Gestiona y organiza tus equipos</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Equipo
          </Button>
          {/* <Button onClick={showUser} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Mostrar usuario
          </Button> */}
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <CreateTeamForm
              // team={editingTeam}
              onSubmit={handleCreateTeam}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <EditTeamForm
              team={editingTeam}
              onSubmit={handleUpdateTeam}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {showImageForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <ImageTeamForm
              team={editingTeam}
              onSubmit={handleUpdateImageTeam}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {teams.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes equipos</h3>
            <p className="text-gray-500 mb-4">Crea tu primer equipo para comenzar</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Equipo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onEdit={handleEditTeam}
                onEditImage={handleEditImageTeam}
                onView={handleViewTeam}
                onRefresh={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default MainPage