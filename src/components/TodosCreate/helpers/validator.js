import * as Yup from "yup";

export const createTodoFormValidationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(100, "Must be 100 characters or less"),
  img: Yup.string()
	  .url()
    .required("Required"),
  tags: Yup.string()
    .required("Required"),
	deadLine: Yup.date().default(() => new Date().setDate(new Date().getDate() +7))
});