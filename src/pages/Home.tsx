import {
  Box,
  Divider,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Spinner,
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      await getDocs(collection(db, "products"))
        .then((querySnapshot) => {
          setProducts(
            querySnapshot.docs.map((doc) => doc.data()) as ProductTypes[]
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getProducts();
  }, []);

  return (
    <Flex direction="column" justify="center" px="6rem">
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
      {isLoading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Flex
          mt="1.8rem"
          wrap="wrap"
          gap="50px"
          justify={
            products != undefined && products?.length < 6
              ? "flex-start"
              : "center"
          }
        >
          {products?.map((product, index) => (
            <ProductCard
              id={product.id}
              key={index}
              name={product.name}
              price={product.saleValue}
              src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${product.id}%2F1?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
}
