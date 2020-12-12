import React, {useState, useEffect} from 'react'
const Login = ({
    onLogin
}) => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const onInputChange = e => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const onFormSubmit = async e => {
        e.preventDefault()
        onLogin({...loginForm})
    }
    
    return (
        <form onSubmit={onFormSubmit}>
            <h2>login to application</h2>
            <div>
                <span>username</span>
                <input value={loginForm.username} name='username' onChange={onInputChange}/>
            </div>
            <div>
                <span>password</span>
                <input value={loginForm.password} name='password' onChange={onInputChange}/>
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login