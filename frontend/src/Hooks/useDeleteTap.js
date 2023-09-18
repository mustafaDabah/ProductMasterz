import { useState } from "react";
import axios from "axios";
import { BASIC_URL } from "@/utils/basicURL";
import { toast } from "react-toastify";

const useDeleteTap = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTab = async (tabUrlName) => {

    try {
      setIsLoading(true);

      // Delete article
      await axios.delete(`${BASIC_URL}/tabs/${tabUrlName}`);

      toast.success("Tap deleted successfully.");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  return { deleteTab };
};

export default useDeleteTap;
