import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Icon,
  Flex,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import MenuItemBody from "./MenuItemBody";
import { auth } from "@/src/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { CommunityState } from "@/src/atoms/communitesAtom";

type UserMenuProps = {
  user?: User | null;
};

// || --> no
// | --> yes

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItemBody>
              <Icon fontSize={20} as={CgProfile} mr={2} />
              Profile
            </MenuItemBody>
            <MenuDivider />
            <MenuItemBody onClick={logout}>
              <Icon fontSize={20} as={MdOutlineLogin} mr={2} />
              Logout
            </MenuItemBody>
          </>
        ) : (
          <>
            <MenuItemBody
              onClick={() =>
                setModalState((prev) => ({ view: "login", open: true }))
              }
            >
              <Icon fontSize={20} as={MdOutlineLogin} mr={2} />
              Log In / Sign Up
            </MenuItemBody>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
