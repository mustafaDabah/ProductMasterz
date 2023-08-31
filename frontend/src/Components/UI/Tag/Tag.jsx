import React from 'react'

function Tag({tags , title , handleTags, activeTag}) {
    return (
        <ul className="game-tags mb-5 d-flex flex-wrap align-items-center">
            {/* <h2>Sort By {title}:</h2> */}
            {
                tags.map((tag, index) => (
                    <li onClick={() => handleTags(tag)} key={index} className={activeTag === tag ? 'active' : ''}>
                        {tag}
                    </li>
                ))
            }
        </ul>
    ) 
}

export default Tag