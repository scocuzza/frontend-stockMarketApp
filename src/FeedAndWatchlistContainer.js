import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'
import WatchlistContainer from './WatchlistContainer'
import Feed from './Feed'

class FeedAndWatchlistContainer extends Component {

  render() {
    return (
        <>
            <WatchlistContainer 
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
            <Divider horizontal></Divider>
            <Feed />
        </>
    )
  }
}

export default FeedAndWatchlistContainer