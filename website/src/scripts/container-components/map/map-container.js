'use strict';

// React
import {
  default as React,
  Component
} from 'react';

import {connect} from 'react-redux';

import classnames from 'classnames';

import {
  fetchLocations
} from '../../actions/data/locations';

// Map loader
import MapLoader from './map-loader';

// Containers
import Sidebar from '../sidebar-container';

// styles
import mapStyles from '../../../styles/map/main-map.scss';

class MapContainer extends Component {
  constructor() {
    super();

    this.state = {
      origMarkers: [],
      markers: []
    };

    this.filterMarkers = this.filterMarkers.bind(this);
  }

  filterMarkers(filter) {
    var markerFilter = (marker) => {
      var valid = false;

      if (!marker.blog || !marker.filters) {
        valid = true;
      } else if (marker.filters && marker.filters.includes(filter)) {
        valid = true;
      }

      return valid;
    };
    var prevState = this.state;
    var newState = {};

    if (filter === 'all') {
      newState = {
        markers: prevState.origMarkers
      };
    } else {
      newState = {
        markers: prevState.origMarkers.filter((marker) => markerFilter(marker))
      };
    }

    this.setState(newState);
  }

  componentWillMount() {
    this.props.fetchLocations();
  }


  renderSideBar() {
    var filters = [];

    return (
      <Sidebar
        onFilter={this.filterMarkers}
        filters={filters}
        markers={this.props.locations.items.filter((l) => !!l.blog)}
        reactHistory={this.props.history}/>
    );
  }

  renderMaploader() {
    return (
      <MapLoader locations={this.props.locations.items} path={true}/>
    );
  }

  renderOfflineMap() {
    return (
      <div className={mapStyles.offlineMap}>
        <span>Offline Map</span>
      </div>
    );
  }

  renderMapContainer() {
    const MapLoader = this.props.offline ? this.renderOfflineMap() : this.renderMaploader();
    let classname = classnames(mapStyles.container, this.props.className);

    return (
      <div className={classname}>
        {MapLoader}
        {this.renderSideBar()}
      </div>
    );
  }

  render() {
    let {
      locations
    } = this.props;

    return locations.items.length ? this.renderMapContainer() : null;
  }
}

const mapStateToProps = (state, props) => ({
  locations: state.data.locations,
  sidebarIsOpen: state.pages.map.sidebarIsOpen,
  ...props
});

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => {
    dispatch(fetchLocations());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
