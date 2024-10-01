import React, { useState, useEffect } from 'react';
import '../App.css'

interface TodoItem {
  id: string;
  name: string;
  time: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    
    const savedTodos = localStorage.getItem('todoResult');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [todoInput, setTodoInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  
  useEffect(() => {
    localStorage.setItem('todoResult', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoInput.trim()) return;

    const hour = String(new Date().getHours()).padStart(2, '0');
    const minute = String(new Date().getMinutes()).padStart(2, '0');
    const second = String(new Date().getSeconds()).padStart(2, '0');

    if (isEditing && editId) {

      const updatedTodos = todos.map((todo) => {
        if (todo.id === editId) {
          return { ...todo, name: todoInput, time: `${hour}:${minute}:${second}` };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
    
      const newTodo: TodoItem = {
        id: String(todos.length + 1),
        name: todoInput.trim(),
        time: `${hour}:${minute}:${second}`,
      };
      setTodos([...todos, newTodo]);
    }

    setTodoInput("");
  };

  
  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };


  

  const handleEdit = (id: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setTodoInput(todoToEdit.name);  
      setIsEditing(true);
      setEditId(id); 
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="todo"
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="New task"
        />
        <button className='ok' type="submit">{isEditing ? 'OK' : 'OK'}</button>
      </form>

      <div id="wrapper">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="container" key={todo.id}>
              <div className="container_2">
                <p>{todo.id}</p>
                <h3>{todo.name}</h3>
                <strong>{todo.time}</strong>
              </div>
            <div className='delete_wrapper'>
            <button className="edit" onClick={() => handleEdit(todo.id)}>
                update
              </button>
              <button className="delete" onClick={() => handleDelete(todo.id)}>
                delete
              </button>
            </div>
            </div>
          ))
        ) : (
          <p className='habar'>Notes are not available</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
