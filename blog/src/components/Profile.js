import { Link, useParams } from "react-router-dom"
import { useAuth } from "../utils/auth"
import ProfileFeednav from "./ProfileTabs"
import { useEffect, useState } from "react"
import { ROOT_URL, articlesURL } from "../utils/contants"
import Posts from "./Posts"
import Pagination from "./Pagination"

export default function Profile() {
    const auth = useAuth()
    const [profile, setProfile] = useState(null)
    const [data, setData] = useState({ 'limit': 10, 'offset': 0 })
    const [activeTab, setActiveTab] = useState('author')
    const { username } = useParams()


    useEffect(() => {
        fetch(ROOT_URL + 'profiles/' + username, {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + `${auth.user ? auth.user.token : ''}`
            }
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((error) => {
                    return Promise.reject(error)
                })
            }
            return res.json()
        })
            .then(({ profile }) => setProfile({ ...profile }))
            .catch((error) => console.log(error.message || JSON.stringify(error)))
    }, [])

    useEffect(() => {
        fetch(`${articlesURL + '?offset=' + data.offset + '&limit=' + data.limit}${`&${activeTab}=` + username}`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${auth.user ? auth.user.token : ''}`
                }
            })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        return Promise.reject(error)
                    })
                }
                return res.json()
            })
            .then((newData) => {
                setData({ ...data, ...newData })
            })
            .catch((error) => setData({ ...data, articlesErr: (error.message || JSON.stringify(error)) }))

        return () => setData({ ...data, articles: null })

    }, [activeTab])

    const handleTabs = ({ target }) => {
        setActiveTab(target.id)

    }

    const handlePagination = (page) => {
        const offset = (page - 1) * 10
        setData({ ...data, offset: offset })
    }



    const ProfileBanner = () => {
        return (
            <div className="hero--profile flex flex-column align-center">
                {profile &&

                    <>
                        <img className="img-sm" src={profile.image} alt={profile.username} />
                        <h2 >{profile.username}</h2>
                        <p >{profile.bio}</p>
                        {
                            auth.user && auth.user.username === profile.username ?
                                <Link to={'/settings'} className="tags--btn margin-top-1">Edit Profile Settings</Link>
                                :
                                <Link
                                    to={'/profile/' + profile.username}
                                    className="tags--btn margin-top-1"

                                >{profile.following ? 'Unfollow ' + profile.username : 'Follow ' + profile.username}</Link>
                        }
                    </>
                }
            </div>
        )
    }

    return (
        <div>
            <ProfileBanner />
            <div className="container">
                <ProfileFeednav handleTabs={handleTabs} activeTab={activeTab} />
                <Posts articles={data.articles} error={data.articlesErr} />
                <Pagination data={data} handlePagination={handlePagination} />
            </div>
        </div>
    )
}
