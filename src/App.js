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
        password: ''

    },
    currentUser: {},
    userWatchlists: [],
    showPoints: true,
    sectorTickers: ['VGT', 'VHT', 'VFH', 'VOX', 'VIS', 'VDE', 'VPU', 'VNQ', 'VAW', 'GLD']
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
      this.getUserWatchlists()
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
    console.log(this.state.currentUser.token);
    try {
      await axios.post(
        process.env.REACT_APP_FLASK_API_URL + '/user/logout', this.state.currentUser.user,{
          headers: {
          'Authorization': 'Bearer ' + this.state.currentUser.token
        }
      },

      );
      this.setState({
        currentUser: {}
      })
    }catch (err) {
      console.log(err);
    }
  }
  getUserWatchlists = () => {
      let isLoggedIn = Object.keys(this.state.currentUser).length != 0
      if(isLoggedIn) {
          axios.get(process.env.REACT_APP_FLASK_API_URL + '/watchlists/' + this.state.currentUser.user.id)
          .then( response => {
              console.log(response.data);
              this.setState({
                  userWatchlists: response.data.data
              })
          })
      }
  }
  toggleStat = () => {
    if(this.state.showPoints) {
      this.setState({
          dowChange: ((this.state.dow.netChange / this.state.dow.openPrice) * 100).toFixed(2),
          spChange: ((this.state.sp.netChange / this.state.sp.openPrice) * 100).toFixed(2),
          nasChange: ((this.state.nas.netChange / this.state.nas.openPrice) * 100).toFixed(2),
          showPoints: false
      })
  } else {
      this.setState({
          dowChange: this.state.nas.netChange,
          nasChange: this.state.nas.netChange,
          spChange: this.state.sp.netChange,
          showPoints: true
      })
  }
  }
  getIndiceData = () => {
    axios({
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: process.env.REACT_APP_API_KEY_TD,
            symbol: '$DJI,$COMPX,$SPX.X,VGT,VHT,VFH,VOX,VIS,VDE,VPU,VNQ,VAW,GLD'
        }
    }).then(response => {
        this.setState({
            dow: response.data.$DJI,
            sp: response.data['$SPX.X'],
            nas: response.data.$COMPX,
            tech: response.data.VGT,
            health: response.data.VHT,
            financial: response.data.VFH,
            communication: response.data.VOX,
            industrial: response.data.VIS,
            energy: response.data.VDE,
            utilities: response.data.VPU,
            realEstate: response.data.VNQ,
            materials: response.data.VAW,
            preciousMetals: response.data.GLD,

            dowLast: (response.data.$DJI.lastPrice).toFixed(0),
            nasLast: (response.data.$COMPX.lastPrice).toFixed(0),
            spLast: (response.data['$SPX.X'].lastPrice).toFixed(0),
            techLast: (response.data.VGT.lastPrice).toFixed(0),
            healthLast: (response.data.VHT.lastPrice).toFixed(0),
            financialLast: (response.data.VFH.lastPrice).toFixed(0),
            communicationLast: (response.data.VOX.lastPrice).toFixed(0),
            industrialLast: (response.data.VIS.lastPrice).toFixed(0),
            energyLast: (response.data.VDE.lastPrice).toFixed(0),
            utilitiesLast: (response.data.VPU.lastPrice).toFixed(0),
            realEstateLast: (response.data.VNQ.lastPrice).toFixed(0),
            materialsLast: (response.data.VAW.lastPrice).toFixed(0),
            preciousMetalsLast: (response.data.GLD.lastPrice).toFixed(0),

            dowChange: response.data.$DJI.netChange,
            nasChange: response.data.$COMPX.netChange,
            spChange: response.data['$SPX.X'].netChange,
            techChange: response.data.VGT.netChange,
            healthChange: response.data.VHT.netChange,
            financialChange: response.data.VFH.netChange,
            communicationChange: response.data.VOX.netChange,
            industrialChange: response.data.VIS.netChange,
            energyChange: response.data.VDE.netChange,
            utilitiesChange: response.data.VPU.netChange,
            realEstateChange: response.data.VNQ.netChange,
            materialsChange: response.data.VAW.netChange,
            preciousMetalsChange: response.data.GLD.netChange,
        })
    })
    .catch( e => {console.log((e));})
  }
  componentDidMount() {
    this.getIndiceData()
    setInterval( ()=> {
      //this.getUserWatchlists()
    },5000)
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
              logout={this.logout}
              toggleStat={this.toggleStat}
              showPoints={this.state.showPoints}/>
      <Indexheading showPoints={this.state.showPoints}
                    dowLast={this.state.dowLast}
                    spLast={this.state.spLast}
                    nasLast={this.state.nasLast}
                    dowChange={this.state.dowChange}
                    spChange={this.state.spChange}
                    nasChange={this.state.nasChange}
                    />
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
              logout={this.logout}
              getUserWatchlists={this.getUserWatchlists}
              userWatchlists={this.state.userWatchlists}
              />
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