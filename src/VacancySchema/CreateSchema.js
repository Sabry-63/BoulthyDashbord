import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  enTitle: Yup.string().required("Please enter english title"),
  arTitle: Yup.string().required("Please enter arabic title"),
  enShortDescription: Yup.string().required(
    "Please enter english short description"
  ),
  arShortDescription: Yup.string().required(
    "Please enter arabic short description"
  ),
  enDescription: Yup.string().required("Please enter english description"),
  arDescription: Yup.string().required("Please enter arabic description"),
});

export default CreateSchema;
