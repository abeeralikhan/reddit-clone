import { Community, CommunityState } from "@/src/atoms/communitesAtom";
import {
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  Divider,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { RiCakeLine } from "react-icons/ri";
import React, { useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import useSelectFile from "@/src/hooks/useSelectFile";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;

    setUploadingImage(true);
    try {
      // update image to storage
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      // update imageURL on the community document
      const communityDocRef = doc(firestore, "communites", communityData.id);
      await updateDoc(communityDocRef, {
        imageURL: downloadURL,
      });

      // update community state to reflect the changes
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
      setSelectedFile("");
    } catch (error: any) {
      console.log("onUpdateImage error", error);
    }
    setUploadingImage(false);
  };

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0 0"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0 0 4px 4px">
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt?.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button mt={3} height="30px" width="100%">
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityStateValue.currentCommunity?.imageURL ||
                  selectedFile ? (
                    <Image
                      src={
                        selectedFile ||
                        communityStateValue.currentCommunity?.imageURL
                      }
                      alt="Community image"
                      borderRadius="full"
                      boxSize="40px"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color="brand.100"
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text cursor="pointer" onClick={onUpdateImage}>
                      Save Changes
                    </Text>
                  ))}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                  hidden
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
