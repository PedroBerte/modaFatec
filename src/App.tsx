import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import { defaultTheme } from "./themes/DefaultTheme";
import bg from "./images/background.png";
import AuthContextProvider from "./Contexts/AuthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Footer from "./Components/Footer";
import CartContextProvider from "./Contexts/CartContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Box>
            <Navbar />
            <Home />
          </Box>
          <Footer />
        </>
      ),
    },
    {
      path: "/Produto/:productId",
      element: (
        <>
          <Box>
            <Navbar />
            <ProductPage />
          </Box>
          <Footer />
        </>
      ),
    },
  ]);
  return (
    <div className="App">
      <ChakraProvider theme={defaultTheme}>
        <AuthContextProvider>
          <CartContextProvider>
            <Flex
              w="full"
              h="100%"
              minH="100vh"
              bgImage={bg}
              bgRepeat="no-repeat"
              bgSize="cover"
              direction="column"
              justify="space-between"
            >
              <RouterProvider router={router} />
            </Flex>
          </CartContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
