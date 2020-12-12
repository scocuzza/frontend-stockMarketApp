import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import SectorItem from './SectorItem'

class SectorContainer extends Component {

  render() {
    return (
      <Accordion fluid styled>
        <SectorItem name="Information Technology" ticker="VGT" index="0"/>
        <SectorItem name="Health Care" ticker="VHT" index="1"/>
        <SectorItem name="Financials" ticker="VFH" index="2"/>
        <SectorItem name="Communication Services" ticker="VOX" index="3"/>
        <SectorItem name="Industrials" ticker="VIS" index="4"/>
        <SectorItem name="Energy" ticker="VDE" index="5"/>
        <SectorItem name="Utilities" ticker="VPU" index="6"/>
        <SectorItem name="Real Estate" ticker="VNQ" index="7"/>
        <SectorItem name="Materials" ticker="VAW" index="8"/>
        <SectorItem name="Precious Metals" ticker="GLD" index="9"/>
        </Accordion>
    )
  }
}

export default SectorContainer