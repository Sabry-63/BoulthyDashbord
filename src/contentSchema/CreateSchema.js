import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  group: Yup.string()
  .required("Please enter a group"),
  key: Yup.string().required("Please enter a key"),
  en: Yup.string()
  .required("Please enter en text"),
  ar: Yup.string()
  .required("Please enter ar text"),
});

export default CreateSchema;
