import { Button, Flex, Stack, Textarea, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  loading: boolean;
  loadingCancelPost: boolean;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  handleCancelPost: () => {};
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  loading,
  loadingCancelPost,
  onChange,
  handleCreatePost,
  handleCancelPost,
}) => {
  const router = useRouter();
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        value={textInputs.title}
        onChange={onChange}
      />
      <Textarea
        name="body"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Text (optional)"
        height="100px"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        value={textInputs.body}
        onChange={onChange}
      />
      <Flex justify="flex-end">
        <Button
          variant="outline"
          height="34px"
          padding="0px 30px"
          isLoading={loadingCancelPost}
          mr={2}
          onClick={handleCancelPost}
        >
          Cancel
        </Button>
        <Button
          height="34px"
          padding="0px 30px"
          isLoading={loading}
          onClick={handleCreatePost}
          isDisabled={!textInputs.title}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
