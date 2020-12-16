import React, { Component } from 'react'
import { Grid, Segment} from 'semantic-ui-react'
import StockPriceChart2 from './StockPriceChart2'
import Navbar from './Navbar'

class WatchlistView extends Component {

    render(){
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
           <Grid centered columns={2}>
               <Grid.Row>   
                <Grid.Column>
                <Segment style={{overflow: 'auto', height: 600, maxHeight: 600, width: 100 }}>
                    
                </Segment>
                </Grid.Column>
                <Grid.Column>
                    <StockPriceChart2 currentStock="TSLA" time={this.props.currentStockHistoryTime} price={this.props.currentStockHistoryPrice}/>
                </Grid.Column>
               </Grid.Row>
        </Grid>
           </>
        )
    }
}

export default WatchlistView