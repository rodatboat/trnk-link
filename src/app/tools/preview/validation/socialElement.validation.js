import * as yup from "yup";

export const socialElementValidationSchema = yup.object().shape({
  active: yup.bool(),
  title: yup
    .string("Enter a title")
    .max(50, "Title is too long")
    .required("Title is required")
});
