import * as yup from "yup";

const colorHex =
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
export const backgroundFormValidationSchema = yup.object().shape({
  mode: yup.string().oneOf(["solid","gradient"]).required("Mode is required"),
  colors: yup.array().min(1).of(yup.string().matches(colorHex, "Invalid color")).required("Color is required"),
});
