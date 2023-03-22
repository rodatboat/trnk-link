import * as yup from "yup";

export const editProfileValidationSchema = yup.object().shape({
  profileTitle: yup
    .string()
    .max(50, "Title is too long")
    .required("A profile title is required"),
  bio: yup.string("Enter a Bio").max(150, "Bio is too long"),
});
