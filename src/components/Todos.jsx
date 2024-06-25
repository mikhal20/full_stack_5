import React, { useEffect, useState } from 'react';
import { getTodosByUserId, addTodo, deleteTodo, updateTodo } from '../services/api';

function Todos({ currentUser }) {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [sortBy, setSortBy] = useState('sequential'); // default sorting criterion
  const [searchCriteria, setSearchCriteria] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      getTodosByUserId(currentUser.id)
        .then(data => {
          setTodos(data);
          setFilteredTodos(data);
        })
        .catch(error => console.error('Error fetching todos:', error));
    }
  }, [currentUser]);

  const handleAddTodo = async () => {
    try {
      const newTodo = { userId: currentUser.id, title: newTodoTitle, completed: false };
      const response = await addTodo(newTodo);
      setTodos([...todos, response]);
      setFilteredTodos([...todos, response]);
      setNewTodoTitle('');
    } catch (error) {
      setError('Error adding todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      const updatedTodo = await updateTodo(id, updatedFields);
      const updatedTodos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (error) {
      setError('Error updating todo');
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    let sortedTodos = [...todos];
    switch (e.target.value) {
      case 'sequential':
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      case 'completion':
        sortedTodos.sort((a, b) => a.completed - b.completed);
        break;
      case 'alphabetical':
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'random':
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setFilteredTodos(sortedTodos);
  };

  const handleSearch = (e) => {
    setSearchCriteria(e.target.value.toLowerCase());
    const filtered = todos.filter(todo =>
      todo.id.toString().includes(e.target.value) ||
      todo.title.toLowerCase().includes(e.target.value) ||
      (e.target.value === 'completed' && todo.completed) ||
      (e.target.value === 'incomplete' && !todo.completed)
    );
    setFilteredTodos(filtered);
  };

  return (
    <div>
      <h2>Todos</h2>
      <div className="todo-controls">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchCriteria}
          onChange={handleSearch}
        />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="sequential">Sequential</option>
          <option value="completion">Completion</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <input
          type="text"
          placeholder="New Todo Title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={todo.id}>
            <span>{index + 1}. </span>
            <span>{todo.title}</span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => handleUpdateTodo(todo.id, { completed: e.target.checked })}
            />
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Todos;
