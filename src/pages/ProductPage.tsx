import { Flex, Text, Image, Box, Button, Divider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Rating, ThinStar } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { ProductTypes } from "../types/ProductTypes";
import { MdCheck, MdCreditCard, MdPix, MdTabUnselected } from "react-icons/md";

import { CirclePicker } from "react-color";
import { CheckCircle } from "@phosphor-icons/react";
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

export default function ProductPage() {
  let { productId } = useParams();

  const [product, setProduct] = useState({} as ProductTypes);
  const [rating, setRating] = useState(5);
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "products", productId as string);
      const docSnap = await getDoc(docRef);
      setProduct(docSnap.data() as ProductTypes);
      console.log(docSnap.data());
    }
    if (productId) {
      fetchData();
    }
  }, [productId]);

  return (
    <>
      <Divider mt="1rem" />
      <Flex mt="3rem">
        <Flex direction="row" gap="2rem" mr="2rem">
          <Flex direction="column" gap="2rem">
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F1?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
              h="210px"
              objectFit="cover"
              onClick={() => setSelectedPhoto(1)}
              cursor="pointer"
              borderRadius="5px"
              _hover={{
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out",
              }}
            />
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F2?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
              h="210px"
              objectFit="cover"
              cursor="pointer"
              borderRadius="5px"
              onClick={() => setSelectedPhoto(2)}
              _hover={{
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out",
              }}
            />
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F3?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
              h="210px"
              objectFit="cover"
              borderRadius="5px"
              onClick={() => setSelectedPhoto(3)}
              cursor="pointer"
              _hover={{
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Flex>

          <Image
            borderRadius="5px"
            objectFit="cover"
            src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F${selectedPhoto}?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
            h="690px"
            w="540px"
          />
        </Flex>
        <Flex direction="column">
          <Flex maxH="4rem" mb="1.5rem">
            <Rating
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={setRating}
              itemStyles={myStyles}
            />
          </Flex>
          <Text fontSize="4xl" fontWeight="bold" color="#303030" mb="0.5rem">
            {product?.name}
          </Text>
          <Flex gap="3rem" direction="row">
            <Flex direction="row" align="center" gap="1rem">
              <MdPix color="#a6a6a6" />
              <Box>
                <Text fontSize="lg">
                  R${" "}
                  {(
                    parseFloat(
                      product?.saleValue == undefined
                        ? "0"
                        : product.saleValue.replace(",", ".")
                    ) * 0.9
                  ).toFixed(2)}
                </Text>
                <Text fontSize="sm">NO PIX</Text>
              </Box>
            </Flex>
            <Flex direction="row" align="center" gap="1rem">
              <MdCreditCard color="#a6a6a6" />
              <Box>
                <Text fontSize="lg">
                  R${" "}
                  {parseFloat(
                    product?.saleValue == undefined
                      ? "0"
                      : product.saleValue.replace(",", ".")
                  ).toFixed(2)}
                </Text>
                <Text fontSize="sm">
                  ATÉ 3x DE{" "}
                  {(
                    parseFloat(
                      product?.saleValue == undefined
                        ? "0"
                        : product.saleValue.replace(",", ".")
                    ) / 3
                  ).toFixed(2)}
                </Text>
              </Box>
            </Flex>
          </Flex>
          {product?.colors?.length > 0 && (
            <Flex direction="column" mt="2rem" gap="0.5rem" maxW="2rem">
              <Text>Cor:</Text>
              <Flex gap="10px">
                {product?.colors?.map((color) => (
                  <Flex
                    minWidth="2rem"
                    minHeight="2rem"
                    onClick={() => setSelectedColor(color)}
                    bg={color}
                    borderRadius="5px"
                    border={
                      selectedColor == color
                        ? "2px solid #303030"
                        : "1px solid #c6c6c6"
                    }
                    justify="center"
                    align="center"
                    p="0.1rem"
                    cursor="pointer"
                  ></Flex>
                ))}
              </Flex>
            </Flex>
          )}

          <Flex direction="column" mt="2rem" gap="0.5rem">
            <Text>Tamanhos Disponíveis:</Text>
            <Flex gap="0.9rem">
              {product?.sizes?.map((size) => (
                <Button
                  onClick={() => setSelectedSize(size)}
                  bg={
                    size == selectedSize
                      ? "linear-gradient(90deg, #E7BAD8 0%, rgba(255, 52, 137, 0.56) 100%);"
                      : "#fff"
                  }
                  color={size == selectedSize ? "#fff" : "#303030"}
                  borderRadius="5px"
                  _hover={{
                    bg: "#",
                    color: "#fff",
                  }}
                  w="70px"
                >
                  {size}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Flex
          direction="column"
          mt="2rem"
          mb="1rem"
          gap="0.5rem"
          align="center"
        >
          <Flex direction="column" align="center">
            <Text fontWeight="bold">Descrição do Produto</Text>
            <Box width="95%" h="2px" bg="#BE0C6C" />
          </Flex>
        </Flex>
        <Box>
          <Text px="20%">{product?.description}</Text>
        </Box>
      </Flex>
    </>
  );
}
