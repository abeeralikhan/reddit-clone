import React from "react";
import AuthButtons from "./AuthButtons";
import { Button, Flex } from "@chakra-ui/react";
import AuthModel from "../../Modal/Auth/AuthModel";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModel />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut(auth)}>Sign Out</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
