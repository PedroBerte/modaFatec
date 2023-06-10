import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import ProductCard from "../Components/ProductCard";

export default function Home() {
  return (
    <Flex direction="column" justify="center">
      <Divider />
      <Flex mt="1rem" gap="3rem" justify="flex-end" align="center">
        <Flex align="center">
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <MagnifyingGlass size={24} />
            </InputRightElement>
            <Input variant="flushed" type="text" placeholder="Pesquisar" />
          </InputGroup>
        </Flex>
        <Select
          variant="unstyled"
          placeholder="Ordem"
          w="auto"
          textAlign="center"
        >
          <option value="option1">A - Z</option>
          <option value="option2">Z - A</option>
        </Select>
      </Flex>
      <SimpleGrid mt="3rem" minChildWidth="240px" spacing="40px">
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
        <ProductCard name="Nome teste" price={198.99} />
      </SimpleGrid>
    </Flex>
  );
}
