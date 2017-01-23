import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

import IconMenu from 'material-ui/IconMenu'
import {List, ListItem} from 'material-ui/List'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import Divider from 'material-ui/Divider'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import KeyBoardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'


import AuthService from '../utils/AuthService'

export default class Navigation extends Component {

  static propTypes = {
    auth: PropTypes.instanceOf(AuthService)
  }

  constructor(props) {
    super(props)
    this.state = {
      isSigned: false,
      isMenuShow: false,
      profile: props.auth.getProfile()
    }

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

  }

  logout() {
    // destroys the session data
    this.props.auth.logout()
  }

  handleUserMenu() {

  }

  render() {
    const { auth } = this.props
    let loginSection, loginList
    if (!auth.loggedIn()) {
      loginSection =
        <div className='nav-sign'>
          <div className="nav-footer-wrap nav-signup">
            <a href="javascript:void(0)" onClick={auth.login.bind(this)}>Sign Up</a>
          </div>
        </div>
    }
    else {
      loginSection =
          <div className='nav-sign'>
            <div className="nav-footer-wrap nav-signup">
              <img style={{height: '30px', marginTop: '10px', float: 'left'}} alt="avatar" src={this.state.profile.picture}/>
              <KeyBoardArrowDown className="arrow" style={{height: '50px'}} hoverColor={blue500} />
            </div>
          </div>

      loginList =
        <List>
          <Link to={'/users'}>
            {`Signed in as ${this.state.profile.nickname}`}
          </Link>
          <Divider />
          {/*
            <Link to={'/users'}>
              <ListItem primaryText="Your profile" leftIcon={<AccountCircle />} />
            </Link>
            <Link to={'/users'}>
              <ListItem primaryText="Your practices" leftIcon={<AccountCircle />} />
            </Link>
            */}
          <Link to={'/history'}>
            <ListItem primaryText="Puzzle History" leftIcon={<HistoryIcon />} />
          </Link>
          <Divider />
          <Link onClick={this.logout.bind(this)} to=''>
            <ListItem primaryText="Settings" leftIcon={<HistoryIcon />} />
            <ListItem primaryText="Log Out" leftIcon={<ExitToApp />} />
          </Link>
        </List>
    }

    return (
      <div className="nav-container">
        <header className="nav-header">
          <a href="/" className="logo">
            <span style={{float: 'left', marginLeft: '103px', marginTop: '20px'}}>--beta</span>
          </a>
        </header>

        <section className="nav-body">
          <div className="nav-body-wrap clearfix">
            <Link to="/puzzles" activeClassName="active">
              {
                //<FormattedMessage
                //id='app.nav.menu.puzzles'
                //defaultMessage="Puzzles Library"
                ///>
              }
              Tsumego Library
            </Link>
            <Link to="/kifus" activeClassName="active">
              Kifu Library
            </Link>
            <Link to="/practices" activeClassName="active">
              Tsumego Practices(beta)
            </Link>
          </div>
        </section>

        <footer className="nav-footer">
            {/*
            <div className="nav-footer-wrap">
            <a href="#">
            <i className="fa fa-search"></i>
            </a>
            </div>
            <div className="nav-footer-wrap nav-question">
            <a href="#">
            <i className="fa fa-question-circle"></i>
            </a>
            </div>
            */}
            <IconMenu
              iconButtonElement={
                loginSection
              }
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              { loginList }
            </IconMenu>
          </footer>
        </div>
    )
  }
}

