import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import Feed from './Feed'
import SectorContainer from './SectorContainer'

const GridExampleDividedNumber = () => (
  <Grid columns={2} divided>
    <Grid.Row>
      <Grid.Column>
        <SectorContainer />
      </Grid.Column>
      <Grid.Column>
        <Feed />
      </Grid.Column>
    </Grid.Row>
    </Grid>
)

export default GridExampleDividedNumber