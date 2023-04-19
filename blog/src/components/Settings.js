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
    const [error, setError] = useState(null)


    const handleChange = ({ target }) => {
        const { name, value } = target
        setUser({ ...user, [name]: value })

        setError(null)
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
                console.log(updatedUser,'user')
                navigate('/')
            })
            .catch((error) => setError(error.message || JSON.stringify(error)))

    }

    return (
        <div>
            <legend>Your Settings</legend>

            {error && <p className="active">{error}</p>}
            <form  onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="image"
                    value={user.image}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name='username'
                    value={user.username}
                    onChange={handleChange}
                    required
                />

                <br />
                <textarea
                    name="bio" id="" cols="30" rows="10"
                    onChange={handleChange}
                    value={user.bio}
                >
                </textarea>

                <br />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required />

                <br />
                <input
                    type="type"
                    name="password"
                    value={user.password}
                    placeholder="New password"
                    onChange={handleChange}
                />

                <br />
                <button type="submit">Update Setting</button>


            </form>



        </div>
    )
}

export default Settings