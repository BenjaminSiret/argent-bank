import { useSelector, useDispatch } from 'react-redux'
import { userFetchStart, userFetchSuccess, userFetchFail, profileUpdateStart, profileUpdateSuccess, profileUpdateFail } from 'redux/userSlice'
import { Navigate } from 'react-router-dom'
import './ProfilePage.css'
import { useEffect, useState } from 'react'
import { fetchProfileService } from 'services/fetchProfileService'
import { updateProfileService } from 'services/updateProfileService'

export default function ProfilePage () {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const token = localStorage.getItem('authToken')
  const user = useSelector(state => state.user)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.match(/^[a-zA-Z]+$/) || !lastName.match(/^[a-zA-Z]+$/)) {
      setNameError("Please enter a valid name")
      return;
    }

    dispatch(profileUpdateStart())

    updateProfileService(token, firstName, lastName)
      .then(data => {
        dispatch(profileUpdateSuccess(data))
        toggleForm()
      }).catch(error => {
        dispatch(profileUpdateFail(error))
        console.log(error)
      })
  }

  const toggleForm = () => {
    setIsEditing(!isEditing);
  }

  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setNameError('')
  }

  useEffect(() => {
    dispatch(userFetchStart())

    fetchProfileService(token)
      .then(data => {
        dispatch(userFetchSuccess(data))
      }).catch(error => {
        dispatch(userFetchFail(error))
        console.log(error)
      })
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/" />
  } else {
    return (
      <div className="ProfilePage">
        <div className="main bg-dark">
          <div className="header">
            <h1>Welcome back<br />{user.firstName}</h1>
            <button className="edit-button" onClick={toggleForm}>Edit Name</button>
            {isEditing &&
              <form onSubmit={handleSubmit} className="editForm">
                <div className="formItems">
                  <input type="text" id="firstName" className="formInput" value={firstName} onChange={e => setFirstName(e.target.value)} onKeyDown={() => setNameError('')} placeholder={user.firstName} />
                  <input type="text" id="lastName" className="formInput" value={lastName} onChange={e => setLastName(e.target.value)} onKeyDown={() => setNameError('')} placeholder={user.lastName} />
                </div>
                <div className="formItems">
                  <button type="submit" className="formButton">Save</button>
                  <button type="reset" onClick={resetForm} className="formButton">Cancel</button>
                </div>
              </form>
            }
            {nameError && <p>{nameError}</p>}
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
