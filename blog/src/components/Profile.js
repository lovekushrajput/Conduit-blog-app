import { Link, useParams } from "react-router-dom"
import { useAuth } from "../utils/auth"
import ProfileFeednav from "./ProfileTabs"
import { useEffect, useState } from "react"
import { ROOT_URL, articlesURL } from "../utils/contants"
import Posts from "./Posts"
import Pagination from "./Pagination"
import { IoIosSettings } from "react-icons/io"
import { FaPlus } from "react-icons/fa"

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


    const handleToggle = () => {

        fetch(ROOT_URL + 'profiles/' + username + '/follow', {
            method: `${profile.following ? 'DELETE' : 'POST'}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + `${auth.user ? auth.user.token : ''}`
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
            .then(({ profile }) => {
                setProfile(({ ...profile }))
            })
            .catch(error => console.log(error.message || JSON.stringify(error)))
    }


    const ProfileBanner = () => {
        return (
            <div className="flex flex-col items-center bg-secondary-100 py-14">
                {profile &&

                    <>
                        <img className='h-24 w-24 rounded-full' src={profile.image} alt={profile.username} />
                        <h2 className="font-bold text-2xl my-2">{profile.username}</h2>
                        <p className="text-secondary-100">{profile.bio}</p>
                        <div className='w-2/3'>
                            <div className="flex justify-end max-[520px]:flex-col max-[520px]:items-center">

                                {
                                    auth.user && auth.user.username === profile.username ?
                                        <Link to={'/settings'} className="border border-secondary-100 py-1 px-3 max-[520px]:px-1 text-sm  text-secondary-100 rounded flex items-center">
                                            <IoIosSettings className='mr-1' />
                                            <span>Edit Profile Settings</span>
                                        </Link>
                                        :
                                        <Link
                                            to={'/profile/' + profile.username}
                                            className="border border-secondary-100 py-1 px-3 max-[520px]:px-1text-sm text-secondary-100 rounded flex items-center"
                                            onClick={handleToggle}
                                        >
                                            <FaPlus className='mr-1' />
                                            <span>
                                                {profile.following ? 'Unfollow ' + profile.username : 'Follow ' + profile.username}
                                            </span>
                                        </Link>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

    return (
        <div>
            <ProfileBanner />
            <div className="flex justify-center my-10 max-[520px]:px-2">
                <div className='w-2/3 max-[520px]:w-full'>
                    <ProfileFeednav handleTabs={handleTabs} activeTab={activeTab} />
                    <Posts articles={data.articles} error={data.articlesErr} />
                    <Pagination data={data} handlePagination={handlePagination} />
                </div>
            </div>
        </div>
    )
}
