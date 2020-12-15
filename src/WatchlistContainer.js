import React, { Component } from 'react'
import { Segment, List, Button } from 'semantic-ui-react'
import axios from 'axios'

class WatchlistContainer extends Component {
  render() {
    let isLoggedIn = Object.keys(this.props.currentUser).length != 0
    const watchlists = this.props.userWatchlists.map(watchlist => {
        return (<p>{watchlist.watchlistname} {watchlist.created_at}</p>)})
    return (
        <Segment style={{overflow: 'auto', height: 152, maxHeight: 152 }}>
                <h2>Watchlists <Button compact>+</Button> </h2>
                {!isLoggedIn ? 
                <>
                    <p> Don't see any Watchlists?</p>
                    <Button primary onClick={this.props.openNewUserModal}>Register</Button>
                    <Button secondary onClick={this.props.openLoginUserModal} >Login</Button>
                </>
                :
                <>
                {watchlists}
                </>
                }
        </Segment>
    )
  }
}

export default WatchlistContainer