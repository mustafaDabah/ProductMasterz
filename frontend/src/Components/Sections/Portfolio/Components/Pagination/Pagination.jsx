import { Cagliostro } from '@next/font/google';
import Airtable from 'airtable';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Pagination({handleLoadMore}) {
  const [hasMore, setHasMore] = useState(true);
  const [numOfRecode, setNumOfRecode] = useState(0)


  return (
    <button onClick={handleLoadMore} className="button">Load More</button>
  )
}

export default Pagination