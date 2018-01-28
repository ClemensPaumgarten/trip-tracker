import {
  default as React,
  Component
} from 'react';

export default class AuthContainer extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let {
      user,
      redirectToLocation,
      location,
    } = this.props;

    if (!user.isLoggedIn) {
      redirectToLocation('/login', location.pathname);
    }
  }

  renderChildren() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  render() {
    let {
      user
    } = this.props;

    return user.isLoggedIn ? this.renderChildren() : null;
  }
}
