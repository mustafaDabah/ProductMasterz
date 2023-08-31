import { useState } from "react";
import axios from "axios";
import { BASIC_URL } from "@/utils/basicURL";
import { toast } from "react-toastify";

const useDeletePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePage = async (pageName, lang) => {

    try {
      setIsLoading(true);

      // Delete article
      await axios.delete(`${BASIC_URL}/pages/${pageName}/${lang}`);

      toast.success("page deleted successfully.");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  return { isLoading, deleteArticle: deletePage };
};

export default useDeletePage;
