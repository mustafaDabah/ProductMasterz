'use client'

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASIC_URL } from '@/utils/basicURL';

const useUpdatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (formData, value) => {
    setIsLoading(true);

    const navbarItems = formData.navbar.split(',');
    const navbarFormat = navbarItems.map(item => ({text: item, link: item}));

    try {
      const bodyData = {
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

      await axios.put(`${BASIC_URL}/pages/${formData.name}/${formData.lang}`, bodyData);

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
