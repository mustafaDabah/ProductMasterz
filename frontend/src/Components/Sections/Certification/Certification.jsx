'use client'
import SingleCertification from './Components/SingleCertification'

function Certification({ content, certifications }) {

  return (
    <section className='large-margin' id="Certifications">
      <div className='container'>
        <div className="row tiny-margin">
          <div className="col-md-11 main-title">
            <h2 className="short-hr-left">{content.title}</h2>
            <p className='font-weight-light text-mode'>{content.tagline}</p>
          </div>
        </div>
        <div className="grid-items-project">
          {certifications.map((item) => (
            <SingleCertification certifications={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certification