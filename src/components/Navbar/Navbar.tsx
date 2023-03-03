import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex alignItems="center">
        <Image src="/images/redditFace.svg" alt="reddit logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="reddit title"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* <Directory />
      <SearchInput />
      <RightContent /> */}
    </Flex>
  );
};

export default Navbar;
