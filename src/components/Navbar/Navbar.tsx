import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { Flex, Image } from "@chakra-ui/react";

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
      {/* <Directory /> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
