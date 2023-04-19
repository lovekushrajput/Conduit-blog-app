import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../utils/auth"


function Header() {
    const navigate = useNavigate()
    const auth = useAuth()


    const handleLogout = () => {
        auth.logout()
        navigate('/', { replace: true })
    }



    return (
        <header>
            <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={'/'} className='brand'>Conduit</Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '30%' }}>

                    {

                        auth.user && auth.user.token ?
                            <>
                                <NavLink to={'/'} >Home</NavLink >
                                <NavLink to={'/editor'}>New post</NavLink>
                                <NavLink to={'/settings'}>Setting</NavLink>
                                <NavLink to={'/profile/' + auth.user.username}>{auth.user.username}</NavLink>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                            :
                            <>
                                <NavLink to={'/'} >Home</NavLink >
                                <NavLink to={'/login'} >Sign in</NavLink >
                                <NavLink to={'/register'} >Sign up</NavLink >
                            </>
                    }
                </div>
            </ul>
        </header>
    )
}

export default Header