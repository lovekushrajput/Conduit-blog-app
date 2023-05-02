import { useState } from "react";
import { useAuth } from "../utils/auth";
import { currentUserURL } from "../utils/contants";
import { useNavigate } from "react-router-dom";

function Settings() {
    const auth = useAuth()
    const navigate = useNavigate()
    const { username, image, bio, email } = auth.user
    const [user, setUser] = useState({
        username: username,
        image: image,
        bio: bio,
        email: email,
        password: ''
    })

    const handleChange = ({ target }) => {
        const { name, value } = target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(currentUserURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + auth.user.token
            },
            body: JSON.stringify({ user: user })
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        return Promise.reject(err)
                    })
                }
                return res.json()
            })
            .then((updatedUser) => {
                navigate('/')
            })
            .catch((error) => console.log(error.message || JSON.stringify(error)))

    }


    const handleLogout = () => {
        auth.logout()
        navigate('/', { replace: true })
    }

    return (
        <>
            <div className='flex flex-col items-center mb-10 max-[520px]:mx-2'>
                <h2 className='text-4xl max-[520px]:text-2xl mb-3'>Your Settings</h2>
                <form onSubmit={handleSubmit} className='flex flex-col  w-2/3 max-[520px]:w-full'>
                    <input
                        type="text"
                        name="image"
                        value={user.image}
                        onChange={handleChange}
                        className='border border-secondary-100 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'
                        required
                    />

                    <input
                        type="text"
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                        className='border border-secondary-300 rounded w-full py-3 pl-4 text-xl outline-[#66afe9] text-secondary-200 mb-4'

                        required
                    />

                    <textarea
                        name="bio" id="" cols="30" rows="7"
                        onChange={handleChange}
                        value={user.bio}
                        className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'

                    >
                    </textarea>


                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className='border border-secondary-300 rounded w-full py-3 pl-4 text-xl outline-[#66afe9] text-secondary-200 mb-4'

                        required />


                    <input
                        type="type"
                        name="password"
                        value={user.password}
                        placeholder="New password"
                        onChange={handleChange}
                        className='border border-secondary-300 rounded w-full py-3 pl-4 text-xl outline-[#66afe9] text-secondary-200 mb-4'

                    />

                    <div className='w-full flex justify-end'>
                        <button
                            type='submit'
                            className='bg-primary-100 text-white rounded hover:bg-primary-200 py-2 px-4 text-lg outline-[#66afe9] disabled:opacity-50 focus:opacity-70'
                        >
                            Update Setting
                        </button>
                    </div>


                    <hr className="my-4" />

                    {/* logout btn */}
                    <div  >
                        <button
                            onClick={handleLogout}
                            className='border border-[#B85C5C] text-[#B85C5C] rounded hover:bg-[#B85C5C] hover:text-white py-1 px-4 text-lg outline-[#66afe9] disabled:opacity-50 focus:opacity-70'
                        >
                            Or click here to logout
                        </button>
                    </div>
                </form>



            </div>

        </>
    )
}

export default Settings