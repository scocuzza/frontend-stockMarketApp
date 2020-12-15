import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import SectorItem from './SectorItem'

class SectorContainer extends Component {

  render() {
    return (
      <Accordion fluid styled>
        <SectorItem name="Information Technology" ticker="VGT" index="0" change={this.props.techChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Health Care" ticker="VHT" index="1" change={this.props.healthChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Financials" ticker="VFH" index="2" change={this.props.financialChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Communication Services" ticker="VOX" index="3" change={this.props.communicationChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Industrials" ticker="VIS" index="4" change={this.props.industrialChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Energy" ticker="VDE" index="5" change={this.props.energyChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Utilities" ticker="VPU" index="6" change={this.props.utilitiesChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Real Estate" ticker="VNQ" index="7" change={this.props.realEstateChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Materials" ticker="VAW" index="8" change={this.props.materialsChange} showPoints={this.props.showPoints}/>
        <SectorItem name="Precious Metals" ticker="GLD" index="9" change={this.props.preciousMetalsChange} showPoints={this.props.showPoints}/>
        </Accordion>
    )
  }
}

export default SectorContainer