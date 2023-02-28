import { createContext, useState } from 'react'

const TodoContext = createContext()

export const TodoProvider = ({children}) => {

    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState({})

    return (
        <TodoContext.Provider value={{
            todos,
            setTodos,
            newTodo,
            setNewTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext