import { SortableItemMixin } from '../lib/index.js';
import React, { PropTypes, Component } from 'react'

class ImageItem extends Component {

	constructor(props) {
		console.log(1);
	    super(props);
	    this.mixins =  [SortableItemMixin];
	    this.getDefaultProps = getDefaultProps;
 	}
	getDefaultProps () {
	    return {
	      className: 'img-item'
	    };
	}
    render() {

        return this.renderWithSortable(
      		<img draggable={false} src={this.props.src} className={this.props.className} />
    	);
    }
}

export default ImageItem
