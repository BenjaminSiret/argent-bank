import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authLogout } from 'redux/authSlice'
import { Link } from 'react-router-dom'
import logo from 'img/argentBankLogo.png'
import './Navbar.css'
export default function Navbar () {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authLogout())
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
            Tony
          </Link>
            <Link className='main-nav-item' to='/' onClick={handleLogout} >
              <i className='fa fa-sign-out'></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className='main-nav-item' to='/sign-in'>
            <i className='fa fa-user-circle'></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

