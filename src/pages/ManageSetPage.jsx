import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardSetDetails } from '../api/set-api.js';
import FlashcardListing from '../components/FlashcardListing.jsx';

const ManageSetPage = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [message, setMessage] = useState('');

    const { id } = useParams();

    useEffect(() => {
        fetchCardSetDetails(id)
    }, [id]);

    const fetchCardSetDetails = async (id) => {
        const response = await getCardSetDetails(id);

        if (response.success) {
            setFlashcards(response.data.flashcards);
            setTitle(response.data.flashcard_set.title);
            setDescription(response.data.flashcard_set.description);

            response.data.flashcards.length > 0 || setMessage('This flashcard set is empty 😥');
        } else {
            // Error
        }
    }

    const btnClasses = 'px-4 p-2 rounded-md transition-all hover:scale-105 hover:bg-indigo-300 text-indigo-950 bg-indigo-200'

    return (
        <main className='my-10'>
            <section className='relative bg-indigo-700 rounded-md pb-1'>

                <div className='m-10 p-4 text-white'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3'>
                        {title}
                    </h1>
                    <h2 className='text-lg sm:text-xl md:text-2xl mb-3'>
                        {description}
                    </h2>

                    <div className='absolute right-14 top-5 flex flex-row space-x-4'>
                        <button className={btnClasses}>
                            ADD
                        </button>
                        <button className={btnClasses}>
                            EDIT
                        </button>
                        <Link
                            to={`/play/${id}`}
                            className={btnClasses}
                        >
                            PLAY
                        </Link>
                    </div>

                    <div className="border-b-2 border-white my-4"></div>

                    {message ?
                        <div className='mt-20 flex flex-col items-center justify-center'>
                            <h1 className='text-2xl text-white font-bold mb-6'>
                                {message}
                            </h1>
                        </div> : ''
                    }

                    <ul className='flex flex-col items-center mx-auto gap-5'>
                        {flashcards.map((card) => ( <FlashcardListing card={card} key={card.id}/>))}
                    </ul>

                </div>
            </section>
        </main>

    );
};

export default ManageSetPage;

