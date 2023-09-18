'use client'
import React from 'react'
import CreateTap from './CreateTap/CreateTap'
import SortTaps from './SortTaps/SortTaps'
import useFetchData from '@/Hooks/useFetchData';
import PagesSort from './PagesSort/PagesSort';

function NavbarConfig() {
 const { data, loading, error, refetch } = useFetchData('tabs');

  return (
    <div>
        <CreateTap refetch={refetch} />
        <SortTaps data={data} fetchData={refetch} />
        <PagesSort />
    </div>
  )
}

export default NavbarConfig