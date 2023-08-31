import React from 'react'
import EditPages from '@/Components/EditPages/EditPages';
import { getData, getSingleRecord } from '@/utils/basicURL';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Edit The Page",
};

const fetchData = async () => {
  const adminMails = await getData("admin-mails");

  return adminMails 
}

async function page({searchParams, params }) {
  const { name } = params;
  const page = await getSingleRecord(`${name}/${searchParams.lang}`);

  const adminMails  = await fetchData();
  const session = await getServerSession(authOptions);

  const isAdmin = adminMails.find(
      (mail) => mail.email === session?.user?.email
  );

  if (!isAdmin) {
      redirect("/api/auth/signin");
  }

  return (
    <div>
      {
        page.message ? <p className='text-dark'>please choose correct url link</p> : ( <EditPages pageData={page} />)
      }
    </div>
  )
}

export default page