import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  nameEn: Yup.string().required("Please enter english name"),
  nameAr: Yup.string().required("Please enter arabic name"),
  descriptionAr: Yup.string().required("Please enter arabic description"),
  descriptionEn: Yup.string().required("Please enter english description"),
  shortDescriptionAr: Yup.string().required(
    "Please enter arabic short description"
  ),

  shortDescriptionEn: Yup.string().required(
    "Please enter english short description"
  ),

  percentage: Yup.string().required("Please enter percentage"),
  start_date: Yup.string().required("Please enter start date"),
  end_date: Yup.string().required("Please enter end date"),
  code: Yup.string().required("Please enter code"),
  user: Yup.string().required("Please enter user id"),
});

export default CreateSchema;
