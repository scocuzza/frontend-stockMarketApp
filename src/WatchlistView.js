import React, { Component } from 'react'
import { Divider, Grid, Segment, Icon, Table, Header, Loader, Menu, Accordion} from 'semantic-ui-react'
import StockPriceChart2 from './StockPriceChart2'
import Navbar from './Navbar'

class WatchlistView extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    }

    
    componentDidMount () {
        this.props.getWatchlistStockData().then( () => {
            this.setState({data: 'loaded'})
            this.refreshStockData = setInterval(()=>{
                this.props.getWatchlistStockData()
            },5000)
        })
    }
    componentWillUnmount() {
        clearInterval(this.refreshStockData)
        this.refreshStockData = null
    }
    loadData() {
    }
    render(){
        const data = this.state.data
        const { activeIndex } = this.state
        let stocks = ''
        if(data === 'loaded') {
            let ticker = this.props.currentWatchlistStock
            stocks = this.props.watchlistStockData.map(stock => {
                        return <>
                            <Menu.Item
                                name={stock.name}
                                >
                                <a onClick={this.props.setCurrentWatchlistStock} style={{cursor:'pointer'}}>{stock.name}</a><span style={ stock.netChange >= 0 ? {color:'green'} : {color:'red'}}>  {stock.lastPrice.toFixed(2)} {stock.netChange >= 0 ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.props.showPoints ? stock.netChange : ((stock.netChange / stock.openPrice) * 100).toFixed(2)} {this.props.showPoints ? null : '%'}</span>
                            </Menu.Item>

                        </>
                        
                    })
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
                             getCurrentStockHistory={this.props.getCurrentStockHistory}
                             createWatchlistOptions={this.props.createWatchlistOptions}/>
                             <Segment>
                                <Grid columns={3} divided>
                                <Grid.Column width={3}>
                                    {/* <Segment style={{overflow: 'auto', height: '100%', maxHeight: '100%', width: 160 }}>{stocks}</Segment> */}
                                    <Menu vertical style={{overflow: 'auto', maxHeight: '525px', width: '250px'}}>
                                        {stocks}
                                    </Menu>

                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <h1 style={{textAlign: 'center'}}>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].description)}</h1>
                                    <StockPriceChart2 width='60%' currentStockColor={this.props.currentStockColor} price={this.props.watchlistStockHistoryPrice} time={this.props.watchlistStockHistoryTime}/>       
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <h3 style={{textAlign: 'center'}}>Todays Details</h3>
                                    <h4>{this.props.currentWatchlistStock}</h4>
                                    <Table>                     
                                    <Table.Body>
                                        <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                            <Header.Content>
                                                Current
                                                <Header.Subheader><Icon name="check square outline"/></Header.Subheader>
                                            </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].lastPrice).toFixed(2)}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                            <Header.Content>
                                                Open
                                                <Header.Subheader><Icon name="check square outline"/></Header.Subheader>
                                            </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].openPrice).toFixed(2)}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                            <Header.Content>
                                                High
                                                <Header.Subheader><Icon name="sort amount up"/></Header.Subheader>
                                            </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].highPrice).toFixed(2)}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                            <Header.Content>
                                                Low
                                                <Header.Subheader><Icon name="sort amount down"/></Header.Subheader>
                                            </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].lowPrice).toFixed(2)}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    </Table>
                                </Grid.Column>
                                </Grid>
                            </Segment>
                                <Accordion className="accordian-watchlist" styled fluid>
                                <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}
                                >
                                <Icon name='dropdown' />
                                {this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].description)}
                                </Accordion.Title>
                                <Accordion.Content  active={activeIndex === 0}>
                                <Table basic='very' celled collapsing>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Asset Type</Table.HeaderCell>
                                        <Table.HeaderCell>Open Price</Table.HeaderCell>
                                        <Table.HeaderCell>Last Price</Table.HeaderCell>
                                        <Table.HeaderCell>High Price</Table.HeaderCell>
                                        <Table.HeaderCell>Total Volume</Table.HeaderCell>
                                        <Table.HeaderCell>52WkHigh</Table.HeaderCell>
                                        <Table.HeaderCell>52WkLow</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].description)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].assetType)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].openPrice).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].lastPrice).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].highPrice).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker].totalVolume).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker]['52WkHigh']).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{this.props.watchlistStockData2[ticker] == undefined ?  <Loader active inline /> : (this.props.watchlistStockData2[ticker]['52WkHigh']).toFixed(2)}</Table.Cell>
                                    </Table.Row>
                                    </Table.Body>
                                </Table>
                                </Accordion.Content>
                            </Accordion>
                        </>
                     )
        } else  {
            return <Loader size='huge' inline='centered'></Loader>
        }
    }
}

export default WatchlistView