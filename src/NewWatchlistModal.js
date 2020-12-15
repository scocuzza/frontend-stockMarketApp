import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class NewWatchlistModal extends Component {
    render() {
        let isLoggedIn = Object.keys(this.props.currentUser).length != 0
        return(
            <Modal open={this.props.open}>
            <Header>Create New Watchlist</Header>
            <Modal.Content>
                <Form onSubmit={this.props.createWatchlist}>
                {isLoggedIn ? <h2>{this.props.currentUser.user.username}</h2> : null}
                <Label>Watchlist Name:</Label>
                <Form.Input
                    type="text"
                    name="watchlistname"
                    value={this.props.newWatchlist.watchlistname}
                    onChange={this.props.handleNewWatchlistChange}
                />
                <Modal.Actions>
                    <Button color="green" type="submit">
                    Create
                    </Button>
                    <Button color="red" type="button" onClick={this.props.closeModal}>
                    Cancel
                    </Button>
                </Modal.Actions>
                </Form>
            </Modal.Content>
            </Modal>
        )
    }
}

export default NewWatchlistModal;
