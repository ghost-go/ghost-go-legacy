import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'

import {Row, Col} from 'react-bootstrap'

class Dashboard extends Component {

  static propTypes = {
    expanded: T.bool.isRequired,
  }

  static defaultProps = {
    expanded: true,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className="page-container">
        <Row>
          <Col xs={8} md={4}>
            <div className="tile-box tile-box-alt bg-blue">
              <div className="tile-header">Sent emails</div>
              <div className="tile-content-wrapper">
                <i className="glyph-icon icon-inbox"></i>
                <div className="tile-content"><i className="glyph-icon icon-caret-up font-red"></i> 185</div>
                <small><i className="glyph-icon icon-caret-up"></i> +7,6% email list penetration</small>
              </div>
              <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
            </div>
          </Col>
          <Col xs={8} md={4}>
            <div className="tile-box tile-box-alt bg-blue">
              <div className="tile-header">Sent emails</div>
              <div className="tile-content-wrapper">
                <i className="glyph-icon icon-inbox"></i>
                <div className="tile-content"><i className="glyph-icon icon-caret-up font-red"></i> 185</div>
                <small><i className="glyph-icon icon-caret-up"></i> +7,6% email list penetration</small>
              </div>
              <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
            </div>
          </Col>
          <Col xs={8} md={4}>
            <div className="tile-box tile-box-alt bg-blue">
              <div className="tile-header">Sent emails</div>
              <div className="tile-content-wrapper">
                <i className="glyph-icon icon-inbox"></i>
                <div className="tile-content"><i className="glyph-icon icon-caret-up font-red"></i> 185</div>
                <small><i className="glyph-icon icon-caret-up"></i> +7,6% email list penetration</small>
              </div>
              <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

function select() {
  return {
  }
}

export default connect(select)(Dashboard)
