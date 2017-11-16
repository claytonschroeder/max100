import React, { Component } from 'react';

import classes from '../Project.css'

class Objectives extends Component {
    render () {
        return (
            <div className={ classes.Objectives }>
                <h3>Objectives</h3>
                <div className={ classes.Primary }>
                    <h4>Objective 1</h4>
                    <div className={ classes.Secondary }>
                        <h4>Objective 1.1</h4>
                            <div className={ classes.Tertiary }>
                                <h4>Objective 1.1.1</h4>  
                                <h4>Objective 1.1.2</h4>  
                                <h4>Objective 1.1.3</h4>  
                                <h4>Objective 1.1.4</h4>      
                            </div>
                        <h4>Objective 1.2</h4>
                        <h4>Objective 1.3</h4>
                            <div className={ classes.Tertiary }>
                                <h4>Objective 1.3.1</h4>  
                                <h4>Objective 1.3.2</h4>  
                                <h4>Objective 1.3.3</h4>    
                            </div>
                    </div>
                </div>
                <div className={ classes.Primary }>
                    <h4>Objective 2</h4>
                    <div className={ classes.Secondary }>
                        <h4>Objective 2.1</h4>
                            <div className={ classes.Tertiary }>
                                <h4>Objective 2.1.1</h4>  
                                <h4>Objective 2.1.2</h4>  
                                <h4>Objective 2.1.3</h4>  
                                <h4>Objective 2.1.4</h4>      
                            </div>
                        <h4>Objective 2.2</h4>
                        <h4>Objective 2.3</h4>
                            <div className={ classes.Tertiary }>
                                <h4>Objective 2.3.1</h4>  
                                <h4>Objective 2.3.2</h4>  
                                <h4>Objective 2.3.3</h4>  
                                <h4>Objective 2.3.4</h4>      
                            </div>
                        <h4>Objective 2.4</h4>
                    </div>
                </div>
                <div className={ classes.Primary }>
                    <h4>Objective 3</h4>
                    <div className={ classes.Secondary }>
                        <h4>Objective 3.1</h4>
                        <h4>Objective 3.2</h4>
                    </div>
                </div>
                <div className={ classes.Primary }>
                    <h4>Objective 4</h4>
                    <div className={ classes.Secondary }>
                        <h4>Objective 4.1</h4>
                        <h4>Objective 4.2</h4>
                        <h4>Objective 4.3</h4>
                    </div>
                </div>
                <div className={ classes.Primary }>
                    <h4>Objective 5</h4>
                    <div className={ classes.Secondary }>
                        <h4>Objective 5.1</h4>
                    </div>
                </div>
                <div className={ classes.Primary }>
                    <h4>Objective 6</h4>
                    <div className={ classes.Secondary }>
                        <h4>Objective 6.1</h4>
                    </div>
                </div>
            </div>
 
        );
    }
}

export default Objectives;