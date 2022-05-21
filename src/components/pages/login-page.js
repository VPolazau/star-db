import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate()
    return (
        <div className='jimbotron'>
            <p>Login to see secret page!</p>
            <button
                className='btn btn-primary'
                onClick={() => {
                    onLogin()
                    navigate(-1)
                }}
            >
                Login
            </button>
        </div>
    )
}

export default LoginPage
