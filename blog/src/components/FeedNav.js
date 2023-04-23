import { Link } from "react-router-dom"
import { useAuth } from "../utils/auth"
import { FiHash } from 'react-icons/fi'

function FeedNav({ activeTab, addTab }) {
    const auth = useAuth()

    return (
        <nav className="mt-10">
            <ul className={activeTab || auth.user ? 'flex' : ''}>
                {
                    auth.user &&
                    <li>
                        <Link to={'/'}
                            className={activeTab === auth.user.username ? 'text-primary-100 border-b-2 border-primary-100 px-3 pb-2' : 'text-secondary-100 px-3'}
                            onClick={() => addTab(auth.user.username)}
                        >
                            Your Feed
                        </Link >
                    </li >

                }

                <li>
                    <Link to={'/'}
                        className={activeTab === '' ? 'text-primary-100 border-b-2 border-primary-100 pb-2 ml-8 px-3' : 'ml-8 text-secondary-100   px-3'}
                        onClick={() => addTab('')
                        }
                    >
                        Global feed
                    </Link>
                </li>



                <li>
                    {
                        auth.user ?
                            activeTab !== '' &&
                            activeTab !== auth.user.username &&
                            <Link to={'/'}
                                className={
                                    activeTab !== '' && activeTab !== auth.user.username ? 'text-primary-100 ml-8 flex border-b-2 border-primary-100 px-3 pb-2' : ''
                                }>

                                <FiHash className="font-bold text-xl" />
                                <span>
                                    {activeTab}
                                </span>
                            </Link>
                            :
                            activeTab !== '' &&
                            <Link to={'/'} className={activeTab !== '' ? 'flex text-primary-100 ml-8  border-b-2 border-primary-100 px-3 pb-2' : ''}>

                                <FiHash className="font-bold text-xl" />
                                <span>
                                    {activeTab}
                                </span>
                            </Link>
                    }
                </li>
            </ul>
            <hr className={auth.user && activeTab === auth.user.username || activeTab === '' ? 'mt-2' : ''} />
        </nav>
    )
}

export default FeedNav