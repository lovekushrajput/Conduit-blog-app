import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <h2>Sign in</h2>
            <Link to={'/register'}>Need an account?</Link>
            <form>
                <input type='email' placeholder='Email'  required/>
                <br />
                <input type='password' placeholder='Password' required/>
                <div>
                    <input type='submit' value={'Sign up'} />
                </div>
            </form>
        </div>
    )
}


export default Login