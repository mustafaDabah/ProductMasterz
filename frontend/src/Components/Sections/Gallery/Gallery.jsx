import React from "react";
import ListOfImages from "./Components/ListOfImages/ListOfImages";

function Gallery({content , data}) {
    return (
        <section className="container overflow-hidden large-margin" id="Album">
            <div className="tiny-margin">
                <div className="col-md-11 main-title">
                    <h2 className="short-hr-left">{content.title}</h2>
                    <p className='font-weight-light text-mode'>{content.tagline}</p>
                </div>
            </div>
            <div className="gallery-system">
              <ListOfImages data={data} />
            </div>
        </section>
    );
}

export default Gallery;
