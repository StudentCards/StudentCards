import { React } from 'react';

const BaseModal = ({ saveFunc, deleteFunc, includeDelete = false, setIsOpen, title, children }) => {
    const buttonClasses = 'px-4 py-2 rounded-md transition-all hover:scale-105';
    const saveButtonClasses = 'hover:bg-green-300 text-green-950 bg-green-200';
    const cancelButtonClasses = 'hover:bg-yellow-300 text-yellow-950 bg-yellow-200';
    const deleteButtonClasses = 'hover:bg-red-300 text-red-950 bg-red-200';

    const handleSave = (e) => {
        e.preventDefault();
        saveFunc();
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteFunc();
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white text-black p-6 rounded-lg shadow-lg w-96'>
                <h2 className='text-xl font-bold text-indigo-700 mb-4'> {title} </h2>
                <form>
                    {children}

                    <div className='flex justify-end gap-2'>
                        {includeDelete &&
                            <button
                                type='button'
                                onClick={handleDelete}
                                className={`${buttonClasses} ${deleteButtonClasses}`}
                            >
                                Delete
                            </button>
                        }
                        <button
                            type='button'
                            onClick={() => setIsOpen(false)}
                            className={`${buttonClasses} ${cancelButtonClasses}`}
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            onClick={handleSave}
                            className={`${buttonClasses} ${saveButtonClasses}`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BaseModal;