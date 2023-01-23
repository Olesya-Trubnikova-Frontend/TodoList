import { useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { withQuery } from "../HOCs/withQuery"
import { DeleteTodoModal } from "../TodoDetail/Modals/DeleteTodoModal/DeleteTodoModal"
import { EditTodoModal } from "../TodoDetail/Modals/EditTodoModal/EditTodoModal"


const TodoDetailInner = ({currentTodo}) => {

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false) // состояние модального окна
	const [isEditModalOpen, setIsEditModalOpen] = useState(false) // состояние модального окна

	// функция открытия и закрытия модального окна
	const openDeleteModalHandler = () => {
		setIsDeleteModalOpen(true)
	}
  // функция открытия и закрытия модального окна
	const openEditModalHandler = () => {
		setIsEditModalOpen(true)
	}

		return (<div>
		{JSON.stringify(currentTodo)}

		<button
          onClick={openEditModalHandler}
          type="button"
          className={classNames(
            'btn',
            'mx-2',
            'btn-warning',
          )}
        >
          Edit
        </button>

				<button
          onClick={openDeleteModalHandler}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>

				<DeleteTodoModal 
			isOpen={isDeleteModalOpen} 
			setIsDeleteModalOpen={setIsDeleteModalOpen} 
			title={currentTodo.title} 
			id={currentTodo.id} />

			<EditTodoModal
			isOpen={isEditModalOpen} 
			setIsEditModalOpen={setIsEditModalOpen} 
			title={currentTodo.title} 
			id={currentTodo.id} />
	</div>)
}

// вызываем компонент высшего порядка withQuery
const TodoDetailInnerQuery = withQuery(TodoDetailInner)

export const TodoDetail = () => {

	const {todoId} = useParams()

	 // сетевой запрос на получение по id (если todoId равен undefined запрос не выполняется)
	const {data: currentTodo, isLoading, isError, error, refetch} = useQuery({
		queryKey: ["TodosDetail", todoId], // ключ запроса
		queryFn: () => fetch(`http://localhost:3005/todos/${todoId}`).then((res) => res.json()),
		enabled: todoId !== undefined
	})
	// вызываем компонент
	return <TodoDetailInnerQuery currentTodo={currentTodo} isLoading={isLoading} isError={isError} error={error} refetch={refetch}/>
}