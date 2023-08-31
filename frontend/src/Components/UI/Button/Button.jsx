import React from 'react'

function Button({title, children, handleClick, type}) {
  return (
    <button className="bn632-hover bn27" onClick={handleClick} type={type}>
        <span>{children}</span>
        {title}
    </button>
  )
}

export default Button