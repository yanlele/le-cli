import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';

class NoMatchContainer extends Component {
    render() {
        return (
            <div>
                <Button type="primary">123123</Button>
            </div>
        );
    }
}

export default connect()(NoMatchContainer);
