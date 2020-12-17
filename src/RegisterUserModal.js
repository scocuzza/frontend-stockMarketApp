import React from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

const RegisterUserModal = (props) => {
  return (
    <Modal open={props.open}>
      <Header>Create New User</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndCreate}>
          <Label>Username:</Label>
          <Form.Input
            type="text"
            name="username"
            value={props.newUser.username}
            onChange={props.handleNewUserChange}
          />
          <Label>Email:</Label>
          <Form.Input
            type="text"
            name="email"
            value={props.newUser.email}
            onChange={props.handleNewUserChange}
          />
          <Label>Password:</Label>
          <Form.Input
            type="password"
            name="password"
            value={props.newUser.password}
            onChange={props.handleNewUserChange}
          />
          <Modal.Actions>
            <Button color="green" type="submit">
              Register
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

export default RegisterUserModal;
