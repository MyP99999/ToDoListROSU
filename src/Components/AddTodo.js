import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../Context/useTodos';

const AddTodo = () => {
    const navigate = useNavigate();
    const { setTodos } = useTodos();
    const [isRecurrent, setIsRecurrent] = useState(false);
    const [todoDate, setTodoDate] = useState('');
    const [todoTime, setTodoTime] = useState('');
    const [recurrence, setRecurrence] = useState('');
    const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
    const dayNames = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];

    const handleCheckboxChange = () => {
        setIsRecurrent(!isRecurrent);
    };

    const handleDayChange = (event) => {
        const selectedDayName = event.target.value;
        if (selectedDayName === 'every') {
            setTodoDate(selectedDayName);
        } else {
            const dayIndex = dayNames.indexOf(selectedDayName);
            const today = new Date();
            const todayIndex = today.getDay();
            const diff = dayIndex - todayIndex;
            const selectedDate = new Date(today.setDate(today.getDate() + diff));
            setTodoDate(selectedDate.toISOString().split('T')[0]); // Set the date in YYYY-MM-DD format
        }
    };

    const handleTimeChange = (event) => {
        setTodoTime(event.target.value); // Update time state
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const type = event.target.type.value;
        const newTodo = { name, type, date: todoDate, time: todoTime };
        if (isRecurrent) {
            newTodo.recurrence = recurrence;
            newTodo.recurrenceEndDate = recurrenceEndDate;
        }
        setTodos(prevTodos => [...prevTodos, newTodo]);
        navigate('/');
    };
    return (
        <form onSubmit={handleSubmit} className='bg-gray-300 flex flex-col justify-center items-center min-h-screen'>
            <div className='flex flex-col border-2 border-black p-8 gap-6'>
                <h1 className='text-center text-xl font-bold'>Adauga un task nou</h1>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-xs'>Nume task</label>
                    <input type="text" id="name" placeholder='nume task' className='rounded-md border-2 border-gray-700' required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="type" className='text-xs'>Tipul taskului</label>
                    <select id="type" required>
                        <option value="">Selecteaza tipul</option>
                        <option value="Urmeaza">Urmeaza</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="recurrent" className='text-xs'>Task recurent</label>
                        <input
                            type="checkbox"
                            id="recurrent"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <select name="day" id="day" onChange={handleDayChange} required>
                        <option value="">Selecteaza ziua</option>
                        {dayNames.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                {isRecurrent && (
                <div className='flex flex-col'>
                    <label htmlFor="recurrence" className='text-xs'>Frecventa recurentei</label>
                    <select id="recurrence" onChange={(e) => setRecurrence(e.target.value)} required>
                        <option value="">Selecteaza frecventa</option>
                        <option value="daily">Zilnic</option>
                        <option value="weekly">Saptamanal</option>
                        <option value="monthly">Lunar</option>
                    </select>
                    <label htmlFor="recurrenceEndDate" className='text-xs'>Data de sfarsit a recurentei</label>
                    <input type="date" id="recurrenceEndDate" onChange={(e) => setRecurrenceEndDate(e.target.value)} className='rounded-md border-2 border-gray-700' />
                </div>
            )}
                <div className='flex flex-col'>
                    <label htmlFor="time" className='text-xs'>Ora finalizarii</label>
                    <input type="time" id="time" onChange={handleTimeChange} className='rounded-md border-2 border-gray-700' required />
                </div>
                <button type="submit" className='bg-green-500 rounded-md w-1/2 mx-auto border-2 border-black hover:bg-green-600 transition-all ease-in-out'>
                    Add task
                </button>
            </div>
        </form>
    )
}

export default AddTodo
