import { Flex, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import IconBody from "./IconBody";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <IconBody>
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </IconBody>

        <IconBody>
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </IconBody>
        <IconBody>
          <Icon as={IoVideocamOutline} fontSize={22} />
        </IconBody>
      </Flex>
      <>
        <IconBody>
          <Icon as={BsChatDots} fontSize={20} />
        </IconBody>
        <IconBody>
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </IconBody>
        <IconBody>
          <Icon as={GrAdd} fontSize={20} />
        </IconBody>
      </>
    </Flex>
  );
};
export default Icons;
