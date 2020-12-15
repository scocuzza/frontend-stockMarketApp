import React, { Component } from 'react'
import { Statistic, Icon } from 'semantic-ui-react'
import axios from 'axios'
import StockPriceChart from './StockPriceChart'

class Indexheading extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            dow: 0,
            nas: 0,
            sp: 0,
            dowData: 0,
            spData: 0,
            nasData: 0,
            showPoints: true
        }
    }
    componentDidMount() {
        this.getIndiceData()
        // setInterval( ()=> {
        //     this.getIndiceData()
        // },10000)
    }
    toggleStat = () => {
        if(this.state.showPoints) {
            this.setState({
                dowChange: ((this.state.dowData.netChange / this.state.dowData.openPrice) * 100).toFixed(2),
                spChange: ((this.state.spData.netChange / this.state.spData.openPrice) * 100).toFixed(2),
                nasChange: ((this.state.nasData.netChange / this.state.nasData.openPrice) * 100).toFixed(2),
                showPoints: false
            })
        } else {
            this.setState({
                dowChange: this.state.dowData.netChange,
                nasChange: this.state.nasData.netChange,
                spChange: this.state.spData.netChange,
                showPoints: true
            })
        }
        
    }
    render() {

        return(
        <Statistic.Group widths='three' >
          <Statistic onClick={() => this.toggleStat()}>
            <Statistic.Value>{this.state.dow}</Statistic.Value>
            <Statistic.Label ><span style={ this.state.dowChange >= 0 ? {color:'green'} : {color:'red'}}>  {this.state.dowChange >= 0  ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.state.dowChange} {this.state.showPoints ? null : '%'}</span></Statistic.Label>
            <Statistic.Label>Dow Jones Industrial Average  </Statistic.Label>
            <StockPriceChart ticker="$DJI"/>
          </Statistic>
          <Statistic onClick={() => this.toggleStat()}>
            <Statistic.Value >{this.state.nas}</Statistic.Value>
            <Statistic.Label><span style={ this.state.nasChange >= 0 ? {color:'green'} : {color:'red'}}>  {this.state.nasChange >= 0  ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.state.nasChange} {this.state.showPoints ? null : '%'} </span></Statistic.Label>
            <Statistic.Label>Nasdaq Composite</Statistic.Label>
            <StockPriceChart ticker="$COMPX"/>
          </Statistic>
      
          <Statistic onClick={() => this.toggleStat()}>
            <Statistic.Value >{this.state.sp}</Statistic.Value>
            <Statistic.Label> <span style={ this.state.spChange >= 0 ? {color:'green'} : {color:'red'}}>  {this.state.spChange >= 0  ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.state.spChange}{this.state.showPoints ? null : '%'}</span></Statistic.Label>
            <Statistic.Label>S&P 500 Index</Statistic.Label>
            <StockPriceChart ticker="$SPX.X"/>
          </Statistic>
      
        </Statistic.Group>
        )
    }
    getIndiceData = () => {
        axios({
            url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
            params: {
                apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
                symbol: '$DJI,$COMPX,$SPX.X'
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                dowData: response.data.$DJI,
                nasData: response.data.$COMPX,
                spData: response.data['$SPX.X'],
                dow: Math.round(response.data.$DJI.lastPrice,0),
                dowChange: Math.round(response.data.$DJI.netChange),
                nas: Math.round(response.data.$COMPX.lastPrice,0),
                nasChange: Math.round(response.data.$COMPX.netChange),
                sp: Math.round(response.data['$SPX.X'].lastPrice,0),
                spChange: Math.round(response.data['$SPX.X'].netChange),

            })
        })
        .catch( e => {console.log((e));})
    }
    


}


export default Indexheading