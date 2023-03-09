import React from "react";
import AuthButtons from "./AuthButtons";
import { Button, Flex } from "@chakra-ui/react";
import AuthModel from "../../Modal/Auth/AuthModal";
import { signOut, User } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
import Icons from "./Icons/Icons";
import UserMenu from "./UserMenu/UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModel />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
