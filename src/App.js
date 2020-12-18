import './App.css';
import axios from 'axios'
import { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import StockView from './StockView';
import WatchlistView from './WatchlistView'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNewUserModal: false,
      showLoginUserModal: false,
      showNewWatchlistModal: false,
      showAddStockToWatchlistModal: false,
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
    newStock: {
      stock: '',
      watchlist_id: '',
      user_id: ''
    },
    selectedWatchlist: {
      user_id: '',
      watchlistname: '' 
    },
    currentUser: {},
    userWatchlists: [],
    currentStock: '',
    currentStockData: [],
    retrievedStocks: [],
    watchlistStockData: [],
    currentWatchlistStock: 'AAPL',
    watchlistStockData2: [],
    watchlistStockHistoryPrice: [],
    watchlistStockHistoryTime: [],
    showPoints: false
  }
  }
  //Methods to Open Models
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
  openAddStockToWatchlistModal = (e) => {
    e.stopPropagation();
    this.setState({
      showAddStockToWatchlistModal: true,
    });
  }
  addStockToWatchlist = async () => {
    try {
      const newStockResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL  + '/stocks/create',
        this.state.newStock
      );
        this.setState({
          newStock: {
            stock: '',
            watchlist_id: '',
            user_id: '',
            username: ''
          },
          showAddStockToWatchlistModal: false
        })
      console.log(newStockResponse, ' new Stock');
    } catch (err) {
      console.log(err);
    }
  }
 //create the watchlist options for the user when they go to add a stock
  createWatchlistOptions = () => {
    let watchlistOptions = []
    if (this.state.userWatchlists != []) {
        this.state.userWatchlists.forEach(element => {
            let option = {
                key: element.watchlistname,
                value: element.id,
                text: element.watchlistname
            }
            watchlistOptions.push(option)
        });
        this.setState({
            watchlistOptions: watchlistOptions
        })
    }
  }
  //get stocks for watchlist
  getWatchlistStocks = async () => {
    try {
      const newStockResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL  + '/stocks/watchlist',
        this.state.selectedWatchlist
      );
      console.log(newStockResponse, ' new Stock');
      const response = newStockResponse.data.data
      let stockArray = response.map(item =>{
        return item.stock
      })
      console.log(stockArray);
      this.setState({
        retrievedStocks: stockArray
      })
    } catch (err) {
      console.log(err);
    }
  }
  //Close any open modals
  closeModal = () => {
    this.setState({
      showNewUserModal: false,
      showLoginUserModal: false,
      showNewWatchlistModal: false,
      showAddStockToWatchlistModal: false
    });
  };
  handleCurrentWatchlist = async (e) => {
    console.log(e.currentTarget.text);
    await this.setState({
      selectedWatchlist: {
        user_id: this.state.currentUser.user.id,
        watchlistname: e.currentTarget.text
      }
    })
    console.log(this.state.selectedWatchlist);
    await this.getWatchlistStocks()
    await this.getWatchlistStockData()
    await this.getWatchlistStockHistory()
  }
  //Set the state for the new watchlist 
  handleNewWatchlistChange = (e) => {
    this.setState({
      newWatchlist: {
        username: this.state.currentUser.user.username,
        watchlist_id: this.state.currentUser.user.id,
        watchlistname: e.currentTarget.value
      }
    })
  }
  //Set the state for the new stock
  handleNewStockChange = (e) => {
    console.log('hadnling new stock');
    console.log(e.currentTarget);
    this.setState({
      newStock: {
        stock: this.state.currentStock.toUpperCase(),
        watchlist_id: e.currentTarget.value,
        user_id: this.state.currentUser.user.id,
        username: this.state.currentUser.user.username
      }
    })
  }
  //Set the state for the new User
  handleNewUserChange = (e) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
  };
  //Set the state for the currently searched stock
  handleStockSearch = (e) =>{ 
    this.setState({
      currentStock: e.currentTarget.value
    })
  }
  //Set the state for the selected watchlist
  handleSelectedWatchlist = (e) => {
    this.setState({
      selectedWatchlist: e.currentTarget.value
    })
  }
  //Call the backend to create the watchlist
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
  //Call the backend to create the User
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
  //Call the backend to login the user
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
  //Call the backend to logout the user
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
  //Get the latest list of watchlists for current user from backend
  getUserWatchlists = () => {
      let isLoggedIn = Object.keys(this.state.currentUser).length !== 0
      if(isLoggedIn) {
          axios.get(process.env.REACT_APP_FLASK_API_URL + '/watchlists/' + this.state.currentUser.user.id)
          .then( response => {
              this.setState({
                  userWatchlists: response.data.data
              })
          })
      }
  }
  //Call this to toggle the netChange from points to percent and vice versa
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
          currentStockChange: ((this.state.currentStockData.netChange / this.state.currentStockData.openPrice) * 100).toFixed(2),
          showPoints: false
      })
  } else {
      this.setState({
          dowChange: (this.state.dow.netChange).toFixed(2),
          nasChange: (this.state.nas.netChange).toFixed(2),
          spChange: (this.state.sp.netChange).toFixed(2),
          techChange: (this.state.tech.netChange).toFixed(2),
          healthChange: (this.state.health.netChange).toFixed(2),
          financialChange: (this.state.financial.netChange).toFixed(2),
          communicationChange: (this.state.communication.netChange).toFixed(2),
          industrialChange: (this.state.industrial.netChange).toFixed(2),
          energyChange: (this.state.energy.netChange).toFixed(2),
          utilitiesChange: (this.state.utilities.netChange).toFixed(2),
          realEstateChange: (this.state.realEstate.netChange).toFixed(2),
          materialsChange: (this.state.materials.netChange).toFixed(2),
          preciousMetalsChange: (this.state.preciousMetals.netChange).toFixed(2),
          currentStockChange: (this.state.currentStockData.netChange),
          showPoints: true
      })
  }
  }
  //Get all data for the home page $DJI,$COMPX,$SPX.X,VGT,VHT,VFH,VOX,VIS,VDE,VPU,VNQ,VAW,GLD'
  getIndiceData = async () => {
    await axios({
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
  //Get the stock data and set in state for the Searched stock
  getCurrentStockData = async () => {
    console.log('getting stock data');
    await axios({
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: process.env.REACT_APP_API_KEY_TD,
            symbol: this.state.currentStock
        }
    }).then(response => {
      let ticker = this.state.currentStock.toUpperCase()
        this.setState({
            currentStockData: response.data[ticker]
        })
        if(this.state.showPoints) {
          this.setState({
            currentStockChange: (this.state.currentStockData.netChange)
          })
        } else {
          this.setState({
            currentStockChange: ((this.state.currentStockData.netChange / this.state.currentStockData.openPrice) * 100).toFixed(2)
          })
        }
    })
    .catch( e => {console.log((e));})
  }
  //Get the current stock history and set in the state for the Searched stock
  getCurrentStockHistory = async () => {
    console.log('getting history data');
    await axios({
        url: `https://api.tdameritrade.com/v1/marketdata/${this.state.currentStock.toUpperCase()}/pricehistory`,
        params: {
            apikey: process.env.REACT_APP_API_KEY_TD,
            periodType: 'ytd',
            period: '1',
            frequencyType: 'daily',
            frequency: '1'
        }
    }).then(response => {
        const timedata = response.data.candles.map(element => {
            return element.datetime
        });
        const pricedata = response.data.candles.map(element => {
            return Math.round(element.close, 0)
        })
        let lastElement = pricedata[timedata.length -1]
        let firstElement = pricedata[0]
        let color = '#5BE429'
        if(firstElement > lastElement) {
          console.log('negative');
          color = '#ff3333'
        }
        this.setState({
          currentStockHistoryTime: timedata,
          currentStockHistoryPrice: pricedata,
          currentStockColor: color
        })
    })
    .catch( e => {console.log((e));})
  }
  //Get data for the stocks in the watchlist
  getWatchlistStockData = async () => {
    await axios({
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: process.env.REACT_APP_API_KEY_TD,
            symbol: this.state.retrievedStocks.join()
        }
    }).then(response => {
        let data = response.data
        console.log(data);
        let stockObj = []
        for (const [key, value] of Object.entries(data)) {
          // if (this.state.showPoints) {
            let stockItem = {
              name: key,
              netChange: value.netChange.toFixed(2),
              lastPrice: value.lastPrice,
              openPrice: value.openPrice
            }
            stockObj.push(stockItem)
          // }else {
          //   let stockItem = {
          //     name: key,
          //     netChange: ((value.netChange / value.openPrice) * 100).toFixed(2),
          //     lastPrice: value.lastPrice,
          //     openPrice: value.openPrice
          //   }
            // stockObj.push(stockItem)
          // }
          }
          this.setState({
            watchlistStockData: stockObj,
            watchlistStockData2: response.data
          })
          console.log('stock data ' + stockObj);
    })
    .catch( e => {console.log((e));})
  }
  //getWatchlistStock history
  getWatchlistStockHistory = async () => {
    console.log('getting history data');
    await axios({
        url: `https://api.tdameritrade.com/v1/marketdata/${this.state.currentWatchlistStock.toUpperCase()}/pricehistory`,
        params: {
            apikey: process.env.REACT_APP_API_KEY_TD,
            periodType: 'ytd',
            period: '1',
            frequencyType: 'daily',
            frequency: '1'
        }
    }).then(response => {
        const timedata = response.data.candles.map(element => {
            return element.datetime
        });
        const pricedata = response.data.candles.map(element => {
            return Math.round(element.close, 0)
        })
        let lastElement = pricedata[timedata.length -1]
        let firstElement = pricedata[0]
        let color = '#5BE429'
        if(firstElement > lastElement) {
          console.log('negative');
          color = '#ff3333'
        }
        this.setState({
          watchlistStockHistoryTime: timedata,
          watchlistStockHistoryPrice: pricedata,
          watchlistStockColor: color

        })
    })
    .catch( e => {console.log((e));})
  }
  setCurrentWatchlistStock = (e) => {
    console.log(e.currentTarget);
    console.log(e.currentTarget.text);
    console.log(e.currentTarget.name);
    this.setState({
      currentWatchlistStock: e.currentTarget.text
    })
    this.getWatchlistStockHistory()
  }
  componentDidMount() {
    this.getIndiceData()
    this.getWatchlists = setInterval( ()=> {
        this.getUserWatchlists()
    },5000)
    this.getIndexData = setInterval( ()=> {
        this.getIndiceData()
    },5000)
    this.currentStockDataGet = setInterval( ()=> {
      //this.getCurrentStockData()
    }, 5000)
  }
  componentWillUnmount() {
      clearInterval(this.getWatchlists)
      clearInterval(this.getIndexData)
      clearInterval(this.currentStockDataGet)
      this.getWatchlists = null
      this.getIndexData = null
      this.currentStockDataGet = null
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
                        preciousMetalsChange={this.state.preciousMetalsChange}
                        //
                        tech={this.state.tech}
                        health={this.state.health} 
                        financial={this.state.financial}
                        communication={this.state.communication}
                        industrial={this.state.industrial}
                        energy={this.state.energy}
                        utilities={this.state.utilities}
                        realEstate={this.state.realEstate}
                        materials={this.state.materials}
                        preciousMetals={this.state.preciousMetals}

                        getCurrentStockData={this.getCurrentStockData}
                        getCurrentStockHistory={this.getCurrentStockHistory}
                        createWatchlistOptions={this.createWatchlistOptions}
                        handleCurrentWatchlist={this.handleCurrentWatchlist}
                        getWatchlistStocks={this.getWatchlistStocks}/>
                        }}/>
        <Route exact path="/details" render={(props)=>{ 
          return <StockView currentUser={this.state.currentUser}
                            currentStock={this.state.currentStock}
                            currentStockData={this.state.currentStockData}
                            currentStockChange={this.state.currentStockChange}
                            currentStockHistory={this.state.currentStockHistory}
                            currentStockHistoryPrice={this.state.currentStockHistoryPrice}
                            currentStockHistoryTime={this.state.currentStockHistoryTime}
                            handleStockSearch={this.handleStockSearch}
                            showPoints={this.state.showPoints}
                            toggleStat={this.toggleStat}
                            getCurrentStockData={this.getCurrentStockData}
                            getCurrentStockHistory={this.getCurrentStockHistory}
                            currentStockColor={this.state.currentStockColor}

                            closeModal={this.closeModal}
                            openAddStock={this.state.showAddStockToWatchlistModal}
                            openAddStockToWatchlistModal={this.openAddStockToWatchlistModal}
                            handleSelectedWatchlist={this.handleSelectedWatchlist}
                            watchlistOptions={this.state.watchlistOptions}
                            createWatchlistOptions={this.createWatchlistOptions}
                            
                            handleNewStockChange={this.handleNewStockChange}
                            addStockToWatchlist={this.addStockToWatchlist}
                            />
          }}/>
          <Route exact path="/watchlist" render={(props)=>{
            return <WatchlistView currentUser={this.state.currentUser}
                            currentStock={this.state.currentStock}
                            currentStockData={this.state.currentStockData}
                            currentStockChange={this.state.currentStockChange}
                            currentStockHistory={this.state.currentStockHistory}
                            currentStockHistoryPrice={this.state.currentStockHistoryPrice}
                            currentStockHistoryTime={this.state.currentStockHistoryTime}
                            handleStockSearch={this.handleStockSearch}
                            showPoints={this.state.showPoints}
                            toggleStat={this.toggleStat}
                            getCurrentStockData={this.getCurrentStockData}
                            getCurrentStockHistory={this.getCurrentStockHistory}
                            retrievedStocks={this.state.retrievedStocks}
                            getWatchlistStockData={this.getWatchlistStockData}
                            watchlistStockData={this.state.watchlistStockData}
                            selectedWatchlist={this.state.selectedWatchlist.watchlistname}
                            watchlistStockHistoryPrice={this.state.watchlistStockHistoryPrice}
                            watchlistStockHistoryTime={this.state.watchlistStockHistoryTime}
                            currentWatchlistStock={this.state.currentWatchlistStock}
                            setCurrentWatchlistStock={this.setCurrentWatchlistStock}
                            createWatchlistOptions={this.createWatchlistOptions}
                            watchlistStockData2={this.state.watchlistStockData2}
                            currentStockColor={this.state.watchlistStockColor}/>
          }}/>
      </BrowserRouter>
    </div>
    )
  } 
}

export default App