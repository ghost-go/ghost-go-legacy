import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {List, ListItem} from 'material-ui/List'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

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
            <img style={{height: '40px', marginTop: '5px', float: 'left'}} alt="avatar" src={this.state.profile.picture}/>
            <a href="javascript:void(0)">{this.state.profile.nickname}</a>
            <span style={{color: 'rgb(0, 188, 212)', fontSize: '12px', position: 'absolute', top: '0px', right: '5px'}}>New Feature</span>
          </div>
        </div>

      loginList =
        <List>
          {
          //<Link to={'/users'}>
            //<ListItem primaryText="Profile" leftIcon={<AccountCircle />} />
          //</Link>
          }
          <Link to={'/history'}>
            <ListItem primaryText="History" leftIcon={<HistoryIcon />} />
          </Link>
          <Divider />
          <Link onClick={this.logout.bind(this)} to=''>
            <ListItem primaryText="Log Out" leftIcon={<ExitToApp />} />
          </Link>
        </List>

    }


    return (
      <div className="nav-container">
        <header className="nav-header">
          <a href="/" className="logo">
            <span style={{float: 'left', marginLeft: '103px', marginTop: '20px'}}>--alpha</span>
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
              Tsumego Practices
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

