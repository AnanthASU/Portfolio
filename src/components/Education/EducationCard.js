import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';

import { ThemeContext } from '../../contexts/ThemeContext';

import eduImgWhite from '../../assets/svg/education/eduImgWhite.svg'
import eduImgBlack from '../../assets/svg/education/eduImgBlack.svg'
import asu from '../../assets/png/asu_logoy.png';
import jgi from '../../assets/png/jgi_logo.jpg'
import './Education.css'

function EducationCard({ id, institution, course, startYear, endYear }) {

    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        educationCard : {
            backgroundColor:theme.primary30,
            "&:hover": {
                
            },
        },
    }));

    const classes = useStyles();

    return (
        <Fade bottom>
            <div key={id} className={`education-card ${classes.educationCard}`} >
                <div className="educard-img" style={{backgroundColor: theme.primary}}>
                    <img src={id === 1 ? asu : jgi} alt="" />
                </div>
                <div className="education-details">
                    <div className='education-wrap'>
                <h1 style={{color: theme.tertiary80}} className='uni'>{institution}</h1>
                    <h4 style={{color: theme.primary}} className='year'>{startYear}-{endYear}</h4>
                    </div>
                    <h4 style={{color: theme.tertiary}} className='course'>{course}</h4>
                </div>
            </div>
        </Fade>        
    )
}

export default EducationCard
