import React from 'react'

function Title({text}) {
  return (
    <div className="row heading  main-title">
        <div className="col-md-auto">
            <h2 className="animation-element slide-down text-mode">
             {text}
            </h2>
        </div>
        <div className="col m-auto">
            <hr className="animation-element extend" />
        </div>
    </div>
  )
}

export default Title