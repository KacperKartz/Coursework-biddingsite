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
                {" Please "}
                <button onClick={login} className='btn'>
                    login
                </button>
                <Link to={"/register"}>or register?</Link>
            </li>
        )}
    </ul>
  )
}

export default UserContainer