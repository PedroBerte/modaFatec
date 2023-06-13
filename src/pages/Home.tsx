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
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { ProductTypes } from "../types/ProductTypes";

export default function Home() {
  const [products, setProducts] = useState<ProductTypes[] | null>(null);
  useEffect(() => {
    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(
        querySnapshot.docs.map((doc) => doc.data()) as ProductTypes[]
      );
    }
    getProducts();
  }, []);

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
      <SimpleGrid mt="1.8rem" minChildWidth="240px" spacing="40px">
        {products?.map((product, index) => (
          <ProductCard
            id={product.id}
            key={index}
            name={product.name}
            price={product.saleValue}
            src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${product.id}%2F1?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
