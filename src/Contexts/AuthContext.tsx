import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebaseConfig";
import { UserTypes } from "../types/userTypes";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

type AuthContextProps = {
  user: UserTypes | null | undefined;
  setAddedItems: React.Dispatch<React.SetStateAction<boolean>>;
  addedItems: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserTypes | null | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  registerNewUser: (
    registerName: string,
    registerEmail: string,
    registerPhone: string,
    registerPassword: string,
    registerConfirmPassword: string,
    onClose: () => void
  ) => Promise<void>;
  loginUser: (
    loginEmail: string,
    loginPassword: string,
    onClose: () => void
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
  isLoading: boolean;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const toast = useToast();
  const [user, setUser] = useState<UserTypes | null>();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addedItems, setAddedItems] = useState<boolean>(false);

  useEffect(() => {
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
  }, []);

  async function registerNewUser(
    registerName: string,
    registerEmail: string,
    registerPhone: string,
    registerPassword: string,
    registerConfirmPassword: string,
    onClose: () => void
  ) {
    setIsLoading(true);
    if (registerName.length < 3) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve inserir um nome válido!.",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (registerEmail.includes("@") === false) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve inserir um email válido!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (registerPhone.length < 11) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve inserir um telefone válido!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (registerPassword.length < 6) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "A senha deve conter ao menos 6 caracteres!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (registerConfirmPassword !== registerPassword) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "As senhas não coincidem!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(async (userCredential) => {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: registerName,
          email: registerEmail,
          phone: registerPhone,
          role: "US",
        });
        toast({
          title: "Sucesso!",
          description: "Seja muito bem-vindo! 😍",
          position: "top-right",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "Este email já está em uso!",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
        if (errorCode === "auth/invalid-email") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "Este email é inválido!",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
        toast({
          title: "Epa, tem algo errado! 🤨",
          description: errorMessage + "!",
          position: "top-right",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      });
  }

  async function loginUser(
    loginEmail: string,
    loginPassword: string,
    onClose: () => void
  ) {
    setIsLoading(true);
    if (loginEmail.includes("@") === false) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve inserir um email válido!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (loginEmail === "" || loginPassword === "") {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve preencher todos os campos!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        toast({
          title: "Sucesso!",
          description: "Bem-vindo de volta! 😍",
          position: "top-right",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-disabled") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "Esta conta de usuário foi desativada",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "O E-mail ou a senha fornecida está incorreta",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (errorCode === "auth/email-already-in-use") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "Este endereço de e-mail já está em uso",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (errorCode === "auth/weak-password") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description:
              "A senha fornecida é fraca, escolha uma senha mais segura",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (errorCode === "auth/popup-closed-by-user") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description:
              "A janela de autenticação foi fechada antes de concluir o processo",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (errorCode === "auth/credential-already-in-use") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "Esta credencial já está associada a uma conta",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (
          errorCode === "auth/account-exists-with-different-credential"
        ) {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description:
              "Já existe uma conta associada a este endereço de e-mail com um provedor de autenticação diferente",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (errorCode === "auth/network-request-failed") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description:
              "Falha na conexão com a Internet ou na solicitação de rede",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          // Outro código de erro não tratado
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "Ocorreu um erro durante a autenticação",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
      });
  }

  async function logoutUser() {
    signOut(auth)
      .then(() => {
        toast({
          title: "Nunca é um adeus 🍃",
          position: "top-right",
          description: "Você saiu da sua conta.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro",
          position: "top-right",
          description: "Não foi possível sair da sua conta.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        registerNewUser,
        loginUser,
        logoutUser,
        isLoading,
        setAddedItems,
        addedItems,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
