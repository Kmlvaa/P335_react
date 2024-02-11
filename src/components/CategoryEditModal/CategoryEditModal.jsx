import React, { useEffect, useState } from "react";
import styles from "./categoryEditModal.module.scss";
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
import { editCategory } from "../../services/categoryService";
import { useFormik } from "formik";
import { categoryEditSchema } from '../../schemas/CategoryEditSchema'

export default function CategoryEditModal({
  id,
  isOpen,
  onClose,
  getCategories,
}) {
  const [category, setCategory] = useState(null);
  const toast = useToast();

  const getCategory = async () => {
    try {
      let resp = await fetch(`https://localhost:7126/api/category/${id}`);
      let data = await resp.json();
      setCategory(data);
    } catch (error) {
      console.log(error);
      setCategory(null);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, actions) => {
      try {
          editCategory(id, values)
          toast({
            title: "Category updated.",
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
    validationSchema: categoryEditSchema,
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category name</FormLabel>
              <Input
                defaultValue={category?.name}
                placeholder="Enter name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
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
