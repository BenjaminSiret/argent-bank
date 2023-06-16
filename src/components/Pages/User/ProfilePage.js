import { useSelector, useDispatch } from 'react-redux'
import { userFetchStart, userFetchSuccess, userFetchFail } from 'redux/userSlice'
import { Navigate } from 'react-router-dom'
import './ProfilePage.css'
import { useEffect } from 'react'

export default function ProfilePage () {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const token = useSelector(state => state.auth.token)
  const userData = useSelector(state => state.user)

  useEffect(() => {
    dispatch(userFetchStart())

    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json()).then(data => {
      console.log(data)
    })
  }, [dispatch, token])

  // return (
  //   <div className="ProfilePage">
  //     <div className="main bg-dark">
  //       <div className="header">
  //         <h1>Welcome back<br />Tony Jarvis!</h1>
  //         <button className="edit-button">Edit Name</button>
  //       </div>
  //       <h2 className="sr-only">Accounts</h2>
  //       <section className="account">
  //         <div className="account-content-wrapper">
  //           <h3 className="account-title">Argent Bank Checking (x8349)</h3>
  //           <p className="account-amount">$2,082.79</p>
  //           <p className="account-amount-description">Available Balance</p>
  //         </div>
  //         <div className="account-content-wrapper cta">
  //           <button className="transaction-button">View transactions</button>
  //         </div>
  //       </section>
  //       <section className="account">
  //         <div className="account-content-wrapper">
  //           <h3 className="account-title">Argent Bank Savings (x6712)</h3>
  //           <p className="account-amount">$10,928.42</p>
  //           <p className="account-amount-description">Available Balance</p>
  //         </div>
  //         <div className="account-content-wrapper cta">
  //           <button className="transaction-button">View transactions</button>
  //         </div>
  //       </section>
  //       <section className="account">
  //         <div className="account-content-wrapper">
  //           <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
  //           <p className="account-amount">$184.30</p>
  //           <p className="account-amount-description">Current Balance</p>
  //         </div>
  //         <div className="account-content-wrapper cta">
  //           <button className="transaction-button">View transactions</button>
  //         </div>
  //       </section>
  //     </div>
  //   </div>
  // )
}
