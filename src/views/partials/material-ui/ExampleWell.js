import React, { PropTypes } from "react";
import { Card, CardText } from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ExampleWell extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <label>Example</label>
          <Card>
            <CardText>{this.props.children}</CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ExampleWell;
