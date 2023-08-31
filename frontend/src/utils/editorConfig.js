import image from 'suneditor/src/plugins/dialog/link'
import list from 'suneditor/src/plugins/submenu/list'
import {font, video} from 'suneditor/src/plugins'

export const editorsOptions = {
    buttonList: [
        ["undo", "redo"],
        ["font", "fontSize"],
        ['blockquote'],
        ['formatBlock'],
        [
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript"
        ],
        ["fontColor", "hiliteColor"],
        ["align", "list", "lineHeight"],
        ["outdent", "indent"],  
        ["link"],
        ["table", "horizontalRule","image", "video"],
        // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
        // ['imageGallery'], // You must add the "imageGalleryUrl".
        ["fullScreen", "showBlocks", "codeView"],
        ["preview", "print"],
        ["removeFormat"],
   
        // ['dir_ltr', 'dir_rtl']

        // ['save', 'template'],
        // '/', Line break
    ], 
    // imageGalleryUrl:"https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo" ,
    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    // plugins: [font, video, image, list],
    // defaultTag: "div",
    minHeight: "300px",
    showPathLabel: false,
    attributesWhitelist: {
        "all": "id",
		"input": "checked",
        "ol": "start",
        "img": "data-zoomable|src",
        "iframe": "allow|src",
        // "iframe": "src",
    },
    videoIframeAttrs: {
        "allow":"fullscreen",
    },
    // font: sortedFontOptions
}