import React from 'react'

const Login = ( { handleLogin, username, setUsername, password, setPassword } ) => {
    return (
    //     <form onSubmit={handleLogin}>
    //         <div>
    //             username
    //             <input
    //             type="text"
    //             value={username}
    //             name="Username"
    //             onChange={({ target }) => setUsername(target.value)}
    //         />
    //         </div>
    //         <div>
    //             password
    //             <input
    //             type="password"
    //             value={password}
    //             name="Password"
    //             onChange={({ target }) => setPassword(target.value)}
    //         />
    //         </div>
    //         <button type="submit">login</button>
    //   </form>

    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">Username: </label>
            <input 
                type="text" 
                value={username} 
                name="username" 
                id="username" 
                required
                onChange={({target}) => setUsername(target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input 
                type="password" 
                value={password} 
                name="password" 
                id="password" 
                required
                onChange={({target}) => setPassword(target.value)}
            ></input>
        </div>
        <div>
            <input type="submit" value="Login"></input>
        </div>
    </form>
    )
}

export default Login
