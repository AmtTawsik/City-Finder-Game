'use client'
import React from 'react';

interface GamePanelProps {
    score: number;
    currentCity: { name: string };
    onConfirm: () => void;
}

const GamePanel: React.FC<GamePanelProps> = ({ score, currentCity, onConfirm }) => (
    <div className="bg-white shadow-md p-6 mb-1">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Find <span className='text-blue-500'>{currentCity.name}</span></h1>
        <p className="text-gray-700 mb-4">Score: <span className='text-blue-500'>{score.toFixed(2)}</span></p>
        <button
            type='button'
            onClick={onConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
            Confirm Position
        </button>
    </div>
);

export default GamePanel;
