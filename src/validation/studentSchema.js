import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must have minimum 2 characters")
    .max(20, "Name can have maximum 20 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email()
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must have minimum 6 characters")
    .max(20, "Password can have maximum 20 characters")
    .required("Password is required"),
  cpassword: yup
    .string()
    .min(6, "Confirm password must have minimum 6 characters")
    .max(20, "Confirm password can have maximum 20 characters")
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Password do not match"),
  phone: yup
    .string()
    .min(7, "Phone must have minimum 7 characters")
    .max(15, "Phone can have maximum 15 characters")
    .required("Phone number is required"),
  dob: yup.date().required("Date of birth is required"),
  city: yup
    .string()
    .min(3, "City must have minimum 3 characters")
    .max(15, "City can have maximum 15 characters")
    .required("City is required"),
});
