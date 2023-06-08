import React, { useRef } from "react";
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
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Logo from "./../images/logo.png";
import { EnvelopeSimple, LockSimple } from "@phosphor-icons/react";

type LoginModalProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export default function LoginModal(props: LoginModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent px="1.5rem" py="1.5rem">
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>Faça Login</Tab>
            <Tab>Registre-se</Tab>
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
                    <Input variant="flushed" placeholder="E-Mail" />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockSimple size={18} />
                    </InputLeftElement>
                    <Input variant="flushed" placeholder="Senha" />
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
                  mr={3}
                >
                  Iniciar Sessão
                </Button>
              </ModalFooter>
            </TabPanel>
            <TabPanel>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={3}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EnvelopeSimple size={18} />
                    </InputLeftElement>
                    <Input variant="flushed" placeholder="E-Mail" />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockSimple size={18} />
                    </InputLeftElement>
                    <Input variant="flushed" placeholder="Senha" />
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
