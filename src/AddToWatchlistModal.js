import React, { Component } from 'react';
import { Modal, Form, Button, Header, Dropdown } from 'semantic-ui-react';

class NewWatchlistModal extends Component {
    
    render() {
        return(
            <Modal open={this.props.open}>
            <Header>Add Stock to Watchlist</Header>
            <Modal.Content>
                <Form onSubmit={this.props.createWatchlist}>
                <Dropdown placeholder="select watchlist.." fluid search selection options={this.props.watchlistOptions} ></Dropdown>
                <Modal.Actions>
                    <Button color="blue" type="submit">
                    Add
                    </Button>
                    <Button color="black" type="button" onClick={this.props.close}>
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
