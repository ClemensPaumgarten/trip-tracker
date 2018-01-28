import {
  default as React,
  Component
} from 'react';

import _ from 'lodash';

import {
  Button,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

import classnames from 'classnames';

import styles from '../../../styles/cms/controlbar.scss';

/**
 * Header bar for CMS system
 */
export default class ControlBar extends Component {
  constructor() {
    super();

    this.onBlogSelect = this.onBlogSelect.bind(this);
    this.onLocationSelect = this.onLocationSelect.bind(this);
    this.saveBlog = this.saveBlog.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onBlogSelect(eventKey) {
    let location = this.props.blogs.find((location) => {
      return location._id === eventKey;
    });

    this.props.onBlogSelect(location);
  }

  onLocationSelect(eventKey) {
    let location = this.props.locations.find((loc) => loc._id === eventKey);

    this.props.onLocationSelect(location);
  }

  saveBlog() {
    let {
      selectedLocation,
      saveBlog,
      updateBlog
    } = this.props;

    if (selectedLocation._id) {
      updateBlog(selectedLocation);
    } else {
      saveBlog(selectedLocation);
    }
  }

  onDelete() {
    let {
      selectedLocation,
      deleteBlog
    } = this.props;

    deleteBlog(selectedLocation);
  }

  renderToggleModalBtn() {
    return (
      <Button bsStyle='primary' onClick={this.props.toggleModal}>Add Data</Button>
    );
  }

  renderDeleteBlogBtn() {
    return (
      <Button bsStyle='danger' onClick={this.onDelete}>Delete Blog</Button>
    );
  }

  renderUpdateBlogBtn() {
    return (
      <Button bsStyle='success' onClick={this.saveBlog}>
        Save Blog
      </Button>
    );
  }

  renderSaveBlogBtn() {
    return (
      <Button bsStyle='success' onClick={this.saveBlog}>Save Blog</Button>
    );
  }

  renderBlogMenuItems(locations) {
    return locations.map((location, i) => (
      <MenuItem
        key={i}
        eventKey={location._id}>
        {location.blog.blogTitle}
      </MenuItem>
    ));
  }

  renderLocationDropdown() {
    let selectedLocation = this.props.selectedLocation;
    // if new render all locations otherwise render blog location
    let isNew = !!_.get(selectedLocation, '_temp.isNew');
    // if new render menuItems with locations without items
    let locationsWithoutBlog = this.props.locations.filter((location) =>
      (!_.has(location, 'blog')));
    let dropdownTitle = _.get(selectedLocation, 'location.title') || 'Choose Location';

    return (
      <DropdownButton
        id='location_selelct'
        bsStyle={'default'}
        title={dropdownTitle}
        onSelect={this.onLocationSelect}
        disabled={!isNew}>

        {
          locationsWithoutBlog.map((loc, i) => (
            <MenuItem
              key={i}
              eventKey={loc._id}>
              {loc.location.title}
            </MenuItem>
          ))
        }

      </DropdownButton>
    );
  }

  render() {
    // Immutable fields
    let {
      selectedLocation,
      blogs
    } = this.props;

    // has blog / location been selected
    const isSelected = Object.keys(selectedLocation).length;
    // is selected location with blog new or an existing
    const selectedIsNew = !!_.get(selectedLocation, '_temp.isNew');
    //blog - dropdown title
    const title = _.has(selectedLocation, 'blog.blogTitle') ? selectedLocation.blog.blogTitle :
      'Select Blog';

    const controlbarButtons = (
      <div className={styles.controlbarButtons}>
        {(isSelected && _.has(selectedLocation, 'location')) ? this.renderToggleModalBtn() : null}
        {(isSelected && selectedIsNew && _.has(selectedLocation, 'location')) ? this.renderSaveBlogBtn() : null}
        {(isSelected && !selectedIsNew) ? this.renderUpdateBlogBtn() : null}
        {(isSelected && !selectedIsNew) ? this.renderDeleteBlogBtn() : null}
      </div>
    );

    // React components
    const locationDropdown = isSelected ?
      this.renderLocationDropdown() : null;
    const menuItems = this.renderBlogMenuItems(blogs);

    let containerClassName = classnames(styles.controlbarContainer, 'clearfix');

    return (
      <div className={containerClassName}>
        <div className={styles.customDropdownContainer}>
          <DropdownButton
            id='blog_select'
            bsStyle={'default'}
            title={title}
            onSelect={this.onBlogSelect}>
            {menuItems}
          </DropdownButton>
        </div>
        {locationDropdown}
        {controlbarButtons}
      </div>
    );
  }
}
