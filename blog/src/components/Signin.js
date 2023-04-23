import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../utils/contants';
import { useAuth } from '../utils/auth';
import Footer from './Footer';


function Signin() {
    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        }
    });

    const auth = useAuth()
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        const { value, name } = target
        const errors = state.errors

        switch (name) {
            case 'email':
                errors.email = !value.includes('@') ? 'email does not contain @' : ''
                break;
            case 'password':
                var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/

                errors.password = value.length < 6 ? 'password should be at-least 6 characters' :
                    !re.test(value) ? 'password must contain a letter and a number' : ''

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

        loginUser(state, auth, navigate, setState)
    }


    return (
        <>
            <div className='flex flex-col items-center max-[520px]:px-2'>
                <h2 className='text-4xl text max-[520px]:text-2xl mt-3'>Sign in</h2>
                <Link to={'/register'} className='text-primary-100 hover:text-primary-200 hover:underline my-2 text-sm'>Need an account?</Link>

                <form onSubmit={handleSubmit} className='flex flex-col w-2/5 max-[520px]:w-full'>
                    <ul className='ml-8 mb-6 mt-3'>
                        {state.errors.email && <li className={'list-disc text-red-700 font-semibold'}>{state.errors.email}</li>}
                        {state.errors.password && <li className={'list-disc text-red-700 font-semibold'}>{state.errors.password}</li>}
                        {state.fetchErr && <li className={'list-disc text-red-700 font-semibold'}>{state.fetchErr}</li>}
                    </ul>
                    <input
                        type='email'
                        placeholder='Email'
                        value={state.email}
                        onChange={handleChange}
                        name='email'
                        className='border border-secondary-100 rounded w-full py-2 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        value={state.password}
                        onChange={handleChange}
                        name='password'
                        className='border border-secondary-100 rounded w-full py-2 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'

                    />
                    <div className='w-full flex justify-end'>
                        <button
                            type='submit'
                            disabled={state.errors.email || state.errors.password}
                            className='bg-primary-100 text-white rounded hover:bg-primary-200 py-2 px-4 text-lg outline-[#66afe9] disabled:opacity-50'
                        >
                            Sign in
                        </button>
                    </div>

                </form>

            </div>

            <div className='absolute bottom-0 w-full'>
                <Footer />
            </div>
        </>
    )
}


export default Signin