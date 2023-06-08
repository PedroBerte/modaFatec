import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import { defaultTheme } from "./themes/DefaultTheme";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={defaultTheme}>
        <Box px="6rem">
          <Navbar nroCartItems={0} />
          <Home />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
