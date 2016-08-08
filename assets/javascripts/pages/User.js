import React, { Component, PropTypes as T } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

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
  }

  fillNotSet(val) {
    if (val) {
      return val
    }
    else {
      return 'Not Set'
    }
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
        <Paper className={css(styles.usersRight)}>
            <Subheader style={{fontSize: '20px'}} className={styles.pageTitle}>Profile</Subheader>
            <List>
              <ListItem
                primaryText='User Name'
                secondaryText={profile.name}
              />
              <ListItem
                primaryText='Nick Name'
                secondaryText={profile.user_metadata.nickname}
              />
              <ListItem primaryText='Ranking' />
                <SelectField
                   className={css(styles.offsetLeft)}
                   value={profile.user_metadata.ranking}
                   onChange={this.handleChange}
                >
                  <MenuItem value={'18k'} primaryText="18k" />
                  <MenuItem value={'17k'} primaryText="17k" />
                  <MenuItem value={'16k'} primaryText="16k" />
                  <MenuItem value={'16k'} primaryText="16k" />
                  <MenuItem value={'15k'} primaryText="15k" />
                  <MenuItem value={'14k'} primaryText="14k" />
                  <MenuItem value={'13k'} primaryText="13k" />
                  <MenuItem value={'12k'} primaryText="12k" />
                  <MenuItem value={'11k'} primaryText="11k" />
                  <MenuItem value={'10k'} primaryText="10k" />
                  <MenuItem value={'9k'} primaryText="9k" />
                  <MenuItem value={'8k'} primaryText="8k" />
                  <MenuItem value={'7k'} primaryText="7k" />
                  <MenuItem value={'6k'} primaryText="6k" />
                  <MenuItem value={'5k'} primaryText="5k" />
                  <MenuItem value={'4k'} primaryText="4k" />
                  <MenuItem value={'3k'} primaryText="3k" />
                  <MenuItem value={'2k'} primaryText="2k" />
                  <MenuItem value={'1k'} primaryText="1k" />
                  <MenuItem value={'1d'} primaryText="1d" />
                  <MenuItem value={'2d'} primaryText="2d" />
                  <MenuItem value={'3d'} primaryText="3d" />
                  <MenuItem value={'4d'} primaryText="4d" />
                  <MenuItem value={'5d'} primaryText="5d" />
                  <MenuItem value={'6d'} primaryText="6d" />
                  <MenuItem value={'7d'} primaryText="7d" />
                  <MenuItem value={'8d'} primaryText="8d" />
                  <MenuItem value={'9d'} primaryText="9d" />
                </SelectField>
              <ListItem
                primaryText='Nationality'
                secondaryText={profile.user_metadata.locate}
              />
              <ListItem
                primaryText='Language'
                secondaryText={profile.locate}
              />
              <RaisedButton
                className={css(styles.offsetLeft)}
                onClick={this.logout.bind(this)}
                label="Save"
                primary={true}
                style={{marginBottom: '20px'}}
              />
            </List>
            <Divider />
            <LinkedAccountsList profile={profile} auth={this.props.auth}></LinkedAccountsList>
        </Paper>
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

  offsetLeft: {
    marginLeft: '16px'
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
