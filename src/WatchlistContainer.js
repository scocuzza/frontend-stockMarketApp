import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'

class WatchlistContainer extends Component {
  render() {
    let isLoggedIn = Object.keys(this.props.currentUser).length !== 0
    const watchlists = this.props.userWatchlists.map(watchlist => {
        return ( <><Link to ="/watchlist">{watchlist.watchlistname}</Link><p>{watchlist.created_at}</p></>)})
    return (
        <Segment style={{overflow: 'auto', height: 152, maxHeight: 152 }}>
                <h2>Watchlists {isLoggedIn ? <Button onClick={this.props.openWatchlistModal} compact>+</Button> : null} </h2>
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