import { Flex, Text, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Logo from "./../images/logo.png";
import { MagnifyingGlass, ShoppingCartSimple } from "@phosphor-icons/react";
import LoginModal from "./LoginAndRegisterModal";

type NavBarProps = {
  nroCartItems: number;
};

export default function Navbar(props: NavBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex w="full" justify="space-between" align="center">
        <Text>Novidades</Text>
        <Text>Loja</Text>
        <Text>Sobre Mim</Text>
        <Image src={Logo} />
        <MagnifyingGlass size={24} />
        <Text cursor="pointer" onClick={() => onOpen()}>
          Faça Login
        </Text>
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

      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
