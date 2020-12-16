import React, { Component } from 'react'
import axios from 'axios'
import { Feed, Icon, Segment } from 'semantic-ui-react'

class WatchlistFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedArray: []
        }
    }
    getFeedData = () => {
        axios.get(process.env.REACT_APP_FLASK_API_URL + '/logs/').then(response => {
            this.setState({
                feedArray: response.data.data
            })
        })
        .catch( e => {console.log((e));})
    }
    componentDidMount() {
        this.getFeedData()
        this.getFeeds = setInterval(() => {
            this.getFeedData()
          }, 5000);
    }
    componentWillUnmount() {
        clearInterval(this.getFeeds)
        this.getFeeds = null
    }
    render(){
        let feedItems = ''
        feedItems = this.state.feedArray.map( (feedItem, index) => {
                return(
                    <Feed.Event>
                    <Feed.Content>
                    <Feed.Summary>
                        {feedItem.activityType === 'user' ? <Icon name ='user outline'></Icon>: <Icon name ='unordered list'></Icon>}<Feed.User> {feedItem.username}</Feed.User> {feedItem.activity} {feedItem.watchlistname}
                        <Feed.Date>{feedItem.created_at}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                    </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>)
        })
        return(
            <Segment style={{overflow: 'auto', maxHeight: 230 }}>
                <Feed>
                    <h3>Activity Feed</h3>
                    {feedItems}
                </Feed>
            </Segment>
            
        )
    }
}

export default WatchlistFeed;