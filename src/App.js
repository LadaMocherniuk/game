import React from 'react';
import './App.css';

const WINNER_MATCHES_COUNT = 3;
const MAX_STEPS_COUNT = 9;

class App extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            areas: Array(9).fill(null),
            filledAreasCoordination: {
                '0': {'x': [], 'y': []},
                'x': {'x': [], 'y': []}
            },
        
            step: 1,
        }
    }

    clickHandler = e => {
        let data = e.target.getAttribute('data');
        let zone = this.state.areas;
        let xCoordination = e.target.getAttribute('data-x');
        let yCoordination = e.target.getAttribute('data-y');
        let isXStep;
        let winner;
        let currentPlayerCoordination;
        
        if (zone[data] === null) {
            if (this.state.step % 2 === 0) {
                isXStep = false;
                zone[data] = 'O';
            } else {
                isXStep = true;
                zone[data] = 'X';
            }
            this.setState({step: this.state.step + 1});
            this.setState({areas: zone});
            if (isXStep) {
                currentPlayerCoordination = this.state.filledAreasCoordination['x'];
                currentPlayerCoordination['x'].push(xCoordination);
                currentPlayerCoordination['y'].push(yCoordination);
            } else {
                currentPlayerCoordination = this.state.filledAreasCoordination['0'];
                currentPlayerCoordination['x'].push(xCoordination);
                currentPlayerCoordination['y'].push(yCoordination);
            }

            if (this.isWinner(currentPlayerCoordination) === true) {
                winner = isXStep ? 'X' : 'O';
                this.setState({step: 1});
                alert('Winner: ' + winner + ' player');
                setTimeout(() =>{
                    this.setState({areas: Array(9).fill(null)});
                    this.setState({step: 0});
                }, 2000);
            };
            if (this.state.step === MAX_STEPS_COUNT) {
                this.setState({step: 1});
                alert('Draw');
                setTimeout(() =>{
                    this.setState({areas: Array(9).fill(null)});
                    this.setState({step: 0});
                }, 2000);
            }
        }
    }

    isWinner = (playerCoordination) => {
        if (playerCoordination['x'].length < WINNER_MATCHES_COUNT) {
            return false;
        }

        let gorizotalMatches = this.maxCountDuplicates(playerCoordination['x']);
        let verticalMatches = this.maxCountDuplicates(playerCoordination['y']);
        let diagonalMatches = 0;
        for (let i = 0; i < playerCoordination['x'].length; i++) {
            if (playerCoordination['x'][i] === playerCoordination['y'][i]) {
                diagonalMatches++;
            }
        }

        if (
            gorizotalMatches === WINNER_MATCHES_COUNT 
            || verticalMatches === WINNER_MATCHES_COUNT
            || diagonalMatches === WINNER_MATCHES_COUNT
        ) {
            return true;
        }

        return false;
    }

    maxCountDuplicates = (array) => {
        let checked = [];
        let mainMatches = 1;
        let insideMatches = 1;

        for (let i = 0; i < array.length; i++) {
            if (insideMatches > mainMatches) {
                mainMatches = insideMatches;
            }
            if (!checked.includes(array[i])) {
                insideMatches = 1;
                for (let j = 0; j < array.length; j++) {
                    if (j !== i && array[i] === array[j]) {
                        insideMatches++;
                    }
                }
            }
            
            checked.push(array[i]);
        }

        return mainMatches;
    }

    render(){
        return(
            <div className="block">
                <div className="grid" onClick={this.clickHandler} data="0" data-x="1" data-y="1">
            {this.state.areas[0]}
                </div>
                <div className="grid" onClick={this.clickHandler}  data="1" data-x="1" data-y="2">
            {this.state.areas[1]}    
                </div>
                <div className="grid" onClick={this.clickHandler} data="2" data-x="1" data-y="3">
            {this.state.areas[2]}        
                </div>
                <div className="grid" onClick={this.clickHandler} data="3" data-x="2" data-y="1">
            {this.state.areas[3]}        
                </div>
                <div className="grid" onClick={this.clickHandler} data="4" data-x="2" data-y="2">
            {this.state.areas[4]}    
                </div>
                <div className="grid" onClick={this.clickHandler} data="5" data-x="2" data-y="3">
            {this.state.areas[5]}    
                </div>
                <div className="grid" onClick={this.clickHandler} data="6" data-x="3" data-y="1">
            {this.state.areas[6]}  
                </div> 
                <div className="grid" onClick={this.clickHandler} data="7" data-x="3" data-y="2">
            {this.state.areas[7]}
                </div>   
                <div className="grid" onClick={this.clickHandler} data="8" data-x="3" data-y="3">
            {this.state.areas[8]}    
                </div>
            </div>
            
        )
    };
};
export default App;