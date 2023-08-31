'use client';
import { BASIC_URL } from '@/utils/basicURL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Airtable from 'airtable'

const base = new Airtable({apiKey: 'keyQF8AELsxnCrTYL'}).base('appLs2fl7mIUXnNxN')

function useAirTable(table) {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${BASIC_URL}/${table}`,{
            headers: {
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          });
          setData(res.data.records);
        } catch (err) {
            console.log(err)
        }
      };
      fetchData();
    }, [table]); 

    return  data ;
}

export default useAirTable