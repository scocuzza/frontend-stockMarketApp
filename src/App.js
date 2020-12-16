import './App.css';
import axios from 'axios'
import { Component } from 'react';
import { BrowserRouter as BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import StockView from './StockView';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNewUserModal: false,
      showLoginUserModal: false,
      showNewWatchlistModal: false,
      newUser: {
        username: '',
        email: '',
        password: ''

    },
    newWatchlist: {
      username: '',
      watchlist_id: '',
      watchlistname: ''
    },
    currentUser: {},
    userWatchlists: [],
    currentStock: '',
    currentStockData: [],
    showPoints: true
  }
  }
  handleNewWatchlistChange = (e) => {
    this.setState({
      newWatchlist: {
        username: this.state.currentUser.user.username,
        watchlist_id: this.state.currentUser.user.id,
        watchlistname: e.currentTarget.value
      }
    })
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
      showLoginUserModal: false,
      showNewWatchlistModal: false
    });
  };
  createWatchlist = async (e) => {
    e.preventDefault();
    try {
      const watchlistResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL + '/watchlists/create',
        this.state.newWatchlist
      )
      console.log(watchlistResponse, ' new Watchlist');
      this.setState({
        showNewWatchlistModal: false,
        newWatchlist: {
          username: '',
          watchlist_id: '',
          watchlistname: ''
        }
      });
    } catch (err) {
      console.log(err);
    }

    }
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
  openWatchlistModal = (e) => {
    e.stopPropagation();
    this.setState({
      showNewWatchlistModal: true,
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
          techChange: ((this.state.tech.netChange / this.state.tech.openPrice) * 100).toFixed(2),
          healthChange: ((this.state.health.netChange / this.state.health.openPrice) * 100).toFixed(2),
          financialChange: ((this.state.financial.netChange / this.state.financial.openPrice) * 100).toFixed(2),
          communicationChange: ((this.state.communication.netChange / this.state.communication.openPrice) * 100).toFixed(2),
          industrialChange: ((this.state.industrial.netChange / this.state.industrial.openPrice) * 100).toFixed(2),
          energyChange: ((this.state.energy.netChange / this.state.energy.openPrice) * 100).toFixed(2),
          utilitiesChange: ((this.state.utilities.netChange / this.state.utilities.openPrice) * 100).toFixed(2),
          realEstateChange: ((this.state.realEstate.netChange / this.state.realEstate.openPrice) * 100).toFixed(2),
          materialsChange: ((this.state.materials.netChange / this.state.materials.openPrice) * 100).toFixed(2),
          preciousMetalsChange: ((this.state.preciousMetals.netChange / this.state.preciousMetals.openPrice) * 100).toFixed(2),
          showPoints: false
      })
  } else {
      this.setState({
          dowChange: (this.state.dow.netChange).toFixed(2),
          nasChange: (this.state.nas.netChange).toFixed(2),
          spChange: this.state.sp.netChange,
          techChange: this.state.tech.netChange,
          healthChange: this.state.health.netChange,
          financialChange: this.state.financial.netChange,
          communicationChange: this.state.communication.netChange,
          industrialChange: this.state.industrial.netChange,
          energyChange: this.state.energy.netChange,
          utilitiesChange: this.state.utilities.netChange,
          realEstateChange: this.state.realEstate.netChange,
          materialsChange: this.state.materials.netChange,
          preciousMetalsChange: this.state.preciousMetals.netChange,
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
        })
        if(this.state.showPoints) {
          this.setState({
            dowChange: (response.data.$DJI.netChange).toFixed(2),
            nasChange: (response.data.$COMPX.netChange).toFixed(2),
            spChange: (response.data['$SPX.X'].netChange).toFixed(2),
            techChange: (response.data.VGT.netChange).toFixed(2),
            healthChange: (response.data.VHT.netChange).toFixed(2),
            financialChange: (response.data.VFH.netChange).toFixed(2),
            communicationChange: (response.data.VOX.netChange).toFixed(2),
            industrialChange: (response.data.VIS.netChange).toFixed(2),
            energyChange: (response.data.VDE.netChange).toFixed(2),
            utilitiesChange: (response.data.VPU.netChange).toFixed(2),
            realEstateChange: (response.data.VNQ.netChange).toFixed(2),
            materialsChange: (response.data.VAW.netChange).toFixed(2),
            preciousMetalsChange: (response.data.GLD.netChange).toFixed(2)
          })
        } else {
          this.setState({
            dowChange: ((response.data.$DJI.netChange / response.data.$DJI.openPrice) * 100).toFixed(2),
            spChange: ((response.data['$SPX.X'].netChange / response.data['$SPX.X'].openPrice) * 100).toFixed(2),
            nasChange: ((response.data.$COMPX.netChange / response.data.$COMPX.openPrice) * 100).toFixed(2),
            techChange: ((response.data.VGT.netChange / response.data.VGT.openPrice) * 100).toFixed(2),
            healthChange: ((response.data.VHT.netChange / response.data.VHT.openPrice) * 100).toFixed(2),
            financialChange: ((response.data.VFH.netChange / response.data.VFH.openPrice) * 100).toFixed(2),
            communicationChange: ((response.data.VOX.netChange / response.data.VOX.openPrice) * 100).toFixed(2),
            industrialChange: ((response.data.VIS.netChange / response.data.VIS.openPrice) * 100).toFixed(2),
            energyChange: ((response.data.VDE.netChange / response.data.VDE.openPrice) * 100).toFixed(2),
            utilitiesChange: ((response.data.VPU.netChange / response.data.VPU.openPrice) * 100).toFixed(2),
            realEstateChange: ((response.data.VNQ.netChange / response.data.VNQ.openPrice) * 100).toFixed(2),
            materialsChange: ((response.data.VAW.netChange / response.data.VAW.openPrice) * 100).toFixed(2),
            preciousMetalsChange: ((response.data.GLD.netChange / response.data.GLD.openPrice) * 100).toFixed(2),
          })
        }
    })
    .catch( e => {console.log((e));})
  }
  handleStockSearch = (e) =>{ 
    this.setState({
      currentStock: e.currentTarget.value
    })
  }
  
  componentDidMount() {
    this.getIndiceData()
    this.getWatchlists = setInterval( ()=> {
        this.getUserWatchlists()
    },5000)
    this.getIndexData = setInterval( ()=> {
        this.getIndiceData()
    },5000)
  }

    componentWillUnmount() {
      clearInterval(this.getWatchlists)
      clearInterval(this.getIndexData)
      this.getWatchlists = null
      this.getIndexData = null
    
  }
  render(){
    return(
    <div>
      <BrowserRouter>
        <Route exact path="/" render={(props)=> {
          return <Home  showNewUserModal={this.state.showNewUserModal}
                        showLoginUserModal={this.state.showLoginUserModal}
                        showNewWatchlistModal={this.state.showNewWatchlistModal}
                        newUser={this.state.newUser}
                        currentUser={this.state.currentUser}
                        handleNewUserChange={this.handleNewUserChange}
                        handleStockSearch={this.handleStockSearch}
                        handleNewWatchlistChange={this.handleNewWatchlistChange}
                        closeModal={this.closeModal}
                        closeAndCreate={this.closeAndCreate}
                        closeAndLogin={this.closeAndLogin}
                        createWatchlist={this.createWatchlist}
                        openNewUserModal={this.openNewUserModal}
                        openLoginUserModal={this.openLoginUserModal}
                        openWatchlistModal={this.openWatchlistModal}
                        logout={this.logout}
                        toggleStat={this.toggleStat}
                        showPoints={this.state.showPoints}
                        dowLast={this.state.dowLast}
                        spLast={this.state.spLast}
                        nasLast={this.state.nasLast}
                        dowChange={this.state.dowChange}
                        spChange={this.state.spChange}
                        nasChange={this.state.nasChange}
                        getUserWatchlists={this.getUserWatchlists}
                        userWatchlists={this.state.userWatchlists}
                        newWatchlist={this.state.newWatchlist}
                        techChange={this.state.techChange}
                        healthChange={this.state.healthChange} 
                        financialChange={this.state.financialChange}
                        communicationChange={this.state.communicationChange}
                        industrialChange={this.state.industrialChange}
                        energyChange={this.state.energyChange}
                        utilitiesChange={this.state.utilitiesChange}
                        realEstateChange={this.state.realEstateChange}
                        materialsChange={this.state.materialsChange}
                        preciousMetalsChange={this.state.preciousMetalsChange}/>
                        }}/>
        <Route exact path="/details" render={(props)=>{ 
          return <StockView currentUser={this.state.currentUser}
                            currentStock={this.state.currentStock}
                            handleStockSearch={this.handleStockSearch}
                            showPoints={this.state.showPoints}
                            toggleStat={this.toggleStat}/>
          }}/>
      </BrowserRouter>

        
    </div>
    )
  } 
}

export default App