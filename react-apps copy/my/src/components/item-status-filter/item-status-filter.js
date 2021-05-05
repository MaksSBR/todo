import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  render () {
    const { onVisibleActive,onVisibleDone,onVisibleAll } = this.props;
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info"
                onClick={onVisibleAll}>
                  All
        </button>
        <button type="button"
                className="btn  btn-outline-primary"
                onClick={onVisibleActive}>
                  Active
        </button>
        <button type="button"
                className="btn btn-outline-primary"
                onClick={onVisibleDone}>
                  Done
        </button>
      </div>
    );
  }
}
