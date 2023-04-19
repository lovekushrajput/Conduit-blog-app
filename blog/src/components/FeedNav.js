import { Link } from "react-router-dom"
import { useAuth } from "../utils/auth"


function FeedNav({ activeTab, addTab }) {
    const auth = useAuth()

    return (
        <nav>
            <ul className={activeTab || auth.user ? 'flex' : ''} style={{ marginTop: '1rem' }}>
                {
                    auth.user &&
                    <li>
                        <Link to={'/'}
                            className={activeTab === auth.user.username ? 'active' : ''}
                            // className={loginActiveTab === auth.user.username || loginActiveTab === 'yourFeed' ? 'active' : 'cursor'}
                            onClick={() => addTab(auth.user.username)}
                        >
                            Your Feed
                        </Link >
                    </li >

                }

                <li>
                    <Link to={'/'} style={{ marginLeft: '1rem' }}
                        className={activeTab === '' ? 'active' : ''}
                        // className={auth.user ? (loginActiveTab === 'global' ? 'active' : 'cursor') : (activeTab === '' ? 'active' : 'cursor')}
                        onClick={() => addTab('')
                        }
                    >
                        Global feed
                    </Link>
                </li>



                <li>
                    {
                        // auth.user ? activeTab !== auth.user.username : ''
                        // activeTab !== auth.user && auth.user.username || activeTab !== '' &&
                        // <Link to={'/'} style={{ marginLeft: '1rem' }} className={activeTab !== '' && activeTab !== auth.user.username ? 'active' : ''}>
                        //     # {activeTab}
                        // </Link>
                        auth.user ?
                            activeTab !== '' &&
                            activeTab !== auth.user.username &&
                            <Link to={'/'} style={{ marginLeft: '1rem' }} className={activeTab !== '' && activeTab !== auth.user.username ? 'active' : ''}>
                                # {activeTab}
                            </Link>
                            :
                            activeTab !== '' &&
                            <Link to={'/'} style={{ marginLeft: '1rem' }} className={activeTab !== '' ? 'active' : ''}>
                                # {activeTab}
                            </Link>
                    }
                </li>

            </ul>
        </nav>
    )
}

export default FeedNav