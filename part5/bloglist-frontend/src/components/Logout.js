<<<<<<< HEAD
import React from 'react';

const Logout = ( {logOut} ) => {
    return (
        <button onClick={logOut}>logout</button>
=======
import React from 'react'

const Logout = ( {handleLogout} ) => {
    return (
        <>
            <button onClick={handleLogout}>logOut</button>
        </>
>>>>>>> 52855bb09e4a1eeeab55c545f55630c25783f85d
    )
}

export default Logout;