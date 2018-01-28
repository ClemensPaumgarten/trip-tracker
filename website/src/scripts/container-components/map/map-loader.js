'use strict';

// React
import {
  default as React,
  Component
} from 'react';

import ReactDOM from 'react-dom';

import {
  Link
} from 'react-router-dom';

// Utils
import _ from 'lodash';

// Google Map
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow

} from 'react-google-maps';

//Styles
import infoWindowStyles from '../../../styles/map/info-window.scss';
import mapStyles from '../../../styles/map/main-map.scss';

import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

const AsyncMap = _.flowRight(withScriptjs, withGoogleMap)(
  class Gmap extends Component {
    constructor(props) {
      super(props);
    }

    renderInfoWindow(marker, onCloseHandler) {
      return (
        <InfoWindow onCloseClick={() => onCloseHandler(marker)}>
          <div className={infoWindowStyles.InfoWindow}>
            <div className={infoWindowStyles.title}>
              <span>{marker.location.title}</span>
            </div>
            <div className={infoWindowStyles.content}>
              <Link className={infoWindowStyles.blogLink} to={'/blog/' + marker._id}>Read the blog</Link>
            </div>
          </div>
        </InfoWindow>
      );
    }

    renderMarker(key, marker) {
      var props = this.props;
      var circle = {
        path: 'M-8,0a8,8 0 1,0 16,0a8,8 0 1,0 -16,0',
        fillColor: '#D54762',
        fillOpacity: 1,
        strokeColor: '#ff93a8',
        strokeWeight: 3
      };

      return (
        <Marker
          key={key}
          position={marker.location}
          icon={circle}
          onClick={() => {
            props.onMarkerClick(marker);
          }}>
          {marker.showInfo && this.renderInfoWindow(marker, props.onInfoClose)}
        </Marker>
      );
    }

    render() {
      let {
        markers,
        onMapLoad,
        path
      } = this.props;
      let lastMarker = markers[markers.length - 1]; // get last marker for default center

      return (
        <GoogleMap
          ref={onMapLoad}
          defaultZoom={3}
          options={{
            minZoom: 2
          }}
          defaultCenter={{lat: lastMarker.location.lat, lng: lastMarker.location.lng}}>

          {markers.map((marker, i) => {
            return marker.blog ? this.renderMarker(i, marker) : null;
          })}

          <Polyline
            ref={(ref) => this.polyline = ref}
            path={path}
            visible={true}
            options={
              {
                geodesic: true,
                strokeColor: '#D54762'
              }
            }
          />
        </GoogleMap>
      );
    }
  }
);

AsyncMap.propTypes = {
  onMarkerClick: React.PropTypes.func
};

export default class AsyncMapLoader extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleMapload = this.handleMapload.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoClose = this.onInfoClose.bind(this);
  }

  onMarkerClick(targetLocation) {
    this.setState((prevState) => {
      return {
        locations: prevState.locations.map((location) => {
          if (location._id === targetLocation._id) {
            location.showInfo = true;
          } else {
            location.showInfo = false;
          }

          return location;
        })
      };
    });
  }

  onInfoClose(targetLocation) {
    this.setState((prevState) => {
      return {
        location: prevState.locations.map((location) => {
          if (location._id === targetLocation._id) {
            location.showInfo = false;
          }

          return location;
        })
      };
    });
  }

  handleMapload(map) {
    this.map = map;
  }

  componentWillMount() {
    this.setState({
      locations: this.props.locations
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locations)
      this.setState({
        locations: nextProps.locations
      });
  }

  render() {
    return (
      <AsyncMap
        googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBHS9OZyIWfzEDmqAiRWtuZTL-8mlXpJSA'
        loadingElement={
          <div className={mapStyles.loaderElment}>
            Loading map
          </div>
        }
        containerElement={
          <div className={mapStyles.loaderContainer}></div>
        }
        mapElement={
          <div className={mapStyles.map}></div>
        }
        onMarkerClick={this.onMarkerClick}
        onInfoClose={this.onInfoClose}
        onMapLoad={this.handleMapload}
        markers={this.state.locations}
        path={this.props.locations.map((location) => ({
          lat: location.location.lat,
          lng: location.location.lng
        }))}
      />
    );
  }
}
