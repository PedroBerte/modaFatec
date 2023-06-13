import { Flex, Text, Tooltip, Image, Box } from "@chakra-ui/react";
import {
  CheckFat,
  FilePlus,
  ImageSquare,
  Plus,
  Trash,
  Warning,
} from "@phosphor-icons/react";
import React, { ChangeEvent, useRef, useState } from "react";
import { FileTypes } from "../types/FileTypes";

type UploadPhotoProps = {
  title: string;
  setBase64File: React.Dispatch<React.SetStateAction<FileTypes | null>>;
};

export default function UploadPhoto(props: UploadPhotoProps) {
  const [base64File, setBase64File] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      console.log(base64Data);
      setBase64File(base64Data);
      props.setBase64File({ base64: base64Data, name: file.name } as FileTypes);
    };
    reader.readAsDataURL(file);
  };

  function handleRemoveFile() {
    setBase64File(null);
    setFileName(null);
    props.setBase64File(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Flex
      direction="row"
      justify="space-between"
      w="full"
      px="10px"
      py="12px"
      borderRadius="5px"
      border="1px solid #d6d6d6"
      cursor="pointer"
      onClick={base64File == null ? () => handleClick() : () => {}}
      _hover={{
        transition: "all 0.2s ease-in-out",
        transform: "scale(0.997)",
      }}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25);"
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Flex gap="0.5rem">
        {base64File != null ? (
          <Flex
            cursor="pointer"
            align="center"
            justify="center"
            onClick={() => handleRemoveFile()}
          >
            <Trash size={20} color="#B12929" weight="bold" />
          </Flex>
        ) : (
          <FilePlus size={24} color="#c6c6c6" weight="bold" />
        )}
        <Text>{base64File != null ? fileName : props.title}</Text>
      </Flex>
      {base64File == null ? (
        <Tooltip label="O Upload da foto é obrigatório!">
          <Warning size={24} color="#ef900b" weight="bold" />
        </Tooltip>
      ) : (
        <Tooltip label="Imagem enviada!">
          <CheckFat size={24} color="#3ECE32" weight="fill" />
        </Tooltip>
      )}
    </Flex>
  );
}
