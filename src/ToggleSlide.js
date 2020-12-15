import React, { Component } from 'react';
import { Menu, Icon, Checkbox } from 'semantic-ui-react'

class ToggleSlide extends Component{
    render(){
        return(
            <Checkbox toggle checked={this.props.showPoints} onChange={this.props.toggleStat}/>
        )
    }
}

export default ToggleSlide