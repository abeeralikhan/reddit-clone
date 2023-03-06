import { Button, Flex, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import React from "react";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        fontWeight={500}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
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
