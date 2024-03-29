import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authLogout } from 'redux/authSlice'
import logo from 'img/argentBankLogo.png'
import './Navbar.css'

export default function Navbar () {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authLogout())
    sessionStorage.removeItem('authToken')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <><Link className='main-nav-item' to="/profile">
            <i className='fa fa-user-circle'></i>
            <span className="nav-span">{user.firstName}</span>
          </Link>
            <Link className='main-nav-item' to='/' onClick={handleLogout} >
              <i className='fa fa-sign-out'></i>
              <span className="nav-span">Sign Out</span>
            </Link>
          </>
        ) : (
          <Link className='main-nav-item' to='/sign-in'>
            <i className='fa fa-user-circle'></i>
            <span className="nav-span">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

