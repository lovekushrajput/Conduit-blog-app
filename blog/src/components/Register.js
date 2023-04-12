import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerURL } from '../utils/contants'


function Register() {
    let [usersInfo, setUsersInfo] = useState({ user: {} })

    const handleChange = ({ target }) => {
        let { value, name } = target

        setUsersInfo((preState) => ({
            user: { ...preState.user, [name]: value }
        }))
    }

    const handleRegister = (e) => {
        e.preventDefault();

        let params = {
            method: 'post',
            body: JSON.stringify(usersInfo)
        }

        fetch(registerURL, params)
            .then(res => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err, 'hello'))
    }


    return (
        <div>
            <h2>Sign up</h2>
            <Link to={'/login'}>Have an account?</Link>
            <form onSubmit={handleRegister}>
                <input type='text' name='username' placeholder='Your username' required onChange={handleChange} />
                <br />
                <input type='email' name='email' placeholder='Email' required onChange={handleChange} />
                <br />
                <input type='password' name='password' placeholder='Password' required onChange={handleChange} />
                <div>
                    <input type='submit' value={'Sign up'} />
                </div>
            </form>
        </div>
    )
}

export default Register

