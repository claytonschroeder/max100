import React, { Component } from 'react';
import axios from '../../axios';

class Export extends Component {
    state = {
        max100Data: null,
        swingData: null,
        smarterData: null
    }
    exportData = () => {
        axios.get('.json')
            .then(response => {
                let max100Array = [];
                let swingArray = [];
                let smarterArray = [];
                const max100 = {...response.data.max100};
                const smarter = {...response.data.smarter};
                const swing = {...response.data.swing};
                for(let key in max100){
                    if(max100.hasOwnProperty(key)){
                        max100Array.push(max100[key]);
                    }
                }
                for(let key in smarter){
                    if(smarter.hasOwnProperty(key)){
                        smarterArray.push(smarter[key]);
                    }
                }
                for(let key in swing){
                    if(swing.hasOwnProperty(key)){
                        swingArray.push(swing[key]);
                    }
                }
                this.setState({
                    max100Data: max100Array,
                    swingData: swingArray,
                    smarterData: smarterArray
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <button onClick={ this.exportData }>Export Data as JSON</button>
                <p>Max 100</p>
                <p>{ JSON.stringify(this.state.max100Data) }</p>
                <p>Swing Weighting</p>
                <p>{ JSON.stringify(this.state.swingData) }</p>
                <p>SMARTER</p>
                <p>{ JSON.stringify(this.state.smarterData) }</p>
            </div>
        );
    }
}

export default Export;
