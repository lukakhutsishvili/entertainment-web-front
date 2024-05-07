import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("can't be empty"),
  password: Yup.string().required("can't be empty").min(4).max(12),
  repeatPassword: Yup.string()
    .required("can't be empty")
    .min(4)
    .max(12)
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export default registerSchema;
