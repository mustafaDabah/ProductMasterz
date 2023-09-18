'use client'

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASIC_URL } from '@/utils/basicURL';

const useCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (formData, value) => {
    setIsLoading(true);

    const navbarItems = formData?.navbar?.split(',');
    const navbarFormat = navbarItems? navbarItems.map(item => ({text: item, link: item})) : undefined;

    try {
      const bodyData = {
          pageUrlName: formData.pageUrlName,
          tabId: formData.tabId,
          lang: formData.lang,
          name: formData.name,
          header: {
            title: formData.headerTitle,
            description: formData.headerDescription,
            imageUrl: formData.headerImageUrl,
          },
          navbar: navbarFormat,
          content: value,
      };

      await axios.post(`${BASIC_URL}/pages`, bodyData);

      toast.success("page saved successfully");

      // REMOVE DRAFT DATA 
      window.localStorage.removeItem("article");
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return { submitData, isLoading };
};

export default useCreatePage;
