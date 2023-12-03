import React from 'react'
import arrow from '../Assets/arrow.png'

const Todos = () => {
    return (
        <div className='bg-gray-300 flex flex-col gap-12 justify-center items-center min-h-screen p-24'>
            <div className='flex justify-between border-2 bg-red-200 border-black p-4 w-full'>
                <button className='hover:scale-110 ease-in-out trasnsition-all'>
                    <img className='h-8' src={arrow} alt="" />
                </button>
                <h1>Ziua din saptamana</h1>
                <button className='hover:scale-110 ease-in-out trasnsition-all'>
                    <img className='h-8 rotate-180' src={arrow} alt="" />
                </button>
            </div>
            <div className='flex w-full justify-between items-center'>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Luni</h1>
                </button>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Marti</h1>
                </button>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Miercuri</h1>
                </button>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Joi</h1>
                </button>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Vineri</h1>
                </button>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Sambata</h1>
                </button>
                <button className='border-2 border-black p-4 font-bold bg-red-200'>
                    <h1>Duminica</h1>
                </button>

            </div>
            <div className='flex flex-col gap-8 w-full'>
                <div className='flex justify-between items-center bg-red-200 border-2 border-black py-4 px-8'>
                    <h1>Nume task, tip de task (upcoming)</h1>
                    <div className='flex gap-4'>
                        <button className='bg-green-500 p-1 text-white rounded-md border-black border-2 hover:bg-green-600 transition-all ease-in-out'>
                            Modifica
                        </button>
                        <button className='bg-red-500 p-1 text-white rounded-md border-black border-2 hover:bg-red-700 transition-all ease-in-out'>
                            Sterge
                        </button>
                    </div>
                </div>
                <div className='flex justify-between items-center bg-red-200 border-2 border-black py-4 px-8'>
                    <h1>Nume task, tip de task (upcoming)</h1>
                    <div className='flex gap-4'>
                        <button className='bg-green-500 p-1 text-white rounded-md border-black border-2 hover:bg-green-600 transition-all ease-in-out'>
                            Modifica
                        </button>
                        <button className='bg-red-500 p-1 text-white rounded-md border-black border-2 hover:bg-red-700 transition-all ease-in-out'>
                            Sterge
                        </button>
                    </div>
                </div>
                <div className='flex justify-between items-center bg-red-200 border-2 border-black py-4 px-8'>
                    <h1>Nume task, tip de task (upcoming)</h1>
                    <div className='flex gap-4'>
                        <button className='bg-green-500 p-1 text-white rounded-md border-black border-2 hover:bg-green-600 transition-all ease-in-out'>
                            Modifica
                        </button>
                        <button className='bg-red-500 p-1 text-white rounded-md border-black border-2 hover:bg-red-700 transition-all ease-in-out'>
                            Sterge
                        </button>
                    </div>
                </div>
                <div className='flex justify-between items-center bg-red-200 border-2 border-black py-4 px-8'>
                    <h1>Nume task, tip de task (upcoming)</h1>
                    <div className='flex gap-4'>
                        <button className='bg-green-500 p-1 text-white rounded-md border-black border-2 hover:bg-green-600 transition-all ease-in-out'>
                            Modifica
                        </button>
                        <button className='bg-red-500 p-1 text-white rounded-md border-black border-2 hover:bg-red-700 transition-all ease-in-out'>
                            Sterge
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full items-center justify-center text-center'>
                <button className='bg-blue-400 p-4 rounded-md border-2 border-black hover:bg-blue-500 transition-all ease-in-out'>
                    Adauga Task
                </button>
            </div>
        </div>
    )
}

export default Todos