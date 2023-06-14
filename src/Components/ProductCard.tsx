import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import testImage from "../images/testImage.png";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  src: string;
};

export default function ProductCard(props: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <Flex
      width="240px"
      direction="column"
      justify="center"
      cursor="pointer"
      _hover={{
        transform: "scale(1.01)",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => navigate(`/Produto/${props.id}`)}
    >
      <Image
        width="240px"
        height="320px"
        objectFit="cover"
        src={props.src}
        borderRadius="5px"
      />
      <Flex mt="1rem" direction="column" align="center">
        <Text>{props.name}</Text>
        <Text>R$ {props.price}</Text>
      </Flex>
    </Flex>
  );
}
