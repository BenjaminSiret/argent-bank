import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userFetchStart, userFetchSuccess, userFetchFail, profileUpdateStart, profileUpdateSuccess, profileUpdateFail } from 'redux/userSlice'
import { fetchProfileService } from 'services/fetchProfileService'
import { updateProfileService } from 'services/updateProfileService'
import './ProfilePage.css'

export default function ProfilePage () {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const token = sessionStorage.getItem('authToken')
  const user = useSelector(state => state.user)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFirstName = firstName !== '' ? firstName : user.firstName
    const newLastName = lastName !== '' ? lastName : user.lastName

    if (!newFirstName.match(/^[a-zA-Z]+$/) || !newLastName.match(/^[a-zA-Z]+$/)) {
      setNameError("Please enter a valid name")
      return;
    }

    dispatch(profileUpdateStart())

    updateProfileService(token, newFirstName, newLastName)
      .then(data => {
        dispatch(profileUpdateSuccess(data))
        handleEdit()
      }).catch(error => {
        dispatch(profileUpdateFail(error))
        console.log(error)
      })
  }

  const handleEdit = () => {
    if (isEditing) {
      resetForm()
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    if (firstName === '' && lastName === '') {
      handleEdit()
    } else {
      resetForm()
    }
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

  useEffect(() => {
    if (!isEditing) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  }, [isEditing, user.firstName, user.lastName])

  if (!isAuthenticated) {
    return <Navigate to="/" />
  } else {
    return (
      <div className="ProfilePage">
        <div className="main bg-dark">
          <div className="header">
            <h1>Welcome back<br />{user.firstName}</h1>
            <button className="edit-button" onClick={handleEdit}>Edit Name</button>
            {isEditing &&
              <form onSubmit={handleSubmit} className="editForm">
                <div className="formItems">
                  <input type="text" id="firstName" className="formInput" value={firstName} onChange={e => setFirstName(e.target.value)} onKeyDown={() => setNameError('')} placeholder={user.firstName} />
                  <input type="text" id="lastName" className="formInput" value={lastName} onChange={e => setLastName(e.target.value)} onKeyDown={() => setNameError('')} placeholder={user.lastName} />
                </div>
                <div className="formItems">
                  <button type="submit" className="formButton">Save</button>
                  <button type="button" onClick={handleCancel} className="formButton">Cancel</button>
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
