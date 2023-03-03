import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00", // Usage --> brand.100
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    // Global style will applied immediately
    global: () => ({
      body: {
        bg: "gray.200", // Making the body color of entire app gray
      },
    }),
  },
  components: {
    Button,
  },
});
