import React, { PropTypes } from "react";
import $ from "jquery";
import hljs from "highlight.js";

class CodeSnippet extends React.Component {
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    language: "javascript"
  }

  state = {
    code: <span />
  }

  highlight ($target, rawCode) {
    let code = rawCode
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/  +/g, " ")
      .replace(/±/g, " ");
    let el = $(`<code class="${this.props.language}">${code}</code>`)[0];
    hljs.highlightBlock(el);
    $target.append(el);
  }

  componentDidMount() {
    let $target = $(this.refs.target);
    this.highlight($target, this.props.children);
  }

  componentDidUpdate () {
    let $target = $(this.refs.target);
    $target.html("");
    this.highlight($target, this.props.children);
  }

  render () {
    const styles = require("./CodeSnippet.scss");
    return (
      <div className={styles.codeSnippet}>
        <label>Code</label>
        <pre ref="target" />
      </div>
    );
  }
}

export default CodeSnippet;
