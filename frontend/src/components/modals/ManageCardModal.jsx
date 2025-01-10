import { useState } from "react";
import BaseModal from "./BaseModal";
import { postFlashcard, putFlashcard, deleteFlashcard } from "../../api/flashcard-api";

function ManageCardModal({ selectedCard, setIsOpen }) {
    // Edit or create
    const isEdit = selectedCard.id !== 0;
    const [card, setCard] = useState(selectedCard);

    const inputClasses = 'block w-full mb-2 p-2 rounded-md border border-gray-300';

    const handleCreate = async () => {
        const response = await postFlashcard(card);
        setIsOpen(false);
    };

    const handleEdit = async () => {
        const response = await putFlashcard(card);
        setIsOpen(false);
    };

    const handleDelete = async () => {
        const response = await deleteFlashcard(card.id);
        setIsOpen(false);
    };

    return (
        <BaseModal
            saveFunc={isEdit ? () => handleEdit() : () => handleCreate()}
            deleteFunc={isEdit ? () => handleDelete() : null}
            includeDelete={isEdit}
            setIsOpen={setIsOpen}
            title={isEdit ? 'Edit Card' : 'Create New Flashcard'}
        >
            <input
                type='text'
                name='question'
                placeholder='Question'
                value={card.question}
                onChange={(e) => setCard((c) => ({ ...c, 'question': e.target.value }))}
                className={inputClasses}
            />
            <input
                type='text'
                name='answer'
                placeholder='Answer'
                value={card.answer}
                onChange={(e) => setCard((c) => ({ ...c, 'answer': e.target.value }))}
                className={inputClasses}
            />
        </BaseModal>
    );
}

export default ManageCardModal;