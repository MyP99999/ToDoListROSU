import React, { createContext, useContext, useEffect, useState } from 'react';

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        console.log(todos)
    }, [todos])

    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;
