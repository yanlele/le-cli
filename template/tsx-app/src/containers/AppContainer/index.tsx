import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import App from 'components/App';

class AppContainer extends Component {
  render() {
    const {children} = this.props;
    return (
        <App children={children}/>
    );
  }
}

export default withRouter(connect()(AppContainer) as any);
