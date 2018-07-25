import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import Auth from '../common/Auth';

function mapStateToProps(state) {
  return {
    auth: state.ui.auth,
    ui: state.ui,
  };
}

// @withRouter(@connect(mapStateToProps))
class Sidebar extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    ui: PropTypes.shape({
      sidebar: PropTypes.shape({
        collpased: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      profile: Auth.getProfile(),
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { auth } = this.props;
    const { profile } = this.state;
    return (
      <div style={{ marginLeft: this.props.ui.sidebar.collpased ? '-185px' : '0px' }} id="page-sidebar" className="rm-transition">
        {
          !this.props.ui.sidebar.collpased ? (
            <div className="page-sidebar-wrapper">
              <div id="sidebar-top">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div>
                    <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        {
                          Auth.isAuthenticated() ? (
                            <div id="tab-example-1">
                              <div className="user-profile-sm clearfix">
                                <img width="45" className="img-rounded" src={profile.picture} alt="" />
                                <div className="user-welcome">
                                  Welcome back, <b>{profile.nickname}</b>
                                </div>
                                {/* <Link to="/users" className="btn btn-sm btn-black-opacity-alt">
                                  <i className="fa fa-cog" />
                                </Link> */}
                              </div>
                            </div>
                          ) : (
                            <div id="tab-example-1">
                              <div className="user-profile-sm clearfix">
                                <div className="user-welcome">
                                  <a role="button" onKeyPress={() => {}} tabIndex={0} onClick={auth.login} title="Login" className="user-ico clearfix">
                                    With an account you will enjoy more features.
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>

              <div id="sidebar-menu">
                <ul className="sf-js-enabled sf-arrows">
                  { Auth.isAuthenticated() ? (
                    <div>
                      <div className="divider-header">Dashboard</div>
                      <li>
                        <NavLink activeClassName="active" to="/dashboard">
                          <i className="fa fa-tachometer" /> <span>Dashboard</span>
                        </NavLink>
                      </li>
                      <li className="divider" />
                    </div>
                    ) : null
                  }
                  <div className="divider-header">Resources</div>
                  <li>
                    <NavLink activeClassName="active" to="/problems">
                      <i className="fa fa-puzzle-piece" /> <span>Problem Library</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/kifus">
                      <i className="fa fa-book" /> <span>Kifu Library</span>
                    </NavLink>
                  </li>
                  { Auth.isAuthenticated() ? (
                    <div>
                      <li>
                        <NavLink activeClassName="active" to="/favorites">
                          <i className="fa fa-heart" /><span>Favorites</span>
                        </NavLink>
                      </li>
                      <li className="divider" />
                      <div className="divider-header">Others</div>
                      <li>
                        <NavLink activeClassName="active" to="/records">
                          <i className="fa fa-history" /> <span>Records</span>
                        </NavLink>
                      </li>
                    </div>
                    ) : null
                  }
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div id="collapse-sidebar-menu">
                <ul className="sf-js-enabled sf-arrows">
                  { Auth.isAuthenticated() ? (
                    <div>
                      <li>
                        <NavLink activeClassName="active" to="/dashboard">
                          <i className="fa fa-tachometer" /> <span>Dashboard</span>
                        </NavLink>
                      </li>
                      <li className="divider" />
                    </div>
                    ) : null
                  }
                  <li>
                    <NavLink activeClassName="active" to="/problems">
                      <i className="fa fa-puzzle-piece" /> <span>Problem Library</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/kifus">
                      <i className="fa fa-book" /> <span>Kifu Library</span>
                    </NavLink>
                  </li>
                  {/*
                  <li className="divider"></li>
                  <li>
                    <Link to="/practices">
                      <i className="fa fa-television"></i> <span>Practices</span>
                    </Link>
                  </li>
                  */}
                  { Auth.isAuthenticated() ? (
                    <div>
                      <li className="divider" />
                      {/*
                      <li>
                        <Link activeClassName="active" to="/favorites">
                          <i className="fa fa-heart"></i> <span>Favorites</span>
                        </Link>
                      </li>
                      */}
                      <li>
                        <NavLink activeClassName="active" to="/records">
                          <i className="fa fa-history" /> <span>Records</span>
                        </NavLink>
                      </li>
                    </div>
                  ) : null
                  }
                </ul>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar));
