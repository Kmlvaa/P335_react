import React, { useEffect, useState } from "react";
import styles from "./productAddModal.module.scss";
import {
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import { getAllCategories } from "../../services/categoryService";
import { postProduct } from "../../services/productService";
import { useFormik } from "formik";
import { productAddSchema } from '../../schemas/ProductAddSchema'

export default function ProductAddModal({ isOpen, onClose, getProducts }) {
  const [input, setInput] = useState({});
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((e) => console.log(e));
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      categoryId: null
    },
    onSubmit: (values, actions) => {
      try{
        if(!(values.name && values.categoryId)) return
        postProduct(values)

        toast({
          title: "Product created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        getProducts();
        actions.resetForm()

        setTimeout(() => {
          onClose();
        }, 1000)
      }
      catch(error){
        console.log(error)
      }
    },
    validationSchema: productAddSchema,
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                onChange={formik.handleChange}
                placeholder="Enter name"
                name="name"
                value={formik.values.name}
                className={formik.errors.name && formik.touched.name ? `${styles.input_error}` : ``}
                />
                {formik.errors.name && formik.touched.name && <p className={styles.error_msg}>{formik.errors.name}</p>}
            </FormControl>
            <FormControl marginTop={"15px"}>
              <FormLabel>Category</FormLabel>
              <Select
                onChange={formik.handleChange}
                name="categoryId"
                value={formik.values.categoryId}
              >
                <option disabled selected>
                  Select category
                </option>
                {categories?.map((x) => {
                  return (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  );
                })}
                className={formik.errors.categoryId && formik.touched.categoryId ? `${styles.input_error}` : ``}
              </Select>
              {formik.errors.categoryId && formik.touched.categoryId && <p className={styles.error_msg}>{formik.errors.categoryId}</p>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={formik.handleSubmit}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
