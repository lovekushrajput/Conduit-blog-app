import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-secondary-100 py-6  w-full'>
            <div className='lg:container md:container py-0 px-10 mt-0 mb-0 mr-auto ml-auto max-[520px]:px-2'>
                <Link to={'/'} className='text-primary-100 font-bold hover:text-primary-200'>Conduit </Link>
                <span className='text-secondary-100  font-light'>
                    interactive learning project from
                </span>
                <Link to={'https://thinkster.io'} className='text-primary-100 hover:underline hover:text-primary-200 font-light'>  Thinkster </Link>.
                <span className='text-secondary-100  font-light'>
                    Code & design licensed under MIT.
                </span>
            </div>
        </footer>
    )
}



export default Footer