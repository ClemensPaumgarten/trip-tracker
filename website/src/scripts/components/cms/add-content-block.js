import {
  default as React,
  Component
} from 'react';

import classNames from 'classnames';

// Styles
import addContentStyles from '../../../styles/cms/add-content.scss';

export default class AddCOntentBlock extends Component {
  constructor() {
    super();

    this.onLeftContainerClick = this.onLeftContainerClick.bind(this);
    this.onRightContainerClick = this.onRightContainerClick.bind(this);
  }

  onLeftContainerClick() {
    this.props.addTextBlock();
  }

  onRightContainerClick() {
    let {
      addImageDropzone,
      disableImageUpload,
      imgUploadEnabled
    } = this.props;

    if (imgUploadEnabled) {
      addImageDropzone();
      disableImageUpload();
    }
  }

  render() {
    let {
      imgUploadEnabled
    } = this.props;

    let imgContainerClassnames =
      classNames(addContentStyles.iconContainer, {
        [addContentStyles.imgUploadDisabled]: !imgUploadEnabled
      });

    return (
      <div className={addContentStyles.addContentContainer}>
        <div className={addContentStyles.iconContainer}
             onClick={this.onLeftContainerClick}>
          <span className='glyphicon glyphicon-pencil'></span>
        </div>
        <div className={imgContainerClassnames}
             onClick={this.onRightContainerClick}>
          <span className='glyphicon glyphicon-picture'></span>
        </div>
      </div>
    );
  }
}
