import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ProductCard from "../Components/ProductCard";

export default function Home() {
  return (
    <Flex>
      <Divider my="2rem" />
      <Flex>
        <Flex></Flex>
        <Flex></Flex>
      </Flex>
    </Flex>
  );
}
