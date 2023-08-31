import React from 'react'
import parse from 'html-react-parser';
import 'suneditor/dist/css/suneditor.min.css';

function Preview({formData , editorContent, formInputsData}) { 
    return (
        <div className='sun-editor-editable sun-editor-editable-blockquote-editor sun-editor-editable-editor'>
            {parse(`${editorContent}`)}
            {parse(`${formInputsData}`)}
        </div>
    )
}

export default Preview