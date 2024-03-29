import React, { useState, useEffect } from 'react';
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

// npm run deploy
// git commit -a -m "configuracoes de deploy"
// git push

function App() {

  const [todos, setTodos] = useState(() => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  });
  
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [sort, setSort]= useState("Asc")

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, category) => {

    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    },
  ]

  setTodos(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) => 
    todo.id !== id ? todo : null
    );
    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => 
    todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
    )
    setTodos(newTodos)
  } 

  const editTodo = (id, newText, newCategory) => {
    const editedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, category: newCategory } : todo
    );
    setTodos(editedTodos);
  };
  
  return ( 
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch } />
      <Filter filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
       {todos
       .filter((todo) => 
          filter === "All" 
            ? true 
            : filter === "Completed" 
            ? todo.isCompleted 
            : !todo.isCompleted
          )
          .filter((todo) => 
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
          <Todo 
          key={todo.id} 
          todo={todo} 
          removeTodo={removeTodo} 
          completeTodo={completeTodo} 
          editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App
