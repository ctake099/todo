import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/todos/')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
            <TodoForm setTodos={setTodos} />
            <ul className="space-y-4">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
