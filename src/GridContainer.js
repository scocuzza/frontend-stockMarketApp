import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import SectorContainer from './SectorContainer'
import FeedAndWatchlistContainer from './FeedAndWatchlistContainer'

class GridContainer extends Component{
  render(){
    return(
      <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <SectorContainer />
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
              logout={this.props.logout}/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
} 
export default GridContainer