import { Button, Flex, Image, Text } from "@chakra-ui/react";

export function CartItem() {
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
        src="https://firebasestorage.googleapis.com/v0/b/modaevangelicadl.appspot.com/o/products%2Fp7ln6iph6nlitpiavu%2F1?alt=media&token=c707f07d-ce2c-490c-bb9a-4d1936bf6504&_gl=1*1xt8alz*_ga*ODgyMjQzOTY2LjE2ODYwODM5Mjc.*_ga_CW55HF8NVT*MTY4NjYxNTg0Mi43LjEuMTY4NjYyMzE2OC4wLjAuMA.."
        alt=""
        w="72px"
        h="72px"
        objectFit="cover"
      />
      <Flex direction="column" flex="1">
        <Text fontSize="1.2rem" fontWeight="bold">
          Vestido
        </Text>
        <Text fontSize="0.8rem">Quantidade: 1</Text>
        <Text fontSize="0.8rem">Valor: R$ 120,00</Text>
      </Flex>

      <Button bg="transparent" colorScheme="none" color="black">
        Remover
      </Button>
    </Flex>
  );
}
