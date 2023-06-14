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
  Tooltip,
} from "@chakra-ui/react";
import { CartItem } from "./CartItem";
import { useCart } from "../Contexts/CartContext";
import { useAuthContext } from "../Contexts/AuthContext";

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
  const { isLogged } = useAuthContext();

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
            {cart.map((cartItem) => {
              return (
                <CartItem product={cartItem.product} amount={cartItem.amount} />
              );
            })}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex direction="column" w="100%" gap="12px">
            <Text fontWeight="bold" fontSize="1.4rem">
              Total: {total}
            </Text>
            <Tooltip
              placement="top"
              hasArrow
              display={cart.length === 0 || !isLogged ? "block" : "none"}
              label={
                (cart.length === 0) == true || !isLogged
                  ? "Faça login e adicione um produto ao carrinho"
                  : isLogged
                  ? "Faça login para finalizar a compra"
                  : "Adicione um produto ao carrinho"
              }
            >
              <Button
                w="100%"
                bg="linear-gradient(90deg, #e4a7cf 0%, rgba(255, 52, 137, 1) 50%);"
                color="white"
                colorScheme="none"
                isDisabled={cart.length === 0 || !isLogged}
              >
                Finalizar compra
              </Button>
            </Tooltip>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
