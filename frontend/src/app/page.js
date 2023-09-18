import {
  Header,
} from "@/Components/Sections";
import { getData } from "@/utils/basicURL";
import parse from 'html-react-parser';


export const metadata = {
  title: 'Product MasterZ',
};

const fetchData = async () => {
  const websiteContent = await getData("pages/home/ar");
  return websiteContent
};


export default async function Home() {
  const websiteContent = await fetchData();

  // WEBSITE SECTIONS CONTENT
  const navbarItems = websiteContent.navbar;
  const headerContent = websiteContent.header;

  console.log(websiteContent)

  return (
    <div className="home-page direction-rtl">
      <Header
        navLinks={navbarItems}
        content={headerContent}
        imgPath="/logo.png"

      />
      <div className="container">
        <div className='text-mode overflow-hidden sun-editor-editable sun-editor-editable-blockquote-blog bg-body sun-editor-editable-blog'>
          {parse(`${websiteContent.content}`)}
        </div>
      </div>
    </div>
  );
}
