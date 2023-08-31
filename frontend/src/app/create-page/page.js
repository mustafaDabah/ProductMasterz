import CreateBlog from "@/Components/CreateBlog/CreateBlog"
import { authOptions } from "@/utils/authOptions";
import { getData } from "@/utils/basicURL";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'productMasterZ | Create Page',
};

const fetchData = async () => {
  const adminMails = await getData("admin-mails");

  return adminMails 
}

async function page() {
  const adminMails  = await fetchData();
  const session = await getServerSession(authOptions);

  const isAdmin = adminMails.find(
      (mail) => mail.email === session?.user?.email
  );

  if (!isAdmin) {
      redirect("/api/auth/signin");
  }

  return (
    <CreateBlog />
  )
}

export default page;