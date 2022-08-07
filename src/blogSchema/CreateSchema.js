import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  Arabic_title: Yup.string().required("Please enter Arabic title"),
  English_title: Yup.string().required("Please enter English title"),
  Arabic_short_description: Yup.string().required(
    "Please enter Arabic short description"
  ),
  English_short_description: Yup.string().required(
    "Please enter English short description"
  ),
  Arabic_description: Yup.string().required("Please enter Arabic description"),
  English_description: Yup.string().required(
    "Please enter English description"
  ),
});

export default CreateSchema;
