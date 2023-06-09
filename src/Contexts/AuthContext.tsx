import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebaseConfig";
import { UserTypes } from "../types/userTypes";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

type AuthContextProps = {
  user: UserTypes | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserTypes | null | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserTypes | null>();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setIsLogged(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data() as UserTypes);
    } else {
      setIsLogged(false);
    }
  });

  return (
    <AuthContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
