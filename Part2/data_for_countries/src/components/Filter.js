import React from 'react';

const Filter = ({ filter, handleFilterChange, personal_label }) => {
    return (
        <div>
            <label>
            {personal_label}: <input value={filter} onChange={handleFilterChange} />
            </label>
        </div>
    )
}

export default Filter;