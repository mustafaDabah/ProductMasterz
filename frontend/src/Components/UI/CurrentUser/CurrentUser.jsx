'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from 'react-bootstrap';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

function CurrentUser() {
  const { data: session } = useSession();

  return (
    <div className='d-flex justify-content-between w-100 align-items-center pt-4 flex-wrap direction-ltr'>
      <div className='d-flex current-user'>
        <Image width={60} height={60} loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`} src={session?.user?.image} alt="user image" />
        <div>
          <h3>Signed Is As {session?.user?.name}</h3>
          <p>{session?.user?.email}</p>
        </div>
      </div>
      <Button variant="danger" onClick={() => signOut()}>sign out</Button>
    </div>
  )
}

export default CurrentUser