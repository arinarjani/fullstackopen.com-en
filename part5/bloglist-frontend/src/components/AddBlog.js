import React from 'react'

const AddBlog = ( {handleNewBlog, newBlog, setNewBlog} ) => {
    return (
        <form onSubmit={handleNewBlog}>
            <div>
                <label htmlFor="addBlog">add a new blog</label>
                <br />
                <input 
                    id="addBlog" 
                    type="text"
                    value={newBlog}
                    onChange={ ({target}) => setNewBlog(target.value) }
                ></input>
            </div>
            <button type="submit">submit blog post</button>
        </form>
    )
}

export default AddBlog