import * as yup from 'yup';

export const productAddSchema = yup.object().shape({
    name: yup.string().min(3, 'Name must be at least 3 characters!').required('Required!'),
    categoryId: yup.string().required('Required!'),
})
