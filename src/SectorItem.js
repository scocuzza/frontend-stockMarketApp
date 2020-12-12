import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import axios from 'axios'

class SectorItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            netChange: 0
        }
    }
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  componentDidMount() {
    this.getSectorData()
  }
  getSectorData = () => {
    axios({
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
            symbol: this.props.ticker
        }
    }).then(response => {
        let ticker = this.props.ticker
        console.log(response.data[ticker].netChange);
        this.setState({
            netChange: (response.data[ticker].lastPrice - response.data[ticker].openPrice).toFixed(2)

        })
    })
    .catch( e => {console.log((e));})
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
            {this.props.name} <span style={ isPositive ? {color:'green'} : {color:'red'}}>  {isPositive ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.state.netChange} </span>
        </Accordion.Title>
        
        <Accordion.Content active={activeIndex === this.props.index}>
          <p>
            {this.props.ticker}
          </p>
        </Accordion.Content>
        </>
    )
  }
}

export default SectorItem