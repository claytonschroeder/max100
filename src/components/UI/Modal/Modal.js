import React from 'react';

import classes from './Modal.css';

import dragSubs from '../../../assets/images/Alts_Max100.jpg'

const modal = (props) => {
    const getBodyText = (title) => {
        switch(title){
            case 'SMARTER':
                return(
                    <div style={{ display: 'flex' }}>
                        <div>
                        <p>In the 'Smarter' weighting approach...</p>
                        <p>Before starting, please review the criteria hierarchy in the model figure to the right. You will be asked to rank and rate the sub-criteria and the main criteria separately. Definitions for each criterion can be found in Table 1 in the accompanying ‘Case Study Narrative’ document.</p>
                        <p>You can come back to this figure any time by pressing the ‘Info’ button on each page.</p>
                        </div>
                        <div>
                            <img style={{width: '80%'}} src={dragSubs} alt="Drag and Drop Example"/>
                        </div>
                    </div>
                )
            case 'Swing Weighting':
                return(
                    <div style={{ display: 'flex' }}>
                        <div>
                        <p>In the 'Swing Weighting' approach...</p>
                        <p>Before starting, please review the criteria hierarchy in the model figure to the right. You will be asked to rank and rate the sub-criteria and the main criteria separately. Definitions for each criterion can be found in Table 1 in the accompanying ‘Case Study Narrative’ document.</p>
                        <p>You can come back to this figure any time by pressing the ‘Info’ button on each page.</p>
                        </div>
                        <div>
                            <img style={{width: '80%'}} src={dragSubs} alt="Drag and Drop Example"/>
                        </div>
                    </div>
                )
            case 'Max 100':
                return(
                    <div style={{ display: 'flex' }}>
                        <div>
                        <p>In the 'Max100' weighting approach, criteria weights are defined in two steps - first by RANKING the criteria and sub-criteria by importance, then by RATING their relative importance on a 0-100 scale. These rankings and ratings will be used to define your weights.</p>
                        <p>Before starting, please review the criteria hierarchy in the figure to the right. You will be asked to rank and rate the importance of the sub-criteria and main criteria separately. Definitions for each criterion can be found in Table 1 in the accompanying ‘Case Study Narrative’ document.</p>
                        <p>You can come back to this figure any time by pressing the ‘Info’ button on each page.</p>
                        </div>
                        <div>
                            <img style={{width: '80%'}} src={dragSubs} alt="Drag and Drop Example"/>
                        </div>
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
                <div className={ classes.Centered }>
                <button className={ classes.Button } onClick={() => props.close()}>Close</button>
                </div>
            </div>
        </div>
    );

};

export default modal;