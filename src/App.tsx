import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </div>
  );
}

export default App;
