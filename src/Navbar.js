import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'

class Navbar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
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
            onClick={this.handleItemClick}
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
        </Menu>
      )
    }
}

export default Navbar;