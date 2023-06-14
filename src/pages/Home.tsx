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
  Skeleton,
  SkeletonText,
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
  const [sortedProducts, setSortedProducts] = useState([] as ProductTypes[]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      await getDocs(collection(db, "products"))
        .then((querySnapshot) => {
          setProducts(
            querySnapshot.docs.map((doc) => doc.data()) as ProductTypes[]
          );
          setSortedProducts(
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

  function handleSortProducts(e: string) {
    setSortOption(e);
    if (e === "crescent") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => b.name.localeCompare(a.name))
      );
    }
  }

  function filterProducts(e: string) {
    if (e === "") {
      setSortedProducts(products!);
    } else {
      setSortedProducts(
        products!.filter((product) =>
          product.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())
        )
      );
    }
  }

  return (
    <Flex direction="column" justify="center" px="6rem">
      <Flex mt="1rem" gap="3rem" justify="flex-end" align="center">
        <Flex align="center">
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <MagnifyingGlass size={24} />
            </InputRightElement>
            <Input
              onChange={(e) => filterProducts(e.target.value)}
              variant="flushed"
              type="text"
              placeholder="Pesquisar"
            />
          </InputGroup>
        </Flex>
        <Select
          variant="unstyled"
          placeholder="Ordem"
          w="auto"
          textAlign="center"
          onChange={(e) => handleSortProducts(e.target.value)}
          value={sortOption}
        >
          <option value="crescent">A - Z</option>
          <option value="decrecent">Z - A</option>
        </Select>
      </Flex>
      {isLoading ? (
        <Flex mt="1.8rem" wrap="wrap" gap="50px">
          <Flex direction="column" justify="center">
            <Skeleton width="240px" height="320px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Flex>
          <Flex direction="column" justify="center">
            <Skeleton width="240px" height="320px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Flex>
          <Flex direction="column" justify="center">
            <Skeleton width="240px" height="320px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Flex>
          <Flex direction="column" justify="center">
            <Skeleton width="240px" height="320px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Flex>
          <Flex direction="column" justify="center">
            <Skeleton width="240px" height="320px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Flex>
          <Flex direction="column" justify="center">
            <Skeleton width="240px" height="320px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Flex>
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
          {sortedProducts?.map((product, index) => (
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
