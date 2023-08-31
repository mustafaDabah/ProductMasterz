"use client";

import { BASIC_URL } from "@/utils/basicURL";
import axios from "axios";
import { useState, useEffect } from "react";

const usePortfolioData = (filterValue, pageSize, offset) => {
  const [records, setRecords] = useState([]);
  const [hasMore, setHasMore] = useState(true)
  // const base = new Airtable({apiKey: 'keyQF8AELsxnCrTYL'}).base('appLs2fl7mIUXnNxN')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASIC_URL}/Blogs?filterByFormula=FIND("${filterValue}", {category})`,{
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      });
      setRecords(res.data.records);
      if(res.data.offset === undefined) return setHasMore(false)
      setHasMore(true)
    };

    fetchData();
  }, [filterValue, pageSize, offset , hasMore]);

  return {records , hasMore};
};

export default usePortfolioData;
