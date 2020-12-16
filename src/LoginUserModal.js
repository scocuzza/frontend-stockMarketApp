import React from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

const LoginUserModal = (props) => {
  return (
    <Modal open={props.open}>
      <Header>Login</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndLogin}>
          <Label>Username:</Label>
          <Form.Input
            type="text"
            name="username"
            value={props.newUser.username}
            onChange={props.handleNewUserChange}
          />
          <Label>Password:</Label>
          <Form.Input
            type="text"
            name="password"
            value={props.newUser.password}
            onChange={props.handleNewUserChange}
          />
          <Modal.Actions>
            <Button color="blue" type="submit">
              Login
            </Button>
            <Button color="black" type="button" onClick={props.closeModal}>
              Cancel
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default LoginUserModal;
