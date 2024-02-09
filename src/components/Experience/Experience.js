import React,{useContext} from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Experience.css';

import { experienceData } from '../../data/experienceData';
import ExperienceCard from './ExperienceCard';
import vl from '../../assets/png/valuelabs_logo.jpg';
import teradata from '../../assets/png/teradata_logo.jpg';

function Experience() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="experience" id="experience" style={{backgroundColor: theme.secondary}}> 
             <div className="experience-body">
                <div className='exp-bdy'>
                 <div className="experience-image">
                     
                 </div>
                 {<div className="experience-description">
                    <h1 className='hesd' style={{color:theme.primary}}>Experience</h1>
                    
                        <ExperienceCard />
                  
                 </div>}
                </div>
             </div>
        </div>

    )
}

export default Experience
