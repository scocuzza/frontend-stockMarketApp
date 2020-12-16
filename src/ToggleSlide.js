import React, { Component } from 'react';
import { Menu, Icon, Checkbox, Label } from 'semantic-ui-react'

class ToggleSlide extends Component{
    render(){
        let showPoints = this.props.showPoints
        return(
            <>
            {showPoints ? <Checkbox label="Show Points" toggle checked={this.props.showPoints} onChange={this.props.toggleStat}/> :  <Checkbox label="Show Percent" toggle checked={this.props.showPoints} onChange={this.props.toggleStat}/>}
            </>
        )
    }
}

export default ToggleSlide