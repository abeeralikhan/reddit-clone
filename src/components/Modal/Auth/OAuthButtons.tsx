import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2} fontWeight={500}>
        <Image
          src="/images/googlelogo.png"
          height="20px"
          alt="google logo"
          mr={3}
        />
        Continue with Google
      </Button>
      <Button variant="oauth" mb={2} fontWeight={500}>
        <Image
          src="/images/githublogo.png"
          height="20px"
          alt="github logo"
          mr={3}
        />
        Continue with Github
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
