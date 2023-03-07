import { Flex, MenuItem } from "@chakra-ui/react";
import React from "react";

type MenuItemBodyProps = {
  children: React.ReactNode;
  onClick?: React.ReactEventHandler;
};

const MenuItemBody: React.FC<MenuItemBodyProps> = ({ children, onClick }) => {
  return (
    <MenuItem
      fontSize="10pt"
      fontWeight={700}
      _hover={{ bg: "blue.500", color: "white" }}
      onClick={onClick}
    >
      <Flex align="center">{children}</Flex>
    </MenuItem>
  );
};
export default MenuItemBody;
