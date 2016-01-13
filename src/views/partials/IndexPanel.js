import React, { PropTypes } from "react";
import { Panel, Col } from "react-bootstrap";

class IndexPanel extends React.Component {
  static propTypes = {
    bsStyle: PropTypes.string,
    header: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    bsStyle: "info",
    children: <span />
  };

  render () {
    return (
      <Col sm={6}>
        <Panel {...this.props} />
      </Col>
    );
  }
}

export default IndexPanel;
