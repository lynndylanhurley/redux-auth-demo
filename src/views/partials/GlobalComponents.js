import React from "react";
import RequestTestSuccessModal from "./RequestTestSuccessModal";
import RequestTestErrorModal from "./RequestTestErrorModal";
import * as BSTheme from "redux-auth/bootstrap-theme";
import * as DefaultTheme from "redux-auth";
import * as MUITheme from "redux-auth/material-ui-theme";
import { connect } from "react-redux";

class GlobalComponents extends React.Component {
  render () {
    let Theme = MUITheme;

    switch(this.props.theme) {
      case "default":
        Theme = DefaultTheme;
        break;
      case "bootstrap":
        Theme = BSTheme;
        break;
    }

    return (
      <div>
        <Theme.AuthGlobals />
        <RequestTestSuccessModal />
        <RequestTestErrorModal />
      </div>
    );
  }
}

export default connect(({demoUi}) => {
  return ({
    theme: demoUi.get("theme"),
  })
})(GlobalComponents);
