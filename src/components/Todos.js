const Todos = (props) => {

    const DeleteTodo = (e) => {
        props.todos.map(async (todo) => {
            let id = todo.id
            if (e.target.id == id) {
                const res = await fetch(`/todos/${id}`,
                {
                    method: 'DELETE'
                })
            }
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

    const handleCheckbox = (e) => {
        e.target.checked = true
    }

    return (
        
        <div className="list-div">
            {props.todos.map((todo) => (
                <div className="todo-div" key={todo.id}>
                    <div className="todo-text">
                        <input className="check-box" type="checkbox" onClick={handleCheckbox} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        {todo.content}
                    </div>
                    <div className='btn-div'>
                        <button id={todo.id} onClick={submitButtonChange} className="edit-btn">edit</button> 
                        <button id={todo.id} onClick={DeleteTodo} className="delete-btn">delete</button>
                    </div>
                </div>
            ))}
        </div>
        
    )
}

export default Todos