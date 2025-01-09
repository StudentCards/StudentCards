import { useState } from "react";
import BaseModal from "./BaseModal";
import { postCardSet, putCardSet, deleteCardSet } from "../../api/set-api";
import { useNavigate } from "react-router-dom";

function ManageSetModal({ selectedSet, setIsOpen }) {
    // Edit or create
    const isEdit = selectedSet.id !== 0;
    const [cardSet, setCardSet] = useState(selectedSet);
    const navigate = useNavigate();

    const inputClasses = 'block w-full mb-2 p-2 rounded-md border border-gray-300';

    const handleCreate = async () => {
        const response = await postCardSet(cardSet, true);
        setIsOpen(false);
        navigate(`/sets/${response.data.id}`);
    };

    const handleEdit = async () => {
        const response = await putCardSet(cardSet);
        setIsOpen(false);
    };

    const handleDelete = async () => {
        const response = await deleteCardSet(cardSet.id);
        navigate('/sets')
    };

    return (
        <BaseModal
            saveFunc={isEdit ? () => handleEdit() : () => handleCreate()}
            deleteFunc={isEdit ? () => handleDelete() : null}
            includeDelete={isEdit}
            setIsOpen={setIsOpen}
            title={isEdit ? 'Edit Card Set' : 'Create New Card Set'}
        >
            <input
                type='text'
                name='title'
                placeholder='Title'
                value={cardSet.title}
                onChange={(e) => setCardSet((c) => ({ ...c, 'title': e.target.value }))}
                className={inputClasses}
            />
            <textarea
                name='description'
                placeholder='Description'
                value={cardSet.description}
                onChange={(e) => setCardSet((c) => ({ ...c, 'description': e.target.value }))}
                className={inputClasses}
            />
            <div className="flex justify-between items-center gap-5 w-full mb-2">
                <label htmlFor="options" className="p-2" >Visibility:</label>
                <select
                    id="option"
                    className="p-2 rounded-md border border-gray-300 w-4/5"
                    value={cardSet.is_public ? 'Public' : 'Private'}
                    onChange={(e) => setCardSet((c) => ({ ...c, is_public: e.target.value === 'Public' }))}
                >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                </select>
            </div>
        </BaseModal>
    );
}

export default ManageSetModal;