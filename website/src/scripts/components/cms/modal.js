'use strict';

import {
  default as React,
  Component
} from 'react';

import {Modal} from 'react-bootstrap';

import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

import _ from 'lodash';

export default class MetaModal extends Component {
  constructor() {
    super();

    this.state = {
      photos: ''
    };

    this.onPhotoLinkChange = this.onPhotoLinkChange.bind(this);
    this.save = this.save.bind(this);
  }

  save() {
    this.props.save(this.state);
  }

  onPhotoLinkChange(e) {
    this.setState({
      photos: e.target.value
    });
  }

  componentWillMount() {
    this.setState(() => ({
      photos: this.props.photoLink
    }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      photos: nextProps.photoLink
    }));
  }

  render() {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Add some extra data to your blog!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId='formInlinePhotos'>
              <ControlLabel>Photos Link</ControlLabel>
              <FormControl type='text'
                           placeholder='Photos Link'
                           onChange={this.onPhotoLinkChange}
                           value={_.get(this.state, 'photos', '')}/>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={this.save} value='testValue'>Save</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
