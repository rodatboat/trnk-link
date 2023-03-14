import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/;
// min 4-10 chars, 1 upper case, 1 lower case, 1 number

export const loginValidationSchema = yup.object().shape({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(4)
    .max(18)
    .required("Password is required"),
});
