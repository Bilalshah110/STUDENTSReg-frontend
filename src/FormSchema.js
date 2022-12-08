import * as Yup from 'yup'

export const FormSchema = Yup.object({
    name: Yup.string().min(2).max(20).required('Name is required'),
    email: Yup.string().email().min(2).max(20).required('Email is required')
})