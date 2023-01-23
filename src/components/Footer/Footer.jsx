import { memo } from 'react'
import { useTodoListMethodsContext } from '../../contexts/TodoListContextProvider'
import "./footer.module.css"

export const Footer = memo(() => {
  console.log('Render Footer')

  const { clearAllTodos } = useTodoListMethodsContext()

  const clearHandler = (e) => {
    clearAllTodos(e, 'hello')
  }

  return (
    <footer className="d-flex justify-content-center py-3">
      <button
        onClick={clearHandler}
        type="button"
        className="btn btn-dark"
      >
        Clear all
      </button>
    </footer>
  )
})