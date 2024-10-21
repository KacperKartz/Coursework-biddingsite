import React from 'react'
import { Link } from 'react-router-dom'

const UserContainer = ({user, login, logout}) => {
  return (
    <ul className='logins'>
        {user ? (
            <li>
                {"Hi "}
                {user?.username?.toUpperCase()}
                <button onClick={logout} className='btn'>
                    logout
                </button>
            </li>
        ) : (
            <li>
                <button onClick={login} className='btn'>
                    
                </button>
                <Link to={"/register"}>Register</Link>
            </li>
        )}
    </ul>
  )
}

export default UserContainer