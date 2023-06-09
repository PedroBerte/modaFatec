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
  const { user, setUser, isLogged, setIsLogged } = useAuthContext();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  async function registerNewUser() {
    if (registerName.length < 3) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve inserir um nome válido!.",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
        props.onClose();
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
        return;
      });
  }

  async function loginUser() {
    if (loginEmail.includes("@") === false) {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Você deve inserir um email válido!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
        props.onClose();
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
        } else if (errorCode === "auth/user-not-found") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description:
              "Não foi encontrado nenhum usuário com o endereço de e-mail fornecido",
            position: "top-right",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (errorCode === "auth/wrong-password") {
          toast({
            title: "Epa, tem algo errado! 🤨",
            description: "A senha fornecida está incorreta",
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
          return;
        }
      });
  }

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
                  bg="linear-gradient(90deg, #E7BAD8 0%, rgba(255, 52, 137, 0.56) 100%);"
                  w="full"
                  colorScheme="none"
                  mr={3}
                  onClick={loginUser}
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
                  onClick={registerNewUser}
                  _hover={{
                    transform: "scale(0.98)",
                  }}
                  color="white"
                  bg="linear-gradient(90deg, #E7BAD8 0%, rgba(255, 52, 137, 0.56) 100%);"
                  w="full"
                  colorScheme="none"
                  mr={3}
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
