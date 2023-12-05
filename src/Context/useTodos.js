import React, { createContext, useContext, useEffect, useState } from 'react';

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        // Load todos from localStorage on initial render
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        console.log(todos)
        // Save todos to localStorage whenever they change
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;
