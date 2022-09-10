import React from 'react'

const Logout = ( {handleLogout} ) => {
    return (
        <>
            <button onClick={handleLogout}>logOut</button>
        </>
    )
}

export default Logout;