import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { prepareData } from "./helpers/utils";
import { createTodoFormValidationSchema } from "./helpers/validator";

const initialValues = {
		title: '',
		description: '',
		img: '',
		tags: '', 
		deadLine: new Date(new Date().setDate(new Date().getDate() +7)),
}

export const TodosCreate = () => {
  const navigate = useNavigate()

	// сетевой запрос на создание новой задачи
  const {mutateAsync, isLoading} = useMutation({
	  mutationFn: (data) => {
		  return fetch("http://localhost:3005/todos", {
		  	method: "POST",
		  	headers: {
				  "Content-type": "application/json"
		  	},
		  	body: JSON.stringify(data)
	    }).then((res) => res.json())
	  }
  })

	const submitHandler = async (values) => {

		const preparedData = prepareData(values)
		const response = await mutateAsync(preparedData)
		// navigate("/todos")
		navigate(`/todos/${response.id}`)
	}

	return (
		<Formik
         initialValues={initialValues}
         validationSchema={createTodoFormValidationSchema}
         onSubmit={submitHandler}
       >
         <Form className="d-flex flex-column gap-3">
           <Field name="title" placeholder="Title" type="text" />
           <ErrorMessage component ="p" className={"error"} name="title" />

					 <Field name="description" placeholder="Description" type="text" />
           <ErrorMessage component ="p" className={"error"} name="description" />

					 <Field name="img" placeholder="Img url" type="text" />
           <ErrorMessage component ="p" className={"error"} name="img" />

					 <Field name="tags" placeholder="Tags" type="text" />
           <ErrorMessage component ="p" className={"error"} name="tags" />

					 <Field name="deadLine" type="date" />
           <ErrorMessage name="deadLine" />
					 <div>
           <button disabled={isLoading} className="btn btn-primary w-200rem" type="submit">Submit</button>
					 </div>
         </Form>
       </Formik>
	)
}