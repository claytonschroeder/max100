import React, { Component } from 'react';

import classes from '../../Project.css'

class Alternative extends Component {
    getRandomNumber = () => {
        return Math.floor(Math.random() * 10) + 1 
    }

    getRandomColor = () => {
        const colors = ['red', 'green', 'blue', 'yellow', 'orange']
        return colors[Math.floor(Math.random() * 5)] 
    }

    getRandomRank = () => {
        const rank = ['weakest', 'weak', 'regular', 'strong', 'strongest']
        return rank[Math.floor(Math.random() * 5)] 
    }

    render () {
        return (
            <div className={ classes.Alternative }>
                <h3>{ this.props.name }</h3>
                <div>
                    <h4 className={ classes.Hide }>Objective 1</h4>
                    <div>
                        <h4 className={ classes.Hide }>Objective 1.1</h4>
                            <div>
                                <h4>{ this.getRandomNumber() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>      
                            </div>
                        <h4>{ this.getRandomColor() }</h4>
                        <h4 className={ classes.Hide }>Objective 1.3</h4>
                            <div>
                                <h4>{ this.getRandomRank() }</h4>  
                                <h4>{ this.getRandomRank() }</h4>  
                                <h4>{ this.getRandomRank() }</h4>    
                            </div>
                    </div>
                </div>
                <div>
                    <h4 className={ classes.Hide }>Objective 2</h4>
                    <div>
                        <h4 className={ classes.Hide }>Objective 2.1</h4>
                            <div>
                                <h4>{ this.getRandomRank() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>      
                            </div>
                        <h4>{ this.getRandomColor() }</h4>
                        <h4 className={ classes.Hide }>Objective 2.3</h4>
                            <div>
                                <h4>{ this.getRandomRank() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>  
                                <h4>{ this.getRandomRank() }</h4>  
                                <h4>{ this.getRandomNumber() }</h4>      
                            </div>
                        <h4>{ this.getRandomColor() }</h4>
                    </div>
                </div>
                <div>
                    <h4 className={ classes.Hide }>Objective 3</h4>
                    <div>
                        <h4>{ this.getRandomNumber() }</h4>
                        <h4>{ this.getRandomColor() }</h4>
                    </div>
                </div>
                <div>
                    <h4 className={ classes.Hide }>Objective 4</h4>
                    <div>
                        <h4>{ this.getRandomColor() }</h4>
                        <h4>{ this.getRandomNumber() }</h4>
                        <h4>{ this.getRandomColor() }</h4>
                    </div>
                </div>
                <div>
                    <h4 className={ classes.Hide }>Objective 5</h4>
                    <div>
                        <h4>{ this.getRandomNumber() }</h4>
                    </div>
                </div>
                <div>
                    <h4 className={ classes.Hide }>Objective 6</h4>
                    <div>
                        <h4>{ this.getRandomNumber() }</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alternative;