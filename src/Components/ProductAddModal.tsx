import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Heading,
  ModalCloseButton,
  useToast,
  Text,
  Divider,
  FormControl,
  InputGroup,
  Input,
  SimpleGrid,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
  Icon,
} from "@chakra-ui/react";

type ProductAddModalProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export default function ProductAddModal(props: ProductAddModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent px="1.5rem" py="1.5rem">
        <ModalCloseButton />
        <ModalBody>
          <Heading color="#303030" size="md">
            Cadastro de Novo Produto
          </Heading>
          <Divider mt="0.5rem" />

          <SimpleGrid columns={2} gap="1.8rem" mt="2rem" px="10px">
            <FormControl>
              <Text mb="8px">Nome do Produto:</Text>
              <InputGroup>
                <Input
                  //onChange={(e) => setLoginEmail(e.target.value)}
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="Nome"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Categoria</Text>
              <InputGroup>
                <Select placeholder="Selecione" focusBorderColor="#BE0C6C">
                  <option value="option1">Longo</option>
                  <option value="option2">Curto</option>
                  <option value="option3">sei lá</option>
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Materia do Tecido:</Text>
              <InputGroup>
                <Input
                  //onChange={(e) => setLoginEmail(e.target.value)}
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="Material"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Fornecedor/Marca:</Text>
              <InputGroup>
                <Input
                  //onChange={(e) => setLoginEmail(e.target.value)}
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="Fornecedor/Marca"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Modelo:</Text>
              <InputGroup>
                <Input
                  //onChange={(e) => setLoginEmail(e.target.value)}
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="Modelo"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Valor de Venda:</Text>
              <InputGroup>
                <Input
                  //onChange={(e) => setLoginEmail(e.target.value)}
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="R$"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Cores Disponíveis:</Text>
              <CheckboxGroup>
                <Stack direction="row" gap="1.5rem" pl="0.5rem">
                  <Stack direction="column">
                    <Checkbox colorScheme="blackAlpha" value="black">
                      Preto
                    </Checkbox>
                    <Checkbox colorScheme="gray" value="gray">
                      Cinza
                    </Checkbox>
                    <Checkbox colorScheme="blue" value="blue">
                      Azul
                    </Checkbox>
                  </Stack>
                  <Stack direction="column">
                    <Checkbox colorScheme="green" value="green">
                      Verde
                    </Checkbox>
                    <Checkbox colorScheme="yellow" value="yellow">
                      Amarelo
                    </Checkbox>
                    <Checkbox colorScheme="red" value="red">
                      Vermelho
                    </Checkbox>
                  </Stack>
                  <Stack direction="column">
                    <Checkbox colorScheme="purple" value="purple">
                      Roxo
                    </Checkbox>
                    <Checkbox colorScheme="teal" value="brown">
                      Marrom
                    </Checkbox>
                    <Checkbox iconColor="white" value="white">
                      Branco
                    </Checkbox>
                  </Stack>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Tamanhos Disponíveis:</Text>
              <CheckboxGroup colorScheme="pink">
                <Stack direction="row" gap="1.5rem" pl="0.5rem">
                  <Stack direction="column">
                    <Checkbox value="PP">PP</Checkbox>
                    <Checkbox value="P">P</Checkbox>
                  </Stack>
                  <Stack direction="column">
                    <Checkbox value="M">M</Checkbox>
                    <Checkbox value="G">G</Checkbox>
                  </Stack>
                  <Stack direction="column">
                    <Checkbox value="GG">GG</Checkbox>
                    <Checkbox value="XGG">XGG</Checkbox>
                  </Stack>
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl></FormControl>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
