import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../utils/contants';
import { useAuth } from '../utils/auth';


function Signin() {
    const [state, setState] = useState({
        email: 'mamaji123@gmail.com',
        password: 'mamaji1234',
        errors: {
            email: '',
            password: ''
        }
    });

    const [signError, setSignError] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        const { value, name } = target
        const errors = state.errors

        switch (name) {
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

        setState(prevState => ({ ...prevState, [name]: value, errors }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (state.email === '' || state.password === '') {
            alert('Please fill the form')
        }

        loginUser(setSignError, state, auth, navigate)
    }


    return (
        <div>
            <legend>Sign in</legend>
            <Link to={'/register'}>Need an account?</Link>
            {<p className='active'>{signError}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    value={state.email}
                    onChange={handleChange}
                    name='email'
                />

                <br />
                <span>{state.errors.email}</span>

                <br />
                <input
                    type='password'
                    placeholder='Password'
                    value={state.password}
                    onChange={handleChange}
                    name='password'
                />
                <br />
                <span>{state.errors.password}</span>

                <br />
                <div>
                    <input
                        type='submit'
                        value={'Signin'}
                        disabled={state.errors.email || state.errors.password}
                    />
                </div>
            </form>
        </div>
    )
}


export default Signin