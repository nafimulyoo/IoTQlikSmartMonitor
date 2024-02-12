 
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <>
      <form action={login}>
        <Input type="username" name="username" placeholder="Username" required />
        <Input type="password" name="password" placeholder="Password" required />
        <Button type="submit">Login </Button>
      </form>
    </>
  )
}