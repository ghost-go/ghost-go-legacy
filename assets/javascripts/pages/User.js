import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'


import { StyleSheet, css } from 'aphrodite'
import AuthService from '../utils/AuthService'

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'Basic Information'
    }
  }

  handleSeeMore(ranking) {
    this.setState({ rankingFilter: ranking })
  }

  render() {
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
          <h2>Account Infomation</h2>
          <div className={css(styles.accountSection)}>
          </div>
          <h2>Social Network Login Setup</h2>
          <i class="icon icon-facebook"></i>
          <Toggle
            className={css(styles.toggle)}
            label="Facebook"
            style={styles.toggle}
          />
          <i class="icon icon-google"></i>
          <Toggle
            className={css(styles.toggle)}
            label="Google"
            style={styles.toggle}
          />
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
