import React, { Component } from 'react';
import Chart from "react-apexcharts"
import axios from 'axios'

class StockPriceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                type: 'datetime',
              }
            },
            series: [
              {
                name: "series-1",
              }
            ]
          };
        }
        componentDidMount() {
            this.getIndiceMonthData()
        }
        getIndiceMonthData = () => {
            axios({
                url: 'https://api.tdameritrade.com/v1/marketdata/$DJI/pricehistory',
                params: {
                    apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
                    periodType: 'month',
                    period: '1',
                    frequencyType: 'daily',
                    frequency: '1'
                }
            }).then(response => {
                const timedata = response.data.candles.map(element => {
                    return element.datetime
                });
                const pricedata = response.data.candles.map(element => {
                    return element.close
                })
                this.setState({
                    options: {
                        chart: {
                          id: "basic-bar"
                        },
                        xaxis: {
                          type: 'datetime',
                          categories: timedata
                        }
                      },
                      series: [
                        {
                          name: "series-1",
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
                  type="line"
                  width="80%"
                />
        );
      }
}

export default StockPriceChart