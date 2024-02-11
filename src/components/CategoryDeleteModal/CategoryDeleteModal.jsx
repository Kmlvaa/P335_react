import React, { useEffect, useState } from "react";
import styles from "./categoryDeleteModal.module.scss";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormLabel,
  ModalFooter,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { deleteCategory } from "../../services/categoryService";
import { Formik, useFormik} from 'formik';

export default function CategoryDeleteModal({
  isOpen,
  onClose,
  getCategories,
  id,
}) {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({resetForm}) => {
      try {
          deleteCategory(id);
          toast({
            title: "Category deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getCategories();
          resetForm();
          
          setTimeout(() => {
            onClose();
          }, 1000)
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading>Are you sure?</Heading>
          </ModalBody>

          <ModalFooter>
            <Button onClick={formik.handleSubmit} colorScheme="red" mr={3}>
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
