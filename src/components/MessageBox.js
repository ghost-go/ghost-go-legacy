import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { closeMessageBox } from '../actions/Actions';

function mapStateToProps(state) {
  return {
    message: state.message,
  };
}
@connect(mapStateToProps)
class MessageBox extends Component {
  static propTypes = {
    message: PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      open: PropTypes.bool.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(closeMessageBox());
  }

  render() {
    const { message, dispatch } = this.props;
    return (
      <div className={`messagebox ${message.type} ${message.open ? 'open' : ''}`}>
        <div className="icon-bg">
          <i className="fa fa-check" />
        </div>
        <div role="button" tabIndex={0} onKeyPress onClick={() => dispatch(push(message.action))} className="message-content">
          <div className="title">{ message.title }</div>
          <div className="text">{ message.text }</div>
        </div>
        <button className="close" onClick={this.handleClose}>
          <i className="fa fa-times" />
        </button>
      </div>
    );
  }
}

export default MessageBox