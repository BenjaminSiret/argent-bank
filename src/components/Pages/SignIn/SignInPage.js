import { useDispatch, useSelector } from 'react-redux'
import { authStart } from 'redux/authSlice'

import { Link } from 'react-router-dom'
import './SignInPage.css'
export default function SignIn () {
  const dispatch = useDispatch()
  const urlAPI = 'http://localhost:3001/api/v1'
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(authStart())

    fetch(`${urlAPI}/user/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'tony@stark.com',
          password: 'password123'
        })
      }).then(res => res.json().then(data => {
        console.log(data)
      }))
  }

  return (
    <div className="signInPage">
      <div className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor='username'>Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* <Link to='/user' class="sign-in-button">Sign In</Link> */}
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </div>
    </div>
  )
}
