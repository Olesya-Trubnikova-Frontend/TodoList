import { Modal } from "../../../Modal/Modal";
import { useTodoListMethodsContext } from '../../../../contexts/TodoListContextProvider'
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";

export const DeleteTodoModal = ({setIsDeleteModalOpen, isOpen, title, id}) => {

	const { deleteTodo } = useTodoListMethodsContext()

	const navigate = useNavigate()

		// функция открытия и закрытия модального окна
	const closeDeleteModalHandler = () => {
		setIsDeleteModalOpen(false)
	}

		// кнопки удаления
  const deleteHandler = () => {
    deleteTodo(id)
		closeDeleteModalHandler()
		// после удаления возвращает на нужную страницу (редирект - на один уровень)
		navigate("..", {
			relative: "path",
		})
  }

	return (
				<Modal isOpen = {isOpen} closeHandler={closeDeleteModalHandler}>
				<p>Вы точно хотите удалить задачу {" "}
				<b>&quot; {title} &quot;</b>?</p> 
				<div className='d-flex justify-content-center'>
					<button
					  onClick={closeDeleteModalHandler}
            type="button"
            className={classNames(
              'btn',
              'mx-2',
              'btn-primary'
          )}
        >Close</button>
        <button
				  onClick={deleteHandler}
          type="button"
          className="btn btn-danger"
          >Delete</button>
				</div>
			</Modal>
	)
}