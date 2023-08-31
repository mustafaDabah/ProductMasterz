'use client'
import useAirTable from "@/Hooks/useAirTable";
import SingleContainer from "./Components/SingleContainer/SingleContainer";

function Roadmap({ content }) {
  const data = useAirTable('RoadmapSection');

  const ordinaryData = data.sort((a, b) => b.fields.ordinary - a.fields.ordinary);

  return (
    <>
      <section id="TimeLine" className="timeline-section large-pading" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5 text-center">
              <h2 className="short-hr-center">{content.title}</h2>
              <p className='font-weight-light text-mode'>{content.tagline}</p>
            </div>
          </div>
          <div className="timeline-container">
            {
              ordinaryData.map(item => (
                <SingleContainer key={item.id} item={item} />
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Roadmap;
