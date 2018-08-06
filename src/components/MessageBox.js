import React from 'react';
import PropTypes from 'prop-types';

const MessageBox = props => (
  <div className={`messagebox ${props.type}`}>
    { props.message }
  </div>
);
MessageBox.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default MessageBox;
