import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import { CartItem } from "./CartItem";
import { useCart } from "../Contexts/CartContext";

type CartProps = {
  isDrawerOpen: boolean;
  onDrawerClose: () => void;
  onDrawerOpen: () => void;
};

export const { format: formatPrice } = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});

export function Cart({ isDrawerOpen, onDrawerClose, onDrawerOpen }: CartProps) {
  const { cart } = useCart();

  const total = formatPrice(
    cart.reduce((sumTotal, productCart) => {
      return (
        sumTotal +
        parseFloat(productCart.product.saleValue.replace(",", ".")) *
          productCart.amount
      );
    }, 0)
  );

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={onDrawerClose}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Meu carrinho</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap="12px">
            <CartItem />
            <CartItem />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex direction="column" w="100%" gap="12px">
            <Text fontWeight="bold" fontSize="1.4rem">
              Total: {total}
            </Text>
            <Button
              w="100%"
              bg="linear-gradient(90deg, #e4a7cf 0%, rgba(255, 52, 137, 1) 50%);"
              color="white"
            >
              Finalizar compra
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
