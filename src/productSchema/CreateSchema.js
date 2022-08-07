import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  category_id: Yup.string().required("Please enter category id"),
  Arabic_Name: Yup.string().required("Please enter ArabicName"),
  English_Name: Yup.string().required("Please enter  English Name"),
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
  price: Yup.string().required("Please enter price"),
  stock: Yup.string().required("Please enter stock"),
  // image: Yup.object().required("Image is required"),
});

export default CreateSchema;
