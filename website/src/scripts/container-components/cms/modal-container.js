'use strict';

import {connect} from 'react-redux';

import MetaModal from '../../components/cms/modal';

import {
  toggleModal,
  saveModalData
} from '../../actions/cms/cms';

const mapStateToProps = state => ({
  showModal: state.pages.cms.showModal,
  photoLink: state.pages.cms.selected.photos
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(toggleModal());
  },
  save: (data) => {
    dispatch(saveModalData(data));
    dispatch(toggleModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MetaModal);
