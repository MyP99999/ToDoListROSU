import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodos } from '../Context/useTodos';

const EditTodo = () => {
    const { todoId } = useParams();
    const navigate = useNavigate();
    const { todos, setTodos } = useTodos();
    
    const [todoData, setTodoData] = useState({
        name: '',
        type: '',
        date: '',
        time: '',
        recurrence: '',
        recurrenceEndDate: '',
        isRecurrent: false,
    });
    const dayNames = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
    const [selectedDay, setSelectedDay] = useState('');

    useEffect(() => {
        const todoToEdit = todos.find((_, index) => index.toString() === todoId);
        if (todoToEdit) {
            setTodoData({ ...todoToEdit, isRecurrent: !!todoToEdit.recurrence });

            // Set selectedDay based on whether the task is recurrent
            if (todoToEdit.recurrence) {
                setSelectedDay('every');
            } else {
                setSelectedDay(todoToEdit.date);
            }
        } else {
            navigate('/');
        }
    }, [todoId, todos, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodoData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
        if (!todoData.isRecurrent) {
            setTodoData({ ...todoData, date: e.target.value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTodos = todos.map((todo, index) =>
            index.toString() === todoId ? { ...todoData, recurrence: todoData.isRecurrent ? todoData.recurrence : '' } : todo
        );
        setTodos(updatedTodos);
        navigate('/');
    };

    return (
        <div className='bg-gray-300 flex flex-col justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col border-2 border-black p-8 gap-6'>
                <h1 className='text-center text-xl font-bold'>Editeaza Task</h1>
                {/* Name field */}
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-xs'>Nume task</label>
                    <input type="text" id="name" name="name" value={todoData.name} onChange={handleChange} className='rounded-md border-2 border-gray-700' required />
                </div>
                {/* Type field */}
                <div className='flex flex-col'>
                    <label htmlFor="type" className='text-xs'>Tipul taskului</label>
                    <select id="type" name="type" value={todoData.type} onChange={handleChange} required>
                        <option value="">Selecteaza tipul</option>
                        <option value="Urmeaza">Urmeaza</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>
                {/* Recurrent checkbox */}
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="recurrent" className='text-xs'>Task recurent</label>
                        <input type="checkbox" id="recurrent" name="isRecurrent" checked={todoData.isRecurrent} onChange={handleChange} />
                    </div>
                    <select name="day" id="day" value={selectedDay} onChange={handleDayChange} required>
                        <option value="">Selecteaza ziua</option>
                        {dayNames.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                {/* Recurrence fields */}
                {todoData.isRecurrent && (
                    <div className='flex flex-col'>
                        <label htmlFor="recurrence" className='text-xs'>Frecventa recurentei</label>
                        <select id="recurrence" name="recurrence" value={todoData.recurrence} onChange={handleChange} required>
                            <option value="">Selecteaza frecventa</option>
                            <option value="daily">Zilnic</option>
                            <option value="weekly">Saptamanal</option>
                            <option value="monthly">Lunar</option>
                        </select>
                        <label htmlFor="recurrenceEndDate" className='text-xs'>Data de sfarsit a recurentei</label>
                        <input type="date" id="recurrenceEndDate" name="recurrenceEndDate" value={todoData.recurrenceEndDate} onChange={handleChange} className='rounded-md border-2 border-gray-700' />
                    </div>
                )}
                {/* Time field */}
                <div className='flex flex-col'>
                    <label htmlFor="time" className='text-xs'>Ora finalizarii</label>
                    <input type="time" id="time" name="time" value={todoData.time} onChange={handleChange} className='rounded-md border-2 border-gray-700' required />
                </div>
                <button type="submit" className='bg-green-500 rounded-md w-1/2 mx-auto border-2 border-black hover:bg-green-600 transition-all ease-in-out'>
                    Salveaza Modificarile
                </button>
            </form>
        </div>
    )
}

export default EditTodo;
