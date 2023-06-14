import { createContext, useState, useEffect, useContext } from "react";
import { ProductTypes } from "../types/ProductTypes";
import { useToast } from "@chakra-ui/react";

type FavContextProps = {
  favs: ProductTypes[];
  addFav: (product: ProductTypes) => void;
  removeFav: (product: ProductTypes) => void;
};

interface FavContextProviderProps {
  children: React.ReactNode;
}

export const FavContext = createContext({} as FavContextProps);

export default function FavContextProvider(props: FavContextProviderProps) {
  const toast = useToast();
  const [favs, setFavs] = useState<ProductTypes[]>(() => {
    const storagedFav = localStorage.getItem("@ModaEvangelica:favs");

    if (storagedFav) {
      return JSON.parse(storagedFav);
    }

    return [];
  });

  const addFav = async (product: ProductTypes) => {
    try {
      const updatedFav = [...favs];
      const productExists = updatedFav.find(
        (productFav) => productFav.id === product.id
      );

      if (productExists) {
        const index = updatedFav.findIndex(
          (productFav) => productFav.id === product.id
        );
        updatedFav.splice(index, 1);
      } else {
        updatedFav.push(product);
      }
      setFavs(updatedFav);
      localStorage.setItem("@ModaEvangelica:favs", JSON.stringify(updatedFav));

      toast({
        title: "Item adicionado aos favoritos com sucesso!",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Erro ao adicionar item aos favoritos!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const removeFav = async (product: ProductTypes) => {
    try {
      const updatedFav = [...favs];
      const productExists = updatedFav.find(
        (productFav) => productFav.id === product.id
      );

      if (productExists) {
        const index = updatedFav.findIndex(
          (productFav) => productFav.id === product.id
        );
        updatedFav.splice(index, 1);
      }
      setFavs(updatedFav);
      localStorage.setItem("@ModaEvangelica:favs", JSON.stringify(updatedFav));

      toast({
        title: "Item removido dos favoritos com sucesso!",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Erro ao remover item dos favoritos!",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <FavContext.Provider value={{ favs, addFav, removeFav }}>
      {props.children}
    </FavContext.Provider>
  );
}

export function useFav() {
  const context = useContext(FavContext);
  return context;
}
