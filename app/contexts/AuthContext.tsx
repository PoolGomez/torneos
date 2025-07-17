// "use client"
// import { createContext, useContext, useState, useEffect } from "react";

// import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
// import { auth } from "@/utils/dbconfig";

// interface AuthContextType {
//     user: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>; 
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//     children: React.ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps){
//     const [user, setUser] = useState<User | null>(null);
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
    
//       return () => unsubscribe();
//     }, []);

//     const login = async (email: string, password: string) => {
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//         } catch (error) {
//             console.error("Error al iniciar sesión:", error);
//         }
//     };
//     const logout = async () => {
//         try {
//             await signOut(auth);
//         } catch (error) {
//             console.error("Error al cerrar sesión:", error);
//         }
//     };
//     return (
//         <AuthContext.Provider value={{ user , login, logout  }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };