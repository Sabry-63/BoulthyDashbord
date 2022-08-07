import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  enQuestion: Yup.string().required("Please enter english question"),
  arQuestion: Yup.string().required("Please enter arabic question"),
  enAnswer: Yup.string().required("Please enter english answer"),
  arAnswer: Yup.string().required("Please enter arabic answer"),
});

export default CreateSchema;
