import React from 'react';

import compassLogo from '../../assets/images/compass-logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={compassLogo} alt="Compass Logo" />
    </div>
);

export default logo;