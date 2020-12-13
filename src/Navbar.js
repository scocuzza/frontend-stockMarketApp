import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import axios from 'axios'
import RegisterUserModel from './RegisterUserModal'

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      showNewUserModal: false,
      newUser: {
        username: '',
        email: '',
        password: '',
    },
    currentUser: {},
  }
  }
    handleNewUserChange = (e) => {
      this.setState({
        newUser: {
          ...this.state.newUser,
          [e.currentTarget.name]: e.currentTarget.value,
        },
      });
    };
  
    closeModal = () => {
      this.setState({
        showNewUserModal: false,
      });
    };

    closeAndCreate = async (e) => {
      e.preventDefault();
      try {
        const newUserResponse = await axios.post(
          process.env.REACT_APP_FLASK_API_URL  + '/user/register',
          this.state.newUser
        );
  
        console.log(newUserResponse, ' new User');
        this.setState({
          showNewUserModal: false,
          newUser: {
            username: '',
            email: '',
            password: '',
          },
          currentUser: newUserResponse.data.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
    openNewUserModal = (e) => {
      e.stopPropagation();
      this.setState({
        showNewUserModal: true,
      });
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
      let isLoggedIn = Object.keys(this.state.currentUser).length != 0
      return (
        <Menu stackable>
          <Menu.Item>
            <Icon name='money bill alternate outline' />
          </Menu.Item>

          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
  
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={this.handleItemClick, this.openNewUserModal}
          >
            Register
          </Menu.Item>
  
          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={this.handleItemClick}
          >
            Sign-in
          </Menu.Item>

         {isLoggedIn ? 
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          ></Menu.Item> : null
         }
            <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
            <div className='ui transparent icon input'>
                <input
                className='prompt'
                type='text'
                placeholder='Search stock...'
                />
                <i className='search link icon' />
            </div>
            <div className='results' />
            </div>
        </Menu.Menu>
        <RegisterUserModel
            handleNewUserChange={this.handleNewUserChange}
            open={this.state.showNewUserModal}
            closeAndCreate={this.closeAndCreate}
            newUser={this.state.newUser}
            closeModal={this.closeModal}
          />
        </Menu>
        
      )
    }
}

export default Navbar;