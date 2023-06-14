import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  TabIndicator,
  Text,
  Divider,
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  Checkbox,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Logo from "./../images/logo.png";
import { EnvelopeSimple, LockSimple, Phone, User } from "@phosphor-icons/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { useAuthContext } from "../Contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import userEvent from "@testing-library/user-event";

type LoginModalProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export default function LoginModal(props: LoginModalProps) {
  const toast = useToast();
  const { registerNewUser, loginUser, isLoading } = useAuthContext();
  const { user, setUser, isLogged, setIsLogged } = useAuthContext();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent px="1.5rem" py="1.5rem">
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab
              color="#afafaf"
              _selected={{ color: "#303030", fontWeight: "bold" }}
            >
              Faça Login
            </Tab>
            <Tab
              color="#afafaf"
              _selected={{ color: "#303030", fontWeight: "bold" }}
            >
              Registre-se
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="3px"
            bg="#BE0C6C"
            borderRadius="10px"
          />
          <TabPanels>
            <TabPanel>
              <Flex mt="1rem" direction="column" align="center">
                <ModalHeader>Que bom ter você aqui novamente!</ModalHeader>
              </Flex>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={3}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EnvelopeSimple size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setLoginEmail(e.target.value)}
                      focusBorderColor="#BE0C6C"
                      variant="flushed"
                      type="text"
                      placeholder="E-Mail"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockSimple size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setLoginPassword(e.target.value)}
                      focusBorderColor="#BE0C6C"
                      variant="flushed"
                      type="password"
                      placeholder="Senha"
                    />
                  </InputGroup>
                </FormControl>
                <Flex justify="flex-end" mt="5px">
                  <Text fontSize="sm" as="u">
                    Esqueceu a senha?
                  </Text>
                </Flex>

                <Checkbox mt="1rem" defaultChecked>
                  <Text as="u" fontSize="sm">
                    Lembrar Senha
                  </Text>
                </Checkbox>
              </ModalBody>

              <ModalFooter>
                <Button
                  _hover={{
                    transform: "scale(0.98)",
                  }}
                  color="white"
                  bg="linear-gradient(90deg, #e4a7cf 0%, rgba(255, 52, 137, 1) 50%);"
                  w="full"
                  colorScheme="none"
                  mr={3}
                  onClick={() =>
                    loginUser(loginEmail, loginPassword, props.onClose)
                  }
                  isLoading={isLoading}
                >
                  Iniciar Sessão
                </Button>
              </ModalFooter>
            </TabPanel>

            <TabPanel>
              <Flex mt="1rem" direction="column" align="center">
                <ModalHeader>Olá, Seja muito bem-vindo!</ModalHeader>
              </Flex>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={3}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <User size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setRegisterName(e.target.value)}
                      variant="flushed"
                      type="text"
                      focusBorderColor="#BE0C6C"
                      placeholder="Nome Completo"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={3}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EnvelopeSimple size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      variant="flushed"
                      type="text"
                      focusBorderColor="#BE0C6C"
                      placeholder="E-Mail"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={3}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Phone size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      variant="flushed"
                      type="text"
                      focusBorderColor="#BE0C6C"
                      placeholder="Celular"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockSimple size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      variant="flushed"
                      focusBorderColor="#BE0C6C"
                      placeholder="Senha"
                      type="password"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockSimple size={18} />
                    </InputLeftElement>
                    <Input
                      onChange={(e) =>
                        setRegisterConfirmPassword(e.target.value)
                      }
                      variant="flushed"
                      focusBorderColor="#BE0C6C"
                      placeholder="Confirme a senha"
                      type="password"
                    />
                  </InputGroup>
                </FormControl>

                <Checkbox mt="2rem">
                  <Text fontSize="sm">Aceito os Termos e Condições</Text>
                </Checkbox>
                <Checkbox mt="1rem">
                  <Text fontSize="sm">
                    Desejo receber as promoções e novidades
                  </Text>
                </Checkbox>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() =>
                    registerNewUser(
                      registerName,
                      registerEmail,
                      registerPhone,
                      registerPassword,
                      registerConfirmPassword,
                      props.onClose
                    )
                  }
                  _hover={{
                    transform: "scale(0.98)",
                  }}
                  color="white"
                  bg="linear-gradient(90deg, #e4a7cf 0%, rgba(255, 52, 137, 1) 50%);"
                  w="full"
                  colorScheme="none"
                  mr={3}
                  isLoading={isLoading}
                >
                  Iniciar Sessão
                </Button>
              </ModalFooter>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}
