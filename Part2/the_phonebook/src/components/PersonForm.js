import React from 'react';

const PersonForm = ({ 
    addNewName, 
    newName, 
    handleNameChange,
    newNumber, 
    handleNumberChange
}) => {
    return (
        <div>
            <form onSubmit={addNewName}>
                <div>
                <label>
                    name: <input value={newName} onChange={handleNameChange} />
                </label>
                </div>
                <div>
                <label>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </label>
                </div>
                <button type="submit">add new name</button>
            </form>
        </div>
    )
}

export default PersonForm;