import React, { Component } from 'react';


class AlphaButton extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
            helperArr : [0]
        }
        
    }
    handleClick(e){
        this.setState({
            helperArr: this.state.helperArr.concat(e.key)
          })
        if([...this.state.helperArr].indexOf(e.key) === -1){
            this.props.handleGuess(e.key);
        }else{
            // alert("it is same number")
        }
    }


    render(){
        
       /*  let buttons = "abcdefghijklmnopqrstuvwxyz".split("").map((val, i)=>{
            return <button 
                        type="text"
                        key={i}
                        value={val}
                        onClick={this.handleClick}
                        disabled = {this.props.dis.has(val)}>{val}
                    </button>
        }) */
        return(
            <div><input type="text" id="one" onKeyPress={this.handleClick}/></div>
        )
    }
  }


  export default AlphaButton;