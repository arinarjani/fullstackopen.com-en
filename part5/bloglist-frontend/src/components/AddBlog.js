import React from 'react'

const AddBlog = ( {handleNewBlogTitle, newBlogTitle, setNewBlogTitle} ) => {
    return (
        <form onSubmit={handleNewBlogTitle}>
            <div>
                <label htmlFor="addBlog">add a new blog</label>
                <br />
                <input 
                    id="addBlog" 
                    type="text"
                    value={newBlogTitle}
                    onChange={ ({target}) => setNewBlogTitle(target.value) }
                ></input>
            </div>
            <button type="submit">submit blog post</button>
        </form>
    )
}

export default AddBlog