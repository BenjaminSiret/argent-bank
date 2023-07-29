const urlAPI = process.env.REACT_APP_API_URL;

export async function fetchProfileService (token) {
  const response = await fetch(`${urlAPI}/user/profile`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()
  if (data.body) {
    return data.body
  } else {
    throw new Error('Error fetching profile')
  }
}
