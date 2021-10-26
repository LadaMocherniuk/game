import React from 'react';
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        areas: Array(9).fill(null),
        step: 0,
    }
    this.combination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    };

    

clickHandler = e => {
    let data = e.target.getAttribute('data');
    let zone = this.state.areas;

    if(zone[data] === null){
        zone[data] = (this.state.step % 2 === 0 )? 'X' : 'O';
        this.setState({step: this.state.step + 1});
        this.setState({areas: zone});
    }else{
        return;
    }
    this.isWinner();
    
}
 isWinner = () => {
    let win = (this.state.step % 2 === 0 )? 'X' : 'O';
    for ( let i = 0; i < this.combination.length; i++){
        let line = this.combination[i];
        if(this.state.areas[line[0]] === win && 
            this.state.areas[line[1]] === win &&
            this.state.areas[line[2]] === win ){
                alert(win + '  player win 🏆');
            setTimeout(() =>{
                this.setState({areas: Array(9).fill(null)});
                this.setState({step: 0});
            }, 4000);
        }

    }

}

render(){
    return(
        <div className="block">
            <div className="grid" onClick={this.clickHandler} data="0">
        {this.state.areas[0]}
            </div>
            <div className="grid" onClick={this.clickHandler} data="1">
        {this.state.areas[1]}    
            </div>
            <div className="grid" onClick={this.clickHandler} data="2">
        {this.state.areas[2]}        
            </div>
            <div className="grid" onClick={this.clickHandler} data="3">
        {this.state.areas[3]}        
            </div>
            <div className="grid" onClick={this.clickHandler} data="4">
        {this.state.areas[4]}    
            </div>
            <div className="grid" onClick={this.clickHandler} data="5">
        {this.state.areas[5]}    
            </div>
            <div className="grid" onClick={this.clickHandler} data="6">
        {this.state.areas[6]}  
            </div> 
            <div className="grid" onClick={this.clickHandler} data="7">
        {this.state.areas[7]}
            </div>   
            <div className="grid" onClick={this.clickHandler} data="8">
        {this.state.areas[8]}    
            </div>
        </div>
    )
};
};
export default App;