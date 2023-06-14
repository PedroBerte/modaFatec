import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  return (
    <Flex
      bg="#F7F7F7"
      p="3rem"
      h="200px"
      w="full"
      align="center"
      justify="space-between"
      mt="2rem"
      alignSelf="flex-end"
    >
      <Flex direction="column" gap="1rem">
        <Flex direction="row" align="center" gap="0.3rem">
          <BsInstagram />
          <Text
            as="a"
            href="https://www.instagram.com/evangelicadlmoda/"
            _hover={{ textDecoration: "underline" }}
          >
            evangelicadlmoda
          </Text>
        </Flex>
        <Flex direction="row" align="center" gap="0.3rem">
          <BsWhatsapp />
          <Text
            as="a"
            href="https://wa.me/11977955885"
            _hover={{ textDecoration: "underline" }}
          >
            (11) 9-7795-5885
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="1rem">
        <InputGroup size="md">
          <Input
            focusBorderColor="#BE0C6C"
            variant="flushed"
            placeholder="Insira o seu E-mail"
          />
          <Button
            h="full"
            size="sm"
            mt="4px"
            borderRadius="3px"
            bg="black"
            color="white"
            ml="1rem"
            px="2rem"
          >
            <Text p="10px">Fazer Login</Text>
          </Button>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
