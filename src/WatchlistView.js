import React, { Component } from 'react'
import { Divider, Grid, Segment, Icon, Table, Header, Image} from 'semantic-ui-react'
import StockPriceChart2 from './StockPriceChart2'
import Navbar from './Navbar'

class WatchlistView extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: null
        }
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
        let stocks = ''
        if(data === 'loaded') {
            let ticker = this.props.currentWatchlistStock
            // console.log(this.props.watchlistStockData2[ticker].lastPrice);
            stocks = this.props.watchlistStockData.map(stock => {
                        return <>
                        
                        <a onClick={this.props.setCurrentWatchlistStock}>{stock.name}</a> 
                        <span style={ stock.netChange >= 0 ? {color:'green'} : {color:'red'}}>  {stock.netChange >= 0 ? <Icon name='caret up'/> : <Icon name='caret down'/> } {stock.netChange} {this.props.showPoints ? null : '%'}</span>
                            <Divider />
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
                                    <Segment style={{overflow: 'auto', height: '100%', maxHeight: '100%', width: 160 }}>{stocks}</Segment>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <h1 style={{textAlign: 'center'}}>{this.props.currentWatchlistStock}</h1>
                                    <StockPriceChart2 width='100%' price={this.props.watchlistStockHistoryPrice} time={this.props.watchlistStockHistoryTime}/>       
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
                                        {/* <Table.Cell>{(this.props.watchlistStockData2[ticker].lastPrice).toFixed(0)}</Table.Cell> */}
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
                                        {/* <Table.Cell>{(this.props.watchlistStockData2[ticker].openPrice).toFixed(0)}</Table.Cell> */}
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
                                        {/* <Table.Cell>{(this.props.watchlistStockData2[ticker].highPrice).toFixed(0)}</Table.Cell> */}
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
                                        {/* <Table.Cell>{(this.props.watchlistStockData2[ticker].lowPrice).toFixed(0)}</Table.Cell> */}
                                        </Table.Row>
                                    </Table.Body>
                                    </Table>
                                </Grid.Column>
                                </Grid>
                            </Segment>
                        </>
                     )
        } else  {
            return <h1>Loading...</h1>
        }
    }
}

export default WatchlistView