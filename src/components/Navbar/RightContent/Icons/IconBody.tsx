import { Flex } from "@chakra-ui/react";
import React from "react";

type IconBodyProps = {
  children: React.ReactNode;
};

const IconBody: React.FC<IconBodyProps> = ({ children }) => {
  return (
    <Flex
      mr={1.5}
      ml={1.5}
      padding={1}
      cursor="pointer"
      borderRadius={4}
      _hover={{ bg: "gray.200" }}
    >
      {children}
    </Flex>
  );
};
export default IconBody;
