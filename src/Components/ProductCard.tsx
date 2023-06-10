import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import testImage from "../images/testImage.png";

type ProductCardProps = {
  name: string;
  price: number;
};

export default function ProductCard(props: ProductCardProps) {
  return (
    <Flex direction="column">
      <Image src={testImage} />
      <Flex mt="1rem" direction="column" align="center">
        <Text>{props.name}</Text>
        <Text>R$ {props.price}</Text>
      </Flex>
    </Flex>
  );
}
