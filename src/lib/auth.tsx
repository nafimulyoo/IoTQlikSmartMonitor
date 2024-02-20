


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



    const authData = await fetch("/api/login", {
      method: "POST",
      next: {
        revalidate: 3600
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json());


    localStorage.setItem('token', authData.token)
    localStorage.setItem('site', authData.site)
    localStorage.setItem('username', username)
    localStorage.setItem('expired', authData.expired)
    
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

  if (!localStorage.getItem('token')) {
    localStorage.removeItem('token')
    localStorage.removeItem('site')
    localStorage.removeItem('username')
    localStorage.removeItem('expired')
    return true
  }

  const now = new Date()
  const expiration = new Date(localStorage.getItem('expired'))
  
  
  
  

  if (now > expiration) {
      localStorage.removeItem('token')
  localStorage.removeItem('site')
  localStorage.removeItem('username')
  localStorage.removeItem('expired')
    return true
  }

  return false
}


export { getSession, login, logout }