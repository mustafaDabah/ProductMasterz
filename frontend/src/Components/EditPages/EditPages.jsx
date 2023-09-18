"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";
import { Alert, CurrentUser, FormEditor, Title, Preview } from "@/Components/UI";
import { editorsOptions } from "@/utils/editorConfig";
import { Button } from "react-bootstrap";
import useSelectSection from "@/Hooks/useSelectSection";
import useUpdatePage from "@/Hooks/useUpdatePage";
import DeletePopup from "./Component/DeletePopup/DeletePopup";
import { FaTrash } from "react-icons/fa";
import parse from 'html-react-parser';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

function EditPages({ pageData }) {
    const { name, navbar, content, header, lang, pageUrlName, tabId } = pageData;
    const navbarString = navbar.map(item => item.text).join(', ')

    const editor = useRef();
    const [value, setValue] = useState("");
    const [htmlText, setHtmlText] = useState(content || '')
    const [openPopup, setOpenPopup] = useState(false);

    const { submitData, isLoading } = useUpdatePage();
    const addSection = useSelectSection();

    const [formData, setFormData] = useState({
        pageUrlName,
        tabId,
        lang,
        name,
        headerTitle: header.title,
        headerDescription: header.description,
        headerImageUrl: header.imageUrl,
        navbar: navbarString,
    });

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const updatePage = () => {
        submitData(formData, htmlText);
    }

    const handleSectionId = () => {
        addSection(value, setValue);
    }

    return (
        <div className="blog bg-white direction-ltr">
            <Alert />
            <div className="container">
                <CurrentUser />
                 {/* --DELETE POPUP-- */}
                 {openPopup && <DeletePopup
                    show={openPopup}
                    closePopup={() => setOpenPopup(false)}
                    pageName={formData.name}
                    lang={formData.lang}
                />}
                 <div className="w-100 text-right">
                    <Button
                        onClick={() => setOpenPopup(true)}
                        variant='danger'
                        className='ml-auto my-3'
                    >
                        Delete Page <FaTrash fontSize={15} />
                    </Button>
                </div>
                <div className="p-3">
                    <div className="overflow-hidden">
                        <div className=" mr-3 mx-5">
                            <Title text={`Edit The ${formData.name}`} />

                            <FormEditor
                                handleInputChange={handleInputChange}
                                formData={formData}
                            />

                            <SunEditor
                                getSunEditorInstance={getSunEditorInstance}
                                setOptions={editorsOptions}
                                setContents={value}
                                onChange={setValue}
                                placeholder="Please type here..."
                            />
                            
                            <Title text={`Add The HTML Text`} />
                            <textarea name="" id="" cols="30" rows="10" value={htmlText} onChange={(e) => setHtmlText(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-center mt-3 align-items-center">
                            <Button
                                onClick={updatePage}
                                disabled={isLoading}
                                className="mr-2"
                            >
                                {isLoading ? "loading..." : "Update"}
                            </Button>
                            <Button onClick={handleSectionId} className="mb-1">Add Section</Button>

                        </div>
                        <div className="mx-5">
                            <Preview
                                formData={formData}
                                editorContent={value}
                                formInputsData={htmlText}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPages