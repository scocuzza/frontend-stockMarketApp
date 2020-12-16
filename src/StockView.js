import React, { Component } from 'react'
import Navbar from './Navbar'
import { Accordion, Button, Icon, Table } from 'semantic-ui-react'
import StockPriceChart2 from './StockPriceChart2'
import AddToWatchlistModal from './AddToWatchlistModal'
import axios from 'axios'

class StockView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            change: [],
            last: [],
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
        try {
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
                if(this.props.showPoints) {
                    this.setState({
                        netChange: this.state.data.netChange
                    })
                } else {
                    this.setState({
                        netChange: ((this.state.data.netChange / this.state.data.openPrice) * 100).toFixed(2)
                    })
                }
            })
        } catch (error) {
            console.log('unable to get stock data');
        }
       
    }
    componentDidMount() {
        // this.getStockData()
        this.getData = setInterval( ()=> {
             this.props.getCurrentStockData()
          },5000)
    }
    componentWillUnmount() {
        clearInterval(this.getData)
        this.getData = null
    }
    render() {
        const { activeIndex } = this.state
        let currentStock = this.props.currentStockData.symbol
        let netChange = this.props.currentStockChange;
        let description = this.props.currentStockData.description
        let lastPrice = this.props.currentStockData.lastPrice
        let openPrice = this.props.currentStockData.openPrice
        let totalVolume = this.props.currentStockData.totalVolume
        let weekHigh = this.props.currentStockData['52WkHigh']
        let weekLow = this.props.currentStockData['52WkLow']
        let isLoggedIn = Object.keys(this.props.currentUser).length !== 0
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
                getStockHistory={this.getIndiceData}
                getCurrentStockData={this.props.getCurrentStockData}
                getCurrentStockHistory={this.props.getCurrentStockHistory}/>
            <h1 style={{textAlign: 'center'}}>{currentStock} {isLoggedIn ? <Button  onClick={this.props.openAddStockToWatchlistModal}>+</Button> : null}</h1> 
            <StockPriceChart2 currentStock={this.props.currentStock} time={this.props.currentStockHistoryTime} price={this.props.currentStockHistoryPrice}/>
            <Accordion styled fluid>
                <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                {currentStock} <span style={ netChange >= 0 ? {color:'green'} : {color:'red'}} > {netChange >= 0 ? <Icon name='caret up'/> : <Icon name='caret down'/>}{netChange} {!this.props.showPoints ? '%' : null}</span>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                <Table basic='very' celled collapsing>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Open Price</Table.HeaderCell>
                        <Table.HeaderCell>Last Price</Table.HeaderCell>
                        <Table.HeaderCell>Total Volume</Table.HeaderCell>
                        <Table.HeaderCell>52WkHigh</Table.HeaderCell>
                        <Table.HeaderCell>52WkLow</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>{description}</Table.Cell>
                        <Table.Cell>{openPrice}</Table.Cell>
                        <Table.Cell>{lastPrice}</Table.Cell>
                        <Table.Cell>{totalVolume}</Table.Cell>
                        <Table.Cell>{weekLow}</Table.Cell>
                        <Table.Cell>{weekHigh}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
                </Accordion.Content>
            </Accordion>
            <AddToWatchlistModal  open={this.props.openAddStock}
                                  watchlistOptions={this.props.watchlistOptions}
                                  close={this.props.closeModal}
                                  handleNewStockChange={this.props.handleNewStockChange}
                                  addStockToWatchlist={this.props.addStockToWatchlist}/>
            </>
        )
    }
}

export default StockView