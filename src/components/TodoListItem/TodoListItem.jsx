import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTodoListMethodsContext } from '../../contexts/TodoListContextProvider'
import styles from './todoListItem.module.css'

export function TodoListItem({
  title,
  id,
  index,
  completed
}) {
  const { changeStatusTodo } = useTodoListMethodsContext()

  const completeHandler = (e) => {
		// e.stopPropogation()
		e.preventDefault()
    changeStatusTodo(id)
  }

  return (
			<Link to={`./${id}`}>
				<li className="list-group-item d-flex justify-content-between align-items-center">
					<span className={completed ? styles.done : ''}>
						{index + 1}
						.
						{" "}
						{title}
					</span>

					<div>			
						<button
							onClick={completeHandler}
							type="button"
							className={classNames(
								'btn',
								'mx-2',
								{ 'btn-primary': completed },
								{ 'btn-success': !completed },
							)}
						>
							{completed ? 'Undone' : 'Done'}
						</button>      
					</div>
				</li>
			</Link>
  )
}
