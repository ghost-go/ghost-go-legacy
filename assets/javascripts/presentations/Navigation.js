import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import AuthService from '../utils/AuthService'

export default class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSigned: false,
      isMenuShow: false
    }
  }

  logout() {
    // destroys the session data
    this.props.auth.logout()
    // redirects to login page
    this.context.router.push('/login')
  }

  handleUserMenu() {

  }

  render() {
    const { auth } = this.props
    const loginSection = []
    if (!auth.loggedIn()) {
      loginSection.push(
        <div className='nav-sign'>
          <div className="nav-footer-wrap nav-signup">
            <Link onClick={auth.login.bind(this)} to="">Sign Up</Link>
          </div>
        </div>
      )
    }
    else {
      let profile = auth.getProfile()
      loginSection.push(
        <div className='nav-sign'>
          <div className="nav-footer-wrap nav-signup">
            <img style={{height: '40px', marginTop: '5px', float: 'left'}} alt="avatar" src={profile.picture}/>
            <a href="javascript:void(0)">{profile.given_name}</a>
            <Link onClick={this.logout.bind(this)} to="">Log Out</Link>
          </div>
        </div>
      )
    }
    return (
      <div className="nav-container">
        <header className="nav-header">
          <a className="logo">
            <span style={{float: 'left', marginLeft: '103px', marginTop: '20px'}}>--alpha</span>
          </a>
        </header>

        <section className="nav-body">
          <div className="nav-body-wrap clearfix">
            <Link to="/puzzles" activeClassName="active">
            {/*<FormattedMessage
                id='app.nav.menu.puzzles'
                defaultMessage="Puzzles Library"
              />*/}
              Puzzles Library
            </Link>
            <Link to="/games" activeClassName="active">
            {/*<FormattedMessage
                id="app.nav.menu.games"
                defaultMessage="Games Library(Not Open)"
              />*/}
               Games Library(Not Open)
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

