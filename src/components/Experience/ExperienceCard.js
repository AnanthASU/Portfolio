import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';

import { ThemeContext } from '../../contexts/ThemeContext';

import expImgWhite from '../../assets/svg/experience/expImgWhite.svg'
import expImgBlack from '../../assets/svg/experience/expImgBlack.svg'
import teradata from '../../assets/png/teradata_logo.jpg';
import vl from '../../assets/png/valuelabs_logo.jpg';

import './Experience.css'

function ExperienceCard({id, company, jobtitle, startYear, endYear}) {

    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        experienceCard : {
            backgroundColor:theme.primary30,
            "&:hover": {
                backgroundColor:theme.primary50,
            },
        },
    }));

    const classes = useStyles();


    return (
        <Fade bottom>
             <div className='exp-multi'>
                 <div className="expcard-img" >
                 <img src={teradata} alt="" />
                </div>
                 <div className="experience-details">
                <h1 style={{color: theme.tertiary80}} className='uni'>Teradata</h1>
                <div className='exp-wr'>
                <div className='education-wrap'>
                    <h4 style={{color: theme.tertiary}} className='course'>Software Engineer Intern</h4>
                    <h4 style={{color: theme.primary}} className='year'>May 2023 - December 2023</h4>
                    </div>
                    <div className='exp-txt'>Part of the Lake Console UI Team, contributing to the development of Teradata's Vantage Lake product, focusing on the web-facing interface.</div>
                    </div>
                </div>
                </div>
                 <div className='exp-multi'>
                 <div className="expcard-img" >
                 <img src={vl} alt="" />
                </div>
                 <div className="experience-details">
                <h1 style={{color: theme.tertiary80}} className='uni'>ValueLabs</h1>
                <div className='exp-wr'>
                <div className='education-wrap'>
                    <h4 style={{color: theme.tertiary}} className='course'>Senior Software Engineer</h4>
                    <h4 style={{color: theme.primary}} className='year'>March 2022- July 2022</h4>
                    </div>
                    <div className='exp-txt'>Part of the Lake Console UI Team, contributing to the development of Teradata's Vantage Lake product, focusing on the web-facing interface.</div>
                    <div className='education-wrap'>
                    <h4 style={{color: theme.tertiary}} className='course'>Software Engineer</h4>
                    <h4 style={{color: theme.primary}} className='year'>June 2020 - March 2022</h4>
                    </div>
                    <div className='exp-txt'>Part of the Lake Console UI Team, contributing to the development of Teradata's Vantage Lake product, focusing on the web-facing interface.</div>
                    <div className='education-wrap'>
                    <h4 style={{color: theme.tertiary}} className='course'>Software Engineer Intern</h4>
                    <h4 style={{color: theme.primary}} className='year'>January 2020 - May 2020</h4>
                    </div>
                    <div className='exp-txt'>Part of the Lake Console UI Team, contributing to the development of Teradata's Vantage Lake product, focusing on the web-facing interface.</div>
                    </div>
                </div>
                </div>
        </Fade>   
    )
}

export default ExperienceCard
