import { Button } from "@chakra-ui/react";
import React from "react";

const AuthButtons: React.FC = () => {
  // We will use the authModalState here
  // We will change the state from false to true
  // But, how're gonna define the view? Login / SignUp
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // onClick={() => {}}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // onClick={() => {}}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
