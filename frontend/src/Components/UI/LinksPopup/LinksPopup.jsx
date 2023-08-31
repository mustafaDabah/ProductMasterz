'use client'

import React from 'react'
import useClickOutsideAndEscape from '@/Hooks/useClickOutsideAndEscape';
import { FaAppStoreIos, FaGooglePlay, FaLink, FaReadme, FaYoutube } from 'react-icons/fa';

function LinksPopup({ project, show, closePopup }) {
  const {
    projectName,
    IOSLink,
    playStoreLink,
    websiteLink,
    docLink,
    demoLink } = project.fields;
  const popupRef = useClickOutsideAndEscape(closePopup);

  return (
    <div className={`overlay-module ${show ? 'show' : ''}`}>
      <div className={`modal fade game-modal ${show ? 'show fadeIn' : ''}`}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" ref={popupRef}>
            <div className="modal-header">
              <h2 className="modal-title text-mode" id="scales">
                {projectName}
              </h2>
              <button
                type="button"
                className="close"
                onClick={closePopup}
              >
                <span className='text-mode'>×</span>
              </button>
            </div>

            <div className="modal-body mt-4">
              {websiteLink &&
                <a aria-label='project website link' href={websiteLink} target='_blank' rel="noreferrer" className='link-tree text-mode mb-3'>
                  <FaLink className='mr-2' /> Website
                </a>
              }
              {docLink &&
                <a aria-label='project docs link' href={docLink} target='_blank' rel="noreferrer" className='link-tree text-mode mb-3'>
                  <FaReadme className='mr-2' /> Documentation
                </a>
              }
              {playStoreLink &&
                <a aria-label='project play store link' href={playStoreLink} target='_blank' rel="noreferrer" className='link-tree text-mode mb-3'>
                  <FaGooglePlay className='mr-2' /> Google Play
                </a>
              }
              {IOSLink &&
                <a aria-label='project ios link' href={IOSLink} target='_blank' rel="noreferrer" className='link-tree text-mode mb-3'>
                  <FaAppStoreIos className='mr-2' /> App Store
                </a>
              }
              {
                demoLink &&
                <a aria-label='project live link' href={demoLink} target='_blank' rel="noreferrer" className='link-tree text-mode mb-3'>
                  <FaYoutube className='mr-2' /> Video Demo
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinksPopup
export const LinksPopupMemo = React.memo(LinksPopup)