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
                }
            },
            series: [
                {
                name: "Index Price",
                }
            ]
            };
        }
        componentDidMount = () => {
            this.updateChart = setInterval(()=> {
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
                        categories: this.props.time
                        }
                    },
                    series: [
                        {
                        name: "Index Price",
                        data: this.props.price
                        }
                    ]
                });
            }, 2000)
           
        }
        componentWillUnmount = () => {
            clearInterval(this.updateChart)
            this.updateChart = null
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