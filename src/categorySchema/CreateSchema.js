import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  en: Yup.string().required("Please enter english name"),
  ar: Yup.string().required("Please enter arabic name"),
});

export default CreateSchema;
