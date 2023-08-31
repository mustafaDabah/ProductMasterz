'use client'

import { useState } from "react";
import { toast } from "react-toastify";

const MAX_IMAGE_SIZE = 100000;

function useUploadBlogThumbnail(image = '') {
    const [thumbnail, setThumbnail] = useState(image);

    const handleThumbnail = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result.length > MAX_IMAGE_SIZE) {
              return toast.error('The selected image is too large. Please choose a smaller image.');
            }
            setThumbnail(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return {thumbnail, handleThumbnail}
}

export default useUploadBlogThumbnail