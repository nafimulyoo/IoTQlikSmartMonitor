 
'use client';

import { login, getSession } from '@/lib/auth'


export default function Page() {
  var session;

  if (typeof window !== 'undefined') {
    session = getSession();
 
    if (session) {
      window.location.href = "/home";
    }  
  }

  return (
    <form action={login}>
      <input type="username" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}