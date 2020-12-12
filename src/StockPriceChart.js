import React, { Component } from 'react';
import Chart from "react-apexcharts"
import axios from 'axios'

class StockPriceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
              chart: {
                type: 'area',
              },
              dataLabels: {
                  enabled: false
              },
              xaxis: {
                type: 'datetime',
                categories: []
              }
            },
            series: [
              {
                name: "Index Price",
              }
            ]
          };
        }
        componentDidMount() {
            this.getIndiceData()
        }
        getIndiceData = () => {
            let ticker = this.props.ticker
            axios({
                url: `https://api.tdameritrade.com/v1/marketdata/${ticker}/pricehistory`,
                params: {
                    apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
                    periodType: 'ytd',
                    period: '1',
                    frequencyType: 'daily',
                    frequency: '1'
                }
            }).then(response => {
                const timedata = response.data.candles.map(element => {
                    return element.datetime
                });
                const pricedata = response.data.candles.map(element => {
                    return Math.round(element.close, 0)
                })
                this.setState({
                    options: {
                        chart: {
                          id: "basic-bar",
                          type: 'area'
                        },

                        xaxis: {
                          type: 'datetime',
                          categories: timedata
                        }
                      },
                      series: [
                        {
                          name: response.data.symbol,
                          data: pricedata
                        }
                      ]
                    })
                })
            .catch( e => {console.log((e));})
        }
      render() {
        return (
                <Chart className="chart"
                  options={this.state.options}
                  series={this.state.series}
                  width="60%"
                  type='area'
                />
        );
      }
}

export default StockPriceChart