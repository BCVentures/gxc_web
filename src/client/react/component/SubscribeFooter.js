import React, {Component} from 'react';

class SubscribePhoto extends Component {
    constructor (props) {
        super(props);

        this.state = {
            subscribe_photo_URL: '/static/images/subscribe_photo_URL.png'
        }
    }

    render () {
        return (

        <div className="subscribe_photo">
            <img className="subscribe_photo" src={this.state.subscribe_photo_URL}  alt='subscribe_photo' />
          </div>

        )
    }
};

export default SubscribePhoto;
