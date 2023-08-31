import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'
import { Button } from 'react-bootstrap'

async function LoginButton({handleLogin}) {
    const session = await getServerSession(authOptions);
    const isLogin = session?.user.name ? 'Sign out' : 'Login';


    return (
        <Button className="bg-primary-md ml-2 border-0 login-btn" onClick={handleLogin}>{isLogin}</Button>
    )
}

export default LoginButton