import axios from 'axios'

export async function POST(request: Request) {
  const loginRequest = await request.json();

  const url = new URL('https://iot.ayou.id/api/login')
  url.searchParams.append('user', loginRequest.username)
  url.searchParams.append('pass', loginRequest.password)

  // use axios to make a post request with application/json content type
  const authResponse = await axios.post(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const jsonString = authResponse.data.substring(authResponse.data.indexOf('{'))
  const authData = JSON.parse(jsonString)

  authData.site = authData.site.substring(2, authData.site.length - 2)

  return new Response(JSON.stringify(authData), {
    headers: { "content-type": "application/json" },
  });
}

 