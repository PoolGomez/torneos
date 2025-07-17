"use client"
import { Navbar } from '@/components/layout/navbar';
import { useAuth } from '@/hooks/use-auth';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { user } = useAuth();

  return (
    <div>
        { user && <Navbar /> }
        {children}
    </div>
  )
}

