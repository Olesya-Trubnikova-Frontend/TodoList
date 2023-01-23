import { useCallback, useEffect, useState } from "react";

const TODO_LIST_LS_KEY = "TODO_LIST_LS_KEY";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const dataFromLS = localStorage.getItem(TODO_LIST_LS_KEY);

    const preparedData = dataFromLS ? JSON.parse(dataFromLS) : [];

    return preparedData;
  });

  useEffect(() => {
    localStorage.setItem(TODO_LIST_LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = useCallback(
    (title) => {
      const newTodo = {
        id: crypto.randomUUID(),
        completed: false,
        title,
      };

      setTodos((prev) => [newTodo, ...prev]);
    },
    [setTodos]
  );

  // получение элемента по id
	const getTodoById = (id) => {
		return todos.find((todo) => todo.id === id)}

  const deleteTodo = useCallback(
    (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const changeStatusTodo = useCallback(
    (id) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        })
      );
    },
    [setTodos]
  );

	
	// функция изменения текста (редактирование)
	const editTodo = useCallback((id, editedTodo) => {
		setTodos((prev) => prev.map((todo) => {
			if (todo.id === id) {
			  return {
				...todo,
				...editedTodo
			  }
			}
			return todo
		}))
	}, [setTodos])

  const clearAllTodos = useCallback(
    (e, customArg) => {
      console.log({ e, customArg });
      setTodos([]);
    },
    [setTodos]
  );

  return {
    todos,
    clearAllTodos,
    changeStatusTodo,
    deleteTodo,
    addNewTodo,
		editTodo,
		getTodoById
  };
};
