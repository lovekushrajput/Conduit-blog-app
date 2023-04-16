import { Link } from "react-router-dom"
import { useAuth } from "../utils/auth"


function FeedNav({ activeTab, removeTab, loginActiveTab }) {
    const auth = useAuth()

    return (
        <nav>
            <ul className={activeTab || auth.user ? 'flex' : ''} style={{ marginTop: '1rem' }}>
                {
                    auth.user &&
                    <li>
                        <Link to={'/'}
                            className={loginActiveTab === auth.user.username || loginActiveTab === 'yourFeed' ? 'active' : 'cursor'}
                            onClick={() => removeTab('yourFeed')}
                        >
                            Your Feed
                        </Link >
                    </li >

                }

                <li>
                    <Link to={'/'} style={{ marginLeft: '1rem' }} className={auth.user ? (loginActiveTab === 'global' ? 'active' : 'cursor') : (activeTab === '' ? 'active' : 'cursor')} onClick={() => removeTab('global')}>
                        Global feed
                    </Link>
                </li>



                <li>
                    {
                        activeTab &&
                        <Link to={'/'} style={{ marginLeft: '1rem' }} className={'active'}>
                            # {activeTab}
                        </Link>
                    }
                </li>

            </ul>
        </nav>
    )
}

export default FeedNav