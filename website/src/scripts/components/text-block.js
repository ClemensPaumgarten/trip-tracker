import {
  default as React,
  Component
} from 'react';

import PropTypes from 'prop-types';

class TextBlock extends Component {
  setPureHtml(html) {
    return {__html: html};
  }

  render() {
    var {
      content,
      className
    } = this.props;
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');

    return (
      <div className={className}>
        <p dangerouslySetInnerHTML={this.setPureHtml(content)}/>
      </div>
    );
  }
}

TextBlock.propTypes = {
  content: PropTypes.string
};

export default TextBlock;
