import {
  default as React,
  Component
} from 'react';

import Dropzone from 'react-dropzone';

import classnames from 'classnames';

//Import sub components
import TextBlock from './text-block';
import Image from './image';

// Loader
import Loader from '../loader';

import cmsPageStyles from '../../../styles/cms/cms-page.scss';
import dropzoneStyles from '../../../styles/cms/img-dropzone.scss';

/**
 * Props:
 *  blocks from selectedLocation state
 */
export default class BlogContent extends Component {
  constructor() {
    super();

    this.state = {};

    this.onDrop = this.onDrop.bind(this);
  }

  updateBlocks(updateBlock) {
    // blocks without _id
    var origBlocks = this.props.selected.blog.blocks;

    // blocks with _id
    var blocks = this.state.blocks;

    // find which block was updated
    var idx = blocks.findIndex((block) => {
      return block._id === updateBlock._id;
    });

    // delete _id helper for now - keep blocks clean
    delete updateBlock._id;
    origBlocks[idx] = updateBlock;

    this.props.onBlogUpdate(origBlocks);
  }

  /**
   * Adds unique Id to every blog block in order to identify the updated block
   * @param {array} blocks - array of blog entry blocks
   */
  addIdToBlocks(blocks) {
    return blocks.map((block) =>
      Object.assign({}, block, {
        _id: Math.round(Math.random() * 1000)
      })
    );
  }

  /**
   * Uploades file chosen by user
   * @param {File} files - Array of files being chosen
   */
  onDrop(files) {
    this.props.uploadImage(files[0]);
  }

  /**
   *
   * Dropzone funnctions end
   *
   */

  componentWillReceiveProps(nextProps) {
    this.setState({
      blocks: this.addIdToBlocks(nextProps.selected.blog.blocks)
    });
  }

  componentWillMount() {
    const props = this.props;
    this.setState({
      blocks: this.addIdToBlocks(props.selected.blog.blocks)
    });
  }

  renderTextBlock(block) {
    return (
      <TextBlock
        title={block.title}
        content={block.block}
        onBlur={(content = block.content, title = block.title) => {
          var updateBlock = Object.assign({}, block, {
            block: content,
            title: title
          });

          this.updateBlocks(updateBlock);
        }}
      />
    );
  }

  renderLoader() {
    return (<Loader className={cmsPageStyles.deleteLoader} type='white'/>);
  }

  renderImage(imgSrc) {
    return (
      <Image
        src={imgSrc}/>
    );
  }

  // Drop zone when new image block is added
  renderImageDropZone() {
    return (
      <Dropzone className={dropzoneStyles.imageDropzone} onDrop={this.onDrop}>
        <span className={dropzoneStyles.dropzoneTitle}>Drop your image in here</span>
      </Dropzone>
    );
  }

  renderChildren() {
    let blocks = null;
    let iconClassName =
      classnames(cmsPageStyles.deleteIcon, 'glyphicon glyphicon-remove-circle');

    blocks = this.state.blocks.map((block, i) => {
      let Elem = null;

      // indicate img-block that is being deleted at the moment
      let blockIsToDelete = !!this.props.imagesToDelete.find(img => img.index === i);

      switch (block.type) {
        case 'text':
          Elem = this.renderTextBlock(block);
          break;
        case 'img':
          Elem = this.renderImage(block.src);
          break;
        case 'img-dropzone':
          Elem = this.renderImageDropZone();
          break;
      }

      return (
        <div key={i}
             className={cmsPageStyles.contentContainer}>
          {blockIsToDelete && this.renderLoader()}
          <span className={iconClassName}
                onClick={() => {
                  this.props.removeBlock(i, block);
                }}></span>
          {Elem}
        </div>
      );
    });

    return blocks;
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    );
  }
}
