import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { ButtonLoader } from 'redux-auth/bootstrap-theme';
import { connect } from 'react-redux';
import { requestTest } from '../actions/request-test-buttons';

class RequestTestButton extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    currentEndpointKey: PropTypes.string,
    endpointKey: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    demoButtons: PropTypes.any,
    signedIn: PropTypes.bool,
  };

  static defaultProps = {
    endpointKey: 'default'
  };

  handleClick() {
    const url = `${window.__API_URL__}${this.props.path}`;
    this.props.dispatch(requestTest(url, this.props.path));
  }

  render() {
    let text = 'Will Fail';
    let bsStyle = 'danger';
    let glyph = <Glyphicon glyph="remove" />;
    const loading = this.props.demoButtons.getIn(['buttons', this.props.path, 'loading']);

    if (
      this.props.signedIn && (
      this.props.currentEndpointKey === this.props.endpointKey ||
      this.props.endpointKey === 'any'
      )
    ) {
      text = 'Should Succeed';
      bsStyle = 'success';
      glyph = <Glyphicon glyph="ok" />;
    }

    return (
      <ButtonLoader
        {...this.props}
        loading={loading}
        type="button"
        icon={glyph}
        onClick={this.handleClick.bind(this)}
        bsStyle={bsStyle}
      >
        {text}
      </ButtonLoader>
    );
  }
}

export default connect(({ auth, demoButtons }) => ({
  signedIn: auth.getIn(['user', 'isSignedIn']),
  currentEndpointKey: auth.getIn(['configure', 'currentEndpointKey']),
  demoButtons
}))(RequestTestButton);
