import React, { useContext, useMemo, useRef, useState } from "react";
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
  Flex,
  Button,
  Textarea,
} from "@chakra-ui/react";
import UploadPhoto from "./UploadPhoto";
import { FileText, UploadSimple } from "@phosphor-icons/react";
import { FileTypes } from "../types/FileTypes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { formatInputCurrency } from "../scripts/FormatCurrency";
import { getStorage, ref, uploadString } from "firebase/storage";

type ProductAddModalProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export default function ProductAddModal(props: ProductAddModalProps) {
  const toast = useToast();
  const storage = getStorage();
  const [principalFoto, setPrincipalFoto] = useState<FileTypes | null>();
  const [segundaFoto, setSegundaFoto] = useState<FileTypes | null>();
  const [terceiraFoto, setTerceiraFoto] = useState<FileTypes | null>();

  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [fornecedor, setFornecedor] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [valorVenda, setValorVenda] = useState<string>("");
  const [cores, setCores] = useState<string[]>([]);
  const [tamanhos, setTamanhos] = useState<string[]>([]);
  const [descricao, setDescricao] = useState<string>("");

  const [isUploading, setIsUploading] = useState<boolean>(false);

  async function handleAddProduct() {
    setIsUploading(true);
    if (
      nomeProduto == "" ||
      categoria == "" ||
      material == "" ||
      fornecedor == "" ||
      modelo == "" ||
      valorVenda == ""
    ) {
      toast({
        title: "Erro!",
        position: "top-right",
        description: "Não deixe campos em branco!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsUploading(false);
      return;
    }
    if (!principalFoto || !segundaFoto || !terceiraFoto) {
      toast({
        title: "Erro!",
        position: "top-right",
        description:
          "É necessário adicionar 3 fotos para cadastrar um produto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsUploading(false);
      return;
    }

    const id = `${Math.random().toString(36).substring(2)}${Date.now().toString(
      36
    )}`;

    await setDoc(doc(db, "products", id), {
      id: id,
      name: nomeProduto,
      category: categoria,
      material: material,
      provider: fornecedor,
      model: modelo,
      saleValue: formatInputCurrency(valorVenda).replace("R$ ", ""),
      colors: cores,
      sizes: tamanhos,
    })
      .then(() => {
        toast({
          title: "Sucesso!",
          position: "top-right",
          description: "Produto cadastrado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro!",
          position: "top-right",
          description: "Erro ao cadastrar produto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsUploading(false);
      });

    const primaryStorageRef = ref(storage, `products/${id}/1`);
    const secondStorageRef = ref(storage, `products/${id}/2`);
    const thirdStorageRef = ref(storage, `products/${id}/3`);

    await uploadString(primaryStorageRef, principalFoto.base64, "data_url")
      .then((snapshot) => {})
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro!",
          position: "top-right",
          description: "Erro ao fazer o upload da foto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsUploading(false);
      });

    await uploadString(secondStorageRef, segundaFoto.base64, "data_url")
      .then((snapshot) => {})
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro!",
          position: "top-right",
          description: "Erro ao fazer o upload da foto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsUploading(false);
      });

    await uploadString(thirdStorageRef, terceiraFoto.base64, "data_url")
      .then((snapshot) => {
        toast({
          title: "Sucesso!",
          position: "top-right",
          description: "Fotos cadastradas com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro!",
          position: "top-right",
          description: "Erro ao fazer o upload da foto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsUploading(false);
      });
    props.onClose();
    setIsUploading(false);
  }

  useMemo(() => {
    if (!props.isOpen) {
      setPrincipalFoto(null);
      setSegundaFoto(null);
      setTerceiraFoto(null);
      setNomeProduto("");
      setCategoria("");
      setMaterial("");
      setFornecedor("");
      setModelo("");
      setValorVenda("");
      setCores([]);
      setTamanhos([]);
      setDescricao("");
    }
  }, [props.isOpen]);

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
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setNomeProduto(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Categoria</Text>
              <InputGroup>
                <Select
                  placeholder="Selecione"
                  focusBorderColor="#BE0C6C"
                  onChange={(e) => setCategoria(e.target.value)}
                >
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
                  onChange={(e) => setMaterial(e.target.value)}
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
                  onChange={(e) => setFornecedor(e.target.value)}
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
                  onChange={(e) => setModelo(e.target.value)}
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
                  onChange={(e) => setValorVenda(e.target.value)}
                  value={"R$ " + formatInputCurrency(valorVenda)}
                  focusBorderColor="#BE0C6C"
                  type="text"
                  placeholder="R$"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text mb="8px">Cores Disponíveis:</Text>
              <CheckboxGroup
                value={cores}
                onChange={(e) => setCores(e as string[])}
              >
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
              <CheckboxGroup
                colorScheme="pink"
                value={tamanhos}
                onChange={(e) => setTamanhos(e as string[])}
              >
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
          </SimpleGrid>
          <FormControl px="10px">
            <Text mt="2rem" mb="8px">
              Descrição do produto
            </Text>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Decricao do produto"
              size="sm"
            />
          </FormControl>
          <Flex direction="column" px="10px">
            <Text mt="1.5rem" mb="8px">
              Fotos do produto:
            </Text>
            <Flex direction="column" gap="0.7rem" px="8px">
              <UploadPhoto
                setBase64File={(e) => setPrincipalFoto(e as FileTypes)}
                title="Adicionar Foto Principal (Obrigatória)"
              />
              <UploadPhoto
                setBase64File={(e) => setSegundaFoto(e as FileTypes)}
                title="Adicionar Foto Secundária (Obrigatória)"
              />
              <UploadPhoto
                setBase64File={(e) => setTerceiraFoto(e as FileTypes)}
                title="Adicionar Foto Secundária (Obrigatória)"
              />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter mx="1rem">
          <Button
            leftIcon={<UploadSimple size={16} />}
            colorScheme="teal"
            variant="solid"
            onClick={handleAddProduct}
            isLoading={isUploading}
          >
            Enviar produto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
