import React, { Component } from 'react'
import Navbar from './Navbar'
import Indexheading from './Indexheading'
import GridContainer from './GridContainer'
import RegisterUserModal from './RegisterUserModal'
import LoginUserModal from './LoginUserModal'
import NewWatchlistModal from './NewWatchlistModal'

class Home extends Component {
    render() {
        return(
        <>
        <Navbar showNewUserModal={this.props.showNewUserModal}
                showLoginUserModal={this.props.showLoginUserModal}
                newUser={this.props.newUser}
                currentUser={this.props.currentUser}
                handleNewUserChange={this.props.handleNewUserChange}
                handleStockSearch={this.props.handleStockSearch}
                closeModal={this.props.closeModal}
                closeAndCreate={this.props.closeAndCreate}
                closeAndLogin={this.props.closeAndLogin}
                openNewUserModal={this.props.openNewUserModal}
                openLoginUserModal={this.props.openLoginUserModal}
                logout={this.props.logout}
                toggleStat={this.props.toggleStat}
                showPoints={this.props.showPoints}
                getCurrentStockData={this.props.getCurrentStockData}
                getCurrentStockHistory={this.props.getCurrentStockHistory}/>
        <Indexheading showPoints={this.props.showPoints}
                dowLast={this.props.dowLast}
                spLast={this.props.spLast}
                nasLast={this.props.nasLast}
                dowChange={this.props.dowChange}
                spChange={this.props.spChange}
                nasChange={this.props.nasChange}/>
        <GridContainer 
                showPoints={this.props.showPoints}
                showNewUserModal={this.props.showNewUserModal}
                showLoginUserModal={this.props.showLoginUserModal}
                newUser={this.props.newUser}
                currentUser={this.props.currentUser}
                handleNewUserChange={this.props.handleNewUserChange}
                closeModal={this.props.closeModal}
                closeAndCreate={this.props.closeAndCreate}
                closeAndLogin={this.props.closeAndLogin}
                openNewUserModal={this.props.openNewUserModal}
                openLoginUserModal={this.props.openLoginUserModal}
                openWatchlistModal={this.props.openWatchlistModal}
                logout={this.props.logout}
                getUserWatchlists={this.props.getUserWatchlists}
                userWatchlists={this.props.userWatchlists}
                newWatchlist={this.props.newWatchlist}
                techChange={this.props.techChange}
                healthChange={this.props.healthChange} 
                financialChange={this.props.financialChange}
                communicationChange={this.props.communicationChange}
                industrialChange={this.props.industrialChange}
                energyChange={this.props.energyChange}
                utilitiesChange={this.props.utilitiesChange}
                realEstateChange={this.props.realEstateChange}
                materialsChange={this.props.materialsChange}
                preciousMetalsChange={this.props.preciousMetalsChange}/>
        <RegisterUserModal
                handleNewUserChange={this.props.handleNewUserChange}
                open={this.props.showNewUserModal}
                closeAndCreate={this.props.closeAndCreate}
                newUser={this.props.newUser}
                closeModal={this.props.closeModal}
        />
        <LoginUserModal
                handleNewUserChange={this.props.handleNewUserChange}
                open={this.props.showLoginUserModal}
                closeAndLogin={this.props.closeAndLogin}
                newUser={this.props.newUser}
                closeModal={this.props.closeModal}
        />
        <NewWatchlistModal 
                open={this.props.showNewWatchlistModal}
                handleNewWatchlistChange={this.props.handleNewWatchlistChange}
                createWatchlist={this.props.createWatchlist}
                closeModal={this.props.closeModal}
                newWatchlist={this.props.newWatchlist}
                currentUser={this.props.currentUser}/>
        </>
        )
    }
}

export default Home