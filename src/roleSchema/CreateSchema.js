import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  name: Yup.string().required("Please enter role name "),
});

export default CreateSchema;
