import * as yup from "yup";

const urlRules =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
export const profileValidationSchema = yup.object().shape({
    displayName: yup
    .string("Enter a display name")
    .max(30, "Display name is too long"),
  bio: yup
    .string("Enter a bio")
    .max(120, "Bio is too long"),
});
