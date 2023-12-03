import React, { useEffect, useMemo, useState } from 'react';
import arrow from '../Assets/arrow.png';
import { Link } from 'react-router-dom';
import { useTodos } from '../Context/useTodos';

const getWeekNumber = (date) => {
    const currentDate = new Date(date.getTime());
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    return Math.ceil(days / 7);
}

const getMaxWeeksInYear = (year) => {
    const dec31 = new Date(year, 11, 31);
    return getWeekNumber(dec31);
}

const Todos = () => {
    const dayNames = useMemo(() => ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"], []);
    const [selectedDay, setSelectedDay] = useState(dayNames[new Date().getDay()]);
    const [currentWeek, setCurrentWeek] = useState(getWeekNumber(new Date()));
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { todos, setTodos } = useTodos();

    const isRecurrentTaskDue = (todo, selectedDate) => {
        const todoCreationDate = new Date(todo.date);
        if (todo.recurrence === 'daily') {
            return true;
        } else if (todo.recurrence === 'weekly') {
            return todoCreationDate.getDay() === selectedDate.getDay();
        } else if (todo.recurrence === 'monthly') {
            return todoCreationDate.getDate() === selectedDate.getDate();
        }
        return false;
    };

    const filteredTodos = todos.filter(todo => {
        const selectedDate = new Date(currentYear, 0, (currentWeek - 1) * 7 + 1);
        selectedDate.setDate(selectedDate.getDate() + dayNames.indexOf(selectedDay));

        if (todo.recurrence) {
            const recurrenceEndDate = todo.recurrenceEndDate ? new Date(todo.recurrenceEndDate) : new Date('9999-12-31');
            return selectedDate <= recurrenceEndDate && isRecurrentTaskDue(todo, selectedDate);
        } else {
            const todoDate = new Date(todo.date);
            return todoDate.toDateString() === selectedDate.toDateString();
        }
    });

    const selectDay = (day) => {
        setSelectedDay(day);
    };

    const incrementWeek = () => {
        const maxWeeks = getMaxWeeksInYear(currentYear);
        if (currentWeek === maxWeeks) {
            setCurrentWeek(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentWeek(currentWeek + 1);
        }
    };

    const decrementWeek = () => {
        if (currentWeek === 1) {
            setCurrentYear(currentYear - 1);
            setCurrentWeek(getMaxWeeksInYear(currentYear - 1));
        } else {
            setCurrentWeek(currentWeek - 1);
        }
    };

    const deleteTodo = (indexToDelete) => {
        setTodos(todos.filter((_, index) => index !== indexToDelete));
    };

    useEffect(() => {
        const today = new Date();
        setSelectedDay(dayNames[today.getDay()]);
        setCurrentWeek(getWeekNumber(today));
        setCurrentYear(today.getFullYear());
    }, [dayNames]);


    return (
        <div className='bg-gray-300 flex flex-col gap-12 justify-center items-center min-h-screen p-24'>
            <div className='flex justify-between border-2 bg-red-200 border-black p-4 w-full'>
                <button onClick={decrementWeek} className='hover:scale-110 ease-in-out transition-all'>
                    <img className='h-8' src={arrow} alt="Previous Week" />
                </button>
                <h1>Year: {currentYear}, Week: {currentWeek}, Day: {selectedDay}</h1>
                <button onClick={incrementWeek} className='hover:scale-110 ease-in-out transition-all'>
                    <img className='h-8 rotate-180' src={arrow} alt="Next Week" />
                </button>
            </div>
            <div className='flex w-full justify-between items-center'>
                {dayNames.map((day) => (
                    <button key={day} onClick={() => selectDay(day)} className='border-2 border-black p-4 font-bold bg-red-200'>
                        <h1>{day}</h1>
                    </button>
                ))}
            </div>

            <div className='flex flex-col gap-8 w-full'>
                {filteredTodos.length > 0 ? filteredTodos.map((todo, index) => (
                    <div key={index} className='flex justify-between items-center bg-red-200 border-2 border-black py-4 px-8'>
                        <h1>{todo.name} - ({todo.type})</h1>
                        <h1>Pana la:{todo.time}</h1>
                        <div className='flex gap-4'>

                            <button className='bg-green-500 p-1 text-white rounded-md border-black border-2 hover:bg-green-600 transition-all ease-in-out'>
                                Modifica
                            </button>
                            <button
                                onClick={() => deleteTodo(index)}
                                className='bg-red-500 p-1 text-white rounded-md border-black border-2 hover:bg-red-700 transition-all ease-in-out'>
                                Sterge
                            </button>
                        </div>
                    </div>
                )) : <p>No tasks for this day.</p>}
            </div>
            <div className='w-full items-center justify-center text-center'>
                <Link to='/addtodo'>
                    <button className='bg-blue-400 p-4 rounded-md border-2 border-black hover:bg-blue-500 transition-all ease-in-out'>
                        Adauga Task
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Todos;
