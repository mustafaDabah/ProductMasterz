import { PagesList, Title } from '@/Components/UI';
import { authOptions } from '@/utils/authOptions';
import { getData } from '@/utils/basicURL';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
  title: 'Product MasterZ - pages list',
};

const fetchData = async () => {
    const pages = await getData("pages");
    const adminMails = await getData("admin-mails");

    return {pages, adminMails}
};
  

async function Page() {
  const {pages, adminMails} = await fetchData();

  const session = await getServerSession(authOptions);

  const isAdmin = adminMails.find(
      (mail) => mail.email === session?.user?.email
  );

  if (!isAdmin) {
      redirect("/api/auth/signin");
  }


  return (
    <div className='pt-5 direction-ltr'>
        <div className='container'>
            <Title text='list of editable pages' />
            <PagesList pagesName={pages} />
        </div>
    </div>
  )
}

export default Page