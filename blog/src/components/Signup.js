import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/contants'
import { useAuth } from '../utils/auth';


function Signup() {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        errors: {
            username: '',
            email: '',
            password: ''
        }
    });
    const [signError, setSignError] = useState('')
    const navigate = useNavigate()
    const auth = useAuth()
    let errArray




    const handleChange = ({ target }) => {
        let { value, name } = target
        let errors = state.errors

        switch (name) {
            case 'username':
                errors.username = value.length < 6 ? 'Username should be at-least 6 characters long' : ''
                break;
            case 'email':
                errors.email = !value.includes('@') ? 'Email does not contain @' : ''
                break;
            case 'password':
                var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/

                errors.password = value.length < 6 ? 'Password should be at-least 6 characters' :
                    !re.test(value) ? 'Password must contain a letter and a number' : ''

                break;
            default:
                return errors
        }
        setState((preState) => ({ ...preState, [name]: value, errors }))
    }

    const handleRegister = (e) => {


        e.preventDefault();


        if (state.email === '' && state.username === '' && state.password === '') {
            return alert('Please fill the form')
        }

        registerUser(setSignError, auth, state, navigate)
    }

    if (typeof signError === 'object') {
        errArray = Object.keys(signError)
    }


    return (
        <div>
            <h2>Sign up</h2>
            <Link to={'/login'}>Have an account?</Link>
            <ul>
                {
                    typeof signError === 'object' ?
                        errArray.map((err) => <li key={err}>{err + ' ' + signError[err]}</li>) :
                        <li>{signError}</li>
                }
            </ul>
            <form onSubmit={handleRegister}>
                <input
                    value={state.username}
                    type='text'
                    name='username'
                    placeholder='Your username'

                    onChange={handleChange}
                />
                <br />
                <span>{state.errors.username}</span>
                <br />

                <input
                    value={state.email}
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleChange} />
                <br />
                <span>{state.errors.email}</span>
                <br />


                <input
                    value={state.password}
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                />
                <span>{state.errors.password}</span>
                <br />
                <div>
                    {/* <input
                        type='submit'
                        value={<Spinner/>}
                   
                    /> */}

                    <button
                        type='submit'
                        disabled={state.errors.email || state.errors.username || state.errors.password}
                    >
                        Signup
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup

