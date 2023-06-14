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
import { useFav } from "../Contexts/FavCotenxt";
import { FavItem } from "./FavItem";
import { useMemo } from "react";

type FavProps = {
  isDrawerOpen: boolean;
  onDrawerClose: () => void;
  onDrawerOpen: () => void;
};

export const { format: formatPrice } = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});

export function FavsDrawer({
  isDrawerOpen,
  onDrawerClose,
  onDrawerOpen,
}: FavProps) {
  const { favs } = useFav();

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
        <DrawerHeader>Meus Favoritos</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap="12px">
            {favs.map((fav) => {
              return <FavItem onClose={() => onDrawerClose()} product={fav} />;
            })}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
