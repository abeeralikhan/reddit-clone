import { Button, Flex, Stack, Textarea, Input } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
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
