import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { ProductTypes } from "../types/ProductTypes";
import { useCart } from "../Contexts/CartContext";

type CartItemProps = {
  product: ProductTypes;
  amount: number;
};

export function CartItem({ product, amount }: CartItemProps) {
  const { removeProduct } = useCart();

  return (
    <Flex
      w="100%"
      bg="#FBF3F9"
      borderRadius="6px"
      padding="12px"
      gap="12px"
      align="center"
    >
      <Image
        src={`https://firebasestorage.googleapis.com/v0/b/${
          process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
        }/o/products%2F${
          product.id
        }%2F${1}?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA..`}
        alt=""
        w="72px"
        h="72px"
        objectFit="cover"
      />
      <Flex direction="column" flex="1">
        <Text
          fontSize="1.2rem"
          fontWeight="bold"
          whiteSpace={"nowrap"}
          textOverflow="ellipsis"
          overflowWrap={"break-word"}
          overflow={"hidden"}
          maxW="220px"
        >
          {product.name}
        </Text>
        <Text fontSize="0.8rem">Quantidade: {amount}</Text>
        <Text fontSize="0.8rem">Valor: R$ {product.saleValue}</Text>
      </Flex>

      <Button
        bg="transparent"
        colorScheme="none"
        color="black"
        onClick={() => removeProduct(product.id)}
      >
        Remover
      </Button>
    </Flex>
  );
}
