'use client'

import {  useState } from 'react'
import ProjectList from './Components/ProjectList/ProjectList'
import { Tag } from '@/Components/UI'

function Portfolio({ tags, content, data }) {
  const [filterValue, setFilterValue] = useState("All Apps And Game");
  const [recordFilterData, setRecordFilterData] = useState(data)
  // const { records } = usePortfolioData(filterValue, pageSize, offset);

  const handleFilterValue = (value) => {
    setFilterValue(value);
    const newData = data.filter(item => item.fields.category.includes(value));
    console.log(data)
    console.log(newData)
    setRecordFilterData(newData)
  }

  console.log(tags)

  return (
    <section id="Portfolio">
      <div className='container'>
        <div className="row tiny-margin">
          <div className="col-md-11 main-title">
            <h2 className="short-hr-left ">{content.title}</h2>
            <p className='font-weight-light text-mode'>{content.tagline}</p>
          </div>
        </div>
        <Tag title='Tag' handleTags={handleFilterValue} tags={tags} activeTag={filterValue} />
        {recordFilterData.length ? (
          <ProjectList projects={recordFilterData} />
        ) : (
          <div className="row">
            <div className="col-md-12 text-center h-75 no-projects">
              <h2 className="">THERE ARE NO PROJECTS WITH THIS CATEGORY PLEASE CHANGE IT </h2>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio;
