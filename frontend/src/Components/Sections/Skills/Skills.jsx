'use client'
import { useMemo, useState } from 'react';
import Skill from './Components/Skill';
import { Tag } from '@/Components/UI';
import { InView } from 'react-intersection-observer';


function Skills({ skills, tags, content }) {
    const [category, setCategory] = useState('Vision & Strategy');
    const [dataSkills, setDataSkills] = useState([])

    useMemo(() => {
        const targetSkills = skills
            .filter(skill => skill.fields.category[0] === category)
            .sort((a, b) => a.fields.order - b.fields.order)
        setDataSkills(targetSkills);
    }, [category, skills]);


    return (
        <section className='container large-margin' id='Skills' >
            <div className="row tiny-margin">
                <div className="col-md-11 main-title">
                    <h2 className="short-hr-left">{content.title}</h2>
                    <p className='font-weight-light text-mode'>{content.tagline}</p>
                </div>
            </div>
            <Tag title='Skills' tags={tags} handleTags={setCategory} activeTag={category} />
            {/* tabs */}
            <InView as="div" className="skills">
                {({ inView, ref, entry }) => (
                    <div ref={ref}>
                        {
                            dataSkills?.map((skillItem) => (
                                <Skill skill={skillItem} key={skillItem.id} controls={inView} />
                            ))
                        }
                    </div>
                )}
            </InView>
        </section>
    )
}

export default Skills