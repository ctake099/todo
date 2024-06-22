import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ setTodos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/todos/', { title, description })
            .then(response => {
                setTodos(prevTodos => [...prevTodos, response.data]);
                setTitle('');
                setDescription('');
            })
            .catch(error => console.error('Error adding todo:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border rounded p-2 mb-2 w-full"
                />
            </div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border rounded p-2 mb-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Add Todo</button>
        </form>
    );
};

export default TodoForm;
