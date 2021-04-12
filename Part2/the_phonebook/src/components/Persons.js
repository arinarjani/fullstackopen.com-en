import React from 'react';

const Person = ({ name, number, id, removePerson }) => {
    return (
        <div>
            <p>{name} {number} <button onClick={() => removePerson(id)}>delete</button></p>
        </div>
    )
}

export default Person;