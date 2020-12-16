import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import SectorContainer from './SectorContainer'
import FeedAndWatchlistContainer from './FeedAndWatchlistContainer'

class GridContainer extends Component{
  render(){
    return(
      <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <SectorContainer 
           showPoints={this.props.showPoints}
           techChange={this.props.techChange}
           healthChange={this.props.healthChange} 
           financialChange={this.props.financialChange}
           communicationChange={this.props.communicationChange}
           industrialChange={this.props.industrialChange}
           energyChange={this.props.energyChange}
           utilitiesChange={this.props.utilitiesChange}
           realEstateChange={this.props.realEstateChange}
           materialsChange={this.props.materialsChange}
           preciousMetalsChange={this.props.preciousMetalsChange}
           techLast={this.props.techLast}
           healthLast={this.props.healthLast} 
           financialsLast={this.props.financialsLast}
           communicationLast={this.props.communicationLast}
           industrialLast={this.props.industrialLast}
           energyLast={this.props.energyLast}
           utilitiesLast={this.props.utilitiesLast}
           realEstateLast={this.props.realEstateLast}
           materialsLast={this.props.materialsLast}
           preciousMetalsLast={this.props.preciousMetalsLast}/>
        </Grid.Column>
        <Grid.Column>
          <FeedAndWatchlistContainer 
              showNewUserModal={this.props.showNewUserModal}
              showLoginUserModal={this.props.showLoginUserModal}
              newUser={this.props.newUser}
              currentUser={this.props.currentUser}
              handleNewUserChange={this.props.handleNewUserChange}
              closeModal={this.props.closeModal}
              closeAndCreate={this.props.closeAndCreate}
              closeAndLogin={this.props.closeAndLogin}
              openNewUserModal={this.props.openNewUserModal}
              openLoginUserModal={this.props.openLoginUserModal}
              logout={this.props.logout}
              userWatchlists={this.props.userWatchlists}
              openWatchlistModal={this.props.openWatchlistModal}
              newWatchlist={this.props.newWatchlist}
              handleCurrentWatchlist={this.props.handleCurrentWatchlist}
              getWatchlistStocks={this.props.getWatchlistStocks}/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
} 
export default GridContainer