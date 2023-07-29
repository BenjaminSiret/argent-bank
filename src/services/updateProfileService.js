const urlAPI = process.env.REACT_APP_API_URL;

export async function updateProfileService (token, firstName, lastName) {
  const response = await fetch(`${urlAPI}/user/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
    }),
  })

  const data = await response.json();
  if (data.body) {
    return data.body
  } else {
    throw new Error('Error updating profile')
  }
}
