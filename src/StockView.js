import React, { Component } from 'react'
import Navbar from './Navbar'
import { Accordion, Icon } from 'semantic-ui-react'
import StockPriceChart from './StockPriceChart'
import StockPriceChart2 from './StockPriceChart2'
import axios from 'axios'

class StockView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            time: [],
            price: []
        }
    }
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    getStockData = () => {
        console.log('getting stock data');
        axios({
            url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
            params: {
                apikey: process.env.REACT_APP_API_KEY_TD,
                symbol: this.props.currentStock
            }
        }).then(response => {
            console.log(Object.keys(response.data));
            this.setState({
                symbol: Object.keys(response.data),
                data: response.data
            })
            let ticker = Object.keys(this.state.data)
            this.setState({
                data: this.state.data[ticker]
            })
        })
    }
    
    componentDidMount() {
        this.getStockData()
    }
    render() {
        const { activeIndex } = this.state
        return(
            <>
            <Navbar showNewUserModal={this.props.showNewUserModal}
                showLoginUserModal={this.props.showLoginUserModal}
                newUser={this.props.newUser}
                currentUser={this.props.currentUser}
                handleNewUserChange={this.props.handleNewUserChange}
                handleStockSearch={this.props.handleStockSearch}
                closeModal={this.props.closeModal}
                closeAndCreate={this.props.closeAndCreate}
                closeAndLogin={this.props.closeAndLogin}
                openNewUserModal={this.props.openNewUserModal}
                openLoginUserModal={this.props.openLoginUserModal}
                logout={this.props.logout}
                toggleStat={this.props.toggleStat}
                showPoints={this.props.showPoints}
                getStockData={this.getStockData}
                getStockHistory={this.getIndiceData}/>
            <h1 style={{textAlign: 'center'}}>{this.state.symbol}</h1>
            <StockPriceChart2 currentStock={this.props.currentStock} time={this.state.time} price={this.state.price}/>
            <Accordion styled fluid>
                <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                {this.state.symbol}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                </Accordion.Content>
            </Accordion>
            </>
        )
    }
}

export default StockView