import React from 'react';

import classes from './Modal.css';

const modal = (props) => {
    const getBodyText = (title) => {
        switch(title){
            case 'SMARTER':
                return(<p>Some instructions about the smarter technique</p>)
            case 'Swing Weighting':
                return(<p>Some instructions about the swing weighting technique</p>)
            case 'Max 100':
                return(<p>Some instructions about the max 100 technique</p>)
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