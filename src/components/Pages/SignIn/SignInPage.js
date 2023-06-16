import { useDispatch } from 'react-redux'
import { authStart, authSuccess, authFail } from 'redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signInService } from 'services/signInService'
import './SignInPage.css'
export default function SignIn () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(authStart())

    signInService(email, password)
      .then(token => {
        dispatch(authSuccess(token))
        navigate('/profile')
      }).catch(error => {
        dispatch(authFail(error.message))
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
