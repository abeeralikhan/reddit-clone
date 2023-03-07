import React from "react";
import AuthButtons from "./AuthButtons";
import { Button, Flex } from "@chakra-ui/react";
import AuthModel from "../../Modal/Auth/AuthModel";
import { signOut, User } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
import Icons from "./Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModel />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        {/* <Menu /> */}
      </Flex>
    </>
  );
};
export default RightContent;
