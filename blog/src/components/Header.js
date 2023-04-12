import React from 'react';
import { NavLink, Link } from 'react-router-dom';


function Header() {
    return (
        <header>
            <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={'/'} className='brand'>Conduit</Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
                    <NavLink to={'/'} >Home</NavLink >
                    <NavLink to={'/login'} >Sign in</NavLink >
                    <NavLink to={'/register'} >Sign up</NavLink >
                </div>
            </ul>
        </header>
    )
}

export default Header