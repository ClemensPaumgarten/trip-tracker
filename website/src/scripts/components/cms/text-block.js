import {
  default as React,
  Component
} from 'react';

import classnames from 'classnames';

import styles from '../../../styles/cms/text-block.scss';

export default class TextBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      content: this.props.content
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    var {
      content,
      title
    } = this.state;

    this.props.onBlur(content, title);
  }

  onTitleChange(e) {
    var val = e.target.value;

    this.setState(() => {
      return {
        title: val
      };
    });
  }

  onTextAreaChange(e) {
    var val = e.target.value;

    this.setState(() => {
      return {
        content: val
      };
    });
  }

  resizeTextarea(ta) {
    var taHeight;

    ta.style.height = 'auto';

    taHeight = ta.scrollHeight;
    ta.style.height = taHeight + 20 + 'px';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      content: nextProps.content
    });
  }

  componentDidUpdate() {
    this.resizeTextarea(this.textarea);
  }

  componentDidMount() {
    this.resizeTextarea(this.textarea);
  }

  render() {
    var textAreaClassName = classnames(styles.content, styles.textarea);

    return (
      <div className={styles.container}
           onBlur={this.onBlur}>
        <input
          type='text'
          className={styles.title}
          value={this.state.title}
          onChange={this.onTitleChange}/>

        <textarea
          ref={(textarea) => {
            this.textarea = textarea;
          }}
          className={textAreaClassName}
          value={this.state.content}
          onChange={this.onTextAreaChange}/>
      </div>
    );
  }
}

TextBlock.defaultProps = {
  title: '',
  content: ''
};
