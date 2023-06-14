import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import { defaultTheme } from "./themes/DefaultTheme";
import bg from "./images/background.png";
import Logo from "./images/logo.png";
import AuthContextProvider from "./Contexts/AuthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Footer from "./Components/Footer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/Produto/:productId",
      element: (
        <>
          <Navbar />
          <ProductPage />
          <Footer />
        </>
      ),
    },
  ]);
  return (
    <div className="App">
      <ChakraProvider theme={defaultTheme}>
        <AuthContextProvider>
          <Box
            w="full"
            h="100%"
            minH="100vh"
            px="6rem"
            bgImage={bg}
            bgRepeat="no-repeat"
            bgSize="cover"
          >
            <RouterProvider router={router} />
          </Box>
        </AuthContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
