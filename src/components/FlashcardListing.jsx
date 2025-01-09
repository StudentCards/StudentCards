import { useState } from 'react';

const FlashcardListing = ({ card, editCardFunc }) => {

    const handleEditCard = (card) => {
        editCardFunc(card);
    };

    return (
        <div className="w-[80%] h-full p-4 rounded-md bg-indigo-100 text-black">
            <div className='flex w-full items-center'>
                <div className="flex flex-col justify-center text-lg font-medium w-[90%]">
                    <p className='w-[95%]'> {card.question} </p>
                    <div className="border-b-2 border-black justif-left w-[95%]"></div>
                    <p className='w-[95%]'> {card.answer} </p>
                </div>
                <button
                    className='rounded-md text-white bg-indigo-500 hover:bg-indigo-400 hover:scale-95 transition-all aspect-square w-[10%]'
                    onClick={() => handleEditCard(card)}
                >
                    EDIT
                </button>
            </div>
        </div>
    );
};

export default FlashcardListing;

