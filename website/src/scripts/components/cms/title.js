import {
  default as React,
  Component
} from 'react';

import styles from '../../../styles/cms/cms-page.scss';

export default class Title extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    this.props.onBlur(this.state.value);
  }

  onChange(e) {
    var val = e.target.value;
    this.setState(() => {
      return {
        value: val
      };
    });
  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  render() {
    return (
      <div className={styles.blogTitle} onBlur={this.onBlur}>
        <input
          className={styles.blogTitleInput}
          type='text'
          value={this.state.value}
          placeholder='Blog Title'
          onChange={this.onChange}/>
      </div>
    );
  }
}
