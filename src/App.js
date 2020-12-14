import './App.css';
import Navbar from './Navbar';
import Indexheading from './Indexheading'
import GridContainer from './GridContainer'
import axios from 'axios'
import { Component } from 'react';
import RegisterUserModal from './RegisterUserModal'
import LoginUserModal from './LoginUserModal'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNewUserModal: false,
      showLoginUserModal: false,
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
        showLoginUserModal: false
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
    closeAndLogin = async (e) => {
      e.preventDefault();
      try {
        const loginResponse = await axios.post(
          process.env.REACT_APP_FLASK_API_URL  + '/user/login',
          this.state.newUser
        );
  
        console.log(loginResponse, ' Login Response');
        // window.localStorage.setItem('email',loginResponse.data.data.email)
        this.setState({
          showNewUserModal: false,
          showLoginUserModal: false,
          newUser: {
            username: '',
            email: '',
            password: '',
          },
          currentUser: loginResponse.data.data,
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
    openLoginUserModal = (e) => {
      e.stopPropagation();
      this.setState({
        showLoginUserModal: true,
      });
    };
    logout = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          'http://localhost:8000/user/logout'
        );
        this.setState({
          currentUser: {}
        })
      }catch (err) {
        console.log(err);
      }
    }
  render(){
    return(
    <div>
      <Navbar showNewUserModal={this.state.showNewUserModal}
              showLoginUserModal={this.state.showLoginUserModal}
              newUser={this.state.newUser}
              currentUser={this.state.currentUser}
              handleNewUserChange={this.handleNewUserChange}
              closeModal={this.closeModal}
              closeAndCreate={this.closeAndCreate}
              closeAndLogin={this.closeAndLogin}
              openNewUserModal={this.openNewUserModal}
              openLoginUserModal={this.openLoginUserModal}
              logout={this.logout}/>
      <Indexheading />
      <GridContainer showNewUserModal={this.state.showNewUserModal}
              showLoginUserModal={this.state.showLoginUserModal}
              newUser={this.state.newUser}
              currentUser={this.state.currentUser}
              handleNewUserChange={this.handleNewUserChange}
              closeModal={this.closeModal}
              closeAndCreate={this.closeAndCreate}
              closeAndLogin={this.closeAndLogin}
              openNewUserModal={this.openNewUserModal}
              openLoginUserModal={this.openLoginUserModal}
              logout={this.logout}/>
       <RegisterUserModal
            handleNewUserChange={this.handleNewUserChange}
            open={this.state.showNewUserModal}
            closeAndCreate={this.closeAndCreate}
            newUser={this.state.newUser}
            closeModal={this.closeModal}
          />
        <LoginUserModal
            handleNewUserChange={this.handleNewUserChange}
            open={this.state.showLoginUserModal}
            closeAndLogin={this.closeAndLogin}
            newUser={this.state.newUser}
            closeModal={this.closeModal}
          />
    </div>
    )
  } 
}

export default App;