import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

class SectorContainer extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  
  render() {
    const { activeIndex } = this.state

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Information Technology
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            VGT
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Health Care
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            VHT
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Financials
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            VFH
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Communication Services
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
            VOX
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Industrials
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <p>
            VIS
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 5}
          index={5}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Energy
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 5}>
          <p>
            VDE
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 6}
          index={6}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Utilities
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 6}>
          <p>
            VPU
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 7}
          index={7}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Real Estate
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 7}>
          <p>
            VNQ
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 8}
          index={8}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Materials
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 8}>
          <p>
            VAW
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 9}
          index={9}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Precious Metals
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 9}>
          <p>
            GLD / Copper / SLV / Platinum
          </p>
        </Accordion.Content>
        </Accordion>
    )
  }
}

export default SectorContainer