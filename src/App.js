import "./App.css";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(todo);

    if (editId) {
      const editTodo = todos.find((t) => t.id === editId);
      const updateTodo = todos.map((t) => 
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          :(t)
      )
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== '') {
      setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos])
      setTodo("")
    }
  }

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  }

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  }

  return (
    <div className="App">
      <div className="container"><h1>ToDo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
          <button type="submit"> {editId?"Edit":"Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t)=>
          <li className="singleTodo">
            <span className="todoText">{t.todo}</span>
            <button onClick={()=>handleEdit(t.id)}>Edit</button>
            <button onClick={()=>handleDelete(t.id)}>Delete</button>
          </li>)}
        </ul>
      
      </div>
    </div>
  );
}

export default App;
