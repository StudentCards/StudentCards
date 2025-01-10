const FlashcardListing = ({ card, editCardFunc, isOwner }) => {

    const handleEditCard = (card) => {
        editCardFunc(card);
    };

    const parentWidthClass = isOwner ? 'w-[90%]' : 'w-full'; 
    const childWidthClass = isOwner ? 'w-[95%]' : 'w-full'; 

    return (
        <div className="md:w-[80%] w-full h-full p-4 rounded-md bg-indigo-100 text-black">
            <div className='flex w-full items-center'>
                <div className={`flex flex-col justify-center text-md md:text-lg font-medium ${parentWidthClass}`}>
                    <p className={childWidthClass}> {card.question} </p>
                    <div className={`border-b-2 border-black justif-left ${childWidthClass}`}></div>
                    <p className={childWidthClass}> {card.answer} </p>
                </div>
                {isOwner &&
                    <button
                        className='w-min px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-400 hover:scale-95 transition-all aspect-square w-[10%]'
                        onClick={() => handleEditCard(card)}
                    >
                        EDIT
                    </button>
                }
            </div>
        </div>
    );
};

export default FlashcardListing;

