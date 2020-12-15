import React, { Component } from 'react';
import Chart from "react-apexcharts"
import axios from 'axios'

class StockPriceChart2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                id: "basic-bar",
                type: 'area'
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
                data: []
                }
            ]
            };
        }
        getIndiceData = () => {
            console.log('getting history data');
            axios({
                url: `https://api.tdameritrade.com/v1/marketdata/${this.props.currentStock.toUpperCase()}/pricehistory`,
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
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: timedata
                        }
                        },
                        series: [
                        {
                            name: "Index Price",
                            data: pricedata
                        }
                        ]
                    })
            })
            .catch( e => {console.log((e));})
        }
        componentDidMount = () => {
                this.getIndiceData()
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

export default StockPriceChart2