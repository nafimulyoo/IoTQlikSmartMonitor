 import axios from 'axios'
 function getSession() {
  if (isUsernameAvailable()) {
    if (!isTokenExpired()) {
      return {
        token: localStorage.getItem('token'),
        site: localStorage.getItem('site'),
        username: localStorage.getItem('username'),
      }
    }
  }
  return false
}

 
 async function login(formData: FormData) {
  try {

    const username = formData.get('username').toString()
    const password = formData.get('password').toString()

    const url = new URL('https://iot.ayou.id/api/login')
    url.searchParams.append('user', username)
    url.searchParams.append('pass', password)

    // use axios to make a post request with application/json content type
    const authResponse = await axios.post(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const jsonString = authResponse.data.substring(authResponse.data.indexOf('{'))
    const authData = JSON.parse(jsonString)

    authData.site = authData.site.substring(2, authData.site.length - 2)


    localStorage.setItem('token', authData.token)
    localStorage.setItem('site', authData.site)
    localStorage.setItem('username', username)
    localStorage.setItem('expired', authData.expired)
    window.location.reload()
    return "success"
  }
  catch (error) {
    console.error(error)
    return null
  }
}

function isUsernameAvailable() {
  if (localStorage.getItem('username')) {
    return true
  }

  return false
}

function isTokenExpired() {
  const now = new Date()
  const expiration = new Date(localStorage.getItem('expired'))

  if (now > expiration) {
    return true
  }

  return false
}


export { getSession, login }