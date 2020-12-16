import React, { Component } from 'react';
import { Modal, Form, Button, Header, Dropdown } from 'semantic-ui-react';

class AddToWatchlistModal extends Component {
    
    render() {
        const options = this.props.watchlistOptions.map(option => {
            return <option value={option.value}>{option.text}</option>
        })
        return(
            <Modal open={this.props.open}>
            <Header>Add Stock to Watchlist</Header>
            <Modal.Content>
                <Form>
                {/* <Dropdown onChange={this.props.handleNewStockChange} placeholder="Select Watchlist.." fluid selection options={this.props.watchlistOptions} ></Dropdown> */}
                <select onChange={this.props.handleNewStockChange} placeholder="Select Watchlist..">
                    <option selected> </option>
                    {options}
                </select>
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

export default AddToWatchlistModal;
