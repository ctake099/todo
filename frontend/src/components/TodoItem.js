import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, setTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/todos/${todo.id}/`)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(item => item.id !== todo.id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/todos/${todo.id}/`, { title: editTitle, description: editDescription, completed: todo.completed })
            .then(response => {
                setTodos(prevTodos => prevTodos.map(item => item.id === todo.id ? response.data : item));
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating todo:', error));
    };

    const toggleComplete = () => {
        axios.patch(`http://localhost:8000/api/todos/${todo.id}/`, { completed: !todo.completed })
            .then(response => {
                setTodos(prevTodos => prevTodos.map(item => item.id === todo.id ? response.data : item));
            })
            .catch(error => console.error('Error toggling complete:', error));
    };

    return (
        <li className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            {isEditing ? (
                <form onSubmit={handleEdit} className="flex-grow">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border rounded p-2 w-full mb-2"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border rounded p-2 w-full mb-2"
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded">Save</button>
                    <button onClick={() => setIsEditing(false)} className="ml-2 bg-gray-500 text-white p-2 rounded">Cancel</button>
                </form>
            ) : (
                <>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={toggleComplete}
                            className="mr-2"
                        />
                        <div>
                            <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through' : ''}`}>
                                {todo.title}
                            </h3>
                            <p>{todo.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
