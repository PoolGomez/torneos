'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Users, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

import { toast } from 'sonner';
import { AuthService } from '@/lib/services/auth.services';

export function Navbar() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
        console.log(error)
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TeamManager</span>
          </div>
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex-col items-start">
                  <div className="font-medium">{user.displayName}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}