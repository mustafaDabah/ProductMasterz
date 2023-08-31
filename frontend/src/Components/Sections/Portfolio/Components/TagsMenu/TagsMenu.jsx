import React from 'react' 
 
function TagsMenu({tagFunction , tags}) {

  return (
    <ul className="game-tags mb-5">
      <li>Sort By Tag :</li>
      {
        tags.map((tag , index) => (
          <li key={index}>
          <a onClick={() => tagFunction(tag)}>
            {tag}
          </a>
        </li>
        ))
      }
   </ul>
  )
}

export default TagsMenu