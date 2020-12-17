import React, { Component } from 'react'
import { Accordion, Icon, Table, Loader } from 'semantic-ui-react'

class SectorItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            netChange: 0,
            description: '',
            assetType: '',
            last: '',
            open: '',
            high: '',
            low: '',
            weekHigh: '',
            weekLow: '',
        }
    }
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  componentDidMount() {
  }
  render() {
    const { activeIndex } = this.state
    // let description = this.props.data.description
    // let assetType = this.props.data.assetType
    // let last = this.props.data.lastPrice
    // let open = this.props.data.openPrice
    // let high = this.props.data.highPrice
    // let low = this.props.data.lowPrice
    // let weekHigh = this.props.data['52WkHigh']
    // let weekLow = this.props.data['52WkLow']
    return (
        <>
        <Accordion.Title
          active={activeIndex === this.props.index}
          index={this.props.index}
          onClick={this.handleClick}
        >
          {this.props.name == 'Information Technology' ? <Icon name='computer'/> : null}
          {this.props.name == 'Health Care' ? <Icon name='doctor'/> : null}
          {this.props.name == 'Financials' ? <Icon name='money bill alternate outline'/> : null}
          {this.props.name == 'Communication Services' ? <Icon name='volume control phone'/> : null}
          {this.props.name == 'Industrials' ? <Icon name='factory'/> : null}
          {this.props.name == 'Energy' ? <Icon name='lightning'/> : null}
          {this.props.name == 'Utilities' ? <Icon name='tint'/> : null}
          {this.props.name == 'Real Estate' ? <Icon name='home'/> : null}
          {this.props.name == 'Materials' ? <Icon name='cubes'/> : null}
          {this.props.name == 'Precious Metals' ? <Icon name='trophy'/> : null}
          <Icon name='dropdown' />
            {this.props.name} <span style={ this.props.change >= 0 ? {color:'green'} : {color:'red'}}>  {this.props.change >= 0 ? <Icon name='caret up'/> : <Icon name='caret down'/> } {this.props.change} {this.props.showPoints ? null : '%'}</span>
        </Accordion.Title>
        
        <Accordion.Content active={activeIndex === this.props.index}>
          <p>
            <Table basic='very' celled collapsing size='small'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Asset Type</Table.HeaderCell>
                        <Table.HeaderCell>Last Price</Table.HeaderCell>
                        <Table.HeaderCell>Open Price</Table.HeaderCell>
                        <Table.HeaderCell>High Price</Table.HeaderCell>
                        <Table.HeaderCell>Low Price</Table.HeaderCell>
                        <Table.HeaderCell>52WkHigh</Table.HeaderCell>
                        <Table.HeaderCell>52WkLow</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data.description}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data.assetType}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data.lastPrice}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data.openPrice}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data.highPrice}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data.lowPrice}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data['52WkHigh']}</Table.Cell>
                        <Table.Cell>{this.props.data == undefined ?  <Loader active inline /> : this.props.data['52WkLow']}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
          </p>
        </Accordion.Content>
        </>
    )
  }
}

export default SectorItem