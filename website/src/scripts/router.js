'use strict';

// React
import {
  default as React,
  Component
} from 'react';

import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import HeaderbarContainer from './container-components/headerbar-container';

import AuthContainer from './container-components/authentication/router-auth-container';

import TravelAppContainer from './container-components/travel-app-container';

// Pages
import Login from './pages/login';
import CMS from './pages/cms';
import TravelMap from './pages/map';
import Blog from './pages/blog';

// Define Routes
const Routes = [
  {
    name: 'map',
    path: '/',
    component: TravelMap,
    customProps: {
      offline: false
    }
  },
  {
    name: 'blog',
    path: '/blog/:locationId',
    component: Blog
  },
  {
    name: 'manage',
    path: '/manage',
    component: CMS,
    loginReq: true
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
];

export default class AppRouter extends Component {
  constructor() {
    super();

    this.state = {
      menu: null
    };

    this.addMenuItems = this.addMenuItems.bind(this);
    this.setMenu = this.setMenu.bind(this);
  }

  setMenu(menu) {
    this.setState(() => {
      return {
        menu: Object.assign({}, menu)
      };
    });
  }

  addMenuItems(menuItems) {
    this.setState((prevState) => {
      let menu = prevState.menu;

      menu.children = menu.children || [];
      menu.children = menu.children.concat(menuItems);

      return {
        menu: menu
      };
    });
  }

  renderRoutesContainer() {
    return (
      <TravelAppContainer>
        {this.renderRouteElements(Routes)}
      </TravelAppContainer>
    );
  }

  renderRouteElements(routes) {
    let renderRoutes = routes.map((route, index) => {
      let {
        component: Component,
        path,
        customProps
      } = route;

      return (
        <Route
          path={path}
          exact={true}
          key={index}
          children={props => {
            let {loginReq} = route;
            let {match} = props;
            let Page = null;

            if (match) {
              // merge match and route props
              let pageProps = Object.assign(props, {...customProps});

              // pages witch required login wrap around AuthConftainer
              if (loginReq) {
                Page = (
                  <AuthContainer
                    location={props.location}
                    key={index}>
                    <Component
                      className='content-container'
                      addMenuItems={this.addMenuItems}
                      setMenu={this.setMenu}
                      {...pageProps}  />
                  </AuthContainer>
                );
              } else {
                Page = (
                  <Component
                    className='content-container'
                    addMenuItems={this.addMenuItems}
                    setMenu={this.setMenu}
                    {...pageProps}  />
                );
              }
            }

            return Page;
          }}
        />);
    });

    return renderRoutes;
  }

  render() {
    // TODO: Put Menu data into global redux-store
    let menu = this.state.menu ? Object.assign({}, this.state.menu) : null;

    return (
      <Router>
        <div>
          <HeaderbarContainer menu={menu}/>
          <Switch>
            {this.renderRoutesContainer()}
          </Switch>
        </div>
      </Router>
    );
  }
}
