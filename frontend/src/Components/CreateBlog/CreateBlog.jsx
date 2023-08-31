"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";
import { Alert, CurrentUser, FormEditor, Title, Preview } from "@/Components/UI";
import { editorsOptions } from "@/utils/editorConfig";
import useCreatePage from "@/Hooks/useCreatePage";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import useSelectSection from "@/Hooks/useSelectSection";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});


function CreateBlog() {
  const editor = useRef();
  const [value, setValue] = useState("");
  const { submitData, isLoading } = useCreatePage('create');
  const addSection = useSelectSection();

  const [htmlText, setHtmlText] = useState('')
  const [formData, setFormData] = useState({});

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createBlog = () => {
    submitData(formData, htmlText);
  }

  const handleSectionId = () => {
    addSection(value, setValue);
  }

  return (
    <div className="blog bg-white direction-ltr">
      <div className="container">
        <CurrentUser />
        <Alert />
        <div className="p-3">
          <div className="overflow-hidden">
            <div className=" mr-3 mx-5">
              <Title text='Create Page' />

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

              <Title text={`Add HTML Tags`} />
              <textarea 
               name=""
               id=""
               cols="30"
               rows="10"
               value={htmlText}
               onChange={(e) => setHtmlText(e.target.value)} 
               />
            </div>

            <div className="d-flex justify-content-center mt-3 align-items-center">
              <Button
                onClick={createBlog}
                disabled={isLoading}
                className="mr-2"
              >
                {isLoading ? "loading..." : "Publish"}
              </Button>
              <Button onClick={handleSectionId} className="mb-1">Add Section</Button>

            </div>
            <div className="mx-5">
              <Preview
                formData={formData}
                editorContent={value + htmlText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
