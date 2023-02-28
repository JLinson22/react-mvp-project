import './App.css';
import { useState, useEffect } from 'react';
import Todos from './components/Todos.js'
import TodoForm from './components/TodoForm.js';

function App() {
const [todos, setTodos] = useState([])
const [newTodo, setNewTodo] = useState({})
const [completed, setCompleted] = useState(false)
const [isUpdating, setIsUpdating] = useState(false)
const [value, setValue] = useState('')

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  const handleClearTodos = (e) => {
    todos.map(async (todo) => {
      let id = todo.id
      if (todo.completed === true) {
          const res = await fetch(`/todos/${id}`,
          {
              method: 'DELETE'
          })
      }
  })
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/todos')
      const data = await response.json()
      setTodos(data)
    }
    getData()
  }, [todos])

  return (
    
    <div className="App">
      <div className='top-text'>Take Control of your Day</div>
      <div className='todo-list'>
        <h1>Todo List</h1>
        <TodoForm 
        todos={todos}
        setTodos={setTodos}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        completed={completed}
        setCompleted={setCompleted}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        value={value}
        setValue={setValue}
        />
        <Todos 
        todos={todos}
        setTodos={setTodos}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        completed={completed}
        setCompleted={setCompleted}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        toggleTodo={toggleTodo}
        />
      </div>
    </div>
   
  );
}

export default App;