import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";

const AuthModel: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleModalClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>View is {modalState.view}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModel;
