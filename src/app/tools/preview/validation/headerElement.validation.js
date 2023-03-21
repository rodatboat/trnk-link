import * as yup from "yup";

const urlRules =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
export const headerElementValidationSchema = yup.object().shape({
  active: yup.bool(),
  title: yup
    .string("Enter a title")
    .max(50, "Title is too long")
    .required("Title is required"),});
