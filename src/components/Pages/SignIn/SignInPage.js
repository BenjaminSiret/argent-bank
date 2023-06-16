import { useDispatch, useSelector } from 'react-redux'
import { authStart, authSuccess, authFail } from 'redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './SignInPage.css'
export default function SignIn () {
  const urlAPI = 'http://localhost:3001/api/v1'
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
          email,
          password
        })
      }).then(response => response.json().then(data => {
        if (data.body.token) {
          dispatch(authSuccess(data.body.token))
          navigate('/profile')
        } else {
          dispatch(authFail(data.body.message))
        }
      })).catch(error => {
        dispatch(authFail(error))
      })
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
              <input type="text" id="username" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </div>
    </div>
  )
}
