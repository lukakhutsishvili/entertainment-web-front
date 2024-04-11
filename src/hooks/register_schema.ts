import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("can't be empty"),
  password: Yup.string().min(4).max(12).required("can't be empty"),
  repeatPassword: Yup.string()
    .min(4)
    .max(12)
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("can't be empty"),
});

export default registerSchema;
