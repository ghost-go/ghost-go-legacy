import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

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
    let loginSection = null
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
            {/*
            <Link to={'/users'} >{this.state.profile.nickname}</Link>
            */}
            <Link onClick={this.logout.bind(this)} to=''>Log Out</Link>
          </div>
        </div>
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
              Puzzles Library
            </Link>
            <Link to="/kifus" activeClassName="active">
              Kifus Library(Not Open)
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
          {
            loginSection
          }
        </footer>
      </div>
    )
  }
}

