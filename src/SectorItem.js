import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

class SectorItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            netChange: 0,
            description: ''
        }
    }
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  render() {
    const { activeIndex } = this.state
    let isPositive;
    this.state.netChange >= 0 ? isPositive = true : isPositive = false
    return (
        <>
        <Accordion.Title
          active={activeIndex === this.props.index}
          index={this.props.index}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
            {this.props.name} <span style={ isPositive ? {color:'green'} : {color:'red'}}>  {isPositive ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.props.change} {this.props.showPoints ? null : '%'}</span>
        </Accordion.Title>
        
        <Accordion.Content active={activeIndex === this.props.index}>
          <p>
            {this.state.description}
          </p>
        </Accordion.Content>
        </>
    )
  }
}

export default SectorItem