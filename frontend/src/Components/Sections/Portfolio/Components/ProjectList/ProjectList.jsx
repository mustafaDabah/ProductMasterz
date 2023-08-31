import React, { useState } from "react";
import  { SingleProjectMemo } from "../SingleProject/SingleProject";
import { InView } from "react-intersection-observer";
 
function ProjectList({ projects }) {
  const [inScreen , setInScreen] = useState(false);

  const changeTheView = (inView, _) => {
    if (inScreen) return;
    setInScreen(inView)
  }

  return (
    <div className="games-portfolio large-margin">
      <div className="container">
        <InView as="div" onChange={(inView, entry) => changeTheView(inView, entry)} className="grid-items-project">
          {projects.map((project, index) => (
            <SingleProjectMemo key={index} timeAnimation={index / 2}  project={project} inScreen={inScreen} />
          ))}
        </InView>
      </div>
    </div>
  );
}

export default ProjectList;
