import React, { Component, PropTypes as T } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

import {Row, Col, Thumbnail, Button} from 'react-bootstrap'
import LinkedAccountsList from '../components/LinkedAccount/LinkedAccountsList'
//import styles from './styles.module.css'

import { StyleSheet, css } from 'aphrodite'
import AuthService from '../utils/AuthService'
//import AuthenticationClient from 'auth0'
var AuthenticationClient = require('auth0').AuthenticationClient

export default class User extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tab: 'Basic Information',
      profile: props.auth.getProfile()
    }

    //var auth0 = new AuthenticationClient({
      //domain: 'ghostgo.auth0.com',
      //clientId: 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5'
    //})

    //console.log(auth0)

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

    //auth0.getUsers(function (err, users) {
      //if (err) {
        //// handle error.
      //}
      //console.log(users)
    //})
    //auth0
      //.getUsers()
      //.then(function (users) {
        //console.log(users)
      //})
      //.catch(function (err) {
        //// Handle error.
      //})
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login')
  }

  handleSeeMore(ranking) {
    this.setState({ rankingFilter: ranking })
  }

  render() {
    const { profile } = this.state
    return (
      <div className={css(styles.usersContainer)}>
        <div className={css(styles.usersLeft)}>
          <Card expanded={true}>
            <CardHeader
              title="RANKING"
            />
            <CardText>
              <FlatButton
                backgroundColor={ this.state.tab == 'Basic Information' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'Basic Information')}
                className={css(styles.button)}
                style={{textAlign: 'left'}}
                label="Basic Information"
              />
              <FlatButton
                backgroundColor={ this.state.tab == 'Recent Activity' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'Recent Activity')} className={css(styles.button)}
                style={{textAlign: 'left'}}
                label='Recent Activity(Not Open)'
              />
            </CardText>
          </Card>
        </div>
        <div className={css(styles.usersRight)}>
          <h2 className={styles.pageTitle}>Home</h2>
          <Row>
            <Col md={2} mdOffset={4} className={styles.pane}>
              <Thumbnail src={profile.picture}>
                <p>Welcome {profile.name}!</p>
                <p>
                  <Button bsStyle="default" onClick={this.logout.bind(this)}>Logout</Button>
                </p>
              </Thumbnail>
            </Col>
            <Col md={4} className={styles.pane}>
              <LinkedAccountsList profile={profile} auth={this.props.auth}></LinkedAccountsList>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  usersContainer: {
    marginTop: '20px',
    backgroundColor: '#fff',
    paddingTop: '20px',
    width: '100vw',
    float: 'left',
  },

  accountSection: {
    fontSize: '20px'
  },

  title: {
    fontSize: '26px',
    lineHeight: '26px',
    fontWeight: '300',
    margin: '10px 0 35px',
    padding: '0'
  },

  usersLeft: {
    width: '18vw',
    marginLeft: '45px',
    float: 'left',
  },

  buttonGroup: {
    marginBottom: '30px'
  },

  button: {
    width: '100%',
    marginBottom: '15px',
  },

  toggle: {
    maxWidth: '250px',
    marginBottom: '16px',
    fontSize: '16px'
  },

  usersRight: {
    width: '75vw',
    marginLeft: '2vw',
    paddingTop: '10px',
    float: 'left',
  },

  card: {
    width: '22vw',
    margin: '0px 1.5vw 20px 1.5vw',
    float: 'left'
  },

  previewImgWrapper: {
    height: '22vw'
  },

  clearfix: {
    clear: 'both'
  }
})
