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
        console.log(process.env.REACT_APP_FLASK_API_URL);
        axios.get(process.env.REACT_APP_FLASK_API_URL + '/logs/').then(response => {
            console.log(response.data.data);
            this.setState({
                feedArray: response.data.data
            })
        })
        .catch( e => {console.log((e));})
    }
    componentDidMount() {
        this.getFeedData()
        // setInterval(() => {
        //     this.getFeedData()
        //   }, 5000);
    }
    render(){
        let feedItems = ''
        feedItems = this.state.feedArray.map( (feedItem, index) => {
                return(
                    <Feed.Event>
                    <Feed.Content>
                    <Feed.Summary>
                        <Icon name ='user outline'></Icon> <Feed.User> {feedItem.username}</Feed.User> {feedItem.activity} 
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