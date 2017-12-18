import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addEventListener } from 'consolidated-events';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
  useCapture: PropTypes.bool,
};

const defaultProps = {
  children: <span />,
  onOutsideClick() {},
  useCapture: true,
};

export default class OutsideClickHandler extends Component {
  constructor(...args) {
    super(...args);

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.setChildNodeRef = this.setChildNodeRef.bind(this);
  }

  componentDidMount() {
    const { useCapture } = this.props;
    this.removeEventListener = addEventListener(document, 'click', this.onOutsideClick, { capture: useCapture });
  }

  componentWillUnmount() {
    if (this.removeEventListener) {
      this.removeEventListener();
    }
  }

  onOutsideClick(e) {
    const { onOutsideClick } = this.props;
    const { childNode } = this;
    const isDescendantOfRoot = childNode && childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  }

  setChildNodeRef(ref) {
    this.childNode = ref;
  }

  render() {
    const { children } = this.props;
    return <div ref={this.setChildNodeRef}>{children}</div>;
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;
