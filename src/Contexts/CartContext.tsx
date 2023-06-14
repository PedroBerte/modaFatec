import { createContext, useState, useEffect, useContext } from "react";
import { ProductTypes } from "../types/ProductTypes";
import { useToast } from "@chakra-ui/react";

type ProductCartTypes = {
  product: ProductTypes;
  amount: number;
};

type CartContextProps = {
  cart: ProductCartTypes[];
  addProduct: (product: ProductTypes) => void;
  removeProduct: (productId: string) => void;
  checkout: () => Promise<void>;
};

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export default function CartContextProvider(props: CartContextProviderProps) {
  const toast = useToast();
  const [cart, setCart] = useState<ProductCartTypes[]>(() => {
    const storagedCart = localStorage.getItem("@ModaEvangelica:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (product: ProductTypes) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        (productCart) => productCart.product.id === product.id
      );
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if (productExists) {
        productExists.amount = amount;
      } else {
        const newProduct = {
          product: { ...product },
          amount: 1,
        };
        updatedCart.push(newProduct);
      }
      setCart(updatedCart);
      localStorage.setItem("@ModaEvangelica:cart", JSON.stringify(updatedCart));

      toast({
        title: "Item adicionado ao carrinho com sucesso!",
        position: "top-right",
        status: "success",
        duration: 1400,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Tivemos um problema ao adicionar o produto ao carrinho.",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeProduct = (productId: string) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (productCart) => productCart.product.id === productId
      );

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem(
          "@ModaEvangelica:cart",
          JSON.stringify(updatedCart)
        );
      } else {
        throw Error();
      }
    } catch {
      toast({
        title: "Epa, tem algo errado! 🤨",
        description: "Tivemos um problema ao remover o produto ao carrinho.",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  function checkout() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCart([]);
        localStorage.removeItem("@ModaEvangelica:cart");
        resolve();
      }, 2000);
    });
  }

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, checkout }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
