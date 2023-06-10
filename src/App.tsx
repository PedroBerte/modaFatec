import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import { defaultTheme } from "./themes/DefaultTheme";
import bg from "./images/background.png";
import Logo from "./images/logo.png";
import AuthContextProvider from "./Contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={defaultTheme}>
        <AuthContextProvider>
          <Box
            w="full"
            h="100vh"
            px="6rem"
            // bgImage={bg}
            // bgRepeat="no-repeat"
            // bgSize="cover"
          >
            <Navbar nroCartItems={0} />
            <Home />
          </Box>
        </AuthContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
