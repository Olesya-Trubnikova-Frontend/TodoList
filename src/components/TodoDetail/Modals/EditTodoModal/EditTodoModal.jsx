import { Modal } from "../../../Modal/Modal";
import { useState } from "react";
import { useTodoListMethodsContext } from '../../../../contexts/TodoListContextProvider'
import classNames from 'classnames';

export function EditTodoModal({
	setIsEditModalOpen, isOpen, title, id
}) {
	const { editTodo } = useTodoListMethodsContext()
	const [input, setInput] = useState(title)

			// функция открытия и закрытия модального окна
	const closeHandler = () => {
		setIsEditModalOpen(false)
	}

		// кнопка редактирования и сохранения
  const saveTodo = () => {
		editTodo( id, {
			title: input,
		})
		closeHandler()
  }

	return (
			<Modal isOpen = {isOpen} closeHandler={closeHandler}>
				<input value={input} onChange={(e) => setInput(e.target.value)} />
				<button
					  onClick={closeHandler}
            type="button"
            className={classNames(
              'btn',
              'mx-2',
              'btn-primary'
          )}
        >Close</button>
        <button
				disabled={!input}
				  onClick={saveTodo}
          type="button"
          className="btn btn-success"
          >Save</button>
			</Modal>
	)
}