import React, { Component } from 'react'
import { Statistic } from 'semantic-ui-react'
import axios from 'axios'

class Indexheading extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            dow: 0,
            nas: 0,
            sp: 0,
        }
    }
    componentDidMount() {
        this.getIndiceData()
        //setInterval(this.getIndiceData, 10000)
    }
    render() {
        return(
        <Statistic.Group widths='three'>
          <Statistic>
            <Statistic.Value>{this.state.dow}</Statistic.Value>
            <Statistic.Label>Dow Jones Industrial Average</Statistic.Label>
          </Statistic>
      
          <Statistic>
            <Statistic.Value>{this.state.nas}</Statistic.Value>
            <Statistic.Label>Nasdaq Composite</Statistic.Label>
          </Statistic>
      
          <Statistic>
            <Statistic.Value>{this.state.sp}</Statistic.Value>
            <Statistic.Label>S&P 500 Index</Statistic.Label>
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
            console.log(response);
            this.setState({
                dow: Math.round(response.data.$DJI.lastPrice,0),
                nas: Math.round(response.data.$COMPX.lastPrice,0),
                sp: Math.round(response.data['$SPX.X'].lastPrice,0)
            })
        })
        .catch( e => {console.log((e));})
    }
}


export default Indexheading