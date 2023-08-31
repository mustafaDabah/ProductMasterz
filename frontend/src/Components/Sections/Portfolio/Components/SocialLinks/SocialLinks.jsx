import Link from 'next/link'
import { FaLink, FaGooglePlay, FaAppStoreIos, FaYoutube, FaReadme } from "react-icons/fa";

function SocialLinks({projectLinks}) {
    const { 
        IOSLink,
        playStoreLink,
        websiteLink,
        docLink,
        demoLink
      } = projectLinks.fields;
 
  return (
    <div className="social-project-links ">
        {websiteLink && (<Link aria-label='social media links' href={websiteLink} target="_blank" className="text-white"><FaLink className="mr-1" /></Link>)}
        {playStoreLink && (<Link aria-label='social google play links' href={playStoreLink} target="_blank" className="text-white"><FaGooglePlay className="mr-1" /></Link>)}
        {IOSLink && (<Link aria-label='social app store links' href={IOSLink} target="_blank" className="text-white"><FaAppStoreIos className="mr-1" /></Link>)}
        {docLink && (<Link aria-label='social docs links' href={docLink} target="_blank" className="text-white"><FaReadme className="mr-1" /></Link>)}
        {demoLink && (<Link aria-label='social youtube links' href={demoLink} target="_blank" className="text-white"><FaYoutube className="mr-1" /></Link>)}
    </div>
  )
}

export default SocialLinks