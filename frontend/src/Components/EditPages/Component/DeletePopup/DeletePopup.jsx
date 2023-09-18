'use client'

import React from 'react'
import useClickOutsideAndEscape from '@/Hooks/useClickOutsideAndEscape';
import { Button } from 'react-bootstrap';
import { Alert } from '@/Components/UI';
import { useRouter, useParams } from 'next/navigation';
import useDeletePage from '@/Hooks/useDeletePage';
import useDeleteTap from '@/Hooks/useDeleteTap';

function DeletePopup({ show, closePopup, pageName, lang }) {
    const { isLoading, deleteArticle: deletePage } = useDeletePage();
    const { deleteTab } = useDeleteTap();
    const router = useRouter()

    console.log(lang)

    function deleteRecord() {
        if (!lang) {
            deleteTab(pageName);
            closePopup()
        } else {
            deletePage(pageName, lang);
        }
        closePopup()
        router.refresh(window.location.pathname);
    }

    return (
        <>
            <div className={`overlay-module ${show ? 'show' : ''}`}>
                <Alert />
                <div className={`modal fade game-modal ${show ? 'show fadeIn' : ''}`}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content pb-4" >
                            <div className="modal-header">
                                <h4 className="modal-title text-dark" id="scales">
                                    Delete Article
                                </h4>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={closePopup}
                                >
                                    <span className='text-dark'>×</span>
                                </button>
                            </div>
                            <h4 className='text-center text-dark mt-5 mb-5'>Are You Sure ? You are going to Delete The Page!</h4>
                            <Button onClick={deleteRecord} disabled={isLoading} variant='danger' className='w-50 m-auto'>
                                {isLoading ? "loading..." : 'Delete Article'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopup