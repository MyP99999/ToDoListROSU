import React, { createContext, useContext, useEffect, useState } from 'react';

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        console.log(todos)
        const updateTodosStatus = () => {
            const updatedTodos = todos.map(todo => {
                if (todo.date && todo.time && todo.type !== 'Overdue') {
                    const todoDueDate = new Date(`${todo.date}T${todo.time}`);
                    const now = new Date();

                    if (now > todoDueDate) {
                        return { ...todo, type: 'Overdue' };
                    }
                }
                return todo;
            });

            setTodos(updatedTodos);
        };

        const intervalId = setInterval(() => {
            updateTodosStatus();
            console.log("Checking for overdue todos...");
        }, 60000); 

        localStorage.setItem('todos', JSON.stringify(todos));

        return () => clearInterval(intervalId);
    }, [todos]);

    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;
