 import axios from 'axios'


 function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('site')
  localStorage.removeItem('username')
  localStorage.removeItem('expired')
  return "unauthorized"
 }


 function getSession() {
  if (isUsernameAvailable()) {
    if (!isTokenExpired()) {
      return {
        status: "authorized",
        token: localStorage.getItem('token'),
        site: localStorage.getItem('site'),
        username: localStorage.getItem('username'),
      }
    }
  }
  return "unauthorized"
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
    console.log("login authorized")
    return {
      status: "authorized",
      token: authData.token,
      site: authData.site,
      username: username,
    }
  }
  catch (error) {
    return {
      status: "unauthorized",
    }
  }
}

function isUsernameAvailable() {
  if (localStorage.getItem('username')) {
    return true
  }

  return false
}

function isTokenExpired() {

  if (localStorage.getItem('token')) {
    return false
  }

  const now = new Date()
  const expiration = new Date(localStorage.getItem('expired'))

  if (now > expiration) {
    return true
  }

  return false
}


export { getSession, login, logout }