import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import SortableMixin from './react-sortable-mixin';

var SortableList = React.createClass({
    mixins: [SortableMixin],

    getInitialState: function() {
        return {
            items: ['http://uploadfile.tukuwa.com/2015/0914/edb2e4e114cc44840cb902f40aa5afe9_thumb.jpg', 'http://uploadfile.tukuwa.com/2015/0916/44a5ad147bc7810eab070026441fce27_thumb.jpg','http://uploadfile.tukuwa.com/2015/0914/dbae61f0794c506557c31ba49c419048_thumb.jpg'
            ,'http://uploadfile.tukuwa.com/2015/0914/3e9dc28bab8876a17fdd6b15edf15380_thumb.jpg','http://uploadfile.tukuwa.com/2015/0913/140be9b126125413d30ac83f5ab20a48_thumb.jpg']
        };
    },


    handleSort: function (/** Event */evt) { /*..*/ },

    render: function() {
        return <ul className="dragUl">{
            this.state.items.map(function (text) {
                return <li style={{display:'inline-block',margin:'30px'}} ><img  style={{width:'100px',height:'100px'}} src={text}></img></li>
            })
        }</ul>
    }
});

React.render(<SortableList />, document.body);
