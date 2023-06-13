import { authStart, authSuccess, authFail } from 'redux/authSlice'
import { authStart } from 'redux/authSlice'

const API_URL = "http://localhost:3000/api/v1"

export const login = (email, password) => {
  useDispatch(authStart())

  fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then(res => res.json()).then(data => {
    if (data.token) {
      useDispatch(authSuccess(data.token))
    } else {
      useDispatch(authFail(data.error))
    }
  }).catch(error => {
    useDispatch(authFail(error))
  })
}
