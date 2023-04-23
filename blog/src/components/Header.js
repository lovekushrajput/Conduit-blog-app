import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../utils/auth"
import { FaEdit } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'


function Header() {
    const auth = useAuth()


    return (
        <header className='container py-0  px-10 my-0 max-[520px]:px-2   mx-auto'>
            <ul className='flex justify-between sm:p-4 md:p-4 lg:p-4  max-[520px]:flex-col  max-[520px]:items-center'>
                <Link to={'/'}  >
                    <h1 className='text-primary-100 text-2xl font-bold'>
                        Conduit
                    </h1>
                </Link>
                <nav className='flex  items-center max-[520px]:mt-3  max-[520px]:w-full    max-[520px]:justify-between'>

                    {

                        auth.user && auth.user.token ? <Authenticated /> : <Unauthenticated />
                    }
                </nav>
            </ul>
        </header>
    )
}




function Authenticated() {
    const auth = useAuth()

    return (
        <>
            <NavLink to={'/'} className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')}>
                <li className='hover:text-secondary-200 lg:mr-8 md:mr-6 sm:mr-4'>Home</li>
            </NavLink >

            <NavLink to={'/editor'} className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')}>
                <li className='flex items-center hover:text-secondary-200 lg:mr-8 md:mr-6 sm:mr-4'>
                    <FaEdit className='lg:mr-1' />
                    <span> New Post</span>
                </li>
            </NavLink>

            <NavLink to={'/settings'} className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')} >
                <li className={'flex items-center hover:text-secondary-200 lg:mr-8 md:mr-6 sm:mr-4'}>
                    <IoIosSettings className='lg:mr-1' />
                    <span> Settings</span>
                </li>
            </NavLink>


            <NavLink to={'/profile/' + auth.user.username} className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')}  >
                <li className='flex items-center hover:text-secondary-200'>
                    <img src={auth.user.image} alt={auth.user.username} className='rounded-full lg:h-8 lg:w-8 lg:mr-1 md:h-8 md:w-8 md:mr-1 sm:h-8 sm:w-8 sm:mr-1 max-[520px]:h-6 max-[520px]:w-6' />
                    <span> {auth.user.username} </span>
                </li>
            </NavLink>

        </>
    )
}

function Unauthenticated() {
    return (
        <>
            < NavLink className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')} to="/">
                <li className='hover:text-secondary-200 mr-8'>Home</li>
            </NavLink>
            < NavLink className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')} to="/login">
                <li className='hover:text-secondary-200 mr-8'>Sign in</li>
            </NavLink>
            < NavLink className={(({ isActive }) => isActive ? 'text-secondary-200 !important' : 'text-secondary-100')} to="/register">
                <li className='hover:text-secondary-200 mr-8'>Sign up</li>
            </NavLink>
        </>
    )
}

export default Header