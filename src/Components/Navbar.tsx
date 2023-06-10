import {
  Flex,
  Text,
  Image,
  useDisclosure,
  Toast,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Logo from "./../images/logo.png";
import {
  MagnifyingGlass,
  ShoppingCartSimple,
  SignOut,
  User,
  UserCircle,
} from "@phosphor-icons/react";
import LoginModal from "./LoginAndRegisterModal";
import { useAuthContext } from "../Contexts/AuthContext";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

type NavBarProps = {
  nroCartItems: number;
};

export default function Navbar(props: NavBarProps) {
  const toast = useToast();
  const { logoutUser } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLogged } = useAuthContext();

  return (
    <>
      <Flex as="nav" justify="space-between" py="1rem" align="center">
        <Flex direction="column" align="center">
          <Text>Loja</Text>
          <Box width="95%" h="2px" bg="#BE0C6C" />
        </Flex>

        <Box>
          <Text>Sobre Mim</Text>
        </Box>

        <Flex>
          <Image w="210px" src={Logo} />
        </Flex>

        <Box>
          {isLogged ? (
            <Popover>
              <PopoverTrigger>
                <Flex
                  gap="0.5rem"
                  align="center"
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  //onClick={() => logoutUser()}
                >
                  <Avatar
                    textDecoration="none"
                    size="sm"
                    name={user?.name}
                    bg="#EBC2E3"
                  />
                  <Text>{user?.name}</Text>
                </Flex>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <PopoverHeader>
                      <Flex gap="0.5rem" align="center">
                        <Avatar
                          textDecoration="none"
                          size="sm"
                          name={user?.name}
                          bg="#EBC2E3"
                        />
                        <Text fontSize="md">{user?.name}</Text>
                      </Flex>
                    </PopoverHeader>
                    <Flex
                      mt="1rem"
                      mb="0.5rem"
                      ml="6px"
                      direction="row"
                      align="center"
                      justify="space-between"
                    >
                      <Flex align="center">
                        <User size={20} />
                        <Text ml="0.5rem">Meu Perfil</Text>
                      </Flex>
                      <Flex
                        justify="flex-end"
                        direction="row"
                        align="center"
                        cursor="pointer"
                        onClick={logoutUser}
                      >
                        <Text color="#FF5B5B" mr="0.5rem">
                          Sair
                        </Text>
                        <SignOut color="#FF5B5B" size={20} />
                      </Flex>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          ) : (
            <Text cursor="pointer" onClick={() => onOpen()}>
              Faça Login
            </Text>
          )}
        </Box>
        <Flex
          px="18px"
          py="12px"
          border="1px solid #303030"
          borderRadius="12px"
          align="center"
          justify="space-between"
          boxShadow="1px 1px 3px 2px rgba(0, 0, 0, 0.25);"
          bg="white"
        >
          <Text mr="5px">{props.nroCartItems}</Text>
          <Text mr="15px">Itens</Text>
          <ShoppingCartSimple size={30} />
        </Flex>
      </Flex>

      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
