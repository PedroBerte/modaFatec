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
  Handbag,
  Heart,
  MagnifyingGlass,
  ShoppingCartSimple,
  SignOut,
  User,
  UserCircle,
} from "@phosphor-icons/react";
import LoginModal from "./LoginAndRegisterModal";
import { useAuthContext } from "../Contexts/AuthContext";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import ProductAddModal from "./ProductAddModal";

type NavBarProps = {
  nroCartItems: number;
};

export default function Navbar(props: NavBarProps) {
  const toast = useToast();
  const { logoutUser } = useAuthContext();

  const {
    isOpen: isLoginRegisterOpen,
    onOpen: onLoginRegisterOpen,
    onClose: onLoginRegisterClose,
  } = useDisclosure();

  const {
    isOpen: isAddProductOpen,
    onOpen: onAddProductOpen,
    onClose: onAddProductClose,
  } = useDisclosure();

  const { user, isLogged } = useAuthContext();

  return (
    <>
      <Flex as="nav" py="1rem" align="center" justify="space-between">
        <Image w="180px" src={Logo} />
        <Flex direction="column" align="center" mr="5vw">
          <Text>Loja</Text>
          <Box width="95%" h="2px" bg="#BE0C6C" />
        </Flex>

        <Box>
          <Text>Sobre Mim</Text>
        </Box>

        <Box>
          {isLogged ? (
            <Popover>
              <PopoverTrigger>
                <Flex
                  gap="0.5rem"
                  align="center"
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
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
                      align="center"
                      mt={3}
                      cursor="pointer"
                      _hover={{
                        transform: "size: 1.1",
                        textDecoration: "underline",
                      }}
                    >
                      <User size={20} />
                      <Text ml="0.5rem">Informações da conta</Text>
                    </Flex>
                    <Flex
                      align="center"
                      mt={2.5}
                      cursor="pointer"
                      _hover={{
                        transform: "size: 1.1",
                        textDecoration: "underline",
                      }}
                      onClick={() => onAddProductOpen()}
                    >
                      <Handbag size={20} />
                      <Text ml="0.5rem">Adicionar um novo Produto</Text>
                    </Flex>
                    <Flex
                      align="center"
                      mt={2.5}
                      cursor="pointer"
                      _hover={{
                        transform: "size: 1.1",
                        textDecoration: "underline",
                      }}
                    >
                      <Heart size={20} />
                      <Text ml="0.5rem">Itens favoritos</Text>
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
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          ) : (
            <Text cursor="pointer" onClick={() => onLoginRegisterOpen()}>
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

      <LoginModal
        isOpen={isLoginRegisterOpen}
        onOpen={onLoginRegisterOpen}
        onClose={onLoginRegisterClose}
      />

      <ProductAddModal
        isOpen={isAddProductOpen}
        onOpen={onAddProductOpen}
        onClose={onAddProductClose}
      />
    </>
  );
}
