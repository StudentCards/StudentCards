import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardSetDetails } from '../api/set-api.js';
import FlashcardListing from '../components/FlashcardListing.jsx';
import ManageCardModal from '../components/modals/ManageCardModal.jsx';
import ManageSetModal from '../components/modals/ManageSetModal.jsx';

const ViewSetPage = () => {
    const { id } = useParams();

    const emptyCard = { 'id': 0, 'question': '', 'answer': '', 'flashcard_set': id };
    const emptySetData = { 'id': 0, 'title': '', 'description': '', 'is_public': false };

    const [cardSetData, setCardSetData] = useState(emptySetData);
    const [isOwner, setIsOwner] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedCard, setSelectedCard] = useState(emptyCard);

    const [isCardSetModalOpen, setIsCardSetModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    // Fetch at start, fetch after edit/create/delete
    useEffect(() => {
        if (isCardModalOpen === false) {
            fetchCardSetDetails(id)
        }
    }, [id, isCardModalOpen, isCardSetModalOpen]);

    const fetchCardSetDetails = async (id) => {
        const response = await getCardSetDetails(id);

        if (response.success) {
            setFlashcards(response.data.flashcards);
            setCardSetData(response.data.flashcard_set);
            setIsOwner(response.data.is_owner);

            response.data.flashcards.length === 0 ? setMessage('This flashcard set is empty 😥') : setMessage('');
        } else {
            // Error
        }
    };

    const handleEditCardSet = () => {
        setIsCardSetModalOpen(true);
    };

    const handleCreateCard = () => {
        setSelectedCard(emptyCard);
        setIsCardModalOpen(true);
    };

    const handleEditCard = (card) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    }

    const btnClasses = 'text-sm md:text-base px-2 md:px-4 p-2 rounded-md transition-all hover:scale-105 hover:bg-indigo-300 text-indigo-950 bg-indigo-200'

    return (
        <main className='my-10'>
            {(isOwner && isCardModalOpen) &&
                <ManageCardModal selectedCard={selectedCard} setIsOpen={setIsCardModalOpen} />
            }

            {isCardSetModalOpen &&
                <ManageSetModal selectedSet={cardSetData} setIsOpen={setIsCardSetModalOpen} />
            }

            <section className='relative bg-indigo-700 rounded-md pb-1'>
                <div className='m-10 p-4 text-white'>
                    <div className='flex justify-between items-center my-2'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                            {cardSetData.title}
                        </h1>
                        <div className='flex flex-row md:space-x-4 space-x-2'>
                            {isOwner &&
                                [
                                    <button className={btnClasses} onClick={handleEditCardSet} key='EDIT'>
                                        EDIT
                                    </button>,
                                    <button className={btnClasses} onClick={handleCreateCard} key='ADD'>
                                        ADD
                                    </button>
                                ]
                            }
                            <Link
                                to={`/play/${id}`}
                                className={btnClasses}
                            >
                                PLAY
                            </Link>
                        </div>
                    </div>

                    <h2 className='text-lg sm:text-xl md:text-2xl mb-3'>
                        {cardSetData.description}
                    </h2>

                    <div className="border-b-2 border-white my-4"></div>

                    {message ?
                        <div className='mt-20 flex flex-col items-center justify-center gap-  mb-6'>
                            <h1 className='text-2xl text-white font-bold'>
                                {message}
                            </h1>
                            <p className='text-lg text-white'>Press the "ADD" button to create new cards</p>
                        </div> : ''
                    }

                    <ul className='flex flex-col items-center mx-auto gap-5'>
                        {flashcards.map((card) => (<FlashcardListing card={card} key={card.id} editCardFunc={handleEditCard} isOwner={isOwner} />))}
                    </ul>

                </div>
            </section>
        </main>

    );
};

export default ViewSetPage;

