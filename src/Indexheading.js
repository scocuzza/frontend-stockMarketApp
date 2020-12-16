import React, { Component } from 'react'
import { Statistic, Icon } from 'semantic-ui-react'
import StockPriceChart from './StockPriceChart'

class Indexheading extends Component {        
    render() {

        return(
        <Statistic.Group widths='three' >
          <Statistic>
            <Statistic.Value>{this.props.dowLast}</Statistic.Value>
            <Statistic.Label ><span style={ this.props.dowChange >= 0 ? {color:'green'} : {color:'red'}}>  {this.props.dowChange >= 0  ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.props.dowChange} {this.props.showPoints ? null : '%'}</span></Statistic.Label>
            <Statistic.Label>Dow Jones Industrial Average  </Statistic.Label>
            <StockPriceChart ticker="$DJI"/>
          </Statistic>
          <Statistic >
            <Statistic.Value >{this.props.nasLast}</Statistic.Value>
            <Statistic.Label><span style={ this.props.nasChange >= 0 ? {color:'green'} : {color:'red'}}>  {this.props.nasChange >= 0  ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.props.nasChange} {this.props.showPoints ? null : '%'} </span></Statistic.Label>
            <Statistic.Label>Nasdaq Composite</Statistic.Label>
            <StockPriceChart ticker="$COMPX"/>
          </Statistic>
      
          <Statistic >
            <Statistic.Value >{this.props.spLast}</Statistic.Value>
            <Statistic.Label> <span style={ this.props.spChange >= 0 ? {color:'green'} : {color:'red'}}>  {this.props.spChange >= 0  ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.props.spChange}{this.props.showPoints ? null : '%'}</span></Statistic.Label>
            <Statistic.Label>S&P 500 Index</Statistic.Label>
            <StockPriceChart ticker="$SPX.X"/>
          </Statistic>
      
        </Statistic.Group>
        )
    }
    
    


}


export default Indexheading