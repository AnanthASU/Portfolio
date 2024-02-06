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
            <div key={id} className={`experience-card`}>
                <div className="expcard-img" >
                    <img src={id === 1 ? teradata : vl} alt="" />
                </div>
                <div className="experience-details">
                <div className='education-wrap'>
                <h1 style={{color: theme.tertiary80}} className='uni'>{company}</h1>
                    <h4 style={{color: theme.primary}} className='year'>{startYear}-{endYear}</h4>
                    </div>
                    <h4 style={{color: theme.tertiary}} className='course'>{jobtitle}</h4>
                </div>
            </div>
        </Fade>   
    )
}

export default ExperienceCard
