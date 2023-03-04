import React from "react";
import AuthButtons from "./AuthButtons";
import { Flex } from "@chakra-ui/react";
import AuthModel from "../../Modal/Auth/AuthModel";

type RightContentProps = {
  // user: any;
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModel />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
