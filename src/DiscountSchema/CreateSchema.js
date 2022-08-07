import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  en: Yup.string().required("Please enter english name"),
  ar: Yup.string().required("Please enter arabic name"),
  percentage: Yup.string().required("Please enter percentage"),
  start_date: Yup.string().required("Please enter start date"),
  end_date: Yup.string().required("Please enter end date"),
  product_id: Yup.string().required("Please enter product id"),
});

export default CreateSchema;
