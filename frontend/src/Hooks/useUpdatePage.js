'use client'

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASIC_URL } from '@/utils/basicURL';

const useUpdatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (formData, value) => {
    setIsLoading(true);

    const navbarItems = formData?.navbar?.split(',');
    const navbarFormat = navbarItems?.length > 1 ? navbarItems.map(item => ({text: item, link: item})) : undefined;

    console.log(navbarItems)
    console.log(navbarFormat)

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

      await axios.put(`${BASIC_URL}/pages/${formData.pageUrlName}/${formData.lang}`, bodyData);

      toast.success("page update successfully");

      // REMOVE DRAFT DATA 
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return { submitData, isLoading };
};

export default useUpdatePage;
