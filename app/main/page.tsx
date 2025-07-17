"use client"
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

const MainPage = () => {
    const {user, logout} = useAuth();
    const logeed = getAuth()
    // const user = auth?.user;
    const router = useRouter()

    // useEffect(()=>{
    //      if(!user){
    //          router.push("/login")
    //      }
    // },[user,router]);

    useEffect(()=>{
        if(!logeed.currentUser){
            router.push("/login")
        }
    },[logeed,router]);


    if (!user) {
        // Opcional: puedes mostrar un mensaje de carga o un spinner mientras se verifica el estado del usuario
        return <div>Cargando...</div>;
    }
    
    const handleLogout = async() => {
        try {
            await logout();
        } catch (error) {
            alert("error al cerrar sesión")
        }
    }
    const handleShowUser = () => {
        console.log(user);
    }
    
  return (
    <div>
         <header className="fixed top-0 left-0 w-full z-50 flex h-12 shrink-0 items-center justify-between gap-2 pr-2 gap-x-4 md:pr-6 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background">
                {/* <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="p-2" />
                    <Separator orientation="vertical" className="mr-2 h-8" />
                    <ShowOnlyScreen screen='desktop'>
                        <CompanySwitcher myCompanies={myCompanies} sharedCompanies={otherCompanies} />
                    </ShowOnlyScreen>
                    
                </div> */}
                <div className="flex gap-x-2 items-center">
                    {/* <ToggleTheme /> */}
                    {/* <UserButton username={currentUserEmail} /> */}
                    User
                </div>
            </header>

        <div>MainPage</div>
        <button onClick={handleShowUser}>Mostrar user</button>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
};

export default MainPage