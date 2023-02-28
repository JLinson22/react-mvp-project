const TodoForm = (props) => {

   const UpdateTodo = (e) => {

    e.preventDefault()
    let submitBtn = document.querySelector('.todo-btn')
    let setContent = document.querySelector('#content')
    setContent.placeholder = 'edit todo...'
    props.todos.map( async (todo) => {
        
        let id = todo.id
        let todoObj = {}
        todoObj.content = props.value
        todoObj.completed = props.completed
        
        if (submitBtn.id == id) {
            const filteredItems = props.todos.map((todo) => todo.id == id ? {...todo, content: props.value} : todo)
            props.setTodos(filteredItems)
            const response = await fetch(`/todos/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoObj)
            })
            const data = await response.json()
            props.setValue('')
        }
    })
    props.setIsUpdating(false)
    setContent.placeholder = 'create a new task...'
   }

   const handleClearTodos = () => {
    props.todos.map(async (todo) => {
      let id = todo.id
      if (todo.completed === true) {
          const filteredItems = props.todos.filter((todo) => todo.completed !== true)
          props.setTodos(filteredItems)
          const res = await fetch(`/todos/${id}`,
          {
              method: 'DELETE'
          })
      }
  })
  }
    
    const handleContentChange = (e) => {
        props.setValue(e.target.value)
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const todoObj = {}
        todoObj.content = props.value
        todoObj.completed = props.completed

        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoObj)
        })
        const data = await response.json()
        props.setTodos((todo) => ([...todo, data[0]]))
        props.setValue('')
    }

    return (
        <>
        <div className="todo-form">
            <form onSubmit={props.isUpdating ? UpdateTodo : handleSubmit}>
                <input type="text" id="content" className="todo-input" placeholder="create a new task..." value={props.value} onChange={handleContentChange}/>
                <button type="submit" className="todo-btn">
                    {props.isUpdating ? "Update" : "Submit"}</button>
            </form>
        </div>
        <div className="num-completed">{props.todos.filter(todo => !todo.completed).length} left to do</div>
        <button onClick={handleClearTodos} type="submit" className="clear-btn">Clear Completed</button>
        </>
    )
}

export default TodoForm