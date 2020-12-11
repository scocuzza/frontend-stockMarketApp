import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const WatchlistFeed = () => (
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <img src='/images/avatar/small/elliot.jpg' alt=''/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Icon name ='user outline'></Icon> A new user has been created ! <Feed.User>Elliot Fu</Feed.User>
            <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
      <Feed.Event>
        <Feed.Label>
          <img src='/images/avatar/small/elliot.jpg' alt=''/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Icon name ='unordered list'></Icon><Feed.User>Elliot Fu</Feed.User> has created a new <Feed.User>watchlist</Feed.User> 
            <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
      <Feed.Event>
        <Feed.Label>
          <img src='/images/avatar/small/elliot.jpg' alt=''/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Icon name ='user outline'></Icon>User <Feed.User>Elliot Fu</Feed.User> has logged in
            <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
      <Feed.Event>
        <Feed.Label>
          <img src='/images/avatar/small/elliot.jpg' alt=''/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Icon name ='edit outline'></Icon><Feed.User>Elliot Fu</Feed.User> has edited their <Feed.User>watchlist</Feed.User> 
            <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
      <Feed.Event>
        <Feed.Label>
          <img src='/images/avatar/small/elliot.jpg' alt=''/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Icon name ='user outline'></Icon>User <Feed.User>Elliot Fu</Feed.User> has logged out
            <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )

export default WatchlistFeed;