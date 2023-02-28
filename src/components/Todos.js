const Todos = (props) => {

    const DeleteTodo = async (id) => {
        const filteredItems = props.todos.filter((todo) => todo.id !== id)
                props.setTodos(filteredItems)
                const res = await fetch(`/todos/${id}`,
                {
                    method: 'DELETE'
                })
    }

    const toggleTodo = (id) => {
        const newTodos = [...props.todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.completed = !todo.completed
        props.setTodos(newTodos)
      }

    const submitButtonChange = (e) => {
        props.setIsUpdating(true)
        let setContent = document.querySelector('#content')
        let submitBtn = document.querySelector('.todo-btn')
        setContent.placeholder = 'edit todo...'
        submitBtn.id = e.target.id
    }

    const handleCheckbox = (id) => {
        const filterItems = props.todos.map((todo) => todo.id === id ? {...props.todos, completed: !todo.completed} : todo)
        props.setTodos(filterItems)
    }


    return (
        
        <div className="list-div">
            {props.todos.map((todo) => (
                <div className="todo-div" key={todo.id}>
                    <div className="todo-text">
                        <input className="check-box" type="checkbox" onClick={() => {handleCheckbox(todo.id)}} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        {todo.content}
                    </div>
                    <div className='btn-div'>
                        <button id={todo.id} onClick={submitButtonChange} className="edit-btn">edit</button> 
                        <button id={todo.id} onClick={() => {DeleteTodo(todo.id)}} className="delete-btn">delete</button>
                    </div>
                </div>
            ))}
        </div>
        
    )
}

export default Todos