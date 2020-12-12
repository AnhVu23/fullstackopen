import React, {useState, useEffect} from 'react'
import Blog from './Blog'
const BlogCreate = ({
    onLogin
}) => {
    const [blogForm, setLoginForm] = useState({
        title: '',
        author: '',
        url: ''
    })

    const onInputChange = e => {
        setLoginForm({...blogForm, [e.target.name]: e.target.value})
    }

    const onFormSubmit = async e => {
        e.preventDefault()
        onLogin({...blogForm})
    }
    
    return (
        <form onSubmit={onFormSubmit}>
            <h2>create new</h2>
            <div>
                <span>username</span>
                <input value={blogForm.title} name='title' onChange={onInputChange}/>
            </div>
            <div>
                <span>password</span>
                <input value={blogForm.author} name='author' onChange={onInputChange}/>
            </div>
            <div>
                <span>url</span>
                <input value={blogForm.url} name='url' onChange={onInputChange}/>
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogCreate