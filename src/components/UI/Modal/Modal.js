import React from 'react';

import classes from './Modal.css';

import dragSubs from '../../../assets/images/drag_subs.jpg'

const modal = (props) => {
    const getBodyText = (title) => {
        switch(title){
            case 'SMARTER':
                return(
                    <div>
                        <p>Some instructions about the smarter technique</p>
                        <img src={dragSubs} alt="Drag and Drop Example"/>
                    </div>
                )
            case 'Swing Weighting':
                return(
                    <div>
                        <p>Some instructions about the swing weighting technique</p>
                        <img src={dragSubs} alt="Drag and Drop Example"/>
                    </div>
                )
            case 'Max 100':
                return(
                    <div>
                        <p>In the 'Max100' weighting approach, criteria weights are defined through two steps - first by RANKING the criteria and sub-criteria by importance, followed by RATING their relative importance on a 0-100 scale.The following questions will ask you to review a number of evaluation criteria for a hypothetical alternatives analysis, and provide your take on the relative importance of each criterion.</p>
                        <img src={dragSubs} alt="Drag and Drop Example"/>
                    </div>
                )
            default: return null
        }
    }

    const body = getBodyText(props.title);
    return (
        <div className={ classes.ModalBackdrop } onClick={() => props.close()}>
            <div className={classes.Modal}>
                <h4>{ props.title }</h4>
                { body }
                <button onClick={() => props.close()}>Close</button>
            </div>
        </div>
    );

};

export default modal;