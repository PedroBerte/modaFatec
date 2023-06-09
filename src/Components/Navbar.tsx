import {
  Flex,
  Text,
  Image,
  useDisclosure,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Logo from "./../images/logo.png";
import {
  MagnifyingGlass,
  ShoppingCartSimple,
  UserCircle,
} from "@phosphor-icons/react";
import LoginModal from "./LoginAndRegisterModal";
import { useAuthContext } from "../Contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

type NavBarProps = {
  nroCartItems: number;
};

export default function Navbar(props: NavBarProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLogged } = useAuthContext();

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
    <>
      <Flex w="full" justify="space-between" align="center">
        <Flex justify="space-around" w="full">
          <Text>Loja</Text>
          <Text>Sobre Mim</Text>
        </Flex>

        <Image w="15%" src={Logo} />

        <Flex justify="space-around" w="full">
          {isLogged ? (
            <Flex align="center" gap="10px">
              <UserCircle size={32} color="#303030" />
              <Text
                onClick={() => logoutUser()}
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                {user?.name}
              </Text>
            </Flex>
          ) : (
            <Text cursor="pointer" onClick={() => onOpen()}>
              Faça Login
            </Text>
          )}
          <Flex
            px="18px"
            py="12px"
            border="1px solid #303030"
            borderRadius="12px"
            align="center"
            justify="space-between"
            boxShadow="1px 1px 3px 2px rgba(0, 0, 0, 0.25);"
          >
            <Text mr="5px">{props.nroCartItems}</Text>
            <Text mr="15px">Itens</Text>
            <ShoppingCartSimple size={30} />
          </Flex>
        </Flex>
      </Flex>

      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
