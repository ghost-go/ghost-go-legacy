import React, { Component, PropTypes as T } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
//import lang from '../components/lang'

import Layout from './Layout'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

import AuthService from '../utils/AuthService'

export default class Login extends Component {

  static contextTypes() {
    return {
      router: T.object
    }
  }

  static propTypes() {
    return {
      location: T.object,
      auth: T.instanceOf(AuthService)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
    }
  }


  render() {
    const { stepIndex } = this.state
    const { auth } = this.props.route
    const paperStyle = {
      width: '60%',
      margin: '0 auto',
      marginTop: 20,
      padding: 30
    }

    return (
      <Layout>
        <Paper style={paperStyle}>
          <TextField hintText=''
                     floatingLabelText='Email/Username' />
          <div className="clearfix"></div>
          <TextField hintText=''
                     floatingLabelText="Password"
                     type="password" />
          <div className="clearfix"></div>
          <br />
          <br />
          <RaisedButton
            style={{marginRight: '20px'}}
            label="Login"
            primary={true}
            onTouchTap={auth.login.bind(this)}
          />
          <RaisedButton
            label="Sign Up"
            secondary={true}
            onTouchTap={this.handleCommentsToggle}
          />
        </Paper>
      </Layout>
    )
  }
}

//Login.contextTypes = {
  //router: T.object
//}

//Login.propTypes = {
  //location: T.object,
  //auth: T.instanceOf(AuthService)
//}
