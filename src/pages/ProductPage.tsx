import { Flex, Text, Image, Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function ProductPage() {
  let { productId } = useParams();
  return (
    <Flex mt="3rem">
      <Flex direction="row" gap="2rem" mr="2rem">
        <Flex direction="column" gap="2rem">
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F1?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
            h="210px"
            objectFit="cover"
          />
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F2?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
            h="210px"
            objectFit="cover"
          />
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F3?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
            h="210px"
            objectFit="cover"
          />
        </Flex>

        <Image
          src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/products%2F${productId}%2F1?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
          h="690px"
        />
      </Flex>

      <div>
        <Rating size={50} transition allowFraction showTooltip />
      </div>
    </Flex>
  );
}
