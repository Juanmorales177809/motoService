import React, {createContext,Component} from "react";

export const ElementContext = createContext();

class ElementContextProvider  extends Component {
    state={
        initialBoxvalue:"None",
        radio0value:false,
        radio1value:false,
        radio2value:false,

    }

    changeBoxValue= (value)=>{
     this.setState({initialBoxvalue:value});
    }
    active0= ()=>{
     this.setState({radio0value:true});
     this.setState({radio1value:false});
     this.setState({radio2value:false});
    }
    active1= ()=>{
     this.setState({radio0value:false});
     this.setState({radio1value:true});
     this.setState({radio2value:false});
    }
    active2= ()=>{
     this.setState({radio0value:false});
     this.setState({radio1value:false});
     this.setState({radio2value:true});
    }
    
    render() { 
        return (<ElementContext.Provider value={{...this.state,changeBoxValue: this.changeBoxValue, active2: this.active2 , active1: this.active1, active0: this.active0 }}>
            {this.props.children}
        </ElementContext.Provider>);
    }
}
 
export default ElementContextProvider ;