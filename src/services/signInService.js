const urlAPI = process.env.REACT_APP_API_URL;

export async function signInService (email, password) {
  const response = await fetch(`${urlAPI}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await response.json()
  if (data.body.token) {
    return data.body.token
  } else {
    throw new Error(data.body.message)
  }
}
