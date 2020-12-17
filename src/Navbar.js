import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react'
import ToggleSlide from './ToggleSlide';

class Navbar extends Component {
    constructor(props){
      super(props)
      this.state = {}
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
      const { activeItem } = this.state
      let isLoggedIn = Object.keys(this.props.currentUser).length !== 0
      return (
        <Menu stackable>
          <Menu.Item>
            <Icon name='money bill alternate outline' />
          </Menu.Item>

          <a>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}>
              <Link to='/'>Home</Link>
          </Menu.Item>
          </a>
          
          {!isLoggedIn ? 
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={this.handleItemClick, this.props.openNewUserModal}
          >
            Register
          </Menu.Item> : null
          }
          {!isLoggedIn ? 
          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={this.handleItemClick, this.props.openLoginUserModal}
          >
            Sign-in
          </Menu.Item> : null
          }
        {isLoggedIn ? 
          <Menu.Item
            name='welcome'
          >Welcome {this.props.currentUser.user.username}</Menu.Item> : null
         }
         {isLoggedIn ? 
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick, this.props.logout}
          >Logout</Menu.Item> : null
         }
         <Menu.Item 
          name="toggleslide"
          > <ToggleSlide showPoints={this.props.showPoints} toggleStat={this.props.toggleStat}/></Menu.Item>

            <Menu.Menu position='right'>
              <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                  <input onChange={this.props.handleStockSearch}
                  className='prompt'
                  type='text'
                  placeholder='Search stock...'
                  />
                  {/* <Link to="/details" onClick={this.props.getStockData,this.props.getStockHistory, this.props.getCurrentStockData}> */}
                  <Link to="/details" 
                                      onClick={() => {
                                        this.props.getCurrentStockData()
                                        this.props.getCurrentStockHistory()
                                        this.props.createWatchlistOptions()
                                      }}>
                    <i className='search link icon' />
                  </Link>
              </div>
              <div className='results' />
              </div>            
        </Menu.Menu>
        </Menu>
        
      )
    }
}

export default Navbar;