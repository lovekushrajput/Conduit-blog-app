import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to={'/'}>Conduit </Link>
            lovekush
            interactive learning project from
            <Link to={'https://thinkster.io'}>  Thinkster </Link>. Code & design licensed under MIT.
        </footer>
    )
}



export default Footer