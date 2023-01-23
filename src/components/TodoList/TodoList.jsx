import { useQuery } from '@tanstack/react-query'
import { withQuery } from '../HOCs/withQuery'
import { TodoListItem } from '../TodoListItem/TodoListItem'

const TodoListInner = ({todos}) => {

	  if (!todos.length) return <p>List is empty...</p>

  return (
    <ul className="list-group">
      {todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          index={index}
          completed={todo.completed}
        />
      ))}
    </ul>
  )
}

const TodoListInnerWithQuery = withQuery(TodoListInner)

export function TodoList() {
  console.log('Render TodoList')

	// сетевой запрос на получение с запуском функции (запускает библиотека)
	// data - данные от бэка, isLoading - статус запроса, isError - флажок булевый, error - хранение ошибки, refetch - повторить попытку
	const {data: todos, isLoading, isError, error, refetch} = useQuery({
		queryKey: ["TodoListFetch"],
		queryFn: () => fetch('http://localhost:3005/todos').then((res) => {
			if (res.status > 299) {
				throw new Error (`Произошла ошибка. Status: ${res.status}`)
			}
			return res.json()
		})
	})

	return <TodoListInnerWithQuery todos={todos} isLoading={isLoading} isError={isError} error={error} refetch={refetch}/>
}
