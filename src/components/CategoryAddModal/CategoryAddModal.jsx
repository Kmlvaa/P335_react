import React, { useEffect, useState } from "react";
import styles from "./categoryAddModal.module.scss";
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
} from "@chakra-ui/react";
import { postCategory } from "../../services/categoryService";
import { useFormik } from "formik";
import { categoryAddSchema } from '../../schemas/CategoryAddSchema'

export default function CategoryAddModal({ isOpen, onClose, getCategories }) {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, actions) => {
      try {
        postCategory(values)
       
        toast({
          title: "Category created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCategories();
        actions.resetForm();

        setTimeout(() => {
          onClose();
        }, 1000)

      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: categoryAddSchema,
  })


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category name</FormLabel>
              <Input
                name="name"
                onChange={formik.handleChange}
                placeholder="Enter name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                className={formik.errors.name && formik.touched.name ? `${styles.input_error}` : ``}
              />
              {formik.errors.name && formik.touched.name && <p className={styles.error_msg}>{formik.errors.name}</p>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={formik.handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
