import React, { Component } from 'react'
import { Segment, List, Button } from 'semantic-ui-react'

class WatchlistContainer extends Component {
  render() {
    return (
        <Segment style={{overflow: 'auto', maxHeight: 152 }}>
            <h2>Watchlists</h2>
              <Button primary onClick={this.props.openNewUserModal}>Register</Button>
              <Button secondary onClick={this.props.openLoginUserModal} >Login</Button>
        </Segment>
    )
  }
}

export default WatchlistContainer