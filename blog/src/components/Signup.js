import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/contants'
import { useAuth } from '../utils/auth';
import Footer from './Footer';


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
    const navigate = useNavigate()
    const auth = useAuth()


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

        registerUser(auth, state, navigate, setState)
    }

    return (
        <>
            <div className='flex flex-col items-center'>
                <h2 className='text-4xl'>Sign up</h2>
                <Link to={'/login'} className='text-primary-100 hover:text-primary-200 hover:underline my-2 text-sm'>Have an account?</Link>
                <ul className='ml-8 mb-6 mt-3'>
                    {state.errors.username && <li className={'list-disc text-red-700 font-semibold'}>{state.errors.username}</li>}
                    {state.errors.email && <li className={'list-disc text-red-700 font-semibold'}>{state.errors.email}</li>}
                    {state.errors.password && <li className={'list-disc text-red-700 font-semibold'}>{state.errors.password}</li>}
                    {state.networkErr && <li className={'list-disc text-red-700 font-semibold'}>{state.networkErr}</li>}
                </ul>


                <form onSubmit={handleRegister}
                    className='flex flex-col w-2/5'>
                    <input
                        value={state.username}
                        type='text'
                        name='username'
                        placeholder='Your username'
                        onChange={handleChange}
                        className='border border-secondary-100 rounded w-full py-2 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'
                    />

                    <input
                        value={state.email}
                        type='email'
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                        className='border border-secondary-100 rounded w-full py-2 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'
                    />

                    <input
                        value={state.password}
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        className='border border-secondary-100 rounded w-full py-2 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'
                    />


                    <div className='w-full flex justify-end'>
                        <button
                            type='submit'
                            disabled={state.errors.email || state.errors.username || state.errors.password}
                            className='bg-primary-100 text-white rounded hover:bg-primary-200 py-2 px-4 text-lg outline-[#66afe9] disabled:opacity-50'
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>

            <div className='absolute bottom-0 w-full'>
                <Footer/>
            </div>
        </>
    )
}

export default Signup

